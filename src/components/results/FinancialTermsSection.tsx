
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DollarSign, BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';

interface FinancialTermsSectionProps {
  financialData: {
    keyMetrics: Array<{ name: string; value: number }>;
    timeSeriesData: Array<{ month: string; amount: number }>;
    breakdownData: Array<{ name: string; value: number }>;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const FinancialTermsSection: React.FC<FinancialTermsSectionProps> = ({ financialData }) => {
  return (
    <Card className="analysis-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-green-500" />
          Financial Terms
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="flex items-center">
              <PieChartIcon className="w-4 h-4 mr-2" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center">
              <LineChartIcon className="w-4 h-4 mr-2" />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              <span>Breakdown</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={financialData.keyMetrics}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {financialData.keyMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {financialData.keyMetrics.map((metric, index) => (
                <div key={index} className="stats-card">
                  <div className="text-sm text-gray-500">{metric.name}</div>
                  <div className="text-lg font-semibold mt-1">
                    ${metric.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financialData.timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#0088FE" 
                    activeDot={{ r: 8 }} 
                    name="Amount" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="breakdown">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData.breakdownData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="value" fill="#0088FE" name="Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FinancialTermsSection;
