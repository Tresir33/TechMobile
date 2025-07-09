import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import the new Home component


const Products = () => <div>Products Page (Placeholder)</div>;
const Contact = () => <div>Contact Page (Placeholder)</div>;
const SignUp = () => <div>Sign Up Page (Placeholder)</div>;
const Cart = () => <div>Order Page (Placeholder)</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/order" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;