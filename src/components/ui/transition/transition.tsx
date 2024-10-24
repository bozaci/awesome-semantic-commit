'use client';

import { useRef, FC } from 'react';
import { TransitionProps } from './transition.type';
import { motion, useInView } from 'framer-motion';

const Transition: FC<TransitionProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: -3, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
