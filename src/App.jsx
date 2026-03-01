import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import NoteDetail from './pages/NoteDetail';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>AI Study Assistant</h1>
          <nav>
            <a href="/" className="nav-link">Home</a>
            <a href="/create" className="nav-link btn-primary">Create Note</a>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
