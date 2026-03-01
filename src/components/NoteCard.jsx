import { Link } from 'react-router-dom';

const NoteCard = ({ note }) => {
    // Create a short preview of the content (max 100 chars)
    const preview = note.content.length > 100
        ? `${note.content.substring(0, 100)}...`
        : note.content;

    const formattedDate = new Date(note.createdAt).toLocaleDateString();

    return (
        <div className="card note-card">
            <div className="note-card-header">
                <h3 className="note-card-title">{note.title}</h3>
                <span className="note-card-date">{formattedDate}</span>
            </div>
            <p className="note-card-preview">{preview}</p>
            <div className="note-card-footer">
                <Link to={`/notes/${note._id}`} className="btn btn-outline">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default NoteCard;
