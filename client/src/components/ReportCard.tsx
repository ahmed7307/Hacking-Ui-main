import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, Building2, Download, Shield, Network, Smartphone, Cloud, Cpu, Key, Bug } from 'lucide-react';
import { Link } from 'wouter';
import type { Report } from '@/lib/mockData';

interface ReportCardProps extends Report {
  showCategory?: boolean;
  showOrganization?: boolean;
}

const severityColors = {
  Low: 'bg-blue-500/20 text-blue-500 border-blue-500/40',
  Medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40',
  High: 'bg-orange-500/20 text-orange-500 border-orange-500/40',
  Critical: 'bg-destructive/20 text-destructive border-destructive/40',
};

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/40',
  approved: 'bg-primary/20 text-primary border-primary/40',
  rejected: 'bg-destructive/20 text-destructive border-destructive/40',
};

const categoryIcons: Record<string, any> = {
  'Web Security': Shield,
  'Network Security': Network,
  'Mobile Security': Smartphone,
  'Cloud Security': Cloud,
  'IoT Security': Cpu,
  'Cryptography': Key,
  'Malware Analysis': Bug,
  'Social Engineering': AlertTriangle,
};

const categoryColors: Record<string, string> = {
  'Web Security': 'text-cyan-500',
  'Network Security': 'text-teal-500',
  'Mobile Security': 'text-blue-500',
  'Cloud Security': 'text-indigo-500',
  'IoT Security': 'text-purple-500',
  'Cryptography': 'text-emerald-500',
  'Malware Analysis': 'text-red-500',
  'Social Engineering': 'text-orange-500',
};

export default function ReportCard({ 
  id, 
  bugTitle, 
  description, 
  severity, 
  status, 
  submittedDate,
  category,
  organization,
  year,
  downloadLinks,
  showCategory = true,
  showOrganization = true,
}: ReportCardProps) {
  const CategoryIcon = categoryIcons[category] || Shield;
  const categoryColor = categoryColors[category] || 'text-primary';

  return (
    <Link href={`/reports/${id}`}>
      <a data-testid={`card-report-${id}`}>
        <Card className="border-primary/20 hover-elevate transition-all duration-300 h-full flex flex-col group">
          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={severityColors[severity]}>
                  {severity}
                </Badge>
                {status === 'approved' && (
                  <Badge variant="outline" className={statusColors[status]}>
                    {status}
                  </Badge>
                )}
              </div>
              {showCategory && category && (
                <div className={`flex items-center gap-1 ${categoryColor}`}>
                  <CategoryIcon className="w-4 h-4" />
                </div>
              )}
            </div>
            <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {bugTitle}
            </CardTitle>
            <CardDescription className="line-clamp-3 text-sm">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
                {showOrganization && organization && (
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span className="truncate max-w-[120px]">{organization}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{year}</span>
                </div>
              </div>
              {category && showCategory && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                </div>
              )}
              {downloadLinks && downloadLinks.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-3 h-3" />
                  <span>{downloadLinks.length} file{downloadLinks.length > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}

