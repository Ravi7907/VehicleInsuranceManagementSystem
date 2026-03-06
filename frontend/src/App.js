import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Vehicles from './pages/Vehicles';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import Renewals from './pages/Renewals';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#0d0f14' }}>
        <Sidebar />
        <div style={{ marginLeft: 220, flex: 1, padding: 28 }}>
          <Routes>
            <Route path="/"          element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/vehicles"  element={<Vehicles />} />
            <Route path="/policies"  element={<Policies />} />
            <Route path="/claims"    element={<Claims />} />
            <Route path="/renewals"  element={<Renewals />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
