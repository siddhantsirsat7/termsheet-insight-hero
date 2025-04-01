
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import WarningsSection from '@/components/results/WarningSection';
import InsightsSection from '@/components/results/InsightsSection';
import FinancialTermsSection from '@/components/results/FinancialTermsSection';
import LegalClausesSection from '@/components/results/LegalClausesSection';
import { toast } from 'sonner';

// Sample data
const mockWarnings = [
  {
    id: 1,
    severity: 'high',
    message: 'Missing mandatory clause for regulatory compliance',
    clause: 'Section 4.2 - Regulatory Compliance'
  },
  {
    id: 2,
    severity: 'medium',
    message: 'Ambiguous language in termination conditions',
    clause: 'Section 7.1 - Termination'
  },
  {
    id: 3,
    severity: 'low',
    message: 'Consider reviewing the interest calculation method',
    clause: 'Section 3.4 - Interest Calculation'
  }
] as const;

const mockInsights = [
  {
    id: 1,
    type: 'positive',
    message: 'The payment terms are favorable compared to industry standards.'
  },
  {
    id: 2,
    type: 'improvement',
    message: 'Consider strengthening the intellectual property protection clauses.'
  },
  {
    id: 3,
    type: 'information',
    message: 'This term sheet includes all standard clauses recommended for this type of agreement.'
  },
  {
    id: 4,
    type: 'positive',
    message: 'The exclusivity period is well-defined and reasonable.'
  }
] as const;

const mockFinancialData = {
  keyMetrics: [
    { name: 'Investment Amount', value: 5000000 },
    { name: 'Valuation Cap', value: 20000000 },
    { name: 'Discount Rate', value: 1500000 },
    { name: 'Interest Rate', value: 800000 },
    { name: 'Term Length', value: 2500000 }
  ],
  timeSeriesData: [
    { month: 'Jan', amount: 1000000 },
    { month: 'Feb', amount: 1200000 },
    { month: 'Mar', amount: 900000 },
    { month: 'Apr', amount: 1500000 },
    { month: 'May', amount: 2000000 },
    { month: 'Jun', amount: 2200000 }
  ],
  breakdownData: [
    { name: 'Principal', value: 5000000 },
    { name: 'Interest', value: 800000 },
    { name: 'Fees', value: 150000 },
    { name: 'Penalties', value: 50000 },
    { name: 'Discounts', value: 300000 }
  ]
};

const mockLegalClauses = [
  {
    id: 1,
    title: 'Anti-Money Laundering Provisions',
    content: 'Each party shall comply with all applicable anti-money laundering laws and regulations.',
    status: 'standard',
    category: 'regulatory'
  },
  {
    id: 2,
    title: 'Data Protection',
    content: 'The parties shall comply with all applicable data protection laws and regulations including but not limited to GDPR and CCPA.',
    status: 'non-standard',
    category: 'regulatory'
  },
  {
    id: 3,
    title: 'Sanctions Compliance',
    content: 'The parties shall ensure compliance with international sanctions regulations and maintain appropriate screening procedures.',
    status: 'missing',
    category: 'regulatory'
  },
  {
    id: 4,
    title: 'Board Appointment Rights',
    content: 'Investor shall have the right to appoint one member to the Board of Directors as long as they hold at least 10% of the outstanding shares.',
    status: 'standard',
    category: 'governance'
  },
  {
    id: 5,
    title: 'Voting Rights',
    content: 'Each holder of Preferred Shares shall be entitled to the number of votes equal to the number of shares of Common Stock into which such Preferred Shares could be converted.',
    status: 'standard',
    category: 'governance'
  },
  {
    id: 6,
    title: 'Drag-Along Rights',
    content: 'If holders of at least 75% of the outstanding shares approve a sale of the company, all shareholders will be required to participate in such transaction.',
    status: 'non-standard',
    category: 'governance'
  },
  {
    id: 7,
    title: 'Confidentiality',
    content: 'All parties shall maintain the confidentiality of any non-public information disclosed in connection with this agreement for a period of 5 years.',
    status: 'standard',
    category: 'operational'
  },
  {
    id: 8,
    title: 'Non-Compete',
    content: 'For a period of 2 years following termination, the parties agree not to engage in any competing business within the same geographic region.',
    status: 'non-standard',
    category: 'operational'
  },
  {
    id: 9,
    title: 'Assignment',
    content: 'This Agreement may not be assigned by either party without the prior written consent of the other party.',
    status: 'standard',
    category: 'operational'
  }
] as const;

const Results = () => {
  const navigate = useNavigate();

  const handleDownloadReport = () => {
    toast.success('Report download started');
    // In a real app, this would generate and download a PDF/Excel report
  };

  const handleShareReport = () => {
    toast.success('Sharing options opened');
    // In a real app, this would open sharing options
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <Button 
              variant="ghost" 
              className="mb-4 md:mb-0 p-0 h-auto font-normal text-theme-blue hover:text-theme-blue-light hover:bg-transparent"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </Button>
            <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
            <p className="text-gray-600 mt-1">Term Sheet Validation Report</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={handleDownloadReport}
              className="flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShareReport}
              className="flex items-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <WarningsSection warnings={mockWarnings} />
          <InsightsSection insights={mockInsights} />
          <FinancialTermsSection financialData={mockFinancialData} />
          <LegalClausesSection clauses={mockLegalClauses} />
        </div>
      </main>
    </div>
  );
};

export default Results;
