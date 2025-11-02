import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  CheckSquare,
  Clock,
  Plus,
  ArrowRight,
  Activity,
  Target,
  Zap,
  MessageSquare,
} from 'lucide-react';

import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { MobileNav } from '@/components/layout/MobileNav';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useDarkMode } from '@/hooks/useDarkMode';

// Mock data
const stats = [
  {
    title: 'Total Revenue',
    value: '₦2.4M',
    description: 'This month',
    icon: <DollarSign className="w-5 h-5" />,
    trend: { value: 12.5, label: 'vs last month' },
  },
  {
    title: 'Active Projects',
    value: 24,
    description: 'In progress',
    icon: <BarChart3 className="w-5 h-5" />,
    trend: { value: 8.2, label: 'vs last month' },
  },
  {
    title: 'Team Members',
    value: 12,
    description: 'Active users',
    icon: <Users className="w-5 h-5" />,
    trend: { value: 4.1, label: 'vs last month' },
  },
  {
    title: 'Tasks Completed',
    value: 89,
    description: 'This week',
    icon: <CheckSquare className="w-5 h-5" />,
    trend: { value: 15.3, label: 'vs last week' },
  },
];

const quickActions = [
  {
    title: 'New Project',
    description: 'Start a new project',
    icon: <Plus className="w-5 h-5" />,
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'View Reports',
    description: 'Check analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Team Chat',
    description: 'Message your team',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'bg-success/10 text-success',
  },
  {
    title: 'Schedule Meeting',
    description: 'Book a meeting',
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-warning/10 text-warning',
  },
  {
    title: 'View Tasks',
    description: 'Manage your tasks',
    icon: <CheckSquare className="w-5 h-5" />,
    color: 'bg-error/10 text-error',
  },
  {
    title: 'Quick Settings',
    description: 'Adjust preferences',
    icon: <Target className="w-5 h-5" />,
    color: 'bg-primary/10 text-primary',
  },
];

const activities = [
  {
    user: 'Sarah Johnson',
    action: 'completed task',
    target: 'User authentication flow',
    time: '2 minutes ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  },
  {
    user: 'Mike Chen',
    action: 'created project',
    target: 'Mobile app redesign',
    time: '15 minutes ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
  },
  {
    user: 'Emma Davis',
    action: 'updated status',
    target: 'API documentation',
    time: '1 hour ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
  },
  {
    user: 'Alex Rodriguez',
    action: 'commented on',
    target: 'Dashboard wireframes',
    time: '2 hours ago',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  },
];

const tasks = [
  {
    id: 1,
    title: 'Review design mockups',
    status: 'completed',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Update user documentation',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Fix mobile responsiveness',
    status: 'pending',
    priority: 'high',
  },
  { id: 4, title: 'Implement dark mode', status: 'pending', priority: 'low' },
  {
    id: 5,
    title: 'Add loading states',
    status: 'completed',
    priority: 'medium',
  },
];

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDark, toggleTheme } = useDarkMode();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        className={sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'}
      />

      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
        }`}
      >
        <TopBar
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        <main className="pb-16 lg:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {getGreeting()}, Adejoju! 👋
              </h1>
              <p className="text-lg text-muted-foreground">
                Here's what's happening with your projects today.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  icon={stat.icon}
                  trend={stat.trend}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Activity Feed & Quick Actions */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Actions */}
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {quickActions.map((action, index) => (
                        <motion.button
                          key={action.title}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all duration-200 text-left group ${action.color}`}
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${action.color}`}
                          >
                            {action.icon}
                          </div>
                          <h3 className="font-semibold text-sm mb-1">
                            {action.title}
                          </h3>
                          <p className="text-xs opacity-80">
                            {action.description}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </AnimatedCard>

                {/* Activity Feed */}
                <AnimatedCard delay={0.2}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={activity.avatar} />
                            <AvatarFallback>{activity.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-medium">
                                {activity.user}
                              </span>{' '}
                              <span className="text-muted-foreground">
                                {activity.action}
                              </span>{' '}
                              <span className="font-medium text-primary">
                                {activity.target}
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activity.time}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </AnimatedCard>
              </div>

              {/* Right Column - Tasks & Chart */}
              <div className="space-y-8">
                {/* Tasks Board */}
                <AnimatedCard delay={0.3}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckSquare className="w-5 h-5" />
                      Today's Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              task.status === 'completed'
                                ? 'bg-success'
                                : task.status === 'in-progress'
                                ? 'bg-primary'
                                : 'bg-muted'
                            }`}
                          />
                          <div className="flex-1">
                            <p
                              className={`text-sm ${
                                task.status === 'completed'
                                  ? 'line-through text-muted-foreground'
                                  : ''
                              }`}
                            >
                              {task.title}
                            </p>
                          </div>
                          <Badge
                            variant={
                              task.priority === 'high'
                                ? 'destructive'
                                : task.priority === 'medium'
                                ? 'default'
                                : 'secondary'
                            }
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </AnimatedCard>

                {/* Performance Chart Placeholder */}
                <AnimatedCard delay={0.4}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center bg-muted/20 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Chart visualization
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Coming soon with Recharts
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button className="w-full gradient-primary" size="lg">
                    View Analytics
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <MobileNav />
      </div>
    </div>
  );
};

export default Dashboard;
