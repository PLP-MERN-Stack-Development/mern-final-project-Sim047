// frontend/src/components/SearchUsers.tsx
import React, { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SAMPLE_AVATAR = '/src/assets/avatar-placeholder.png';

type Props = {
  token: string | null;
  onOpenConversation: (conv: any) => void;
  currentUserId?: string;
};

export default function SearchUsers({ token, onOpenConversation, currentUserId }: Props) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function onSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q || !token) return;
    setLoading(true);

    try {
      const res = await axios.get(`${API}/api/users/search?q=${encodeURIComponent(q)}`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      setResults(res.data || []);
    } catch (err) {
      console.error('search users err', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function startChatWith(user: any) {
    if (!token) return;
    try {
      const res = await axios.post(`${API}/api/conversations`, { partnerId: user._id }, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const conv = res.data;
      onOpenConversation(conv);
    } catch (err) {
      console.error('create conv err', err);
      alert('Could not start conversation');
    }
  }

  return (
    <div className="search-users">
      <form onSubmit={onSearch} className="flex gap-2">
        <input className="input" placeholder="Search users by name or email..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn" type="submit">Search</button>
      </form>

      <div className="mt-3">
        {loading && <div className="text-xs text-muted">Searching…</div>}
        {!loading && results.length === 0 && <div className="text-xs text-muted">0 users</div>}

        <div className="flex flex-col gap-2 mt-2">
          {results.map((u) => (
            <div key={u._id} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-800/20">
              <img src={u.avatar ? (u.avatar.startsWith('http') ? u.avatar : API + '/uploads/' + u.avatar) : SAMPLE_AVATAR} className="w-10 h-10 rounded-md object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-sm">{u.username}</div>
                <div className="text-xs text-muted">{u.email}</div>
              </div>
              <button className="btn" onClick={() => startChatWith(u)}>Chat</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
