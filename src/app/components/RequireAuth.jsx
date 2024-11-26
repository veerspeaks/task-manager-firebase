'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

export default function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    // Check if not loading and no user
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-[#640D5F] via-[#D91656] to-[#EB5B00] flex items-center justify-center"
      >
        <LoadingSpinner />
      </motion.div>
    );
  }

  // Don't render children until we confirm user is authenticated
  if (!user) {
    return null; // Return null to prevent flash of content before redirect
  }

  // User is authenticated, render children
  return <>{children}</>;
}