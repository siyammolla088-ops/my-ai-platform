import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (res.error) {
      setErrorMsg(res.error.message);
    } else {
      onClose();
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold">{isSignUp ? 'সাইন আপ' : 'লগইন'}</h2>
          <button onClick={onClose} className="text-gray-400 font-bold">✕</button>
        </div>

        {errorMsg && <div className="text-red-500 text-xs bg-red-50 p-2 rounded">{errorMsg}</div>}

        <form onSubmit={handleAuth} className="space-y-3">
          <input
            type="email"
            placeholder="ইমেইল"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="পাসওয়ার্ড"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold">
            {isSignUp ? 'একাউন্ট খুলুন' : 'লগইন করুন'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">অথবা</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
        >
          Google দিয়ে লগইন করুন
        </button>

        <div className="text-center text-xs text-gray-500">
          {isSignUp ? 'একাউন্ট আছে?' : 'একাউন্ট নেই?'}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600 font-semibold underline">
            {isSignUp ? 'লগইন' : 'সাইন আপ'}
          </button>
        </div>
      </div>
    </div>
  );
};
