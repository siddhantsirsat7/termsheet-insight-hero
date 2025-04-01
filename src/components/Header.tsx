
import React from 'react';
import { FileText, BarChart2, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-theme-blue mr-2" />
          <h1 className="text-xl font-bold text-theme-blue">TermSheet Insight</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="ml-3 relative">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-theme-blue flex items-center justify-center text-white">
                UI
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
