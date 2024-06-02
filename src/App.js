import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter >
      <main className='telaInicial'>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
