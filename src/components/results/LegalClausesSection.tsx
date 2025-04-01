
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, CheckSquare } from 'lucide-react';

interface Clause {
  id: number;
  title: string;
  content: string;
  status: 'standard' | 'non-standard' | 'missing';
  category: 'regulatory' | 'governance' | 'operational';
}

interface LegalClausesSectionProps {
  clauses: Clause[];
}

const LegalClausesSection: React.FC<LegalClausesSectionProps> = ({ clauses }) => {
  const regulatoryClauses = clauses.filter(clause => clause.category === 'regulatory');
  const governanceClauses = clauses.filter(clause => clause.category === 'governance');
  const operationalClauses = clauses.filter(clause => clause.category === 'operational');

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'standard':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Standard</Badge>;
      case 'non-standard':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Non-standard</Badge>;
      case 'missing':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Missing</Badge>;
      default:
        return null;
    }
  };

  const renderClauses = (clauseList: Clause[]) => {
    return (
      <ScrollArea className="h-[400px] pr-4 custom-scrollbar">
        <div className="space-y-4">
          {clauseList.map(clause => (
            <div 
              key={clause.id} 
              className="border rounded-md p-4 bg-white"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{clause.title}</h3>
                {renderStatusBadge(clause.status)}
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">{clause.content}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <Card className="analysis-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Scale className="mr-2 h-5 w-5 text-indigo-500" />
          Legal and Regulatory Clauses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="regulatory" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="regulatory" className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>Regulatory</span>
            </TabsTrigger>
            <TabsTrigger value="governance" className="flex items-center">
              <Scale className="w-4 h-4 mr-2" />
              <span>Governance</span>
            </TabsTrigger>
            <TabsTrigger value="operational" className="flex items-center">
              <CheckSquare className="w-4 h-4 mr-2" />
              <span>Operational</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="regulatory">
            {renderClauses(regulatoryClauses)}
          </TabsContent>
          
          <TabsContent value="governance">
            {renderClauses(governanceClauses)}
          </TabsContent>
          
          <TabsContent value="operational">
            {renderClauses(operationalClauses)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LegalClausesSection;
