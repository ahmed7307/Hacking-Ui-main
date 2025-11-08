import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockReports } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'wouter';
import ReportCard from '@/components/ReportCard';
import { useMemo } from 'react';

// Simple code highlighter component matching screenshot style
function HighlightCode({ code }: { code: string }) {
  // Escape HTML first
  let highlighted = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Match comments first (before other replacements)
  highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span style="color: #6a9955;">$1</span>');
  
  // Match strings (single and double quotes)
  highlighted = highlighted.replace(/'([^']*)'/g, '<span style="color: #ce9178;">\'$1\'</span>');
  highlighted = highlighted.replace(/"([^"]*)"/g, '<span style="color: #ce9178;">"$1"</span>');
  
  // Match JavaScript keywords (const, let, var, etc.)
  highlighted = highlighted.replace(/\b(const|let|var|function|return|if|else|for|while|GET|POST|PUT|DELETE)\b/g, '<span style="color: #569cd6;">$1</span>');
  
  // Match property names and identifiers (like _proto_, command)
  highlighted = highlighted.replace(/\b(_proto_|command|payload|username|password)\b/g, '<span style="color: #4ec9b0;">$1</span>');
  
  // Match object property keys
  highlighted = highlighted.replace(/(\{)\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1<span style="color: #4ec9b0;">$2</span>:');
  
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
}

export default function ReportDetail() {
  const [, params] = useRoute('/reports/:id');
  const report = mockReports.find((r) => r.id === params?.id);

  // Get related reports (same category, excluding current report)
  const relatedReports = useMemo(() => {
    if (!report) return [];
    return mockReports
      .filter(
        (r) =>
          r.id !== report.id &&
          r.category === report.category &&
          r.status === 'approved'
      )
      .slice(0, 3);
  }, [report]);

  if (!report) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <main className="flex-1 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Report Not Found</h2>
              <p className="text-gray-400 mb-4">
                The report you're looking for doesn't exist.
              </p>
              <Link href="/reports">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-900">
                  Back to Reports
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header with Back Button and Bounty */}
            <div className="flex items-start justify-between mb-8">
              <Link href="/reports">
                <Button 
                  variant="ghost" 
                  className="text-blue-400 hover:text-blue-300 hover:bg-gray-900 p-0 h-auto"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Reports
                </Button>
              </Link>
              
              {report.bounty && (
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">Bounty Awarded</p>
                  <p className="text-2xl font-bold text-blue-400">{formatCurrency(report.bounty)}</p>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-6 text-white">{report.bugTitle}</h1>

            {/* Severity and CVE Badges */}
            <div className="flex items-center gap-3 mb-8">
              <Badge 
                className={`px-3 py-1 text-sm font-semibold ${
                  report.severity === 'Critical' 
                    ? 'bg-red-600 text-white border-red-600' 
                    : report.severity === 'High'
                    ? 'bg-orange-600 text-white border-orange-600'
                    : report.severity === 'Medium'
                    ? 'bg-yellow-600 text-white border-yellow-600'
                    : 'bg-blue-600 text-white border-blue-600'
                }`}
              >
                {report.severity} Severity
              </Badge>
              {report.cveId && (
                <Badge className="px-3 py-1 text-sm font-semibold bg-gray-800 text-white border-gray-700">
                  {report.cveId}
                </Badge>
              )}
            </div>

            {/* Metadata */}
            <div className="mb-8 space-y-2 text-sm">
              <div className="flex flex-wrap items-center gap-6">
                {report.reporterName && (
                  <div>
                    <span className="text-gray-400">Reporter: </span>
                    <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                      {report.reporterName}
                    </span>
                  </div>
                )}
                {report.organization && (
                  <div>
                    <span className="text-gray-400">Company: </span>
                    <span className="text-white">{report.organization}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400">Disclosed: </span>
                  <span className="text-white">{formatDate(report.submittedDate)}</span>
                </div>
                {report.program && (
                  <div>
                    <span className="text-gray-400">Program: </span>
                    <span className="text-white">{report.program}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold">Summary</h2>
              </div>
              <div className="border-t border-gray-800 pt-4">
                <p className="text-gray-300 leading-relaxed">{report.summary}</p>
              </div>
            </section>

            {/* Description Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="border-t border-gray-800 pt-4">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {report.description}
                </p>
              </div>
            </section>

            {/* Steps to Reproduce Section */}
            {report.stepsToReproduce && report.stepsToReproduce.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Steps to Reproduce</h2>
                <div className="border-t border-gray-800 pt-4">
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    {report.stepsToReproduce.map((step, index) => (
                      <li key={index} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )}

            {/* Impact Analysis Section */}
            {report.impactAnalysis && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Impact Analysis</h2>
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-gray-300 leading-relaxed">
                    {report.impactAnalysis}
                  </p>
                </div>
              </section>
            )}

            {/* Proof of Concept Section */}
            {report.proofOfConcept && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Proof of Concept</h2>
                <div className="border-t border-gray-800 pt-4">
                  <pre className="bg-[#1e1e2e] border border-gray-800 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-gray-200">
                      <HighlightCode code={report.proofOfConcept} />
                    </code>
                  </pre>
                </div>
              </section>
            )}

            {/* Related Reports */}
            {relatedReports.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-800">
                <h2 className="text-2xl font-bold mb-6">
                  Related <span className="text-blue-400">Reports</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedReports.map((relatedReport) => (
                    <ReportCard key={relatedReport.id} {...relatedReport} />
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
