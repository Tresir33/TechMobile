import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import the new Home component
import SignUp from './pages/SignUp'; // Import the new Sign up component
import LogIn from './pages/LogIn'; // Import the new LogIn component
import Contact from './pages/Contact'; // Import the new LogIn component


const Products = () => <div>Products Page (Placeholder)</div>;
const Cart = () => <div>Order Page (Placeholder)</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/order" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;