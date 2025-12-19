import { useState } from 'react';
import InputField from  './InputField';
import AddButton from './AddButton';

const AddProjectModal = ({ isOpen, onClose, onSave, isSaving, addError }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [localError, setLocalError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError(null);
        if (title.length < 3) {
            setLocalError("Title must be at least 3 characters.");
            return;
        }
        
        onSave({ title, description });
        setTitle('');
        setDescription('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 transform transition-all">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                    Create New Project
                </h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        id="newTitle"
                        name="title"
                        label="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Database Refactoring"
                        type="text"
                    />
                    <div className="mb-4">
                        <label htmlFor="newDescription" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="newDescription"
                            name="description"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe the goal of the project."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>

                    {localError && (
                        <div className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded-lg">{localError}</div>
                    )}
                    {addError && (
                         <div className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded-lg">API Error: {addError}</div>
                    )}
                    
                    <div className="flex justify-end space-x-3 mt-6">
                        <AddButton 
                            type="button" 
                            onClick={onClose} 
                            disabled={isSaving}
                            className="!bg-gray-300 !text-gray-800 hover:!bg-gray-400 w-auto"
                        >
                            Cancel
                        </AddButton>
                        <AddButton type="submit" loading={isSaving} className="w-auto">
                            Save Project
                        </AddButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal