import { Link } from 'wouter';
import { Terminal, Github } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-primary animate-glow-pulse" />
              <span className="font-serif text-lg font-bold">
                Hacking <span className="text-primary">Vidya</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Level up your hacking skills with hands-on CTF challenges and expert guidance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ctfs">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-ctfs">
                    CTF Challenges
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blogs">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-blogs">
                    Blogs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/leaderboard">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-leaderboard">
                    Leaderboard
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/halloffame">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-halloffame">
                    Hall of Fame
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-faq">
                    FAQ
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-contact">
                    Contact
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-privacy">
                    Privacy Policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="flex gap-4">
              <a
                href="https://discord.gg/hackingvidya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Discord"
                data-testid="link-footer-discord"
              >
                <SiDiscord className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/hackingvidhya6523/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
                data-testid="link-footer-github"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Hacking Vidya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}