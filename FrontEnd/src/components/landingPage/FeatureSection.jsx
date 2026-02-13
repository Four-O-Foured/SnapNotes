import { FileText, Brain, Zap, BookOpen, Map, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useAnimation, useInView } from "framer-motion";

const features = [
    {
        icon: FileText,
        title: "Clean Notes",
        description: "Transform messy handwriting into structured, readable notes instantly.",
        color: "text-primary",
        bgColor: "bg-primary/10",
    },
    {
        icon: Brain,
        title: "Deep Explanations",
        description: "Get comprehensive explanations of complex topics with AI-powered insights.",
        color: "text-snap-cyan",
        bgColor: "bg-snap-cyan/10",
    },
    {
        icon: Zap,
        title: "Flashcards",
        description: "Auto-generate study flashcards for efficient memorization and review.",
        color: "text-snap-gold",
        bgColor: "bg-snap-gold/10",
    },
    {
        icon: BookOpen,
        title: "Exam Questions",
        description: "Practice with AI-generated exam questions based on your notes.",
        color: "text-snap-coral",
        bgColor: "bg-snap-coral/10",
    },
    {
        icon: Map,
        title: "Mind Maps",
        description: "Visualize concepts with interactive, AI-generated mind maps.",
        color: "text-snap-mint",
        bgColor: "bg-snap-mint/10",
    },
    {
        icon: Search,
        title: "Key Terms",
        description: "Extract and define important terms and concepts automatically.",
        color: "text-primary",
        bgColor: "bg-primary/10",
    },
];

const FeaturesSection = () => {
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: true, amount: 0.2 });

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
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <section ref={ref} className="py-20 md:py-24 lg:py-28 bg-snap-bg-card relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10 px-4 sm:px-6">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                        hidden: { opacity: 0, y: 20 },
                    }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-snap-text-primary mb-4">
                        Everything you need to{" "}
                        <span className="gradient-text">study smarter</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-snap-text-secondary">
                        One upload, six powerful outputs. Transform any notes into comprehensive study materials.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            className="group glass-card p-5 md:p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_hsl(var(--snap-gradient-start)/0.2)] cursor-pointer"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-snap-text-primary mb-2">{feature.title}</h3>
                            <p className="text-sm md:text-base text-snap-text-secondary">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
