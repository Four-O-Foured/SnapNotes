import toast from 'react-hot-toast';

const styles = {
    container: "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 pointer-events-auto min-w-[300px]",
    success: "bg-snap-bg-panel/90 border border-snap-cyan/30 text-snap-text-primary shadow-snap-cyan/10",
    error: "bg-snap-bg-panel/90 border border-snap-coral/30 text-snap-text-primary shadow-snap-coral/10",
    iconContainer: "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/5",
    successIcon: "text-snap-cyan",
    errorIcon: "text-snap-coral",
    message: "text-sm font-medium",
};

const SuccessIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const ErrorIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const showToast = {
    success: (message) =>
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
                ${styles.container} ${styles.success}`}
            >
                <div className={`${styles.iconContainer} ${styles.successIcon}`}>
                    <SuccessIcon />
                </div>
                <p className={styles.message}>{message}</p>
            </div>
        )),

    error: (message) =>
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
                ${styles.container} ${styles.error}`}
            >
                <div className={`${styles.iconContainer} ${styles.errorIcon}`}>
                    <ErrorIcon />
                </div>
                <p className={styles.message}>{message}</p>
            </div>
        )),
};
