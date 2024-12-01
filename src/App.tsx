import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudyRecruit from './pages/StudyRecruit';
import StudyRoom from './pages/StudyRoom';
import ExternalStudyRoom from './pages/ExternalStudyRoom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-apple-gray-50">
        <Navbar />
        <main className="ml-72 p-12">
          <Routes>
            <Route path="/" element={<Navigate to="/study-recruit" replace />} />
            <Route path="/study-recruit" element={<StudyRecruit />} />
            <Route path="/study-room" element={<StudyRoom />} />
            <Route path="/external-study" element={<ExternalStudyRoom />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
