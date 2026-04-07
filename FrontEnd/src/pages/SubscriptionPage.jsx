import { useState } from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../components/subscription/PricingCard';
import { tiers } from '../lib/utils';

export default function SubscriptionPage() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="min-h-[80vh] flex flex-col items-center pt-8 pb-20 relative">
            {/* Background elements for premium aesthetic */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-snap-cyan/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-snap-mint/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12 relative z-10"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-snap-cyan via-snap-mint to-snap-gold bg-clip-text text-transparent pb-1">
                    Choose Your Plan
                </h1>
                <p className="text-snap-text-muted max-w-2xl mx-auto text-lg px-4">
                    Unlock the full potential of your learning with flexible plans designed for every type of student.
                </p>
            </motion.div>

            {/* Toggle Switch */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center gap-2 mb-16 bg-white/2 p-1.5 rounded-full border border-white/10 relative z-10 shadow-lg"
            >
                <div 
                    className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-white/10 rounded-full transition-transform duration-300 ease-out ${isYearly ? 'translate-x-full' : 'translate-x-0'}`}
                />
                
                <button 
                    onClick={() => setIsYearly(false)}
                    className={`relative w-32 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${!isYearly ? 'text-white' : 'text-snap-text-muted hover:text-white/80'}`}
                >
                    Monthly
                </button>
                <button 
                    onClick={() => setIsYearly(true)}
                    className={`relative w-40 py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-300 ${isYearly ? 'text-white' : 'text-snap-text-muted flex-row hover:text-white/80'}`}
                >
                    Yearly
                    <span className="text-[10px] bg-linear-to-r from-snap-cyan to-snap-mint text-snap-bg-main px-2 py-0.5 rounded-full font-bold shadow-md transform -translate-y-px">
                        SAVE 16%
                    </span>
                </button>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4 relative z-10 items-stretch">
                {tiers.map((tier, idx) => (
                    <motion.div
                        key={tier.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * idx + 0.3 }}
                        className={`h-full ${tier.popular ? 'lg:-mt-4 lg:mb-4 relative z-20' : 'relative z-10'}`}
                    >
                        <PricingCard tier={tier} isYearly={isYearly} />
                    </motion.div>
                ))}
            </div>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-16 text-snap-text-muted text-sm text-center max-w-xl"
            >
                Questions about our plans? Contact our support team for help choosing the right tier. 
                Prices are displayed in INR and inclusive of applicable taxes.
            </motion.p>
        </div>
    );
}
