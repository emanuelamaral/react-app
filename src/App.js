// Imports
import './App.css';
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
