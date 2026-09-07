import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  convos: Record<string, any>;
  curId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  user: any;
  onAuthClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  convos,
  curId,
  onSelect,
  onNewChat,
  user,
  onAuthClick,
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl transition-transform duration-300 z-50 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h1 className="font-bold text-xl text-blue-600">Close AI</h1>
        <button className="md:hidden text-gray-500 font-bold" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full text-left py-2.5 px-4 rounded-xl bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition"
        >
          + নতুন চ্যাট
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {Object.values(convos)
          .reverse()
          .map((c: any) => (
            <div
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`p-3 rounded-lg cursor-pointer text-sm truncate transition ${
                curId === c.id ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {c.title || 'নতুন চ্যাট'}
            </div>
          ))}
      </div>

      <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
          {user ? user.email : 'গ্যাস্ট ইউজার'}
        </div>
        <button
          onClick={onAuthClick}
          className="text-xs bg-gray-800 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700"
        >
          {user ? 'লগআউট' : 'লগইন'}
        </button>
      </div>
    </aside>
  );
};
