'use client';

import React, { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([
    { sender: 'ai', text: '👋 আমি Close AI! আপনার যেকোনো প্রশ্ন লিখে পাঠাতে পারেন।' }
  ]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    // AI এর উত্তর (ডেমো রিপ্লাই)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `আমি আপনার বার্তা পেয়েছি: "${currentInput}"` }
      ]);
    }, 800);
  };

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden bg-slate-50">
      {/* হেডার / নেভিগেশন বার */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Close AI</h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-medium">
            Local Storage Mode
          </span>
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            লগইন
          </button>
        </div>
      </header>

      {/* সাইডবার মোডাল/ড্রয়ার */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-64 max-w-[80%] bg-white h-full shadow-2xl flex flex-col p-4 z-50">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="font-semibold text-slate-800">গ্যাস্ট ইউজার</span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>
            <button 
              onClick={() => {
                setMessages([{ sender: 'ai', text: '👋 নতুন চ্যাট শুরু হয়েছে!' }]);
                setIsSidebarOpen(false);
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl text-sm font-medium transition"
            >
              + নতুন চ্যাট
            </button>
          </div>
        </div>
      )}

      {/* চ্যাট এরিয়া (মেসেজ ফিল্ড) */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl w-full mx-auto">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm sm:text-base leading-relaxed shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </main>

      {/* ইনপুট ইনপুট বক্স (নিচে আটকানো) */}
      <footer className="p-3 sm:p-4 bg-white border-t border-slate-200 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="এখানে লিখুন..."
            className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium px-5 py-3 rounded-xl text-sm transition-all shadow-sm"
          >
            পাঠান
          </button>
        </div>
      </footer>

      {/* লগইন পপ-আপ (মোডাল) */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsAuthOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl z-10 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-2">লগইন করুন</h2>
            <p className="text-xs text-slate-5-00 text-slate-500 mb-4">
              Close AI অ্যাকাউন্টে প্রবেশের জন্য ইমেইল ও পাসওয়ার্ড দিন।
            </p>
            <form onSubmit={(e) => { e.preventDefault(); setIsAuthOpen(false); }} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">ইমেইল</label>
                <input 
                  type="email" 
                  required 
                  placeholder="user@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">পাসওয়ার্ড</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm mt-2 transition shadow-sm"
              >
                প্রবেশ করুন
              </button>
            </form>
            <button 
              onClick={() => setIsAuthOpen(false)}
              className="mt-3 w-full text-xs text-slate-500 hover:text-slate-700 py-1"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
