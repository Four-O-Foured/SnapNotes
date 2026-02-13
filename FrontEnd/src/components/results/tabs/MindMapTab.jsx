const MindMapTab = () => {
  const nodes = [
    { id: "center", label: "Machine Learning", x: 50, y: 50 },
    { id: "supervised", label: "Supervised", x: 20, y: 25 },
    { id: "unsupervised", label: "Unsupervised", x: 80, y: 25 },
    { id: "reinforcement", label: "Reinforcement", x: 50, y: 15 },
    { id: "regression", label: "Regression", x: 10, y: 45 },
    { id: "classification", label: "Classification", x: 25, y: 55 },
    { id: "clustering", label: "Clustering", x: 75, y: 45 },
    { id: "dimensionality", label: "Dim. Reduction", x: 90, y: 55 },
    { id: "qlearning", label: "Q-Learning", x: 40, y: 5 },
    { id: "policy", label: "Policy Gradient", x: 60, y: 5 },
  ];

  const connections = [
    { from: "center", to: "supervised" },
    { from: "center", to: "unsupervised" },
    { from: "center", to: "reinforcement" },
    { from: "supervised", to: "regression" },
    { from: "supervised", to: "classification" },
    { from: "unsupervised", to: "clustering" },
    { from: "unsupervised", to: "dimensionality" },
    { from: "reinforcement", to: "qlearning" },
    { from: "reinforcement", to: "policy" },
  ];

  const getNodePosition = (id) => {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
  };

  return (
    <div className="glass-card p-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
      <div className="aspect-16/10 relative">
        <svg className="w-full h-full" viewBox="0 0 100 70">
          {/* Connections */}
          {connections.map((conn, i) => {
            const from = getNodePosition(conn.from);
            const to = getNodePosition(conn.to);
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="url(#lineGradient)"
                strokeWidth="0.3"
                className="opacity-40"
              />
            );
          })}

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(252, 100%, 69%)" />
              <stop offset="100%" stopColor="hsl(195, 100%, 67%)" />
            </linearGradient>
          </defs>

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id} className="cursor-pointer group">
              <circle
                cx={node.x}
                cy={node.y}
                r={node.id === "center" ? 6 : 4}
                className={
                  node.id === "center"
                    ? "fill-primary"
                    : "fill-snap-bg-panel stroke-primary stroke-[0.3]"
                }
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.id === "center" ? 8 : 5}
                className="fill-transparent stroke-primary/30 stroke-[0.2] opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <text
                x={node.x}
                y={node.y + (node.id === "center" ? 10 : 7)}
                textAnchor="middle"
                className="fill-snap-text-secondary text-[2.5px] font-medium"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-[12px] text-snap-text-muted">
        <span>Click and drag nodes to rearrange</span>
        <span>•</span>
        <span>Scroll to zoom</span>
      </div>
    </div>
  );
};

export default MindMapTab;
