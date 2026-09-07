'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';
import { InputBox } from '@/components/InputBox';
import { AuthModal } from '@/components/AuthModal';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [convos, setConvos] = useState<Record<string, any>>({});
  const [curId, setCurId] = useState<string | null>(null);
  const [inputTxt, setInputTxt] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUser(data.user);
      loadConversations(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      const user = session?.user || null;
      setCurrentUser(user);
      loadConversations(user);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const loadConversations = async (user: any) => {
    const storageKey = user ? `cai2_convos_${user.id}` : 'cai2_convos_guest';
    const localData = localStorage.getItem(storageKey);

    if (localData) {
      try {
        setConvos(JSON.parse(localData));
      } catch (e) {}
    }

    if (user) {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: true });

      if (!error && data) {
        const cloudConvos: Record<string, any> = {};
        data.forEach((row) => {
          cloudConvos[row.id] = {
            id: row.id,
            title: row.title,
            msgs: typeof row.messages === 'string' ? JSON.parse(row.messages) : row.messages || [],
          };
        });
        setConvos(cloudConvos);
        localStorage.setItem(storageKey, JSON.stringify(cloudConvos));
      }
    }
  };

  const saveConvo = async (updatedId: string, updatedConvos: Record<string, any>) => {
    const storageKey = currentUser ? `cai2_convos_${currentUser.id}` : 'cai2_convos_guest';
    localStorage.setItem(storageKey, JSON.stringify(updatedConvos));

    if (currentUser && updatedConvos[updatedId]) {
      await supabase.from('conversations').upsert({
        id: updatedId,
        user_id: currentUser.id,
        title: updatedConvos[updatedId].title || 'চ্যাট',
        messages: JSON.stringify(updatedConvos[updatedId].msgs),
        updated_at: new Date().toISOString(),
      });
    }
  };

  const handleSend = async () => {
    if (isBusy || !inputTxt.trim()) return;

    let activeId = curId;
    let newConvos = { ...convos };

    if (!activeId) {
      activeId = 'c' + Date.now();
      newConvos[activeId] = { id: activeId, title: '...', msgs: [] };
      setCurId(activeId);
    }

    const userMsg = { role: 'user', text: inputTxt };
    newConvos[activeId].msgs.push(userMsg);
    setConvos(newConvos);
    setInputTxt('');
    setIsBusy(true);

    const historyPayload = newConvos[activeId].msgs.slice(0, -1).map((m: any) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const today = new Date().toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const systemPrompt = `You are Close AI, an advanced AI assistant.\n[System Context - Real-time Target DateTime]:\n- Today's Date: ${today}`;

    try {
      const response = await fetch('http://localhost:8000/api/gemini?mode=stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [...historyPayload, { role: 'user', parts: [{ text: userMsg.text }] }],
        }),
      });

      if (!response.ok) throw new Error('সার্ভার সাড়া দিচ্ছে না।');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullText = '';

      newConvos[activeId].msgs.push({ role: 'model', text: '' });

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunks = decoder.decode(value, { stream: true }).split('\n');
        for (const line of chunks) {
          if (line.startsWith('data: ')) {
            const raw = line.slice(6).trim();
            if (raw === '[DONE]') continue;
            try {
              const parsed = JSON.parse(raw);
              const textChunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
              fullText += textChunk;

              newConvos[activeId].msgs[newConvos[activeId].msgs.length - 1].text = fullText;
              setConvos({ ...newConvos });
            } catch (e) {}
          }
        }
      }

      if (newConvos[activeId].msgs.length === 2) {
        newConvos[activeId].title = userMsg.text.slice(0, 25) || 'নতুন চ্যাট';
      }

      await saveConvo(activeId, newConvos);
    } catch (err) {
      console.error(err);
    } finally {
      setIsBusy(false);
    }
  };

  const handleAuthClick = () => {
    if (currentUser) {
      supabase.auth.signOut();
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-[#f0f4f9] text-[#1f1f1f]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        convos={convos}
        curId={curId}
        onSelect={(id) => {
          setCurId(id);
          setSidebarOpen(false);
        }}
        onNewChat={() => {
          setCurId(null);
          setSidebarOpen(false);
        }}
        user={currentUser}
        onAuthClick={handleAuthClick}
      />

      <main className="flex-1 flex flex-col h-full">
        <header className="h-16 flex items-center px-4 bg-white border-b justify-between md:justify-end">
          <button className="md:hidden text-xl" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <div className="font-semibold text-lg md:hidden">Close AI</div>
          <div className="text-xs md:text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
            {currentUser ? 'Supabase Synced' : 'Local Storage Mode'}
          </div>
        </header>

        <ChatArea messages={curId && convos[curId] ? convos[curId].msgs : []} isBusy={isBusy} />

        <InputBox
          inputTxt={inputTxt}
          setInputTxt={setInputTxt}
          onSend={handleSend}
          isBusy={isBusy}
        />
      </main>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
