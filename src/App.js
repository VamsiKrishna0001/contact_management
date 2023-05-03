import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactListPage from './pages/main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContactListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
