import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    useEffect(() => {
        const fetchNotes = async () => {
            console.log('Fetching notes from:', `${API_URL}/api/notes`);
            try {
                const response = await axios.get(`${API_URL}/api/notes`);
                setNotes(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                const backendMsg = err.response?.data?.message || err.message;
                setError(`Failed to fetch notes: ${backendMsg}. (URL: ${API_URL})`);
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) return <div className="loading">Loading notes...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="home-page">
            <h2>Your Notes</h2>
            {notes.length === 0 ? (
                <p className="empty-state">No notes found. Create your first note!</p>
            ) : (
                <div className="notes-grid">
                    {notes.map(note => (
                        <NoteCard key={note._id} note={note} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
