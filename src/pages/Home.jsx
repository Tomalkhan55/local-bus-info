import { Link } from 'react-router-dom'
import SearchBox from '../components/SearchBox'
import busImg from '../assets/bus_uu.jpg'
import FareEstimator from '../components/FareEstimator'

function Home() {
  const stats = [
    { value: '182+', label: 'বাস রুট' },
    { value: '500+', label: 'স্টপেজ' },
    { value: '50+', label: 'এলাকা' },
  ]

  const popularRoutes = [
    { from: 'Mirpur 10', to: 'Motijheel' },
    { from: 'Gabtoli', to: 'Gulistan' },
    { from: 'Uttara', to: 'Farmgate' },
    { from: 'Azampur', to: 'Airport' },
    { from: 'Sadarghat', to: 'Mohakhali' },
    { from: 'Jatrabari', to: 'Shahbag' },
  ]

  const steps = [
    { icon: '🔍', title: 'খুঁজুন', desc: 'আপনার গন্তব্য লিখুন' },
    { icon: '🚌', title: 'বাস দেখুন', desc: 'উপলব্ধ বাসের তালিকা দেখুন' },
    { icon: '✅', title: 'উঠে পড়ুন', desc: 'সঠিক বাসে চড়ুন' },
  ]

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* Hero Section */}
      <section className="bg-[#f0f7f4] py-16 px-4 border-b border-green-100">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
              ঢাকার সেরা বাস রুট গাইড
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight text-slate-800">
              সঠিক বাস খুঁজুন, <br />
              <span className="text-green-600">সময় বাঁচান</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              ১৮২টিরও বেশি বাস রুটের তথ্য এক জায়গায়। আপনার গন্তব্যে যাওয়ার সঠিক বাস খুঁজে নিন সহজেই।
            </p>
            <div className="flex gap-3 justify-center lg:justify-start">
              <Link to="/search" className="btn bg-green-600 hover:bg-green-700 text-white btn-lg font-semibold border-none">
                বাস খুঁজুন →
              </Link>
              <Link to="/about" className="btn btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white btn-lg">
                আরও জানুন
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={busImg}
              alt="Bus illustration"
              className="w-72 lg:w-96 drop-shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          {stats.map((s, i) => (
            <div key={i} className="py-4">
              <p className="text-3xl font-bold text-green-600">{s.value}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">রুট খুঁজুন</h2>
          <p className="text-gray-400 mb-6">কোথা থেকে কোথায় যাবেন লিখুন</p>
          <SearchBox />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#f0f7f4] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">কীভাবে কাজ করে?</h2>
          <p className="text-center text-gray-400 mb-10">মাত্র ৩টি সহজ ধাপে আপনার বাস খুঁজুন</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm text-center p-8 border border-green-50 hover:border-green-200 transition-all">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="font-bold text-lg text-slate-800">{step.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">জনপ্রিয় রুট</h2>
          <p className="text-center text-gray-400 mb-10">এক ক্লিকেই সার্চ করুন</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map((route, i) => (
              <Link
                key={i}
                to={`/search?from=${route.from}&to=${route.to}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md hover:border-green-400 border border-green-100 transition-all p-4 flex flex-row items-center justify-center gap-3"
              >
                <span className="text-green-700 font-semibold text-sm">{route.from}</span>
                <span className="text-green-400 font-bold">→</span>
                <span className="text-green-700 font-semibold text-sm">{route.to}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fare Estimator */}
      <section className="bg-[#f0f7f4] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">ভাড়া হিসাব করুন</h2>
          <p className="text-center text-gray-400 mb-6">আনুমানিক বাস ভাড়া জানুন</p>
          <FareEstimator />
        </div>
      </section>

    </div>
  )
}

export default Home