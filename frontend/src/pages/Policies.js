import { useState, useEffect } from 'react';
import { getPolicies, addPolicy, deletePolicy, getCustomers, getVehicles } from '../services/api';

function Policies() {
  const [policies, setPolicies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customer_id: '', vehicle_id: '', type: 'Comprehensive', premium: '', cover_amount: '', start_date: '', end_date: '', status: 'Active', insurer: '' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    const [p, c, v] = await Promise.all([getPolicies(), getCustomers(), getVehicles()]);
    setPolicies(p.data); setCustomers(c.data); setVehicles(v.data);
  };

  const handleSubmit = async () => {
    if (!form.customer_id || !form.premium) return alert('Customer and Premium required!');
    const id = 'POL' + String(policies.length + 1).padStart(3, '0');
    await addPolicy({ ...form, id });
    setShowForm(false); load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this policy?')) { await deletePolicy(id); load(); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#fff', margin: 0 }}>📄 Policies</h2>
        <button onClick={() => setShowForm(true)}
          style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
          + New Policy
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#f59e0b', marginBottom: 16 }}>Create New Policy</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Customer</label>
              <select value={form.customer_id} onChange={e => setForm({ ...form, customer_id: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                <option value="">Select Customer</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Vehicle</label>
              <select value={form.vehicle_id} onChange={e => setForm({ ...form, vehicle_id: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                <option value="">Select Vehicle</option>
                {vehicles.map(v => <option key={v.id} value={v.id}>{v.id} - {v.make} {v.model}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Policy Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                <option>Comprehensive</option>
                <option>Third Party</option>
                <option>Third Party Fire & Theft</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Insurer</label>
              <input value={form.insurer} onChange={e => setForm({ ...form, insurer: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff', boxSizing: 'border-box' }} />
            </div>
            {[['Premium (₹)','premium'],['Cover Amount (₹)','cover_amount'],['Start Date','start_date'],['End Date','end_date']].map(([label, key]) => (
              <div key={key}>
                <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>{label}</label>
                <input type={key.includes('date') ? 'date' : 'number'} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={handleSubmit} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Save Policy</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: '#1a1a2e', borderRadius: 12, overflow: 'hidden', border: '1px solid #333' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#0d0f14' }}>
              {['ID','Customer','Vehicle','Type','Premium','Cover','Expires','Status','Insurer','Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {policies.map(p => (
              <tr key={p.id} style={{ borderTop: '1px solid #333' }}>
                <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: 700 }}>{p.id}</td>
                <td style={{ padding: '12px 16px', color: '#fff' }}>{p.customer_id}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{p.vehicle_id}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{p.type}</td>
                <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>₹{Number(p.premium).toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>₹{Number(p.cover_amount).toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{p.end_date?.split('T')[0]}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: p.status === 'Active' ? '#10b98122' : '#ef444422', color: p.status === 'Active' ? '#10b981' : '#ef4444', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{p.status}</span>
                </td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{p.insurer}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => handleDelete(p.id)} style={{ background: '#ef444422', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Policies;
