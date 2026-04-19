import { Link } from 'react-router-dom'

function BusCard({ bus, from, to }) {
  // from → to এর মধ্যের stops বের করো
  const fromIndex = bus.stops.findIndex(s => s.match(new RegExp(from, 'i')))
  const toIndex = bus.stops.findIndex(s => s.match(new RegExp(to, 'i')))

  // order check করো
  const start = Math.min(fromIndex, toIndex)
  const end = Math.max(fromIndex, toIndex)
  const routeStops = bus.stops.slice(start, end + 1)




  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-green-50 hover:border-green-200 transition-all p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* Left — Bus Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🚌</span>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{bus.nameEn}</h3>
              <p className="text-gray-400 text-sm">{bus.nameBn}</p>
            </div>
          </div>

          {/* Route Preview */}
          <div className="flex flex-wrap items-center gap-1 mb-3">
            {routeStops.map((stop, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${i === 0 || i === routeStops.length - 1
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                  }`}>
                  {stop.split('(')[0].trim()}
                </span>
                {i < routeStops.length - 1 && (
                  <span className="text-green-400 text-xs">→</span>
                )}
              </span>
            ))}
          </div>

          {/* Time + Service */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span>🕕 {bus.startingTime} — {bus.closingTime}</span>
            <span>💺 {bus.serviceType}</span>
          </div>
        </div>

        {/* Right — Button */}
        <div>
          <Link
            to={`/bus/${bus._id}?from=${from}&to=${to}`}
            className="btn bg-green-600 hover:bg-green-700 text-white border-none w-full sm:w-auto"
          >
            বিস্তারিত দেখুন →
          </Link>
        </div>

      </div>
    </div>
  )
}

export default BusCard