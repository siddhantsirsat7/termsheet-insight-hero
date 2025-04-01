
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FileUp, FilePlus, AlertCircle, Database } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';

const Dashboard = () => {
  const navigate = useNavigate();
  const [fileType, setFileType] = useState<string>('');
  const [termSheetFile, setTermSheetFile] = useState<File | null>(null);
  const [validationFile, setValidationFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTermSheetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTermSheetFile(e.target.files[0]);
    }
  };

  const handleValidationFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValidationFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!fileType || !termSheetFile) {
      toast.error('Please select a file type and upload a term sheet file');
      return;
    }

    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/results');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Term Sheet Validation</h2>
          <p className="text-gray-600 mt-1">Upload your term sheet and validation data for AI analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="dashboard-card">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileUp className="mr-2 h-5 w-5 text-theme-blue" />
                Upload Term Sheet
              </h3>
              
              <div className="mb-6">
                <RadioGroup 
                  value={fileType} 
                  onValueChange={setFileType}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="csv" id="csv" />
                    <Label htmlFor="csv" className="cursor-pointer font-medium">CSV</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <Label htmlFor="pdf" className="cursor-pointer font-medium">PDF</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="excel" id="excel" />
                    <Label htmlFor="excel" className="cursor-pointer font-medium">Excel</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-theme-blue transition-colors">
                  <input 
                    type="file" 
                    id="termsheet-file" 
                    className="hidden" 
                    onChange={handleTermSheetFileChange}
                    accept={fileType === 'csv' ? '.csv' : fileType === 'pdf' ? '.pdf' : '.xlsx,.xls'}
                    disabled={!fileType}
                  />
                  <label 
                    htmlFor="termsheet-file" 
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <FilePlus className="h-12 w-12 text-gray-400 mb-3" />
                    <span className="text-sm font-medium text-gray-700 mb-1">
                      {termSheetFile ? termSheetFile.name : 'Click to upload or drag and drop'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {fileType ? `${fileType.toUpperCase()} files only` : 'Please select a file type first'}
                    </span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="mr-2 h-5 w-5 text-theme-blue" />
                Validation Data
              </h3>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  Upload an Excel file with validation criteria or standard terms for comparison.
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-theme-blue transition-colors">
                  <input 
                    type="file" 
                    id="validation-file" 
                    className="hidden" 
                    onChange={handleValidationFileChange}
                    accept=".xlsx,.xls"
                  />
                  <label 
                    htmlFor="validation-file" 
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <FilePlus className="h-12 w-12 text-gray-400 mb-3" />
                    <span className="text-sm font-medium text-gray-700 mb-1">
                      {validationFile ? validationFile.name : 'Click to upload or drag and drop'}
                    </span>
                    <span className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Note</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>
                        The validation file is optional but recommended for more accurate analysis. 
                        It should contain standard terms or criteria for comparison.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            onClick={handleSubmit}
            disabled={!fileType || !termSheetFile || isSubmitting}
            className="w-full md:w-auto px-10"
          >
            {isSubmitting ? 'Processing...' : 'Analyze Term Sheet'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
