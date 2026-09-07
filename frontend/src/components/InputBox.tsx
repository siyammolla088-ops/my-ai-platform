import React from 'react';

interface InputBoxProps {
  inputTxt: string;
  setInputTxt: (v: string) => void;
  onSend: () => void;
  isBusy: boolean;
}

export const InputBox: React.FC<InputBoxProps> = ({
  inputTxt,
  setInputTxt,
  onSend,
  isBusy,
}) => {
  return (
    <div className="p-4 bg-white border-t max-w-3xl mx-auto w-full rounded-t-2xl shadow-md">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputTxt}
          onChange={(e) => setInputTxt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="এখানে লিখুন..."
          className="flex-1 p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
        />
        <button
          onClick={onSend}
          disabled={isBusy}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium disabled:opacity-50 transition text-sm md:text-base"
        >
          পাঠান
        </button>
      </div>
    </div>
  );
};
