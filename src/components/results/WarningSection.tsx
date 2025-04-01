
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface Warning {
  id: number;
  severity: 'high' | 'medium' | 'low';
  message: string;
  clause: string;
}

interface WarningsSectionProps {
  warnings: Warning[];
}

const WarningsSection: React.FC<WarningsSectionProps> = ({ warnings }) => {
  const renderSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="analysis-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
          Warnings and Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {warnings.length === 0 ? (
            <div className="text-center p-6">
              <p className="text-gray-500">No warnings found in the document.</p>
            </div>
          ) : (
            warnings.map((warning) => (
              <div 
                key={warning.id} 
                className={`border rounded-md p-4 ${getSeverityClass(warning.severity)}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    {renderSeverityIcon(warning.severity)}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{warning.message}</h3>
                    <div className="mt-1 text-sm opacity-80">
                      <p>Location: {warning.clause}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WarningsSection;
