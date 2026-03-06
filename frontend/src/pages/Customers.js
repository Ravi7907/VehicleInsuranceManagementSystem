
import { useState, useEffect } from 'react';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../services/api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', status: 'Active' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await getCustomers();
    setCustomers(res.data);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert('Name and Email required!');
    if (editing) {
      await updateCustomer(editing.id, form);
    } else {
      const id = 'C' + String(customers.length + 1).padStart(3, '0');
      await addCustomer({ ...form, id, joined_date: new Date().toISOString().split('T')[0] });
    }
    setForm({ name: '', email: '', phone: '', city: '', status: 'Active' });
    setShowForm(false); setEditing(null); load();
  };

  const handleEdit = (c) => {
    setEditing(c);
    setForm({ name: c.name, email: c.email, phone: c.phone, city: c.city, status: c.status });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this customer?')) { await deleteCustomer(id); load(); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#fff', margin: 0 }}>👥 Customers</h2>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', email: '', phone: '', city: '', status: 'Active' }); }}
          style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
          + Add Customer
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#f59e0b', marginBottom: 16 }}>{editing ? 'Edit Customer' : 'Add Customer'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Name','name'],['Email','email'],['Phone','phone'],['City','city']].map(([label, key]) => (
              <div key={key}>
                <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ color: '#888', fontSize: 12, display: 'block', marginBottom: 4 }}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#0d0f14', border: '1px solid #333', borderRadius: 8, color: '#fff' }}>
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={handleSubmit} style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
              {editing ? 'Update' : 'Save'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }}
              style={{ background: '#333', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ background: '#1a1a2e', borderRadius: 12, overflow: 'hidden', border: '1px solid #333' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#0d0f14' }}>
              {['ID','Name','Email','Phone','City','Status','Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#888', fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid #333' }}>
                <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: 700 }}>{c.id}</td>
                <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>{c.name}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{c.email}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{c.phone}</td>
                <td style={{ padding: '12px 16px', color: '#aaa' }}>{c.city}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ background: c.status === 'Active' ? '#10b98122' : '#ef444422', color: c.status === 'Active' ? '#10b981' : '#ef4444', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => handleEdit(c)} style={{ background: '#3b82f622', color: '#3b82f6', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', marginRight: 8 }}>Edit</button>
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

export default Customers;
