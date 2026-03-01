import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NoteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chatMessage, setChatMessage] = useState('');

    const [aiResponse, setAiResponse] = useState('');
    const [responseTime, setResponseTime] = useState(null);
    const [askingAi, setAskingAi] = useState(false);
    const [aiError, setAiError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/notes/${id}`);
                setNote(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch note details.');
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await axios.delete(`${API_URL}/api/notes/${id}`);
                navigate('/');
            } catch (err) {
                alert('Failed to delete note');
            }
        }
    };

    const handleAskAI = async (e) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        setAskingAi(true);
        setAiError('');
        setAiResponse('');
        setResponseTime(null);

        try {
            const response = await axios.post(`${API_URL}/api/ask`, {
                question: chatMessage,
                noteId: id
            });

            setAiResponse(response.data.answer);
            setResponseTime(response.data.responseTimeMs);
        } catch (err) {
            setAiError('Failed to get an answer from the AI Tutor.');
            console.error(err);
        } finally {
            setAskingAi(false);
            setChatMessage('');
        }
    };

    if (loading) return <div className="loading">Loading note details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!note) return <div className="error-message">Note not found</div>;

    return (
        <div className="note-detail-page">
            <div className="note-header">
                <Link to="/" className="back-link">&larr; Back to Notes</Link>
                <button onClick={handleDelete} className="btn btn-danger">Delete Note</button>
            </div>

            <article className="card note-content-card">
                <h2 className="note-title">{note.title}</h2>
                <div className="note-meta">
                    Created: {new Date(note.createdAt).toLocaleDateString()}
                </div>
                <div className="note-body">
                    {note.content.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>
            </article>

            <div className="ai-tutor-section card mt-4">
                <h3>Ask AI Tutor</h3>
                <p className="ai-description">Ask a question about this note to get an AI-generated explanation.</p>

                <form onSubmit={handleAskAI} className="ai-chat-form">
                    <div className="form-group flex-row">
                        <textarea
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="E.g., Can you summarize this note?"
                            className="form-control textarea"
                            disabled={askingAi}
                            rows="3"
                        ></textarea>
                        <button type="submit" className="btn btn-primary ml-2" disabled={askingAi}>
                            {askingAi ? 'Thinking...' : 'Ask AI Tutor'}
                        </button>
                    </div>
                </form>

                {aiError && <div className="error-message mt-4">{aiError}</div>}

                {aiResponse && (
                    <div className="ai-response-box mt-4 p-4 border rounded bg-gray-50">
                        <h4 className="text-primary mb-2">AI Tutor Response:</h4>
                        <div className="note-body" style={{ whiteSpace: 'pre-wrap' }}>
                            {aiResponse}
                        </div>
                        {responseTime && (
                            <div className="ai-meta mt-3 text-light" style={{ fontSize: '0.9rem' }}>
                                Answer generated in {(responseTime / 1000).toFixed(2)} seconds
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoteDetail;
