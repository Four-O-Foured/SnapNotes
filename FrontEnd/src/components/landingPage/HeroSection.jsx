import { Button } from "../ui/Button.jsx";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BackgroundLines } from "../ui/BackgroundLines.jsx";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-snap-bg-main">
      <BackgroundLines className="flex items-center w-full h-full justify-center">
        {/* Layered Gradient Orbs */}
        <div className="absolute inset-20 right-[25%] z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-snap-cyan/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container relative z-10 px-4 sm:px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Left Content */}
            <motion.div
              className="text-center md:text-left space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <motion.div
                className="space-y-4 md:space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-small text-snap-text-secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="w-2 h-2 bg-snap-mint rounded-full animate-pulse" />
                  AI-Powered Study Assistant
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-snap-text-primary leading-tight text-balance font-bold">
                  Your Notes.{" "}
                  <span className="gradient-text">Instantly Smart.</span>
                </h1>

                <p className="text-base md:text-lg text-snap-text-secondary max-w-2xl mx-auto md:mx-0">
                  Upload any image and get structured notes, flashcards, and exam-ready answers powered by AI.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center  md:justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Button variant="gradient" size="xl" asChild>
                  <Link to="/dashboard">
                    Try SnapNotes
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline-glow" size="xl">
                  <Play className="w-5 h-5" />
                  See Demo
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="pt-4 md:pt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className="text-small text-snap-text-muted mb-4">Trusted by students at</p>
                <div className="flex items-center gap-4 md:gap-8 justify-center md:justify-start flex-wrap opacity-50">
                  <span className="text-snap-text-secondary font-medium text-sm">Stanford</span>
                  <span className="text-snap-text-secondary font-medium text-sm">MIT</span>
                  <span className="text-snap-text-secondary font-medium text-sm">Harvard</span>
                  <span className="text-snap-text-secondary font-medium text-sm">Berkeley</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Mockup */}
            <motion.div
              className="relative hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative mx-auto w-72 lg:w-80">
                {/* Phone Frame */}
                <div className="relative glass-card-glow p-3 rounded-[2.5rem] border-2 border-border/30">
                  <div className="bg-snap-bg-main rounded-4xl overflow- aspect-9/19">
                    {/* Phone Screen Content */}
                    <div className="p-4 space-y-4">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center text-[10px] text-snap-text-muted">
                        <span>9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-2 bg-snap-text-muted/50 rounded-sm" />
                        </div>
                      </div>

                      {/* App Header */}
                      <div className="text-center pt-4">
                        <div className="text-small font-semibold gradient-text">SnapNotes</div>
                      </div>

                      {/* Upload Card */}
                      <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-border/50 bg-snap-bg-card/50 text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-[11px] text-snap-text-secondary">Drop your notes here</p>
                      </div>

                      {/* Processing Animation */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-snap-mint rounded-full animate-pulse" />
                          <span className="text-[10px] text-snap-text-muted">Analyzing handwriting...</span>
                        </div>
                        <div className="h-1 bg-snap-bg-panel rounded-full">
                          <div className="h-full w-2/3 bg-linear-to-r from-primary to-snap-cyan rounded-full animate-pulse" />
                        </div>
                      </div>

                      {/* Preview Cards */}
                      <div className="mt-4 space-y-2">
                        {['Clean Notes', 'Flashcards', 'Exam Q&A'].map((item, i) => (
                          <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-snap-bg-panel/50 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="w-1 h-6 rounded-full bg-linear-to-b from-primary to-snap-cyan" />
                            <span className="text-[10px] text-snap-text-secondary">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 glass-card px-3 py-2 rounded-lg animate-float">
                  <span className="text-[10px] text-snap-mint">✓ Smarter Notes</span>
                </div>
                <div className="absolute -bottom-4 -left-4 glass-card px-3 py-2 rounded-lg animate-float-delay">
                  <span className="text-[10px] text-snap-cyan">Exam Ready</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </BackgroundLines>
    </section>
  );
};

export default HeroSection;
