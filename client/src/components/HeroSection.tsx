import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import TerminalTyping from './TerminalTyping';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Level Up Your{' '}
              <span className="text-primary animate-glow-pulse">Hacking Skills</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Master cybersecurity through hands-on CTF challenges, expert write-ups, and
              comprehensive blogs. Join the elite hacker community and sharpen your skills.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" className="shadow-neon" data-testid="button-hero-start">
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
             
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TerminalTyping />
          </motion.div>
        </div>
      </div>
    </section>
  );
}