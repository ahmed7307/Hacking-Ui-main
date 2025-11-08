import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'What is Hacking Vidya?',
      answer: 'Hacking Vidya is a cybersecurity learning platform that offers hands-on CTF challenges, expert write-ups, and comprehensive blogs to help you master ethical hacking and penetration testing skills.',
    },
    {
      question: 'How do I get started with CTF challenges?',
      answer: 'Create a free account, browse our CTF challenges, and select one that matches your skill level. Each challenge includes a description, difficulty rating, and hints to help you along the way.',
    },
    {
      question: 'What is the Hall of Fame?',
      answer: 'The Hall of Fame recognizes security researchers who have responsibly disclosed valid security vulnerabilities on our platform. Accepted reports may earn rewards and public recognition.',
    },
    {
      question: 'How does the XP system work?',
      answer: 'You earn XP by completing CTF challenges, publishing write-ups, and contributing to the community. XP determines your rank and position on the leaderboard.',
    },
    {
      question: 'Can I submit my own write-ups?',
      answer: 'Yes! Once you complete a challenge, you can publish your write-up to help other learners. Quality write-ups earn you additional XP and community recognition.',
    },
    {
      question: 'Is Hacking Vidya free to use?',
      answer: 'Yes, Hacking Vidya is completely free. All challenges, write-ups, and learning resources are available to registered users at no cost.',
    },
    {
      question: 'How do I report a security vulnerability?',
      answer: 'If you discover a security issue on our platform, please use the bug bounty submission form in your profile. We take all reports seriously and respond within 48 hours.',
    },
    {
      question: 'What difficulty levels are available?',
      answer: 'Challenges are categorized as Easy, Medium, or Hard. Start with Easy challenges if you\'re new to CTFs, and work your way up as you gain experience.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-3xl font-bold mb-2">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Find answers to common questions about Hacking Vidya
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-primary/20 rounded-lg px-6 bg-card"
                  data-testid={`accordion-faq-${index}`}
                >
                  <AccordionTrigger className="hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}