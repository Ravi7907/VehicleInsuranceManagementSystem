import { useState, useEffect } from 'react';
import { getClaims, addClaim, updateClaim, deleteClaim, getCustomers, getPolicies } from '../services/api';

function Claims() {
  const [claims, setClaims] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ policy_id: '', customer_id: '', claim_date: '', type: 'Accident', description: '', amount: '', settled_amount: 0, status: 'Pending' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    const [cl, c, p] = await Promise.all([getClaims(), getCustomers(), getPolicies()]);
    setClaims(cl.data); setCustomers(c.data); setPolicies(p.data);
  };

  const handleSubmit = async () => {
    if (!form.policy_id || !form.amount) return alert('Policy and Amount required!');
    const id = 'CLM' + String(claims.length + 1).padStart(3, '0');
    await addClaim({ ...form, id });
    setShowForm(false); load();
  };

  const handleStatusUpdate = async (claim, newStatus) => {
    await updateClaim(claim.id, { ...claim, status: newStatus });
    load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this claim?')) { await deleteClaim(id); load(); }
  };

  const statusColor = { Pending: '#f59e0b', 'Under Review': '#3b82f6', Approved: '#10b981', Rejected: '#ef4444' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#fff', margin: 0 }}>🛡️ Claims</h2>
        <button onClick={() => setShowForm(true)}
          style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
          + File Claim
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {['Pending','Under Review','Approved','Rejected'].map(s => (
          <div key={s} style={{ flex: 1, background: '#1a1a2e', border: `1px solid ${statusColor[s]}44`, borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ color: statusColor[s], fontSize: 22, fontWeight: 800 }}>{claims.filter(c => c.status === s).length}</div>
            <div style={{ color: '#888', fontSize: 11, marginTop: 2 }}>{s}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#f59e0b', marginBottom: 16 }}>File New Claim</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Policy</label>
              <select value={form.policy_id} onChange={e => setForm({ ...form, policy_id: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                <option value="">Select Policy</option>
                {policies.map(p => <option key={p.id} value={p.id}>{p.id}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Customer</label>
              <select value={form.customer_id} onChange={e => setForm({ ...form, customer_id: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                <option value="">Select Customer</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Date</label>
              <input type="date" value={form.claim_date} onChange={e => setForm({ ...form, claim_date: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                {['Accident','Theft','Natural Disaster','Vandalism','Fire','Other'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Description</label>
              <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={handleSubmit} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Submit Claim</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: '#1a1a2e', borderRadius: 12, overflow: 'hidden', border: '1px solid #333' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#0d0f14' }}>
              {['ID','Policy','Customer','Date','Type','Amount','Status','Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {claims.map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid #333' }}>
                <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: 700 }}>{c.id}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{c.policy_id}</td>
                <td style={{ padding: '12px 16px', color: '#fff' }}>{c.customer_id}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{c.claim_date?.split('T')[0]}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{c.type}</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>₹{Number(c.amount).toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <select value={c.status} onChange={e => handleStatusUpdate(c, e.target.value)}
                    style={{ background: `${statusColor[c.status]}22`, color: statusColor[c.status], border: `1px solid ${statusColor[c.status]}44`, borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    {['Pending','Under Review','Approved','Rejected'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => handleDelete(c.id)} style={{ background: '#ef444422', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Claims;
