import { Link, useLocation } from 'react-router-dom';

export default function App() {
  const { pathname } = useLocation();
  const tabs = [
    { to: '/record', label: 'Record' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/insights', label: 'Insights' },
    { to: '/settings', label: 'Settings' }
  ];

  return (
    <nav style={{
      display: 'flex', gap: 16, padding: '12px 16px', borderBottom: '1px solid #eee',
      position: 'sticky', top: 0, background: '#fff', zIndex: 10
    }}>
      {tabs.map(t => (
        <Link key={t.to} to={t.to} style={{
          textDecoration: 'none',
          color: pathname === t.to ? '#0ea5e9' : '#111',
          fontWeight: pathname === t.to ? 700 : 400
        }}>{t.label}</Link>
      ))}
    </nav>
  );
}


