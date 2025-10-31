import { storage } from '../lib/storage';

export default function Settings() {
  function clearAll() {
    localStorage.clear();
    // In case we later scope by key:
    // storage.remove('stories');
    alert('Local data cleared.');
  }

  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ margin: '8px 0 16px' }}>Settings</h1>
      <button onClick={clearAll} style={{ background: '#ef4444', color: '#fff', padding: '8px 12px', border: 0, borderRadius: 6 }}>
        Clear Local Data
      </button>
    </main>
  );
}


