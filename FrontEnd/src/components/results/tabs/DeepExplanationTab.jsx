const DeepExplanationTab = () => {
  return (
    <div className="glass-card p-8 space-y-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
      <div className="space-y-4">
        <h3 className="text-h3 text-snap-text-primary">Understanding Machine Learning</h3>
        
        <p className="text-body text-snap-text-secondary leading-relaxed">
          Machine learning represents a fundamental shift in how we approach problem-solving with computers. 
          Instead of explicitly programming rules, we allow algorithms to{" "}
          <span className="text-snap-cyan font-medium">learn patterns from data</span>.
        </p>

        <p className="text-body text-snap-text-secondary leading-relaxed">
          This paradigm is particularly powerful because it can handle{" "}
          <span className="text-snap-cyan font-medium">complex, high-dimensional problems</span>{" "}
          that would be nearly impossible to solve with traditional programming approaches.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-body font-semibold text-snap-text-primary">The Learning Process</h4>
        
        <p className="text-body text-snap-text-secondary leading-relaxed">
          At its core, machine learning involves three key steps:
        </p>

        <ul className="space-y-3">
          {[
            "Data Collection: Gathering relevant, high-quality training examples",
            "Model Training: Adjusting parameters to minimize prediction errors",
            "Evaluation: Testing the model on unseen data to measure performance"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-small text-snap-text-secondary">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary text-[12px] font-semibold">{i + 1}</span>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 rounded-xl bg-snap-bg-panel border border-border/50">
        <p className="text-small text-snap-text-muted italic">
          💡 <span className="text-snap-gold">Key Insight:</span> The quality of your training data often matters more than the complexity of your algorithm.
        </p>
      </div>
    </div>
  );
};

export default DeepExplanationTab;
