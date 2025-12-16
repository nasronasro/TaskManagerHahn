
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx'; 
import Home from './pages/Home.jsx';         
import Login from './pages/Login.jsx';      
import NotFound from './pages/NotFound.jsx';
import Projects from './pages/Projects.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}