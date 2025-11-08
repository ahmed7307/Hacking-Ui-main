import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
          >
            <h1 className="font-serif text-3xl font-bold mb-2">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-muted-foreground mb-8">Last updated: October 31, 2024</p>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-foreground font-semibold text-xl mb-3">Introduction</h2>
                <p>
                  Welcome to Hacking Vidya. We respect your privacy and are committed to protecting your personal data.
                  This privacy policy will inform you about how we look after your personal data and tell you about your
                  privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-xl mb-3">Information We Collect</h2>
                <p>We may collect, use, store, and transfer different kinds of personal data about you:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Identity Data: username, email address</li>
                  <li>Technical Data: IP address, browser type, device information</li>
                  <li>Usage Data: how you use our platform, CTF progress, XP earned</li>
                  <li>Profile Data: avatar, bio, preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-xl mb-3">How We Use Your Information</h2>
                <p>We use your personal data for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>To provide and maintain our service</li>
                  <li>To manage your account and provide customer support</li>
                  <li>To track your progress and display your achievements</li>
                  <li>To send you updates about new features and challenges</li>
                  <li>To improve our platform and user experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-xl mb-3">Data Security</h2>
                <p>
                  We have implemented appropriate security measures to prevent your personal data from being accidentally
                  lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees
                  and partners who have a business need to know.
                </p>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-xl mb-3">Your Rights</h2>
                <p>Under data protection laws, you have rights including:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>The right to access your personal data</li>
                  <li>The right to correct inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to object to processing of your data</li>
                  <li>The right to data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-xl mb-3">Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our platform and store certain
                  information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                  sent.
                </p>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-xl mb-3">Third-Party Links</h2>
                <p>
                  Our platform may include links to third-party websites, plugins, and applications. Clicking on those
                  links may allow third parties to collect or share data about you. We do not control these third-party
                  websites and are not responsible for their privacy statements.
                </p>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-xl mb-3">Changes to This Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-foreground font-semibold text-xl mb-3">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at privacy@hackingvidya.com
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}