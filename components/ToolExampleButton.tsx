'use client';

import React from 'react';

interface ToolExampleButtonProps {
  sampleText: string;
  label?: string;
}

export const ToolExampleButton: React.FC<ToolExampleButtonProps> = ({
  sampleText,
  label = 'تجربة هذا المثال',
}) => {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('load-arabicfix-sample', { detail: sampleText })
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-[11px] text-[#2563EB] hover:underline font-bold cursor-pointer transition-colors"
    >
      {label}
    </button>
  );
};
