import React from 'react';

function Spinner() {
  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
        {/* ... spinner icon ... */}
      </svg>
      Memuat data...
    </div>
  );
}

export default Spinner;
