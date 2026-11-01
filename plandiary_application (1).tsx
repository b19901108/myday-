import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// CUSTOM HOOKS & UTILITIES
// ==========================================

// Custom hook for persistent state in LocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Simple CSS Confetti Generator component for full-completion celebration
const ConfettiEffect = () => {
  const pieces = useMemo(() => {
    const colors = ['#f43f5e', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      size: 6 + Math.random() * 8,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-fall"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            borderRadius: '2px',
            animation: `confettiFall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// SVG Icons
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const FireIcon = () => (
  <svg className="w-4 h-4 text-amber-500 inline mr-1.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.431.67-.84 1.57-1.488 2.559-.97 1.482-2.186 3.036-3.805 4.354-1.616 1.316-2.58 2.87-2.58 4.54 0 3.313 2.687 6 6 6s6-2.687 6-6c0-2.228-1.077-4.14-2.855-5.948-.686-.697-1.424-1.393-2.072-2.106a25.1 25.1 0 01-1.09-1.306l-.008-.01c-.244-.316-.546-.777-.83-1.583zm-2.457 7.026a1 1 0 00-1.636 1.157c.5.708 1.09 1.408 1.636 2.067.892 1.08 1.662 2.158 1.662 3.197 0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.986.61-2.062 1.767-3.212a23.1 23.1 0 011.571-1.385l.006-.005c.216-.176.438-.344.664-.506.33-.238.675-.466 1.03-.687a.998.998 0 00-.7 1.77z" clipRule="evenodd" />
  </svg>
);

const PrintIcon = () => (
  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const HistoryIcon = () => (
  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const DragHandleIcon = () => (
  <svg className="w-4 h-4 text-slate-400 cursor-grab" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Mood Constants (Clean Text Labels, No Emojis)
const MOODS = [
  { label: 'Great', color: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' },
  { label: 'Good', color: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300' },
  { label: 'Neutral', color: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300' },
  { label: 'Challenging', color: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300' },
  { label: 'Low', color: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300' },
];

const TIME_SLOTS = ['Morning', 'Afternoon', 'Evening', 'Night'];
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS_OF_YEAR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useLocalStorage('plan_diary_dark_mode', false);

  // App Navigation/Step state: 
  // 1: Tasks Setup, 2: Period Setup, 3: Active Planner Dashboard, 4: History View, 5: Finished Analytics Summary View
  const [step, setStep] = useLocalStorage('plan_diary_step', 1);

  // Core Data States
  const [tasks, setTasks] = useLocalStorage('plan_diary_tasks', []);
  const [period, setPeriod] = useLocalStorage('plan_diary_period', 'Week'); // Day, Week, Month, Year
  const [taskMatrix, setTaskMatrix] = useLocalStorage('plan_diary_matrix', {}); // { [taskId_slotKey]: true/false }
  const [diaryEntry, setDiaryEntry] = useLocalStorage('plan_diary_text', '');
  const [selectedMood, setSelectedMood] = useLocalStorage('plan_diary_mood', 'Great');
  const [reflection, setReflection] = useLocalStorage('plan_diary_reflection', { well: '', improve: '' });
  const [history, setHistory] = useLocalStorage('plan_diary_history', []);
  const [streak, setStreak] = useLocalStorage('plan_diary_streak', 0);
  const [lastCompletedDate, setLastCompletedDate] = useLocalStorage('plan_diary_last_completed', null);

  // Input States
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskRepeat, setNewTaskRepeat] = useState('None');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  // Auto-save notification feedback indicator
  const [saveStatus, setSaveStatus] = useState('Saved to LocalStorage');
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Setup theme class on root container
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Auto save banner animation triggered on state modifications
  const triggerAutoSaveBanner = () => {
    setSaveStatus('Saving changes...');
    const timer = setTimeout(() => {
      setSaveStatus('Saved to LocalStorage');
    }, 600);
    return () => clearTimeout(timer);
  };

  // Add Task handler in Step 1
  const handleAddTask = (e) => {
    e?.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      text: newTaskText.trim(),
      priority: newTaskPriority, // Low, Medium, High
      repeat: newTaskRepeat,     // None, Daily, Weekly
      dueDate: newTaskDueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setNewTaskDueDate('');
    triggerAutoSaveBanner();
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    // Clean matrix entries for this task
    const newMatrix = { ...taskMatrix };
    Object.keys(newMatrix).forEach((key) => {
      if (key.startsWith(id)) {
        delete newMatrix[key];
      }
    });
    setTaskMatrix(newMatrix);
    triggerAutoSaveBanner();
  };

  // Drag and drop task reordering
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedTasks = [...tasks];
    const draggedItem = updatedTasks[draggedIndex];
    updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setTasks(updatedTasks);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    triggerAutoSaveBanner();
  };

  // Toggle Checkbox matrix entry
  const toggleSlot = (taskId, slotKey) => {
    const key = `${taskId}_${slotKey}`;
    setTaskMatrix((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    triggerAutoSaveBanner();
  };

  // Dynamic slot options based on chosen period
  const getPeriodSlots = () => {
    switch (period) {
      case 'Day':
        return TIME_SLOTS;
      case 'Week':
        return DAYS_OF_WEEK;
      case 'Month':
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      case 'Year':
        return MONTHS_OF_YEAR;
      default:
        return DAYS_OF_WEEK;
    }
  };

  const slots = getPeriodSlots();

  // Calculate overall progress percentage & slot statistics
  const totalSlotsCount = tasks.length * slots.length;
  const completedSlotsCount = useMemo(() => {
    if (totalSlotsCount === 0) return 0;
    let count = 0;
    tasks.forEach((t) => {
      slots.forEach((slot) => {
        if (taskMatrix[`${t.id}_${slot}`]) {
          count++;
        }
      });
    });
    return count;
  }, [tasks, slots, taskMatrix]);

  const progressPercent = totalSlotsCount > 0 ? Math.round((completedSlotsCount / totalSlotsCount) * 100) : 0;

  // Additional analytics per priority
  const analyticsByPriority = useMemo(() => {
    const result = { High: { total: 0, done: 0 }, Medium: { total: 0, done: 0 }, Low: { total: 0, done: 0 } };
    tasks.forEach((t) => {
      const prio = t.priority || 'Medium';
      slots.forEach((slot) => {
        result[prio].total += 1;
        if (taskMatrix[`${t.id}_${slot}`]) {
          result[prio].done += 1;
        }
      });
    });
    return result;
  }, [tasks, slots, taskMatrix]);

  // Track Streaks when 100% completed
  useEffect(() => {
    if (progressPercent === 100 && totalSlotsCount > 0) {
      const today = new Date().toDateString();
      if (lastCompletedDate !== today) {
        setStreak((prev) => prev + 1);
        setLastCompletedDate(today);
      }
    }
  }, [progressPercent, totalSlotsCount, lastCompletedDate, setStreak, setLastCompletedDate]);

  // Finish Period Trigger -> Navigate to Summary Analytics View (Step 5)
  const handleFinishPeriod = () => {
    setStep(5);
  };

  // Archive & Reset current plan
  const handleArchivePlan = () => {
    if (tasks.length === 0) return;
    const newHistoryRecord = {
      id: 'hist_' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      period,
      tasksCount: tasks.length,
      completionRate: progressPercent,
      completedSlots: completedSlotsCount,
      totalSlots: totalSlotsCount,
      mood: selectedMood,
      diaryEntry,
      reflection,
      tasks: [...tasks],
    };
    setHistory([newHistoryRecord, ...history]);

    if (window.confirm('Plan finalized and saved to History! Start a new plan now?')) {
      setTasks([]);
      setTaskMatrix({});
      setDiaryEntry('');
      setReflection({ well: '', improve: '' });
      setStep(1);
    }
  };

  // PDF Export trigger
  const handlePrintExport = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Show celebratory confetti effect when user hits 100% completion */}
      {progressPercent === 100 && totalSlotsCount > 0 && <ConfettiEffect />}

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setStep(1)}>
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 font-bold shadow-sm">
              PD
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              PlanDiary
            </span>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Streak Counter Chip */}
            <div className="flex items-center px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold">
              <FireIcon />
              <span>{streak} Day Streak</span>
            </div>

            {/* History Toggle Button */}
            <button
              onClick={() => setStep(step === 4 ? 3 : 4)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center ${
                step === 4
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
              title="View Archived History"
            >
              <HistoryIcon />
              <span className="hidden sm:inline">History Log</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:opacity-80 transition"
              aria-label="Toggle Theme"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* AUTO SAVE INDICATOR & GLOBAL PROGRESS BAR HEADER */}
      {(step === 3 || step === 5) && (
        <div className="bg-slate-100/60 dark:bg-slate-900/40 border-b border-slate-200/50 dark:border-slate-800/50 py-2.5 px-4 print:hidden">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{saveStatus}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline font-medium text-slate-700 dark:text-slate-300">
                Period: <strong className="text-indigo-600 dark:text-indigo-400">{period} Planner</strong>
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-72">
              <span className="font-semibold text-slate-700 dark:text-slate-300 min-w-[3rem] text-right">
                {progressPercent}% Complete
              </span>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* ==========================================
            STEP 1: TASK SETUP WIZARD
           ========================================== */}
        {step === 1 && (
          <section className="max-w-xl mx-auto animate-fadeIn">
            <div className="text-center mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                Step 1 of 2
              </span>
              <h1 className="text-3xl font-extrabold mt-3 text-slate-900 dark:text-white tracking-tight">
                What do you want to do?
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                List out your main tasks, goals, or habits. You can edit or reorder them later.
              </p>
            </div>

            {/* Task Input Form */}
            <form onSubmit={handleAddTask} className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="e.g. Read 20 pages, Morning Workout, Write Journal..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Repeat Routine
                  </label>
                  <select
                    value={newTaskRepeat}
                    onChange={(e) => setNewTaskRepeat(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="None">No Repeat</option>
                    <option value="Daily">Daily Routine</option>
                    <option value="Weekly">Weekly Routine</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!newTaskText.trim()}
                className="w-full py-3 px-4 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition flex items-center justify-center space-x-2 shadow-sm text-sm"
              >
                <PlusIcon />
                <span>Add Task to List</span>
              </button>
            </form>

            {/* Task Chips Display */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 flex justify-between items-center">
                <span>Tasks Added ({tasks.length})</span>
                <span className="text-xs font-normal text-slate-400">Drag items to reorder</span>
              </h3>

              {tasks.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 text-sm">
                  No tasks added yet. Type a task above to begin planning.
                </div>
              ) : (
                <div className="space-y-2">
                  {tasks.map((t, idx) => (
                    <div
                      key={t.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                      className="group flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <DragHandleIcon />
                        <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                          {t.text}
                        </span>
                        {t.repeat !== 'None' && (
                          <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {t.repeat}
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                            t.priority === 'High'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                              : t.priority === 'Medium'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          {t.priority} Priority
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(t.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition opacity-80 group-hover:opacity-100"
                        title="Delete Task"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Next Step Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={tasks.length === 0}
                className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold hover:opacity-90 disabled:opacity-40 transition shadow-sm text-sm"
              >
                Next: Choose Time Frame →
              </button>
            </div>
          </section>
        )}

        {/* ==========================================
            STEP 2: PERIOD SELECTION SCREEN
           ========================================== */}
        {step === 2 && (
          <section className="max-w-2xl mx-auto animate-fadeIn">
            <div className="text-center mb-10">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                Step 2 of 2
              </span>
              <h1 className="text-3xl font-extrabold mt-3 text-slate-900 dark:text-white tracking-tight">
                For which period?
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                Select how you would like to structure your interactive planning table.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { id: 'Day', title: 'Day Planner', badge: 'Daily', desc: 'Break down into Morning, Afternoon, Evening, Night.' },
                { id: 'Week', title: 'Weekly Overview', badge: 'Weekly', desc: '7-Day schedule from Monday to Sunday.' },
                { id: 'Month', title: 'Monthly Grid', badge: 'Monthly', desc: '4-Week high level milestone tracker.' },
                { id: 'Year', title: 'Annual Roadmap', badge: 'Yearly', desc: '12-Month master goal structure.' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPeriod(item.id)}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                    period === item.id
                      ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-sm ring-1 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-2">
                    {item.badge}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition text-sm"
              >
                ← Back to Tasks
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-sm text-sm"
              >
                Generate My Planner
              </button>
            </div>
          </section>
        )}

        {/* ==========================================
            STEP 3: MAIN PLANNER & DIARY DASHBOARD
           ========================================== */}
        {step === 3 && (
          <section className="space-y-8 animate-fadeIn">
            {/* Top Toolbar Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                >
                  Tasks List
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                >
                  Change Period ({period})
                </button>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={handlePrintExport}
                  className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition flex items-center justify-center"
                >
                  <PrintIcon />
                  Export PDF
                </button>
                
                {/* PROMINENT FINISH PERIOD BUTTON */}
                <button
                  onClick={handleFinishPeriod}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center"
                >
                  <CheckCircleIcon />
                  Finish {period} & View Analysis
                </button>
              </div>
            </div>

            {/* Completion Banner */}
            {progressPercent === 100 && totalSlotsCount > 0 && (
              <div className="p-5 rounded-2xl bg-emerald-600 text-white shadow-sm text-center space-y-1">
                <h2 className="text-xl font-bold uppercase tracking-wider">All Tasks Completed</h2>
                <p className="text-xs text-emerald-100">Excellent commitment! Click "Finish {period} & View Analysis" above to review complete statistics.</p>
              </div>
            )}

            {/* PLANNER GRID VIEW TABLE */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {period} Task Matrix
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Check off slots as you complete each task slot.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase border-b border-slate-100 dark:border-slate-800">
                      <th className="py-3.5 px-4 w-1/3">Task Title & Details</th>
                      {slots.map((s) => (
                        <th key={s} className="py-3.5 px-3 text-center">
                          {s}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                    {tasks.length === 0 ? (
                      <tr>
                        <td colSpan={slots.length + 1} className="py-8 text-center text-slate-400 text-xs">
                          No active tasks. Click "Tasks List" above to add items.
                        </td>
                      </tr>
                    ) : (
                      tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition">
                          <td className="py-4 px-4 font-medium text-slate-800 dark:text-slate-200">
                            <div>
                              <span>{task.text}</span>
                              <div className="flex items-center space-x-2 mt-1">
                                <span
                                  className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${
                                    task.priority === 'High'
                                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                      : task.priority === 'Medium'
                                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  }`}
                                >
                                  {task.priority}
                                </span>
                                {task.repeat !== 'None' && (
                                  <span className="text-[10px] text-slate-400 uppercase">
                                    {task.repeat}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Checkbox matrix cells */}
                          {slots.map((slot) => {
                            const isChecked = !!taskMatrix[`${task.id}_${slot}`];
                            return (
                              <td key={slot} className="py-4 px-3 text-center">
                                <button
                                  onClick={() => toggleSlot(task.id, slot)}
                                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition ${
                                    isChecked
                                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                                      : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-800'
                                  }`}
                                  aria-label={`Toggle ${task.text} for ${slot}`}
                                >
                                  {isChecked && (
                                    <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DIARY & MOOD TRACKER SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Free-writing Diary */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Guided Diary Log
                  </h3>
                  <span className="text-xs text-slate-400">Auto-saves continuous text</span>
                </div>

                {/* Mood Selector (Clean Text Labels, No Emojis) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Current Mood State
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {MOODS.map((m) => (
                      <button
                        key={m.label}
                        onClick={() => {
                          setSelectedMood(m.label);
                          triggerAutoSaveBanner();
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          selectedMood === m.label
                            ? `${m.color} ring-1 ring-indigo-500`
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Textarea */}
                <div>
                  <textarea
                    rows={6}
                    value={diaryEntry}
                    onChange={(e) => {
                      setDiaryEntry(e.target.value);
                      triggerAutoSaveBanner();
                    }}
                    placeholder="Write down your thoughts, wins, gratitude, or logs for this timeframe..."
                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm leading-relaxed"
                  ></textarea>
                </div>
              </div>

              {/* Reflection Box */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                    Period Reflection
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                        What went well?
                      </label>
                      <textarea
                        rows={3}
                        value={reflection.well}
                        onChange={(e) => {
                          setReflection({ ...reflection, well: e.target.value });
                          triggerAutoSaveBanner();
                        }}
                        placeholder="Key accomplishments and positive outcomes..."
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                        What can be improved?
                      </label>
                      <textarea
                        rows={3}
                        value={reflection.improve}
                        onChange={(e) => {
                          setReflection({ ...reflection, improve: e.target.value });
                          triggerAutoSaveBanner();
                        }}
                        placeholder="Areas for adjustment and growth..."
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-slate-400">
                  Reflections are included in your final data summary.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================
            STEP 5: FINISHED PERIOD ANALYTICS & DIARY SUMMARY
           ========================================== */}
        {step === 5 && (
          <section className="space-y-8 animate-fadeIn">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 print:hidden">
              <div>
                <span className="text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                  Final Summary Report
                </span>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {period} Analytics & Diary Review
                </h1>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setStep(3)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
                >
                  ← Edit Planner
                </button>
                <button
                  onClick={handlePrintExport}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition flex items-center"
                >
                  <PrintIcon />
                  Print / Export
                </button>
                <button
                  onClick={handleArchivePlan}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition"
                >
                  Archive to History
                </button>
              </div>
            </div>

            {/* Key Data Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Overall Completion</span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {progressPercent}%
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {completedSlotsCount} of {totalSlotsCount} slot checkmarks completed
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Current Streak</span>
                <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                  {streak} Days
                </div>
                <p className="text-xs text-slate-500 mt-1">Consecutive plan completion streak</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Total Active Tasks</span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {tasks.length}
                </div>
                <p className="text-xs text-slate-500 mt-1">Structured across {slots.length} timeframe slots</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Logged Mood</span>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
                  {selectedMood} State
                </div>
                <p className="text-xs text-slate-500 mt-1">Self-reported period sentiment</p>
              </div>
            </div>

            {/* Detailed Priority Analysis & Breakdown */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Task Breakdown by Priority
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: 'High', title: 'High Priority', color: 'bg-rose-500' },
                  { key: 'Medium', title: 'Medium Priority', color: 'bg-amber-500' },
                  { key: 'Low', title: 'Low Priority', color: 'bg-emerald-500' },
                ].map((prio) => {
                  const stat = analyticsByPriority[prio.key];
                  const pct = stat.total > 0 ? Math.round((stat.done / stat.total) * 100) : 0;
                  return (
                    <div key={prio.key} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span>{prio.title}</span>
                        <span>{pct}% ({stat.done}/{stat.total})</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${prio.color}`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Integrated Diary & Reflection Records */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Diary Entry Log
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {diaryEntry ? diaryEntry : 'No diary entry logged for this period.'}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Period Reflection
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                    <strong className="block text-emerald-800 dark:text-emerald-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
                      What Went Well
                    </strong>
                    <p className="text-emerald-900 dark:text-emerald-300">
                      {reflection.well || 'No reflection provided.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                    <strong className="block text-indigo-800 dark:text-indigo-400 font-bold mb-1 uppercase tracking-wider text-[10px]">
                      Areas for Improvement
                    </strong>
                    <p className="text-indigo-900 dark:text-indigo-300">
                      {reflection.improve || 'No reflection provided.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================
            STEP 4: ARCHIVED HISTORY PAGE
           ========================================== */}
        {step === 4 && (
          <section className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Archived History
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Review past plans, period reflections, and completion statistics over time.
                </p>
              </div>
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                ← Back to Active Planner
              </button>
            </div>

            {history.length === 0 ? (
              <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 space-y-2">
                <p className="text-sm font-medium">No archived entries found yet.</p>
                <p className="text-xs">Complete a plan and click "Archive to History" in Step 5 to save records.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          {record.date} ({record.period} Plan)
                        </h4>
                        <span className="text-xs text-slate-400">
                          {record.tasksCount} Tasks • {record.completionRate}% Completed • Mood: {record.mood}
                        </span>
                      </div>
                      <div className="w-24 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full"
                          style={{ width: `${record.completionRate}%` }}
                        ></div>
                      </div>
                    </div>

                    {record.diaryEntry && (
                      <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <strong className="block text-slate-400 uppercase text-[10px] mb-1">Diary Notes</strong>
                        {record.diaryEntry}
                      </div>
                    )}

                    {(record.reflection?.well || record.reflection?.improve) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {record.reflection?.well && (
                          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300">
                            <strong className="block text-emerald-800 dark:text-emerald-400 font-bold mb-1 uppercase text-[10px]">
                              Wins
                            </strong>
                            {record.reflection.well}
                          </div>
                        )}
                        {record.reflection?.improve && (
                          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-300">
                            <strong className="block text-indigo-800 dark:text-indigo-400 font-bold mb-1 uppercase text-[10px]">
                              Improvements
                            </strong>
                            {record.reflection.improve}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto px-4 py-8 border-t border-slate-200 dark:border-slate-800/60 mt-12 text-center text-xs text-slate-400 print:hidden">
        PlanDiary • Guided Planner & Reflective Log • LocalStorage Enabled
      </footer>
    </div>
  );
}