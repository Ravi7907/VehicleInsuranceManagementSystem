
import { useState, useEffect } from 'react';
import { getVehicles, addVehicle, deleteVehicle, getCustomers } from '../services/api';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customer_id: '', type: 'Car', make: '', model: '', year: '', reg_no: '', color: '', fuel_type: 'Petrol' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    const [v, c] = await Promise.all([getVehicles(), getCustomers()]);
    setVehicles(v.data); setCustomers(c.data);
  };

  const handleSubmit = async () => {
    if (!form.make || !form.reg_no) return alert('Make and Reg No required!');
    const id = 'V' + String(vehicles.length + 1).padStart(3, '0');
    await addVehicle({ ...form, id });
    setForm({ customer_id: '', type: 'Car', make: '', model: '', year: '', reg_no: '', color: '', fuel_type: 'Petrol' });
    setShowForm(false); load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this vehicle?')) { await deleteVehicle(id); load(); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#fff', margin: 0 }}>🚗 Vehicles</h2>
        <button onClick={() => setShowForm(true)}
          style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
          + Register Vehicle
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#f59e0b', marginBottom: 16 }}>Register New Vehicle</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Owner</label>
              <select value={form.customer_id} onChange={e => setForm({ ...form, customer_id: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                <option value="">Select Customer</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                <option>Car</option><option>Bike</option>
              </select>
            </div>
            {[['Make','make'],['Model','model'],['Year','year'],['Registration No','reg_no'],['Color','color']].map(([label, key]) => (
              <div key={key}>
                <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Fuel Type</label>
              <select value={form.fuel_type} onChange={e => setForm({ ...form, fuel_type: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                <option>Petrol</option><option>Diesel</option><option>CNG</option><option>Electric</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={handleSubmit} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Save</button>
            <button onClick={() => setShowForm(false)} style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: '#1a1a2e', borderRadius: 12, overflow: 'hidden', border: '1px solid #333' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#0d0f14' }}>
              {['ID','Type','Make','Model','Year','Reg No','Fuel','Owner','Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map(v => (
              <tr key={v.id} style={{ borderTop: '1px solid #333' }}>
                <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: 700 }}>{v.id}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: v.type === 'Car' ? '#3b82f622' : '#8b5cf622', color: v.type === 'Car' ? '#3b82f6' : '#8b5cf6', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{v.type}</span>
                </td>
                <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>{v.make}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{v.model}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{v.year}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{v.reg_no}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{v.fuel_type}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{v.customer_id}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => handleDelete(v.id)} style={{ background: '#ef444422', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vehicles;