import React, { useState, useEffect } from 'react';

const EventModal = ({ isOpen, onClose, onSave, onDelete, event, isEditing, setIsEditing }) => {
  const [eventName, setEventName] = useState(event ? event.name : '');
  const [eventDetails, setEventDetails] = useState(event ? event.details : '');

  useEffect(() => {
    if (event) {
      setEventName(event.name);
      setEventDetails(event.details);
    }
  }, [event]);

  const handleSave = () => {
    onSave({ name: eventName, details: eventDetails });
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{isEditing ? 'Edit Event' : 'Add Event'}</h2>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <textarea
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Event Details"
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
              onClick={handleSave}
            >
              Save Event
            </button>
            {isEditing && (
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                onClick={handleDelete}
              >
                Delete Event
              </button>
            )}
            <button
              className="text-gray-600 px-6 py-2 rounded-lg hover:text-indigo-600 transition duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EventModal;
