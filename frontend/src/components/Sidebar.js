import { Link, useLocation } from 'react-router-dom';

const links = [
  { path: '/',          label: '📊 Dashboard' },
  { path: '/customers', label: '👥 Customers' },
  { path: '/vehicles',  label: '🚗 Vehicles'  },
  { path: '/policies',  label: '📄 Policies'  },
  { path: '/claims',    label: '🛡️ Claims'    },
  { path: '/renewals',  label: '🔔 Renewals'  },
];

function Sidebar() {
  const location = useLocation();
  return (
    <div style={{
      width: 220, minHeight: '100vh', background: '#1a1a2e',
      padding: '20px 0', position: 'fixed', left: 0, top: 0,
    }}>
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #333' }}>
        <h2 style={{ color: '#f59e0b', fontSize: 16, margin: 0 }}>🛡️ VehicleShield</h2>
        <p style={{ color: '#888', fontSize: 11, margin: '4px 0 0' }}>Insurance Platform</p>
      </div>
      <nav style={{ marginTop: 16 }}>
        {links.map(link => (
          <Link key={link.path} to={link.path} style={{
            display: 'block', padding: '12px 20px',
            color: location.pathname === link.path ? '#f59e0b' : '#aaa',
            background: location.pathname === link.path ? 'rgba(245,158,11,0.1)' : 'transparent',
            textDecoration: 'none', fontSize: 14, fontWeight: 500,
            borderLeft: location.pathname === link.path ? '3px solid #f59e0b' : '3px solid transparent',
          }}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
