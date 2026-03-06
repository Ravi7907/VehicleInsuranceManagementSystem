import { useState, useEffect } from 'react';
import { getCustomers, getVehicles, getPolicies, getClaims } from '../services/api';

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: '#1a1a2e', border: `1px solid ${color}44`,
      borderRadius: 12, padding: '20px 24px', flex: 1,
    }}>
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div style={{ color, fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>{value}</div>
      <div style={{ color: '#888', fontSize: 13 }}>{label}</div>
    </div>
  );
}

function Dashboard() {
  const [counts, setCounts] = useState({ customers: 0, vehicles: 0, policies: 0, claims: 0 });

  useEffect(() => {
    Promise.all([getCustomers(), getVehicles(), getPolicies(), getClaims()])
      .then(([c, v, p, cl]) => setCounts({
        customers: c.data.length, vehicles: v.data.length,
        policies: p.data.length, claims: cl.data.length,
      }))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2 style={{ color: '#fff', marginBottom: 8 }}>📊 Dashboard</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>Welcome to VehicleShield Insurance Platform</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <StatCard label="Total Customers"     value={counts.customers} color="#3b82f6" icon="👥" />
        <StatCard label="Registered Vehicles" value={counts.vehicles}  color="#8b5cf6" icon="🚗" />
        <StatCard label="Total Policies"      value={counts.policies}  color="#10b981" icon="📄" />
        <StatCard label="Total Claims"        value={counts.claims}    color="#f59e0b" icon="🛡️" />
      </div>
      <div style={{ marginTop: 32, background: '#1a1a2e', borderRadius: 12, padding: 24, border: '1px solid #333' }}>
        <h3 style={{ color: '#f59e0b', marginBottom: 12 }}>🚀 Quick Start Guide</h3>
        <div style={{ color: '#aaa', lineHeight: 2 }}>
          <div>1️⃣ &nbsp; Add <b style={{ color: '#fff' }}>Customers</b> first</div>
          <div>2️⃣ &nbsp; Register their <b style={{ color: '#fff' }}>Vehicles</b></div>
          <div>3️⃣ &nbsp; Create <b style={{ color: '#fff' }}>Insurance Policies</b></div>
          <div>4️⃣ &nbsp; Track <b style={{ color: '#fff' }}>Claims</b> when needed</div>
          <div>5️⃣ &nbsp; Monitor <b style={{ color: '#fff' }}>Renewals</b> before expiry</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
