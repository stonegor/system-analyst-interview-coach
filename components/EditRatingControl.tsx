import React, { useState, useEffect } from 'react';
import { Pencil, Save, X } from 'lucide-react';

interface Props {
    initialRating: number;
    onSave: (rating: number) => void;
    children?: React.ReactNode;
}

const EditRatingControl: React.FC<Props> = ({ initialRating, onSave, children }) => {
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
            <div className="flex flex-col gap-2 p-2 border rounded-xl bg-white shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">Изменить оценку:</span>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-16 p-2 border rounded-md text-center"
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
        <div className="relative group">
            {children || <span className="text-lg font-bold">{initialRating}</span>}
            <button
                onClick={() => setIsEditing(true)}
                className="absolute -top-2 -right-2 md:opacity-0 md:group-hover:opacity-100 opacity-100 p-1.5 bg-white text-slate-400 hover:text-primary hover:bg-blue-50 border border-slate-200 rounded-full shadow-sm transition-all z-10"
                aria-label="Edit rating"
            >
                <Pencil className="w-3 h-3" />
            </button>
        </div>
    );
};

export default EditRatingControl;