import React from 'react';
import { useApp } from '../context/AppContext';

export const ToastBanner: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md">
      <div className="bg-[#173C32] text-[#F7F5EF] px-5 py-3.5 rounded-xl border border-[#C47A54] flex items-center gap-3">
        <span className="text-[#C47A54] font-bold text-sm bg-[#122F27] px-2 py-0.5 rounded">[OK]</span>
        <p className="text-xs sm:text-sm font-medium tracking-wide leading-snug">
          {toastMessage}
        </p>
      </div>
    </div>
  );
};
