"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function RememberMeTest() {
  const [storageInfo, setStorageInfo] = useState({
    localStorage: '',
    sessionStorage: '',
    temporaryFlag: '',
    rememberMe: ''
  });

  const updateStorageInfo = () => {
    setStorageInfo({
      localStorage: localStorage.getItem('sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0] + '-auth-token') || 'No data',
      sessionStorage: sessionStorage.getItem('sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0] + '-auth-token') || 'No data',
      temporaryFlag: sessionStorage.getItem('supabase-temporary-session') || 'Not set',
      rememberMe: localStorage.getItem('rememberMe') || 'Not set'
    });
  };

  useEffect(() => {
    updateStorageInfo();
  }, []);

  const clearAllStorage = () => {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    updateStorageInfo();
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-100">
      <h3 className="text-lg font-bold mb-4">Remember Me Test</h3>
      
      <div className="space-y-2 mb-4">
        <div>
          <strong>localStorage auth token:</strong> 
          <span className="text-sm text-gray-600 ml-2">
            {storageInfo.localStorage.length > 50 ? 'Has data' : storageInfo.localStorage}
          </span>
        </div>
        
        <div>
          <strong>sessionStorage auth token:</strong> 
          <span className="text-sm text-gray-600 ml-2">
            {storageInfo.sessionStorage.length > 50 ? 'Has data' : storageInfo.sessionStorage}
          </span>
        </div>
        
        <div>
          <strong>Temporary session flag:</strong> 
          <span className="text-sm text-gray-600 ml-2">{storageInfo.temporaryFlag}</span>
        </div>
        
        <div>
          <strong>Remember me flag:</strong> 
          <span className="text-sm text-gray-600 ml-2">{storageInfo.rememberMe}</span>
        </div>
      </div>
      
      <div className="space-x-2">
        <Button onClick={updateStorageInfo} variant="outline">
          Refresh Info
        </Button>
        <Button onClick={clearAllStorage} variant="destructive">
          Clear All Storage
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Test Instructions:</strong></p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Login with Remember me checked → Should use localStorage</li>
          <li>Login with Remember me unchecked → Should use sessionStorage</li>
          <li>Close browser and reopen → Only Remember me sessions should persist</li>
        </ol>
      </div>
    </div>
  );
}
