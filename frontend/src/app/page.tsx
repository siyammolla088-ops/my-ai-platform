'use client';

import React, { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([
    { sender: 'ai', text: '👋 আমি Close AI! আপনার যেকোনো প্রশ্ন লিখে পাঠাতে পারেন।' }
  ]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const currentInput = input;
    setMessages((prev) => [...prev, { sender: 'user', text: currentInput }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `আমি আপনার বার্তা পেয়েছি: "${currentInput}"` }
      ]);
    }, 600);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ email: 'siyam@example.com' });
    setIsAuthOpen(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 relative">
      {/* হেডার নেভিগেশন */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 focus:outline-none active:bg-slate-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-900">Close AI</h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium border border-slate-200">
            {user ? 'Logged In' : 'Local Storage Mode'}
          </span>
          {user ? (
            <button 
              onClick={() => setUser(null)}
              className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition border border-red-200"
            >
              লগআউট
            </button>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition shadow-sm"
            >
              লগইন
            </button>
          )}
        </div>
      </header>

      {/* সাইডবার মোডাল */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80%] bg-white h-full shadow-2xl flex flex-col p-4 z-10">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="font-semibold text-slate-800 text-sm">
                {user ? user.email : 'গ্যাস্ট ইউজার'}
              </span>
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
              className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2.5 px-4 rounded-xl text-sm font-semibold transition border border-blue-100"
            >
              + নতুন চ্যাট
            </button>
          </div>
        </div>
      )}

      {/* চ্যাট মেসেজ বক্স */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 max-w-2xl w-full mx-auto">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </main>

      {/* বটম ইনপুট বার */}
      <footer className="p-3 bg-white border-t border-slate-200 shadow-lg shrink-0 w-full">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="এখানে লিখুন..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition shadow-sm shrink-0"
          >
            পাঠান
          </button>
        </div>
      </footer>

      {/* লগইন পপ-আপ মোডাল */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsAuthOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-xs shadow-2xl z-10 border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-1">লগইন করুন</h2>
            <p className="text-xs text-slate-500 mb-4">
              Close AI অ্যাকাউন্টে প্রবেশের জন্য তথ্য দিন।
            </p>
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">ইমেইল</label>
                <input 
                  type="email" 
                  required 
                  defaultValue="siyam@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">পাসওয়ার্ড</label>
                <input 
                  type="password" 
                  required 
                  defaultValue="123456"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium py-2.5 rounded-lg text-sm mt-2 transition shadow-sm"
              >
                প্রবেশ করুন
              </button>
            </form>
            <button 
              onClick={() => setIsAuthOpen(false)}
              className="mt-3 w-full text-xs text-slate-400 hover:text-slate-600 text-center py-1 block"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
