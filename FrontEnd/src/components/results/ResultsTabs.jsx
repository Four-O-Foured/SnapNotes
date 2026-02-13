import { useState } from "react";
import { FileText, Brain, Zap, BookOpen, Map, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import CleanNotesTab from "./tabs/CleanNotesTab";
import DeepExplanationTab from "./tabs/DeepExplanationTab";
import FlashcardsTab from "./tabs/FlashcardsTab";
import ExamQuestionsTab from "./tabs/ExamQuestionsTab";
import MindMapTab from "./tabs/MindMapTab";
import KeyTermsTab from "./tabs/KeyTermsTab";

const tabs = [
  { id: "notes", label: "Clean Notes", icon: FileText },
  { id: "explanation", label: "Deep Explanation", icon: Brain },
  { id: "flashcards", label: "Flashcards", icon: Zap },
  { id: "exam", label: "Exam Questions", icon: BookOpen },
  { id: "mindmap", label: "Mind Map", icon: Map },
  { id: "terms", label: "Key Terms", icon: Search },
];

const ResultsTabs = () => {
  const [activeTab, setActiveTab] = useState("notes");

  const renderTabContent = () => {
    switch (activeTab) {
      case "notes":
        return <CleanNotesTab />;
      case "explanation":
        return <DeepExplanationTab />;
      case "flashcards":
        return <FlashcardsTab />;
      case "exam":
        return <ExamQuestionsTab />;
      case "mindmap":
        return <MindMapTab />;
      case "terms":
        return <KeyTermsTab />;
      default:
        return <CleanNotesTab />;
    }
  };

  return (
    <motion.div className="space-y-6 md:space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Tabs Header - Segmented Control Style */}
      <motion.div
        className="glass-card p-1.5 sm:p-2 flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center justify-center gap-1 px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm lg:text-lg font-medium relative transition-colors duration-200",
              activeTab === tab.id
                ? "text-snap-text-primary"
                : "text-snap-text-muted hover:text-snap-text-secondary"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeTab === tab.id && (
              <motion.div
                className="absolute inset-0 tab-active rounded-lg -z-10"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <tab.icon className="w-6 h-6 shrink-0" />
            <span className="hidden sm:inline">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ResultsTabs;
