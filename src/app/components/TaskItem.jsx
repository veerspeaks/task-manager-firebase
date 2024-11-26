'use client';

import { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

export default function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleUpdate = async () => {
    const taskDocRef = doc(db, 'tasks', task.id);
    try {
      await updateDoc(taskDocRef, { title }); //updating the task
      setIsEditing(false); //stopping the editing
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async () => {
    const taskDocRef = doc(db, 'tasks', task.id);
    try {
      await deleteDoc(taskDocRef); //deleting the task
    } catch (err) {
      alert(err);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white/80 backdrop-blur-sm border border-white/20 p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center"
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.input
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/20 border border-white/30 p-2 flex-1 mr-2 rounded-md focus:ring-2 focus:ring-[#FFB200] focus:border-transparent outline-none text-black"
          />
        ) : (
          <motion.span
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-black"
          >
            {task.title}
          </motion.span>
        )}
      </AnimatePresence>
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleUpdate}
              className="text-[#FFB200] hover:text-[#EB5B00] transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            >
              <FiCheck size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(false)}
              className="text-[#D91656] hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            >
              <FiX size={20} />
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(true)}
              className="text-[#FFB200] hover:text-[#EB5B00] transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            >
              <FiEdit2 size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="text-[#D91656] hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            >
              <FiTrash2 size={18} />
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}