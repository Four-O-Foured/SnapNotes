import { Button } from "../ui/Button.jsx";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useAnimation, useInView } from "framer-motion";

const CTASection = () => {
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [inView, controls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section ref={ref} className="py-20 md:py-24 lg:py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-snap-bg-main">
                <div className="absolute inset-0 bg-linear-to-t from-primary/5 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <div className="container relative z-10 px-4 sm:px-6">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs sm:text-small text-snap-text-secondary mb-6 md:mb-8"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Sparkles className="w-4 h-4 text-snap-gold shrink-0" />
                        Start studying smarter today
                    </motion.div>

                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-snap-text-primary mb-4 md:mb-6"
                        variants={itemVariants}
                    >
                        Ready to transform your{" "}
                        <span className="gradient-text">study routine?</span>
                    </motion.h2>

                    <motion.p
                        className="text-sm sm:text-base md:text-lg text-snap-text-secondary mb-8 md:mb-10 max-w-xl mx-auto"
                        variants={itemVariants}
                    >
                        Join thousands of students who are already using SnapNotes to ace their exams.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <Button variant="gradient" size="xl" asChild>
                            <Link to="/dashboard">
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.p
                        className="text-xs sm:text-small text-snap-text-muted mt-4 md:mt-6"
                        variants={itemVariants}
                    >
                        No credit card required · Free tier available
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
