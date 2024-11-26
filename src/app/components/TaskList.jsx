'use client';

import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'tasks'),
      where('uid', '==', auth.currentUser.uid), //filtering the tasks by the user id
      orderBy('createdAt', 'desc') //ordering the tasks by the created at date
    );

    //setting the tasks to the database in real time
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => tasksData.push({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
        setLoading(false);
      },
      (error) => {
        setError('Error loading tasks: ' + error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []); //unsubscribing from the database

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-white text-center"
      >
        Your Tasks
      </motion.h1>

      <AddTask />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 text-white p-3 rounded-lg mb-4"
        >
          {error}
        </motion.div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <AnimatePresence mode="wait">
            <div className="space-y-3">
              {currentTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                    currentPage === index + 1
                      ? 'bg-[#FFB200] text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>
          )}

          {/* No tasks message */}
          {filteredTasks.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/70 mt-6"
            >
              {searchQuery ? 'No tasks found matching your search.' : 'No tasks yet. Add one above!'}
            </motion.p>
          )}
        </>
      )}
    </motion.div>
  );
}