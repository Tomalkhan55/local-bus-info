import { useState, useEffect, useRef } from 'react'

function FareEstimator() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [allStops, setAllStops] = useState([])
  const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])
  const [showFrom, setShowFrom] = useState(false)
  const [showTo, setShowTo] = useState(false)
  const fromRef = useRef(null)
  const toRef = useRef(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/buses/stops/all`)
      .then(res => res.json())
      .then(data => setAllStops(data))
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) setShowFrom(false)
      if (toRef.current && !toRef.current.contains(e.target)) setShowTo(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const getSuggestions = (val) => {
    if (val.length < 2) return []
    return allStops
      .filter(s => s.toLowerCase().includes(val.toLowerCase()))
      .slice(0, 5)
  }

  const calculateFare = async () => {
    if (!from || !to) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/buses/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      )
      const buses = await res.json()

      if (buses.length === 0) {
        setError('এই রুটে কোনো বাস পাওয়া যায়নি')
        setLoading(false)
        return
      }

      const bus = buses[0]
      const fromIndex = bus.stops.findIndex(s => s.match(new RegExp(from, 'i')))
      const toIndex = bus.stops.findIndex(s => s.match(new RegExp(to, 'i')))
      const distance = Math.abs(toIndex - fromIndex)
      const fare = Math.max(10, distance * 5)

      setResult({ fare, distance, busName: bus.nameEn })
    } catch (err) {
      setError('কিছু একটা সমস্যা হয়েছে')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-50 p-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">

        {/* From */}
        <div className="relative flex-1" ref={fromRef}>
          <input
            type="text"
            placeholder="কোথা থেকে?"
            className="input input-bordered w-full focus:border-green-500"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value)
              setFromSuggestions(getSuggestions(e.target.value))
              setShowFrom(true)
            }}
            onFocus={() => setShowFrom(true)}
          />
          {showFrom && fromSuggestions.length > 0 && (
            <ul className="absolute z-50 bg-white border border-green-100 rounded-xl shadow-lg w-full mt-1 overflow-hidden text-left">
              {fromSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm text-slate-700 border-b border-gray-50 last:border-0"
                  onMouseDown={() => {
                    setFrom(s.split('(')[0].trim())
                    setShowFrom(false)
                  }}
                >
                  📍 {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="hidden sm:flex items-center text-green-500 font-bold">→</span>

        {/* To */}
        <div className="relative flex-1" ref={toRef}>
          <input
            type="text"
            placeholder="কোথায়?"
            className="input input-bordered w-full focus:border-green-500"
            value={to}
            onChange={(e) => {
              setTo(e.target.value)
              setToSuggestions(getSuggestions(e.target.value))
              setShowTo(true)
            }}
            onFocus={() => setShowTo(true)}
          />
          {showTo && toSuggestions.length > 0 && (
            <ul className="absolute z-50 bg-white border border-green-100 rounded-xl shadow-lg w-full mt-1 overflow-hidden text-left">
              {toSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm text-slate-700 border-b border-gray-50 last:border-0"
                  onMouseDown={() => {
                    setTo(s.split('(')[0].trim())
                    setShowTo(false)
                  }}
                >
                  📍 {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="btn bg-green-600 px-4 hover:bg-green-700 text-white border-none"
          onClick={calculateFare}
        >
          {loading ? <span className="loading loading-spinner loading-sm"></span> : 'হিসাব করুন'}
        </button>

      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      {result && (
        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
          <p className="text-gray-500 text-sm mb-1">{result.busName} — {result.distance}টি স্টপেজ</p>
          <p className="text-3xl font-bold text-green-600">আনুমানিক ভাড়া: ৳{result.fare}</p>
          <p className="text-xs text-gray-400 mt-1">* প্রতি স্টপেজ ৳৫ হারে</p>
        </div>
      )}
    </div>
  )
}

export default FareEstimator