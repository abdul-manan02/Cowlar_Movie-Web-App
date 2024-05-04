import { Route, Routes } from 'react-router-dom';
import HomePage from '@/components/HomePage';

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default RoutesComponent;