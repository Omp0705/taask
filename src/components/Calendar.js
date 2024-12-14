import React, { useState, useEffect } from 'react';
import EventModal from './EventModal';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Get the current month's days
  const getDaysInMonth = () => {
    const daysInMonth = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Fill the grid with days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    return daysInMonth;
  };

  // Handle previous and next month navigation
  const changeMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  // Handle month selection from the dropdown
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setCurrentDate(new Date(currentDate.getFullYear(), selectedMonth, 1));
  };

  // Load events from localStorage on page load
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || {};
    setEvents(savedEvents);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Handle event click to open the modal
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setCurrentEvent(events[day.toDateString()] || null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Handle event saving or editing
  const handleSaveEvent = (event) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[selectedDay.toDateString()] = event;
      return updatedEvents;
    });
    setIsModalOpen(false);
  };

  // Handle event deletion
  const handleDeleteEvent = () => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      delete updatedEvents[selectedDay.toDateString()];
      return updatedEvents;
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-600">Welcome to Your Personal Calendar</h1>
        <p className="text-gray-500 text-lg">Organize your events effortlessly and stay on top of your schedule.</p>
      </div>

      {/* Navigation Section */}
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="flex items-center space-x-4">
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md transform transition duration-200 hover:bg-indigo-700 focus:outline-none"
            onClick={() => changeMonth(-1)}
          >
            Previous
          </button>

          <div>
            <span className="text-2xl font-bold text-gray-800">
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </span>
          </div>

          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md transform transition duration-200 hover:bg-indigo-700 focus:outline-none"
            onClick={() => changeMonth(1)}
          >
            Next
          </button>
        </div>

        {/* Month Selector */}
        <select
          className="px-4 py-2 rounded-lg shadow-md border focus:outline-none"
          onChange={handleMonthChange}
          value={currentDate.getMonth()}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <option key={index} value={index}>
              {new Date(0, index).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 text-center">
        {getDaysInMonth().map((day) => (
          <div
            key={day}
            className={`p-4 cursor-pointer rounded-lg transition duration-300 ease-in-out ${
              day.toDateString() === new Date().toDateString() ? 'bg-indigo-300 text-white' : 'hover:bg-indigo-200'
            } ${events[day.toDateString()] ? 'bg-indigo-100' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <div className="text-xl font-semibold text-gray-800">{day.getDate()}</div>
            {events[day.toDateString()] && (
              <div className="text-sm text-gray-600 mt-1">{events[day.toDateString()].name}</div>
            )}
          </div>
        ))}
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={currentEvent}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default Calendar;
