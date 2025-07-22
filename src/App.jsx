import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router.jsx';
import Header from './components/Navbar/Header.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function App() {
  return (
    <div className="Sales">
      <BrowserRouter>
        <Header />
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;