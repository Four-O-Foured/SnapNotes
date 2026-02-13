import { useEffect, useRef } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export const useScrollAnimation = (once = true) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once, amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [inView, controls, once]);

  return { ref, controls };
};
