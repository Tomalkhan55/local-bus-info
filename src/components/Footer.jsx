import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#f0f7f4] border-t border-green-100 pt-10 pb-6 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🚌</span>
              <span className="text-xl font-bold text-green-700">Local Bus Info</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              ঢাকার বাস রুট খোঁজার সহজ সমাধান। সঠিক বাসে চড়ুন, সময় বাঁচান।
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-green-600 transition-colors">Home</Link></li>
              <li><Link to="/search" className="hover:text-green-600 transition-colors">Search Bus</Link></li>
              <li><Link to="/blog" className="hover:text-green-600 transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-green-600 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">যোগাযোগ</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>📍 ঢাকা, বাংলাদেশ</li>
              <li>✉️ localbusinfo@email.com</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-green-100 pt-4 text-center text-sm text-gray-400">
          © 2026 Local Bus Info — Developed by <span className="text-green-600 font-medium">Tomal</span> & <span className="text-green-600 font-medium">Rifat</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer