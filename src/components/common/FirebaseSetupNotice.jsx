import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import Card from './Card';
import { isFirebaseConfigured } from '../../services/firebase/config';

/**
 * Notice displayed when Firebase is not configured
 */
const FirebaseSetupNotice = () => {
  if (isFirebaseConfigured) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full mx-4"
    >
      <Card variant="default" className="bg-yellow-50 border-2 border-yellow-400">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-yellow-900 mb-2">
              Firebase Setup Required
            </h3>
            <p className="text-yellow-800 text-sm mb-3">
              To use this application, you need to configure Firebase. Follow these steps:
            </p>
            <ol className="list-decimal list-inside text-yellow-800 text-sm space-y-1 mb-4">
              <li>Create a Firebase project at <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">console.firebase.google.com <ExternalLink className="w-3 h-3" /></a></li>
              <li>Enable Authentication (Email/Password)</li>
              <li>Enable Firestore Database</li>
              <li>Enable Storage</li>
              <li>Copy your Firebase config from Project Settings</li>
              <li>Update the <code className="bg-yellow-200 px-1 rounded">.env</code> file with your credentials</li>
              <li>Restart the development server</li>
            </ol>
            <p className="text-yellow-700 text-xs">
              📖 See <code className="bg-yellow-200 px-1 rounded">README.md</code> for detailed instructions
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FirebaseSetupNotice;

