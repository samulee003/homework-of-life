import { useMemo } from 'react';
import { storage } from '../lib/storage';

type Story = { id: string; date: string; mood: number; text: string };
const STORAGE_KEY = 'stories';

function calcStreak(items: Story[]): number {
  // assumes date is yyyy-mm-dd
  const set = new Set(items.map(s => s.date));
  let streak = 0;
  let d = new Date();
  while (true) {
    const iso = d.toISOString().slice(0, 10);
    if (!set.has(iso)) break;
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export default function Insights() {
  const items = useMemo<Story[]>(() => storage.get<Story[]>(STORAGE_KEY) || [], []);
  const count = items.length;
  const streak = calcStreak(items);

  return (
    <main style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ margin: '8px 0 16px' }}>Insights</h1>
      <div style={{ display: 'flex', gap: 24 }}>
        <div>
          <div style={{ fontSize: 12, color: '#666' }}>Total Entries</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{count}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#666' }}>Current Streak (days)</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{streak}</div>
        </div>
      </div>
    </main>
  );
}


