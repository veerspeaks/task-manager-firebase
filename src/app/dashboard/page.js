'use client';

import RequireAuth from '../components/RequireAuth';
import TaskList from '../components/TaskList';
import NavBar from '../components/NavBar';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-[#640D5F] via-[#D91656] to-[#EB5B00]">
        <NavBar />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-24 pb-12 px-6"
        >
          <div className="max-w-4xl mx-auto">
            <TaskList />
          </div>
        </motion.div>
      </div>
    </RequireAuth>
  );
}