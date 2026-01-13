import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-2xl font-bold">
              Kanban Board
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/"
                  className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition"
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              {!open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-blue-600 text-white px-4 py-3 border-t border-blue-500">
          {user ? (
            <div className="flex flex-col space-y-2">
              <Link to="/" onClick={() => setOpen(false)} className="block px-3 py-2 bg-white text-blue-600 rounded-md">Home</Link>
              <Link to="/profile" onClick={() => setOpen(false)} className="block px-3 py-2 bg-white text-blue-600 rounded-md">Profile</Link>
              <button onClick={() => { setOpen(false); logout(); }} className="w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2">Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="block px-3 py-2 bg-white text-blue-600 rounded-md">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;