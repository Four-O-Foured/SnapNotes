import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useAnimation, useInView } from "framer-motion";

const Footer = () => {
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [inView, controls]);

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <footer ref={ref} className="py-10 md:py-12 border-t border-border/50 bg-snap-bg-sidebar">
            <div className="container px-4 sm:px-6">
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6"
                    initial="hidden"
                    animate={controls}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.1,
                            },
                        },
                    }}
                >
                    {/* Logo */}
                    <motion.div variants={itemVariants}>
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-linear-to-br from-primary to-snap-cyan flex items-center justify-center">
                                <span className="text-white font-bold text-xs">S</span>
                            </div>
                            <span className="text-sm font-semibold gradient-text">SnapNotes</span>
                        </Link>
                    </motion.div>

                    {/* Links */}
                    <motion.div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-small text-snap-text-muted" variants={itemVariants}>
                        <a href="#" className="hover:text-snap-text-secondary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-snap-text-secondary transition-colors">Terms</a>
                        <a href="#" className="hover:text-snap-text-secondary transition-colors">Contact</a>
                    </motion.div>

                    {/* Copyright */}
                    <motion.p className="text-xs sm:text-small text-snap-text-muted text-center sm:text-right" variants={itemVariants}>
                        © 2024 SnapNotes. All rights reserved.
                    </motion.p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
