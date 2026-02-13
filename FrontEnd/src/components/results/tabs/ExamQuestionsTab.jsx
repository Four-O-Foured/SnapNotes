import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const examQuestions = [
  {
    id: 1,
    question: "Explain the difference between supervised and unsupervised learning.",
    answer: "Supervised learning uses labeled data where the correct output is known, allowing the model to learn the mapping from inputs to outputs. Unsupervised learning works with unlabeled data, where the model must find patterns and structures on its own, such as clustering similar data points together.",
  },
  {
    id: 2,
    question: "What is the bias-variance tradeoff in machine learning?",
    answer: "The bias-variance tradeoff is a fundamental concept where increasing model complexity reduces bias (underfitting) but increases variance (overfitting), and vice versa. The goal is to find the optimal balance that minimizes total error on unseen data.",
  },
  {
    id: 3,
    question: "Describe the process of cross-validation and its importance.",
    answer: "Cross-validation is a technique where the dataset is divided into k folds, and the model is trained k times, each time using a different fold as the validation set. This provides a more robust estimate of model performance and helps detect overfitting.",
  },
];

const ExamQuestionsTab = () => {
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
      {examQuestions.map((item) => (
        <motion.div
          key={item.id}
          className={cn(
            "glass-card overflow-hidden transition-all duration-300 cursor-pointer",
            openId === item.id && "border-primary/30 ring-1 ring-primary/20"
          )}
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
        >
          <button
            onClick={() => toggleQuestion(item.id)}
            className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-snap-bg-panel/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <motion.span
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-small"
                animate={{ scale: openId === item.id ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {item.id}
              </motion.span>
              <span className="text-body text-snap-text-primary font-medium">{item.question}</span>
            </div>
            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                {readIds.has(item.id) && (
                  <motion.span
                    className="flex items-center gap-1 text-[12px] text-snap-mint"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-3 h-3" />
                    Read
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.div
                animate={{ rotate: openId === item.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-snap-text-muted" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pt-0 border-t border-border/50">
                  <motion.div
                    className="p-4 rounded-xl bg-snap-bg-panel"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <p className="text-small text-snap-text-secondary leading-relaxed">{item.answer}</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExamQuestionsTab;
