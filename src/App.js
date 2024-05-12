// Imports
import logo from './logo.svg';
import './App.css';
import Contador from './components/Contador';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

// Component
function App() {
  return (
    <>
      <BrowserRouter>

        <header>Minha App</header>
        <hr/>
        <main>
          <AppRoutes />
        </main>
        <hr/>
        <footer>Feito na UTF</footer>

      </BrowserRouter>      
    </>
  );
}

// Export
export default App;
