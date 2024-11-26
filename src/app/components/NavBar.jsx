'use client';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth); //signing out the user
      router.push('/login'); //redirecting to the login page
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#640D5F] text-white p-4 fixed w-full top-0 z-50 shadow-lg"
    >
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-[#FFB200] to-[#EB5B00] bg-clip-text text-transparent"
        >
          TaskManager
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignOut}
          className="bg-[#D91656] hover:bg-[#EB5B00] px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
        >
          Sign Out
        </motion.button>
      </div>
    </motion.nav>
  );
} 