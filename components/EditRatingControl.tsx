import React, { useState, useEffect } from 'react';
import { Pencil, Save, X } from 'lucide-react';

interface Props {
    initialRating: number;
    onSave: (rating: number) => void;
}

const EditRatingControl: React.FC<Props> = ({ initialRating, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [rating, setRating] = useState(initialRating);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleSave = () => {
        if (rating < 1 || rating > 3) {
            setError('Rating must be between 1 and 3');
            return;
        }
        setError(null);
        onSave(rating);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setRating(initialRating);
        setError(null);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-20 p-2 border rounded-md"
                        min={1}
                        max={3}
                    />
                    <button
                        onClick={handleSave}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        aria-label="Save"
                    >
                        <Save className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleCancel}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        aria-label="Cancel"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 group">
            <span className="text-lg font-bold">{initialRating}</span>
            <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 transition-all"
                aria-label="Edit rating"
            >
                <Pencil className="w-4 h-4" />
            </button>
        </div>
    );
};

export default EditRatingControl;