import React, { useState } from 'react';

interface ErrorAlertProps {
  errorResponse: string;
}

function ErrorAlert({ errorResponse }: Readonly<ErrorAlertProps>) {
  const [error, setError] = useState<string | null>(errorResponse);
  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
      <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        {/* ... error icon ... */}
      </svg>
      {error}
      <button onClick={() => setError(null)} className="ml-2">
        ×
      </button>
    </div>
  );
}

export default ErrorAlert;
