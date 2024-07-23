'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export default function ImageGrid({ images }: { images: any[] }) {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-7"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {images.map((src: string, index: number) => (
        <motion.div key={index} variants={itemVariants}>
          <Image 
            src={src} 
            width={300} 
            height={300} 
            alt={`Example Image ${index + 1}`} 
            className="rounded-lg" 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}