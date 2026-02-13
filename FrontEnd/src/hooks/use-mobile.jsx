import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(undefined);

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isMobile;
}

export function useIsTablet() {
    const [isTablet, setIsTablet] = React.useState(undefined);

    React.useEffect(() => {
        const checkTablet = () => {
            const width = window.innerWidth;
            setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT);
        };

        const mql = window.matchMedia(
            `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`
        );

        mql.addEventListener("change", checkTablet);
        checkTablet();
        return () => mql.removeEventListener("change", checkTablet);
    }, []);

    return isTablet;
}

// Combined hook: returns true for both mobile AND tablet (devices that should show mobile nav)
export function useIsMobileOrTablet() {
    const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(undefined);

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
        const onChange = () => {
            setIsMobileOrTablet(window.innerWidth < TABLET_BREAKPOINT);
        };
        mql.addEventListener("change", onChange);
        setIsMobileOrTablet(window.innerWidth < TABLET_BREAKPOINT);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isMobileOrTablet;
}
