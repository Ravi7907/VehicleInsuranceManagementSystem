import { useState, useEffect } from 'react';
import { getPolicies, updatePolicy, getCustomers, getVehicles } from '../services/api';

function Renewals() {
  const [policies, setPolicies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const [p, c, v] = await Promise.all([getPolicies(), getCustomers(), getVehicles()]);
    setPolicies(p.data); setCustomers(c.data); setVehicles(v.data);
  };

  const getDays = (endDate) => Math.ceil((new Date(endDate) - new Date()) / 86400000);

  const getUrgency = (days) => {
    if (days < 0)  return { color: '#888',    label: 'Expired'   };
    if (days <= 7)  return { color: '#ef4444', label: 'Critical'  };
    if (days <= 30) return { color: '#f59e0b', label: 'Due Soon'  };
    return              { color: '#10b981', label: 'OK'        };
  };

  const handleRenew = async (policy) => {
    const newEnd = new Date(policy.end_date);
    newEnd.setFullYear(newEnd.getFullYear() + 1);
    await updatePolicy(policy.id, { ...policy, status: 'Active', start_date: policy.end_date, end_date: newEnd.toISOString().split('T')[0] });
    load();
  };

  const sorted = [...policies].sort((a, b) => getDays(a.end_date) - getDays(b.end_date));
  const getName = (id) => customers.find(c => c.id === id)?.name || id;
  const getVeh  = (id) => { const v = vehicles.find(v => v.id === id); return v ? `${v.make} ${v.model}` : id; };

  return (
    <div>
      <h2 style={{ color: '#fff', marginBottom: 8 }}>🔔 Policy Renewals</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>Monitor and manage upcoming policy renewals</p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Expired',       count: sorted.filter(p => getDays(p.end_date) < 0).length,                              color: '#888'    },
          { label: 'Critical ≤7d',  count: sorted.filter(p => getDays(p.end_date) >= 0 && getDays(p.end_date) <= 7).length,  color: '#ef4444' },
          { label: 'Due Soon ≤30d', count: sorted.filter(p => getDays(p.end_date) > 7 && getDays(p.end_date) <= 30).length,  color: '#f59e0b' },
          { label: 'Active 30d+',   count: sorted.filter(p => getDays(p.end_date) > 30).length,                              color: '#10b981' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: '#1a1a2e', border: `1px solid ${s.color}44`, borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.count}</div>
            <div style={{ color: '#888', fontSize: 11, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {sorted.map(p => {
          const days = getDays(p.end_date);
          const urgency = getUrgency(days);
          return (
            <div key={p.id} style={{ background: '#1a1a2e', border: `1px solid ${urgency.color}33`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#fff', fontWeight: 700 }}>{p.id}</span>
                  <span style={{ background: `${urgency.color}22`, color: urgency.color, border: `1px solid ${urgency.color}44`, borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>{urgency.label}</span>
                </div>
                <div style={{ color: '#888', fontSize: 12 }}>{getName(p.customer_id)} · {getVeh(p.vehicle_id)} · Expires {p.end_date?.split('T')[0]}</div>
              </div>
              <div style={{ textAlign: 'right', marginRight: 16 }}>
                <div style={{ color: urgency.color, fontWeight: 800, fontSize: 20 }}>{days < 0 ? 'Expired' : `${days}d`}</div>
                <div style={{ color: '#f59e0b', fontSize: 12 }}>₹{Number(p.premium).toLocaleString()}/yr</div>
              </div>
              {days <= 30 && (
                <button onClick={() => handleRenew(p)} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
                  Renew Now
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Renewals;
