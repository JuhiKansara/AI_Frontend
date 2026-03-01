import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/notes');
                setNotes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch notes. Please ensure the backend is running.');
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
