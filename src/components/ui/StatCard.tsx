import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  delay?: number;
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className = '',
  delay = 0,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={className}
    >
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold tracking-tight">{value}</p>
                {trend && (
                  <span
                    className={`text-sm font-medium ${
                      trend.value > 0 ? 'text-success' : 'text-error'
                    }`}
                  >
                    {trend.value > 0 ? '+' : ''}
                    {trend.value}%
                  </span>
                )}
              </div>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
              {trend && (
                <p className="text-xs text-muted-foreground">{trend.label}</p>
              )}
            </div>

            {icon && (
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {icon}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      </Card>
    </motion.div>
  );
};
