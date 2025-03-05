import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import { AuthProvider } from './contexts/AuthContext';
import { FC } from 'react';
import "./App.css";

const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;