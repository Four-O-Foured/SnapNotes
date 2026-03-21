import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const ExamPage = () => {
    const { snapNotes } = useSelector((state) => state.snapNotes);
    const [selectedSubject, setSelectedSubject] = useState(null);

    // Group logic: Subject -> Topic -> Questions
    const groupedData = useMemo(() => {
        const groups = {};
        if (!snapNotes) return groups;

        snapNotes.forEach((note) => {
            const subject = note.snapNotes?.subject || "Uncategorized";
            const topic = note.snapNotes?.lesson_title || "Untitled Topic";
            const questions = note.snapNotes?.exam_questions || [];

            if (questions.length === 0) return; // skip if no questions

            if (!groups[subject]) {
                groups[subject] = {};
            }
            if (!groups[subject][topic]) {
                groups[subject][topic] = [];
            }
            groups[subject][topic].push(...questions);
        });
        return groups;
    }, [snapNotes]);

    const subjects = Object.keys(groupedData).sort();

  

    // Default to the first subject when loaded
    useEffect(() => {
        if (subjects.length > 0 && !selectedSubject) {
            setSelectedSubject(subjects[0]);
        }
    }, [subjects, selectedSubject]);

    if (!snapNotes || snapNotes.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-20 h-20 rounded-2xl bg-snap-cyan/10 flex items-center justify-center mb-6"
                >
                    <BookOpen className="w-10 h-10 text-snap-cyan" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-snap-text-primary mb-2">No Exam Questions Yet</h2>
                <p className="text-snap-text-secondary max-w-md mb-6">
                    Upload your study materials in the dashboard to generate AI-powered exam questions.
                </p>
                <Link to="/dashboard/home" className="px-6 py-2 rounded-full bg-snap-cyan text-white hover:bg-snap-cyan/90 transition">
                    Create SnapNotes
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-snap-text-primary tracking-tight mb-2">
                        Exam <span className="text-snap-cyan">Preparation</span>
                    </h1>
                    <p className="text-snap-text-secondary text-lg">
                        Master your topics structured by subject and test yourself.
                    </p>
                </div>
            </div>

            {subjects.length === 0 ? (
                <div className="text-center py-10 bg-snap-bg-panel/40 rounded-3xl border border-white/5">
                    <p className="text-snap-text-secondary">No exam questions extracted from your notes yet.</p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Sidebar / Topbar for Subjects */}
                    <div className="w-full lg:w-64 shrink-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide lg:sticky lg:top-24">
                        <div className="flex lg:flex-col gap-2">
                            {subjects.map((subject) => (
                                <button
                                    key={subject}
                                    onClick={() => setSelectedSubject(subject)}
                                    className={cn(
                                        "px-5 py-3 rounded-xl text-left font-medium transition-all whitespace-nowrap lg:whitespace-normal",
                                        selectedSubject === subject
                                            ? "bg-snap-cyan/20 text-snap-cyan border border-snap-cyan/30"
                                            : "glass-card text-snap-text-secondary hover:text-snap-text-primary hover:bg-snap-bg-panel/50 border border-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <BookOpen size={18} />
                                        <span>{subject}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area for Topics and Questions */}
                    <div className="flex-1 space-y-8 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedSubject}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                {selectedSubject && Object.keys(groupedData[selectedSubject]).map((topic) => (
                                    <TopicSection
                                        key={topic}
                                        topic={topic}
                                        questions={groupedData[selectedSubject][topic]}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
};

// Isolated individual Topic Section to manage accordions locally
const TopicSection = ({ topic, questions }) => {
    const [openId, setOpenId] = useState(null);
    const [readIds, setReadIds] = useState(new Set());

    const toggleQuestion = (id) => {
        if (openId === id) {
            setOpenId(null);
        } else {
            setOpenId(id);
            setReadIds((prev) => new Set([...prev, id]));
        }
    };

    return (
        <div className="bg-snap-bg-panel/20 border border-white/5 shadow-xl shadow-black/20 rounded-4xl p-6 lg:p-8">
            <h3 className="text-2xl font-bold text-snap-text-primary mb-6 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-snap-purple/10">
                    <Sparkles className="w-5 h-5 text-snap-purple" />
                </div>
                {topic}
            </h3>

            <div className="space-y-3">
                {questions.map((item, index) => (
                    <motion.div
                        key={index}
                        className={cn(
                            "glass-card overflow-hidden transition-all duration-300 cursor-pointer",
                            openId === index && "border-snap-cyan/30 ring-1 ring-snap-cyan/20"
                        )}
                        whileHover={{ scale: 1.01 }}
                    >
                        <button
                            onClick={() => toggleQuestion(index)}
                            className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-snap-bg-panel/30 transition-colors"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                                <motion.span
                                    className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-semibold text-sm",
                                        readIds.has(index) ? "bg-snap-mint/10 text-snap-mint" : "bg-snap-cyan/10 text-snap-cyan"
                                    )}
                                    animate={{ scale: openId === index ? 1.1 : 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Q{index + 1}
                                </motion.span>
                                <span className="text-base text-snap-text-primary font-medium leading-relaxed">{item.question}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto mt-2 sm:mt-0">
                                <AnimatePresence mode="wait">
                                    {readIds.has(index) && (
                                        <motion.span
                                            className="flex items-center gap-1 text-[12px] text-snap-mint font-medium"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Check className="w-3 h-3" />
                                            Reading
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                <motion.div
                                    animate={{ rotate: openId === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-1 rounded-full bg-white/5"
                                >
                                    <ChevronDown className="w-4 h-4 text-snap-text-muted" />
                                </motion.div>
                            </div>
                        </button>

                        <AnimatePresence>
                            {openId === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="p-4 sm:p-6 border-t border-border/50 bg-black/10">
                                        <motion.div
                                            className="p-5 rounded-xl bg-snap-bg-panel/80 border border-white/5 shadow-inner"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15, duration: 0.3 }}
                                        >
                                            <p className="text-sm md:text-base text-snap-text-secondary leading-relaxed">{item.answer}</p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ExamPage;