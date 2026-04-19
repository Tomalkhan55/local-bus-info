import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBox({ initialFrom = '', initialTo = '' }) {
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [allStops, setAllStops] = useState([])
  const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])
  const [showFrom, setShowFrom] = useState(false)
  const [showTo, setShowTo] = useState(false)
  const navigate = useNavigate()
  const fromRef = useRef(null)
  const toRef = useRef(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/buses/stops/all')
        const data = await res.json()
        setAllStops(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchStops()
  }, [])

  const getSuggestions = (value) => {
    if (!value || value.length < 2) return []
    return allStops
      .filter(stop => stop.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 6)
  }


  const handleFromChange = (e) => {
    const val = e.target.value
    setFrom(val)
    setFromSuggestions(getSuggestions(val))
    setShowFrom(true)
  }

  const handleToChange = (e) => {
    const val = e.target.value
    setTo(val)
    setToSuggestions(getSuggestions(val))
    setShowTo(true)
  }

  const handleSearch = () => {
    if (!from || !to) return
    if (from.toLowerCase() === to.toLowerCase()) {
      setErrorMsg('একই স্থান থেকে একই স্থানে যাওয়া সম্ভব নয়!')
      setTimeout(() => setErrorMsg(''), 3000)
      return
    }
    navigate(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
  }


  useEffect(() => {
    const handleClick = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) setShowFrom(false)
      if (toRef.current && !toRef.current.contains(e.target)) setShowTo(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative">
      {errorMsg && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert bg-red-500 text-white border-none">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
      <div className="card bg-white shadow-lg p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row gap-3">

          <div className="relative flex-1" ref={fromRef}>
            <input
              type="text"
              placeholder="কোথা থেকে? (যেমন: Mirpur)"
              className="input input-bordered w-full focus:border-green-500"
              value={from}
              onChange={handleFromChange}
              onFocus={() => setShowFrom(true)}
            />
            {showFrom && fromSuggestions.length > 0 && (
              <ul className="absolute z-50 bg-white border border-green-100 rounded-xl shadow-lg w-full mt-1 overflow-hidden">
                {fromSuggestions.map((stop, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm text-slate-700 border-b border-gray-50 last:border-0"
                    onMouseDown={() => {
                      setFrom(stop.split('(')[0].trim())
                      setShowFrom(false)
                    }}
                  >
                    📍 {stop}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <span className="hidden sm:flex items-center text-green-500 font-bold text-xl">→</span>

          <div className="relative flex-1" ref={toRef}>
            <input
              type="text"
              placeholder="কোথায়? (যেমন: Motijheel)"
              className="input input-bordered w-full focus:border-green-500"
              value={to}
              onChange={handleToChange}
              onFocus={() => setShowTo(true)}
            />
            {showTo && toSuggestions.length > 0 && (
              <ul className="absolute z-50 bg-white border border-green-100 rounded-xl shadow-lg w-full mt-1 overflow-hidden">
                {toSuggestions.map((stop, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm text-slate-700 border-b border-gray-50 last:border-0"
                    onMouseDown={() => {
                      setTo(stop.split('(')[0].trim())
                      setShowTo(false)
                    }}
                  >
                    📍 {stop}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="btn bg-green-600 hover:bg-green-700 text-white border-none px-8"
            onClick={handleSearch}
          >
            খুঁজুন
          </button>

        </div>
      </div>
    </div>
  )
}

export default SearchBox