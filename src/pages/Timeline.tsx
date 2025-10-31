import { useMemo, useState } from 'react';
import { storage } from '../lib/storage';

type Story = { id: string; date: string; mood: number; text: string };
const STORAGE_KEY = 'stories';

export default function Timeline() {
  const [q, setQ] = useState('');
  const base = useMemo<Story[]>(() => (storage.get<Story[]>(STORAGE_KEY) || []).sort((a, b) => (a.date < b.date ? 1 : -1)), []);
  const items = useMemo(() => {
    if (!q.trim()) return base;
    const t = q.trim().toLowerCase();
    return base.filter(s => s.text.toLowerCase().includes(t) || s.date.includes(t));
  }, [q, base]);
  return (
    <main style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ margin: '8px 0 16px' }}>Timeline</h1>
      <input placeholder="Search text or date (YYYY-MM-DD)" value={q} onChange={e => setQ(e.target.value)} style={{ width:'100%', marginBottom: 12, border: '1px solid #eee', borderRadius: 6 }} />
      {items.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
          {items.map(s => (
            <li key={s.id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{s.date}</strong>
                <span>mood {s.mood}</span>
              </div>
              <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{s.text}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}


