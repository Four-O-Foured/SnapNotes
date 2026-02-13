
import { motion, AnimatePresence } from "framer-motion";
import BubbleMenu from "@/components/layout/BubbleMenu";
import GenerationForm from "@/components/dashboardPage/GenerationForm";
import ResultsTabs from "@/components/results/ResultsTabs";
import { useSelector } from "react-redux";
import { navItems } from "../lib/utils";

const Dashboard = () => {
  const { currentSnapNote } = useSelector((state) => state.snapNotes);
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  return (
    <div className="min-h-screen bg-snap-bg-main pt-20 sm:pt-12 md:-mt-18 overflow-x-hidden relative">
      {/* Immersive Navigation */}
      <BubbleMenu
        items={navItems}
        logo="🫧"
        useFixedPosition={true}
        className="px-6 md:px-12"
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 md:pt-32 pb-12 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="space-y-8 md:space-y-16">
          {/* Header section */}
          <motion.div
            className="text-center space-y-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-snap-text-primary tracking-tighter">
              {currentSnapNote ? "Study Insights" : "Upload Notes"}
            </h1>
            <p className="text-base sm:text-xl text-snap-text-secondary max-w-2xl mx-auto">
              {currentSnapNote
                ? "Your personalized AI study materials are ready for review."
                : "Experience the future of learning by transforming your notes into structured AI insights."}
            </p>
          </motion.div>

          {/* Functional area */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {currentSnapNote ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <ResultsTabs />
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="max-w-4xl mx-auto space-y-8"
                >
                  <GenerationForm/>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
