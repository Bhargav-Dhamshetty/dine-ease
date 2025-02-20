import { useContext, useState, useEffect } from 'react';
import { useUser, useClerk,UserButton } from '@clerk/clerk-react';
import logo from '../../assets/logo.png';
import { userOwnerContextObj } from '../context/UserOwnerContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

function Header() {
  const { signOut } = useClerk();
  const { currentUser, setCurrentUser } = useContext(userOwnerContextObj);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  // Theme toggle state
  const [darkMode, setDarkMode] = useState(false);
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Typewriter effect
  const words = "Dine Ease";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText(words.substring(0, index));
      setIndex((prevIndex) => (prevIndex < words.length ? prevIndex + 1 : 0));
    }, 200);
    return () => clearInterval(interval);
  }, [index]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <div className={darkMode ? 'bg-black text-white' : 'bg-white text-black'}>
      <nav className="flex items-center justify-between p-4 shadow-md relative z-10">
        <div className="flex items-center space-x-2">
          <Link to='/'>
            <img src={logo} alt="Logo" className="w-10 h-10" />
          </Link>
          <Link to='/' className="text-lg font-bold tracking-wide">
            <motion.span
              className="bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent"
            >
              {text}
            </motion.span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {!isSignedIn ? (
            <>
              <Link to="/login" className="btn-gradient">Sign In</Link>
              <Link to="/signup" className="btn-gradient">Sign Up</Link>
            </>
          ) : (
            <>
              <UserButton/>
              <Link to='/myorders' className="btn-gradient">My Orders</Link>
              <Link to='/myfavourites' className="btn-gradient">My Favourites</Link>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={handleSignOut} 
                className="btn-gradient p-2 rounded">
                Sign Out
              </motion.button>
            </>
          )}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 border rounded transition-all duration-500 hover:scale-110">
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>
        </div>
      </nav>
      
      {/* Sidebar Toggle Button */}
      <div className="p-2 absolute top-[70px] left-4 z-10">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 border rounded transition-all duration-500 hover:scale-110">
          <Menu size={24} />
        </motion.button>
      </div>
      
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }} 
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-[64px] left-0 h-[calc(100%-64px)] w-60 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white p-5 shadow-lg z-50`}>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(false)}
          className="mb-4 transition-all duration-300 transform hover:scale-110">
          <X size={24} />
        </motion.button>
        <ul className="space-y-4">
          {!isSignedIn ? (
            <>
              <li><Link to="/login" className="btn-gradient">Sign In</Link></li>
              <li><Link to="/signup" className="btn-gradient">Sign Up</Link></li>
            </>
          ) : (
            <>
              <li><Link to='/myorders' className="btn-gradient">My Orders</Link></li>
              <li><Link to='/myfavourites' className="btn-gradient">My Favourites</Link></li>
              <li>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSignOut} 
                  className="btn-gradient p-2 rounded">
                  Sign Out
                </motion.button>
              </li>
            </>
          )}
        </ul>
      </motion.div>
    </div>
  );
}

export default Header;
