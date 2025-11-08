import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReportCard from '@/components/ReportCard';
import { mockReports, type Report } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type SortOption = 'newest' | 'oldest' | 'severity-high' | 'severity-low' | 'title-asc' | 'title-desc';

export default function ReportList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedOrganization, setSelectedOrganization] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const categories = useMemo(() => {
    const cats = Array.from(new Set(mockReports.map(r => r.category))).sort();
    return cats;
  }, []);

  const years = useMemo(() => {
    const yrs = Array.from(new Set(mockReports.map(r => r.year))).sort((a, b) => b - a);
    return yrs;
  }, []);

  const organizations = useMemo(() => {
    const orgs = Array.from(new Set(mockReports.map(r => r.organization))).sort();
    return orgs;
  }, []);

  // Filter and search reports
  const filteredReports = useMemo(() => {
    let filtered = mockReports.filter((report) => {
      // Only show approved reports
      if (report.status !== 'approved') return false;

      // Category filter
      if (selectedCategory !== 'All' && report.category !== selectedCategory) return false;

      // Year filter
      if (selectedYear !== 'All' && report.year !== parseInt(selectedYear)) return false;

      // Organization filter
      if (selectedOrganization !== 'All' && report.organization !== selectedOrganization) return false;

      // Severity filter
      if (selectedSeverity !== 'All' && report.severity !== selectedSeverity) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          report.bugTitle.toLowerCase().includes(query) ||
          report.description.toLowerCase().includes(query) ||
          report.summary.toLowerCase().includes(query) ||
          report.category.toLowerCase().includes(query) ||
          report.organization.toLowerCase().includes(query) ||
          report.tags?.some(tag => tag.toLowerCase().includes(query)) ||
          report.cveId?.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      return true;
    });

    // Sort reports
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
        case 'oldest':
          return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
        case 'severity-high':
          const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        case 'severity-low':
          const severityOrderLow = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return severityOrderLow[a.severity] - severityOrderLow[b.severity];
        case 'title-asc':
          return a.bugTitle.localeCompare(b.bugTitle);
        case 'title-desc':
          return b.bugTitle.localeCompare(a.bugTitle);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedYear, selectedOrganization, selectedSeverity, sortBy]);

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedYear !== 'All',
    selectedOrganization !== 'All',
    selectedSeverity !== 'All',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedYear('All');
    setSelectedOrganization('All');
    setSelectedSeverity('All');
    setSearchQuery('');
  };

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
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-bold mb-2">
                Security <span className="text-primary">Reports</span>
              </h1>
              <p className="text-muted-foreground">
                Browse through security research reports and vulnerability disclosures
              </p>
            </div>

            {/* Search and Sort Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search reports by title, description, CVE, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="severity-high">Severity: High to Low</SelectItem>
                    <SelectItem value="severity-low">Severity: Low to High</SelectItem>
                    <SelectItem value="title-asc">Title: A-Z</SelectItem>
                    <SelectItem value="title-desc">Title: Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Filters</CardTitle>
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="gap-2"
                        >
                          <X className="w-4 h-4" />
                          Clear All
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All Categories</SelectItem>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Year</label>
                        <Select
                          value={selectedYear}
                          onValueChange={setSelectedYear}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Years" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All Years</SelectItem>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Organization</label>
                        <Select
                          value={selectedOrganization}
                          onValueChange={setSelectedOrganization}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Organizations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All Organizations</SelectItem>
                            {organizations.map((org) => (
                              <SelectItem key={org} value={org}>
                                {org}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Severity</label>
                        <Select
                          value={selectedSeverity}
                          onValueChange={setSelectedSeverity}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Severities" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All Severities</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredReports.length}</span> report{filteredReports.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Reports Grid */}
            {filteredReports.length === 0 ? (
              <Card className="border-primary/20 p-12 text-center">
                <p className="text-muted-foreground text-lg mb-2">No reports found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                {activeFiltersCount > 0 && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <ReportCard {...report} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

