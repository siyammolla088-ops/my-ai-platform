import React from 'react';
import { renderSimpleMarkdown } from '@/lib/markdown';

interface ChatAreaProps {
  messages: any[];
  isBusy: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ messages, isBusy }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl mx-auto w-full">
      {messages.length === 0 ? (
        <div className="text-center mt-24 text-gray-400 font-medium text-lg">
          👋 আমি Close AI! আপনার যেকোনো প্রশ্ন লিখে পাঠাতে পারেন।
        </div>
      ) : (
        messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {m.role === 'user' ? (
                <div>{m.text}</div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderSimpleMarkdown(m.text),
                  }}
                />
              )}
            </div>
          </div>
        ))
      )}
      {isBusy && (
        <div className="flex justify-start">
          <div className="bg-white border p-3 rounded-2xl text-xs text-gray-400 animate-pulse">
            চিন্তা করা হচ্ছে...
          </div>
        </div>
      )}
    </div>
  );
};
