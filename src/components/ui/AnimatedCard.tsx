import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hover?: boolean;
  whileHover?: any;
}

export const AnimatedCard = ({
  children,
  delay = 0,
  className = '',
  hover = true,
  whileHover,
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
      whileHover={hover ? whileHover || { y: -4, scale: 1.02 } : undefined}
      className={className}
    >
      <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
        {children}
      </Card>
    </motion.div>
  );
};
