import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/"></Route>
          <Route path="/main"></Route>
          <Route path="/propile"></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
