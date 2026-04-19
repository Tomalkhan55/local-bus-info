import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

function BusDetails() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [bus, setBus] = useState(null)
  const [loading, setLoading] = useState(true)

  const from = searchParams.get('from')
  const to = searchParams.get('to')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/buses/${id}`)
      .then(res => res.json())
      .then(data => {
        setBus(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-green-600"></span>
    </div>
  )

  if (!bus) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">বাস পাওয়া যায়নি</p>
    </div>
  )

  const fromIndex = from ? bus.stops.findIndex(s => s.match(new RegExp(from, 'i'))) : -1
  const toIndex = to ? bus.stops.findIndex(s => s.match(new RegExp(to, 'i'))) : -1
  const start = fromIndex !== -1 && toIndex !== -1 ? Math.min(fromIndex, toIndex) : -1
  const end = fromIndex !== -1 && toIndex !== -1 ? Math.max(fromIndex, toIndex) : -1
  const isReversed = fromIndex > toIndex
  const routeStops = isReversed
    ? bus.stops.slice(start, end + 1).reverse()
    : bus.stops.slice(start, end + 1)

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* Hero */}
      <section className="bg-[#f0f7f4] py-12 px-4 border-b border-green-100">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
          >
            ← ফিরে যান
          </button>
          <div className="flex items-center gap-4">
            <div className="text-6xl">🚌</div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{bus.nameEn}</h1>
              <p className="text-gray-400 text-lg">{bus.nameBn}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">

          {/* Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-50 text-center">
              <p className="text-2xl mb-1">🕕</p>
              <p className="text-xs text-gray-400 mb-1">প্রথম বাস</p>
              <p className="font-bold text-slate-700">{bus.startingTime}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-50 text-center">
              <p className="text-2xl mb-1">🔴</p>
              <p className="text-xs text-gray-400 mb-1">শেষ বাস</p>
              <p className="font-bold text-slate-700">{bus.closingTime}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-50 text-center col-span-2 sm:col-span-1">
              <p className="text-2xl mb-1">💺</p>
              <p className="text-xs text-gray-400 mb-1">সার্ভিস</p>
              <p className="font-bold text-slate-700 text-sm">{bus.serviceType}</p>
            </div>
          </div>

          {/* Your Route */}
          {start !== -1 && end !== -1 && (
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h2 className="font-bold text-slate-800 mb-4">
                📍 আপনার রুট
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {routeStops.map((stop, i, arr) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${i === 0 || i === arr.length - 1
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-slate-600 border border-green-200'
                      }`}>
                      {stop.split('(')[0].trim()}
                    </span>
                    {i < arr.length - 1 && <span className="text-green-400">→</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full Route */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-50">
            <h2 className="font-bold text-slate-800 mb-4">
              🗺️ সম্পূর্ণ রুট ({bus.stops.length}টি স্টপেজ)
            </h2>
            <div className="flex flex-col gap-2">
              {bus.stops.map((stop, i) => {
                const isFrom = i === fromIndex
                const isTo = i === toIndex
                const isInRange = start !== -1 && end !== -1 && i > start && i < end

                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${isFrom || isTo
                        ? 'bg-green-600'
                        : isInRange
                          ? 'bg-green-300'
                          : 'bg-gray-200'
                        }`} />
                      {i < bus.stops.length - 1 && (
                        <div className={`w-0.5 h-5 ${isInRange || isFrom || isTo
                          ? 'bg-green-300'
                          : 'bg-gray-200'
                          }`} />
                      )}
                    </div>
                    <span className={`text-sm ${isFrom || isTo
                      ? 'font-bold text-green-700'
                      : isInRange
                        ? 'text-slate-600'
                        : 'text-gray-400'
                      }`}>
                      {stop}
                      {isFrom && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">আপনি উঠবেন</span>}
                      {isTo && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">আপনি নামবেন</span>}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

export default BusDetails