import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter >
      <header className='telaInicial'>Minha App</header>
      <div className="line"></div>
      <main className='telaInicial'>
        <AppRoutes />
      </main>
      <div className="line"></div>
      <footer className='telaInicial'>Feito na UTF</footer>
    </BrowserRouter>
  );
}

export default App;
