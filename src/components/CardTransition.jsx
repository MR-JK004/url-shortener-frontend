import React from 'react';
import { motion } from 'framer-motion';

const CardTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default CardTransition;
