import { useState, useEffect } from 'react';

const commands = [
  'nmap -sC -sV target.htb',
  'gobuster dir -u http://target.htb -w /usr/share/wordlists/common.txt',
  'sqlmap -u "http://target.htb/login.php" --batch',
  'hydra -l admin -P rockyou.txt target.htb ssh',
  'john --wordlist=rockyou.txt hash.txt',
  'rm -rf /*',
];

export default function TerminalTyping() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const command = commands[currentCommandIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText.length < command.length) {
        setCurrentText(command.substring(0, currentText.length + 1));
      } else if (!isDeleting && currentText.length === command.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText.length > 0) {
        setCurrentText(command.substring(0, currentText.length - 1));
      } else if (isDeleting && currentText.length === 0) {
        setIsDeleting(false);
        setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentCommandIndex]);

  return (
    <div className="bg-card border border-primary/20 rounded-lg p-6 font-mono text-sm shadow-neon">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-destructive"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-primary"></div>
      </div>
      <div className="space-y-2">
        <div className="text-primary">
          <span style={{ color: 'red' }}>hacking@vidya:~# </span><span className="text-foreground">{currentText}</span>
          <span className="inline-block w-2 h-4 bg-primary ml-1 animate-terminal-blink"></span>
        </div>
      </div>
    </div>
  );
}