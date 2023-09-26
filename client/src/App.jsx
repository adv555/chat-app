import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Chat } from './components/chat';

function App() {
  return (
    <div className="app">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
