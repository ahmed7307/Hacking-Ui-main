import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import { FileText, BookOpen, Target, TrendingUp, Trophy, Shield, AlertTriangle } from 'lucide-react';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

export default function Home() {
  const features = [
    {
      title: 'Security Reports',
      description: 'Submit and track security vulnerabilities. Help make the platform safer for everyone.',
      icon: Shield,
    },
    {
      title: 'Expert Write-ups',
      description: 'Learn from detailed walkthroughs and solutions from top hackers.',
      icon: FileText,
    },
    {
      title: 'Security Blogs',
      description: 'Stay updated with the latest security trends, tools, and techniques.',
      icon: BookOpen,
    },
  ];

  const steps = [
    { title: 'Sign Up', description: 'Create your free account', icon: Target },
    { title: 'Submit Reports', description: 'Report security vulnerabilities and help improve security', icon: AlertTriangle },
    { title: 'Grow & Compete', description: 'Climb the leaderboard', icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />

        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Why Choose <span className="text-primary">Hacking Vidya</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to become a cybersecurity expert, all in one platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                How It <span className="text-primary">Works</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start your journey in three simple steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-primary/20 hover-elevate text-center h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="grid sm:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="w-8 h-8 text-primary mr-2" />
                    <span className="text-4xl font-bold">5,000+</span>
                  </div>
                  <p className="text-muted-foreground">Active Users</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="w-8 h-8 text-primary mr-2" />
                    <span className="text-4xl font-bold">150+</span>
                  </div>
                  <p className="text-muted-foreground">Security Reports</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="w-8 h-8 text-primary mr-2" />
                    <span className="text-4xl font-bold">500+</span>
                  </div>
                  <p className="text-muted-foreground">Write-ups</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}