import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar bg-white shadow-sm px-6 sticky top-0 z-50 border-b border-green-100">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🚌</span>
          <span className="text-xl font-bold text-green-700">Local Bus Info</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {[
            { to: '/', label: 'Home' },
            { to: '/search', label: 'Search Bus' },
            { to: '/blog', label: 'Blog' },
            { to: '/about', label: 'About' },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-700 font-semibold bg-green-50 rounded-lg'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 border border-green-100">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/search">Search Bus</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar