import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router.jsx';
import Header from './components/Navbar/Header.jsx';

function App() {
  return (
    <div className="Sales">
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;