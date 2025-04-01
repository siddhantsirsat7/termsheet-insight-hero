
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LightbulbIcon, Check, AlertCircle } from 'lucide-react';

interface Insight {
  id: number;
  type: 'positive' | 'improvement' | 'information';
  message: string;
}

interface InsightsSectionProps {
  insights: Insight[];
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => {
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'improvement':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'information':
        return <LightbulbIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <LightbulbIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'improvement':
        return 'bg-amber-50 border-amber-200';
      case 'information':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="analysis-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <LightbulbIcon className="mr-2 h-5 w-5 text-yellow-500" />
          Key Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div 
              key={insight.id} 
              className={`border rounded-md p-4 ${getTypeClass(insight.type)}`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  {renderTypeIcon(insight.type)}
                </div>
                <div className="ml-3">
                  <p className="text-sm">{insight.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
