import { useState, useEffect, useContext } from 'react';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { UserOwnerContextObj } from '../context/UserOwnerContext';

function Header() {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const {currentUser}=useContext(UserOwnerContextObj)
  const [darkMode, setDarkMode] = useState(false);
  const [role, setRole] = useState(null);
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

  useEffect(() => {
    if (user) {
      setRole(user.publicMetadata?.role || "user");
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
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
            <motion.span className="bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
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
              {
                currentUser.role === "owner" ? (
                  <>
                    <Link to='/restaurentlist' className="btn-gradient">Restaurant List</Link>
                    <Link to='/tablebookings' className="btn-gradient">Table Bookings</Link>
                    
                  </>
                ) : (
                  <>
                    <Link to='/myorders' className="btn-gradient">My Orders</Link>
                    <Link to='/tables' className="btn-gradient">Tables</Link>
                    <Link to='/restaurentlist' className="btn-gradient">Restaurant List</Link>
                    <Link to='/mybookings' className="btn-gradient">My Bookings</Link>
                  </>
                )
              }
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
            className="p-2 border rounded transition-all duration-500 hover:scale-110 ">
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>
        </div>
      </nav>
    </div>
  );
}

export default Header;