import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Target, Users, Award } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security and privacy of our users and their data.',
    },
    {
      icon: Target,
      title: 'Practical Learning',
      description: 'Hands-on experience through real-world scenarios and challenges.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by hackers, for hackers. Learn from and with the best.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in education and skill development.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-3xl font-bold mb-2">
              About <span className="text-primary">Hacking Vidya</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Learn about our mission and what we stand for
            </p>

            <div className="space-y-8">
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <h2 className="font-semibold text-2xl mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Hacking Vidya is dedicated to democratizing cybersecurity education by providing
                    accessible, hands-on learning experiences. We believe that anyone with the passion
                    and dedication can master the art of ethical hacking and cybersecurity.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Through our platform, we offer real-world CTF challenges, expert write-ups, and
                    comprehensive blogs that help aspiring security professionals develop practical
                    skills that are immediately applicable in the field.
                  </p>
                </CardContent>
              </Card>

              <div>
                <h2 className="font-semibold text-2xl mb-6">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="border-primary/20 h-full hover-elevate transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <value.icon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <h2 className="font-semibold text-2xl mb-4">What We Offer</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="font-medium text-foreground mb-2">200+ CTF Challenges</h3>
                      <p>
                        From beginner to advanced, covering web exploitation, forensics, cryptography,
                        reverse engineering, and more.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Expert Write-ups</h3>
                      <p>
                        Learn from detailed walkthroughs created by experienced security professionals
                        and top performers.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Educational Blogs</h3>
                      <p>
                        Stay updated with the latest security trends, tools, techniques, and best
                        practices in the industry.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Competitive Environment</h3>
                      <p>
                        Track your progress, earn XP, climb the leaderboard, and compete with fellow
                        learners globally.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <h2 className="font-semibold text-2xl mb-4">Join Our Community</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're a beginner taking your first steps into cybersecurity or an
                    experienced professional looking to sharpen your skills, Hacking Vidya provides
                    the resources, community, and challenges you need to succeed. Join thousands of
                    learners worldwide and start your journey today.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}