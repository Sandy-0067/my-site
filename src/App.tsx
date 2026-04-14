import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-indigo-50">
        <Routes>
          <Route path="/" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;