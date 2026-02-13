import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sampleNotes = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    content: "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves.",
  },
  {
    id: 2,
    title: "Types of Machine Learning",
    content: "There are three main types: Supervised Learning (using labeled data), Unsupervised Learning (finding patterns in unlabeled data), and Reinforcement Learning (learning through trial and error with rewards).",
  },
  {
    id: 3,
    title: "Key Concepts",
    content: "Training Data: The dataset used to train the model. Features: Input variables used to make predictions. Labels: Output variables in supervised learning. Model: The mathematical representation learned from data.",
  },
];

const CleanNotesTab = () => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {sampleNotes.map((note) => (
        <motion.div
          key={note.id}
          className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 hover-lift cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-body font-semibold text-snap-text-primary mb-2 group-hover:text-primary transition-colors">{note.title}</h3>
              <p className="text-small text-snap-text-secondary leading-relaxed group-hover:text-snap-text-secondary transition-colors">{note.content}</p>
            </div>
            <motion.button
              onClick={() => handleCopy(note.id, note.content)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-snap-bg-panel shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {copiedId === note.id ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-snap-mint" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy className="w-4 h-4 text-snap-text-muted" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CleanNotesTab;
