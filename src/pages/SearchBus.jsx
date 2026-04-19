import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBox from '../components/SearchBox'
import BusCard from '../components/BusCard'

function SearchBus() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('route')
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [busName, setBusName] = useState('')
  const [busResults, setBusResults] = useState([])
  const [busLoading, setBusLoading] = useState(false)
  const [busSearched, setBusSearched] = useState(false)
  const [busNameSuggestions, setBusNameSuggestions] = useState([])
  const [showBusNames, setShowBusNames] = useState(false)
  const [allBusNames, setAllBusNames] = useState([])
  const busNameRef = useRef(null)

  const from = searchParams.get('from')
  const to = searchParams.get('to')

  useEffect(() => {
    if (from && to) {
      setActiveTab('route')
      handleFetchBuses(from, to)
    }
  }, [from, to])

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/buses/names/all`)
        const data = await res.json()
        setAllBusNames(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchNames()
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (busNameRef.current && !busNameRef.current.contains(e.target)) {
        setShowBusNames(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleFetchBuses = async (f, t) => {
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/buses/search?from=${encodeURIComponent(f)}&to=${encodeURIComponent(t)}`
      )
      const data = await res.json()
      setBuses(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const fetchBusByName = async () => {
    if (!busName) return
    setBusLoading(true)
    setBusSearched(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/buses/name?name=${encodeURIComponent(busName)}`
      )
      const data = await res.json()
      setBusResults(data)
    } catch (err) {
      console.error(err)
    }
    setBusLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* Hero */}
      <section className="bg-[#f0f7f4] py-12 px-4 border-b border-green-100">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
            বাস সার্চ
          </span>
          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            আপনার বাস খুঁজুন
          </h1>

          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-xl p-1 shadow-sm border border-green-100 flex gap-1">
              <button
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'route'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-green-600'
                  }`}
                onClick={() => setActiveTab('route')}
              >
                🗺️ রুট সার্চ
              </button>
              <button
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'bus'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-green-600'
                  }`}
                onClick={() => setActiveTab('bus')}
              >
                🚌 বাস সার্চ
              </button>
            </div>
          </div>

          {activeTab === 'route' && (
            <SearchBox initialFrom={from || ''} initialTo={to || ''} />
          )}

          {activeTab === 'bus' && (
            <div className="card bg-white shadow-lg p-6 rounded-2xl">
              <div className="flex gap-3">
                <div className="relative flex-1" ref={busNameRef}>
                  <input
                    type="text"
                    placeholder="বাসের নাম লিখুন (যেমন: Alif, Akash)"
                    className="input input-bordered w-full focus:border-green-500"
                    value={busName}
                    onChange={(e) => {
                      const val = e.target.value
                      setBusName(val)
                      if (val.length >= 2) {
                        const suggestions = allBusNames
                          .filter(b =>
                            b.nameEn.toLowerCase().includes(val.toLowerCase()) ||
                            b.nameBn.includes(val)
                          )
                          .slice(0, 6)
                        setBusNameSuggestions(suggestions)
                        setShowBusNames(true)
                      } else {
                        setShowBusNames(false)
                      }
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && fetchBusByName()}
                  />
                  {showBusNames && busNameSuggestions.length > 0 && (
                    <ul className="absolute z-50 bg-white border border-green-100 rounded-xl shadow-lg w-full mt-1 overflow-hidden text-left">
                      {busNameSuggestions.map((b, i) => (
                        <li
                          key={i}
                          className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm text-slate-700 border-b border-gray-50 last:border-0"
                          onMouseDown={() => {
                            setBusName(b.nameEn)
                            setShowBusNames(false)
                          }}
                        >
                          🚌 {b.nameEn} <span className="text-gray-400">— {b.nameBn}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  className="btn bg-green-600 hover:bg-green-700 text-white border-none px-6"
                  onClick={fetchBusByName}
                >
                  খুঁজুন
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">

          {activeTab === 'route' && (
            <>
              {loading && (
                <div className="text-center py-20">
                  <span className="loading loading-spinner loading-lg text-green-600"></span>
                  <p className="text-gray-400 mt-4">খোঁজা হচ্ছে...</p>
                </div>
              )}
              {!loading && searched && buses.length > 0 && (
                <>
                  <p className="text-gray-500 mb-6">
                    <span className="font-semibold text-green-600">{from}</span> থেকে{' '}
                    <span className="font-semibold text-green-600">{to}</span> — {buses.length}টি বাস পাওয়া গেছে
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {buses.map(bus => (
                      <BusCard key={bus._id} bus={bus} from={from} to={to} />
                    ))}
                  </div>
                </>
              )}
              {!loading && searched && buses.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🚌</div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">কোনো বাস পাওয়া যায়নি</h3>
                  <p className="text-gray-400">অন্য স্টপেজ দিয়ে আবার চেষ্টা করুন</p>
                </div>
              )}
              {!loading && !searched && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">রুট খুঁজতে উপরে লিখুন</h3>
                  <p className="text-gray-400">কোথা থেকে কোথায় যাবেন সেটা দিন</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'bus' && (
            <>
              {busLoading && (
                <div className="text-center py-20">
                  <span className="loading loading-spinner loading-lg text-green-600"></span>
                  <p className="text-gray-400 mt-4">খোঁজা হচ্ছে...</p>
                </div>
              )}
              {!busLoading && busSearched && busResults.length > 0 && (
                <>
                  <p className="text-gray-500 mb-6">
                    <span className="font-semibold text-green-600">{busName}</span> — {busResults.length}টি বাস পাওয়া গেছে
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {busResults.map(bus => (
                      <BusCard key={bus._id} bus={bus} />
                    ))}
                  </div>
                </>
              )}
              {!busLoading && busSearched && busResults.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🚌</div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">কোনো বাস পাওয়া যায়নি</h3>
                  <p className="text-gray-400">অন্য নাম দিয়ে আবার চেষ্টা করুন</p>
                </div>
              )}
              {!busLoading && !busSearched && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🚌</div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">বাসের নাম লিখুন</h3>
                  <p className="text-gray-400">যেকোনো বাসের নাম লিখে খুঁজুন</p>
                </div>
              )}
            </>
          )}

        </div>
      </section>

    </div>
  )
}

export default SearchBus