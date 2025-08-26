import React from 'react';

const CheckButton: React.FC = () => {
  const isComplete = true; // اینجا باید با وضعیت واقعی جدول بررسی بشه

  return (
    <button
      disabled={!isComplete}
      className={`mt-4 px-4 py-2 rounded ${
        isComplete ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
      } text-white transition`}
    >
      بررسی جدول
    </button>
  );
};

export default CheckButton;