import { motion } from "framer-motion";

const keyTerms = [
  {
    term: "Algorithm",
    definition: "A set of rules or instructions followed by a computer to solve a problem or perform a calculation.",
    category: "Core Concepts",
  },
  {
    term: "Training Data",
    definition: "The dataset used to teach a machine learning model, containing examples the model learns from.",
    category: "Data",
  },
  {
    term: "Features",
    definition: "Input variables or attributes used by a model to make predictions.",
    category: "Data",
  },
  {
    term: "Model",
    definition: "A mathematical representation of a real-world process, learned from training data.",
    category: "Core Concepts",
  },
  {
    term: "Overfitting",
    definition: "When a model learns the training data too well, including noise, leading to poor generalization.",
    category: "Problems",
  },
  {
    term: "Hyperparameters",
    definition: "Configuration settings used to control the learning process, set before training begins.",
    category: "Training",
  },
];

const categoryColors = {
  "Core Concepts": "bg-primary/10 text-primary",
  "Data": "bg-snap-cyan/10 text-snap-cyan",
  "Problems": "bg-snap-coral/10 text-snap-coral",
  "Training": "bg-snap-mint/10 text-snap-mint",
};

const KeyTermsTab = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {keyTerms.map((item) => (
        <motion.div
          key={item.term}
          className="glass-card p-5 hover:border-primary/30 cursor-pointer group transition-all duration-300 hover-lift"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h4 className="text-body font-semibold text-snap-text-primary group-hover:text-primary transition-colors">{item.term}</h4>
            <motion.span
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${categoryColors[item.category]}`}
              whileHover={{ scale: 1.1 }}
            >
              {item.category}
            </motion.span>
          </div>
          <p className="text-small text-snap-text-secondary leading-relaxed group-hover:text-snap-text-primary transition-colors">{item.definition}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default KeyTermsTab;
