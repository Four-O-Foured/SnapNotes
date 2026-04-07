import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils.jsx';

export default function PricingCard({ tier, isYearly }) {
    const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
    
    return (
        <motion.div
            whileHover={{ y: tier.current ? 0 : -8, transition: { duration: 0.3 } }}
            className={cn(
                "relative h-full flex flex-col p-8 rounded-3xl border bg-snap-bg-main/50 backdrop-blur-md shadow-2xl transition-all duration-300",
                tier.popular ? "border-snap-cyan shadow-[0_0_40px_rgba(var(--snap-cyan),0.1)]" : "border-snap-text-muted/20 hover:border-snap-text-muted/40"
            )}
        >
            {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-linear-to-r from-snap-cyan to-snap-mint text-snap-bg-main text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                        Most Popular
                    </span>
                </div>
            )}
            
            <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-snap-text-muted text-sm min-h-[40px] leading-relaxed">{tier.description}</p>
            </div>
            
            <div className="mb-8 p-4 bg-white/2 rounded-2xl border border-white/5">
                <div className="flex items-end gap-1">
                    <span className="text-5xl font-extrabold text-white">
                        {price === 0 ? 'Free' : `₹${price}`}
                    </span>
                    {price !== 0 && (
                        <span className="text-snap-text-muted mb-2 font-medium">
                            /{isYearly ? 'year' : 'month'}
                        </span>
                    )}
                </div>
            </div>
            
            <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 bg-snap-cyan/20 p-0.5 rounded-full text-snap-cyan shrink-0">
                            <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
                    </li>
                ))}
            </ul>
            
            <button
                className={cn(
                    "w-full py-4 rounded-xl font-bold transition-all duration-300 mt-auto",
                    tier.current
                        ? "bg-snap-text-muted/10 text-snap-text-muted cursor-default border border-snap-text-muted/20"
                        : tier.popular
                            ? "bg-linear-to-r from-snap-cyan to-snap-mint text-snap-bg-main hover:opacity-90 hover:shadow-[0_0_20px_rgba(var(--snap-cyan),0.3)] hover:scale-[1.02]"
                            : "bg-white text-snap-bg-main hover:bg-white/90 hover:scale-[1.02]"
                )}
            >
                {tier.current ? 'Current Plan' : tier.buttonText}
            </button>
        </motion.div>
    );
}
