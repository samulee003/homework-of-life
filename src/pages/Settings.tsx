import { storage } from '../lib/storage';
import { toCSV, download } from '../lib/csv';

export default function Settings() {
  function clearAll() {
    localStorage.clear();
    // In case we later scope by key:
    // storage.remove('stories');
    alert('Local data cleared.');
  }

  function exportJSON() {
    const data = localStorage.getItem('stories') || '[]';
    download('stories.json', data, 'application/json');
  }

  function exportCSV() {
    const items = (storage.get<any[]>('stories') || []).map(s => ({ id: s.id, date: s.date, mood: s.mood, text: s.text }));
    const csv = toCSV(items);
    download('stories.csv', csv, 'text/csv');
  }

  function importJSON(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const items = JSON.parse(String(reader.result) || '[]');
        storage.set('stories', items);
        alert('Import succeeded. You may refresh pages.');
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(f);
  }

  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ margin: '8px 0 16px' }}>Settings</h1>
      <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
        <button onClick={exportCSV}>Export CSV</button>
        <button onClick={exportJSON}>Export JSON</button>
        <label style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
          <span style={{ padding:'8px 12px', background:'#ddd', borderRadius:6, cursor:'pointer' }}>Import JSON</span>
          <input type="file" accept="application/json" onChange={importJSON} style={{ display:'none' }} />
        </label>
        <button onClick={clearAll} style={{ background: '#ef4444', color: '#fff' }}>Clear Local Data</button>
      </div>
    </main>
  );
}


