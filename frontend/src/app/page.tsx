'use client';

import React, { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>({
    name: 'Siyam',
    email: 'siyammolla088@gmail.com',
    avatar: 'S'
  });

  const recentChats = [
    'নাম বিষয়ক সাধারণ প্রশ্ন',
    'হাই। nency চ্যাট হিস্টরি',
    'হ্যাকিং কী ও মজার হ্যাক',
    'আজকের তারিখ ও বার।',
    'স্বয়ং পরিচিতি প্রশ্ন',
    'আমার ক্ষমতা ও দক্ষতা',
    'fifa Football'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;
    
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `আমি আপনার প্রশ্নের উত্তর তৈরি করছি: "${text}"` }
      ]);
    }, 600);
  };

  const handleGoogleLogin = () => {
    // ডেমো গুগল সাইন ইন ফ্লো
    setUser({
      name: 'Siyam Molla',
      email: 'siyammolla088@gmail.com',
      avatar: 'S'
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f0f4f9] relative">
      {/* হেডার */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#f0f4f9] shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200/60 text-gray-700 transition"
          >
            <i className="fa-solid fa-bars text-lg"></i>
          </button>
          <h1 className="text-xl font-medium text-gray-700 tracking-tight">Close AI</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-gray-600 hover:text-gray-800">
            <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
          </button>
          
          {user ? (
            <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
              {user.avatar}
            </div>
          ) : (
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition"
            >
              <i className="fa-brands fa-google text-red-500"></i>
              গুগল দিয়ে লগইন
            </button>
          )}
        </div>
      </header>

      {/* সাইডবার */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-xs"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80%] bg-[#f0f4f9] h-full shadow-2xl flex flex-col justify-between p-4 z-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => {
                    setMessages([]);
                    setIsSidebarOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-800 font-medium py-2 px-3 rounded-full hover:bg-gray-200/70 transition w-full"
                >
                  <i className="fa-solid fa-pen text-sm"></i>
                  <span>নতুন চ্যাট</span>
                </button>
              </div>

              <div className="text-xs font-semibold text-gray-500 mb-3 px-3">সাম্প্রতিক</div>
              <div className="space-y-1 overflow-y-auto max-h-[60vh]">
                {recentChats.map((chat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      handleSend(chat);
                      setIsSidebarOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-200/60 truncate transition"
                  >
                    <i className="fa-regular fa-message text-gray-500 text-xs"></i>
                    <span className="truncate">{chat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* সাইডবার বটম ইউজার প্রোফাইল */}
            <div className="pt-4 border-t border-gray-300/60">
              {user ? (
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <i className="fa-regular fa-user text-gray-600"></i>
                    <div className="truncate">
                      <p className="text-xs font-medium text-gray-800">লগ আউট</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setUser(null)}
                    className="text-xs text-red-500 hover:underline shrink-0"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2 rounded-xl text-xs font-medium border border-gray-300 shadow-sm"
                >
                  <i className="fa-brands fa-google text-red-500"></i> Sign in with Google
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* প্রধান চ্যাট এরিয়া */}
      <main className="flex-1 overflow-y-auto px-4 py-2 max-w-2xl w-full mx-auto flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-start space-y-6 my-auto pb-10">
            <div>
              <h2 className="text-2xl font-normal text-gray-600 mb-1">হ্যালো,</h2>
              <h3 className="text-2xl font-bold text-gray-800">আজ কোথা থেকে শুরু করব?</h3>
            </div>

            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-purple-600">
              <i className="fa-solid fa-sparkles text-2xl"></i>
            </div>

            {/* দ্রুত অপশন কার্ডসমূহ */}
            <div className="w-full space-y-2.5">
              {[
                { title: 'ছবি তৈরি করো', icon: 'fa-regular fa-image' },
                { title: 'মিউজিক তৈরি করো', icon: 'fa-solid fa-music' },
                { title: 'যেকোনো কিছু লেখো', icon: 'fa-solid fa-pen-line' },
                { title: 'শিখতে সাহায্য করো', icon: 'fa-solid fa-book-open' }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(item.title)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 p-3.5 rounded-2xl flex items-center gap-4 shadow-xs border border-gray-100 transition text-sm font-medium"
                >
                  <i className={`${item.icon} text-gray-500 text-base`}></i>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ইনপুট বার (আগের ডিজাইনের মতো) */}
      <footer className="p-3 bg-[#f0f4f9] shrink-0 w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-2 shadow-md border border-gray-200/80 flex flex-col gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Close AI"
            className="w-full px-4 pt-2 pb-1 text-sm text-gray-800 focus:outline-none bg-transparent"
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex items-center gap-3 text-gray-500">
              <button className="hover:text-gray-700 p-1"><i className="fa-solid fa-plus text-sm"></i></button>
              <button className="hover:text-gray-700 p-1"><i className="fa-regular fa-image text-sm"></i></button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                <i className="fa-solid fa-circle-half-stroke text-[10px]"></i> Fast
              </span>
              <button className="text-gray-500 hover:text-gray-700 p-1"><i className="fa-solid fa-microphone text-sm"></i></button>
              <button 
                onClick={() => handleSend()}
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-sm"
              >
                <i className="fa-solid fa-arrow-up text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
