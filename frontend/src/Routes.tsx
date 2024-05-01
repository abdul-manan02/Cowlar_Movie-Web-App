import { Route, Routes } from 'react-router-dom';
import HomePage from '@/components/HomePage';
import Search from '@/components/Search';

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/Search" element={<Search />} />
  </Routes>
);

export default RoutesComponent;