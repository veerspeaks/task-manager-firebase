'use client';

import { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; //check if the title is empty
    
    setLoading(true);
    setError('');
    
    try {
      await addDoc(collection(db, 'tasks'), { //adding the task to the database
        uid: auth.currentUser.uid,
        title: title.trim(),
        createdAt: new Date().toISOString(),
      }); 
      setTitle(''); //clearing the input field
    } catch (err) {
      setError('Failed to add task: ' + err.message); //setting the error message
    } finally {
      setLoading(false); //setting the loading to false
    }
  };

  return (
    <div className="mb-6">
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 text-white p-3 rounded-lg mb-4"
        >
          {error}
        </motion.div>
      )}
      
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleAddTask}
        className="flex gap-2 flex-col md:flex-row items-center"
      >
        <input
          type="text"
          placeholder="New Task"
          className="bg-white/20 border border-white/30 p-3 flex-1 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#FFB200] transition-all duration-200 w-full md:w-auto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="bg-gradient-to-r from-[#FFB200] to-[#EB5B00] text-white py-2 px-6 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 md:w-auto w-1/2"
        >
          {loading ? <LoadingSpinner /> : 'Add'}
        </motion.button>
      </motion.form>
    </div>
  );
}