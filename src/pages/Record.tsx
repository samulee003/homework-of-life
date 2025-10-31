import { useEffect, useMemo, useState } from 'react';
import { storage } from '../lib/storage';

type Story = { id: string; date: string; mood: number; text: string; tags?: string[] };
const STORAGE_KEY = 'stories';

export default function Record() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [mood, setMood] = useState(3);
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');

  const stories = useMemo<Story[]>(() => storage.get<Story[]>(STORAGE_KEY) || [], []);
  const [items, setItems] = useState<Story[]>(stories);

  useEffect(() => {
    storage.set(STORAGE_KEY, items);
  }, [items]);

  function addStory() {
    const s: Story = { id: crypto.randomUUID(), date, mood, text: text.trim(), tags: tags.split(',').map(t => t.trim()).filter(Boolean) };
    setItems(prev => [s, ...prev]);
    setText('');
    setTags('');
  }

  function remove(id: string) {
    setItems(prev => prev.filter(s => s.id !== id));
  }

  return (
    <main style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ margin: '8px 0 16px' }}>Record</h1>

      <section style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        <label>
          <div>Date</div>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          <div>Mood (1-5)</div>
          <input type="range" min={1} max={5} value={mood} onChange={e => setMood(Number(e.target.value))} />
        </label>
        <label>
          <div>Tags (comma separated)</div>
          <input type="text" placeholder="work, family" value={tags} onChange={e => setTags(e.target.value)} />
        </label>
        <label>
          <div>Text</div>
          <textarea rows={4} value={text} onChange={e => setText(e.target.value)} />
        </label>
        <button onClick={addStory} disabled={!text.trim()}>Save</button>
      </section>

      <h2 style={{ margin: '16px 0' }}>Recent</h2>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
        {items.map(s => (
          <li key={s.id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{s.date}</strong>
              <span>mood {s.mood}</span>
            </div>
            {s.tags && s.tags.length > 0 && (
              <div style={{ marginTop: 6, fontSize: 12, color: '#555' }}>#{s.tags.join(' #')}</div>
            )}
            <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{s.text}</div>
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <button onClick={() => remove(s.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}


