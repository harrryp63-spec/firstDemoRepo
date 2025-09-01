import "./common/globalStyles.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/firstDemoRepo" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

