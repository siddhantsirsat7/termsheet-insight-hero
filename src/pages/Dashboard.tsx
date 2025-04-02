
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, FilePlus, AlertCircle, Lock, Upload } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const navigate = useNavigate();
  const [termSheetFile, setTermSheetFile] = useState<File | null>(null);
  const [validationFile, setValidationFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'direct' | 'credentials' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleTermSheetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ['.csv', '.pdf', '.xlsx', '.xls', '.png', '.jpg', '.jpeg'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (allowedTypes.includes(fileExtension)) {
        setTermSheetFile(file);
      } else {
        toast.error('Unsupported file type. Please upload CSV, PDF, Excel, or Image files.');
      }
    }
  };

  const handleValidationFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ['.xlsx', '.xls'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (allowedTypes.includes(fileExtension)) {
        setValidationFile(file);
      } else {
        toast.error('Validation file must be an Excel file (.xlsx or .xls).');
      }
    }
  };

  const handleSubmit = () => {
    if (uploadMethod === 'direct' && !termSheetFile) {
      toast.error('Please upload a term sheet file');
      return;
    }

    if (uploadMethod === 'credentials' && (!username || !password)) {
      toast.error('Please enter both username and password');
      return;
    }

    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/results');
    }, 2000);
  };

  const renderUploadOptions = () => {
    if (!uploadMethod) {
      return (
        <div className="flex flex-col space-y-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center p-6"
            onClick={() => setUploadMethod('direct')}
          >
            <Upload className="mr-2" />
            Upload Directly
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center p-6"
            onClick={() => setUploadMethod('credentials')}
          >
            <Lock className="mr-2" />
            Use Login Credentials
          </Button>
        </div>
      );
    }

    if (uploadMethod === 'credentials') {
      return (
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <Input 
              id="username" 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setUploadMethod(null)}
            >
              Back
            </Button>
            <Button 
              variant="default" 
              disabled={!username || !password}
              onClick={handleSubmit}
            >
              Login & Access
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-theme-blue transition-colors mb-4">
          <input 
            type="file" 
            id="termsheet-file" 
            className="hidden" 
            onChange={handleTermSheetFileChange}
            accept=".csv,.pdf,.xlsx,.xls,.png,.jpg,.jpeg"
          />
          <label 
            htmlFor="termsheet-file" 
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <FilePlus className="h-12 w-12 text-gray-400 mb-3" />
            <span className="text-sm font-medium text-gray-700 mb-1">
              {termSheetFile ? termSheetFile.name : 'Click to upload or drag and drop'}
            </span>
            <span className="text-xs text-gray-500 mt-2">
              Supported files: CSV, PDF, Excel, Image
            </span>
          </label>
        </div>
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setUploadMethod(null);
              setTermSheetFile(null);
            }}
          >
            Back
          </Button>
          <Button 
            variant="default" 
            disabled={!termSheetFile}
            onClick={handleSubmit}
          >
            Upload & Process
          </Button>
        </div>
      </div>
    );
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
                {renderUploadOptions()}
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileUp className="mr-2 h-5 w-5 text-theme-blue" />
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
            disabled={
              (uploadMethod === 'direct' && !termSheetFile) || 
              (uploadMethod === 'credentials' && (!username || !password)) ||
              !uploadMethod || 
              isSubmitting
            }
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

