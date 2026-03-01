import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError('Title and content are required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.post(`${API_URL}/api/notes`, {
                title,
                content
            });
            navigate('/');
        } catch (err) {
            setError('Failed to create note. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="create-note-page">
            <h2>Create New Note</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="note-form card">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., React Hooks Summary"
                        className="form-control"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your study notes here..."
                        className="form-control textarea"
                        rows="10"
                        disabled={loading}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Save Note'}
                </button>
            </form>
        </div>
    );
};

export default CreateNote;
