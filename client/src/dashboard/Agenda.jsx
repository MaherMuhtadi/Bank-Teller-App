import React, { useState } from "react";

function Agenda() {
    const employeeId = sessionStorage.getItem("employee_id");

    // Placeholder dummy schedule list relevant to a bank teller
    const [scheduleList, setScheduleList] = useState([
        {
            schedule_id: "1",
            employee_id: employeeId,
            title: "Morning Client Appointments",
            description:
                "Assist clients with account inquiries and new account openings.",
            date: "2024-11-27",
            start_time: "9:00 AM",
        },
        {
            schedule_id: "2",
            employee_id: employeeId,
            title: "Cash Reconciliation",
            description:
                "Balance cash drawer and verify deposits from the previous day.",
            date: "2024-11-28",
            start_time: "11:30 AM",
        },
        {
            schedule_id: "3",
            employee_id: employeeId,
            title: "Compliance Training",
            description:
                "Participate in mandatory training on fraud detection and compliance policies.",
            date: "2024-11-28",
            start_time: "10:00 AM",
        },
        {
            schedule_id: "4",
            employee_id: employeeId,
            title: "Afternoon Transactions",
            description:
                "Process deposits, withdrawals, and wire transfers for clients.",
            date: "2024-11-29",
            start_time: "3:00 PM",
        },
        {
            schedule_id: "5",
            employee_id: employeeId,
            title: "Weekend Planning",
            description: "Plan next week's schedule and review targets.",
            date: "2024-11-30",
            start_time: "1:00 PM",
        },
    ]);

    // State to track the current date being displayed
    const today = new Date().toISOString().split("T")[0];
    const [currentDate, setCurrentDate] = useState(today);

    // State to toggle between agenda and form
    const [isAddingTask, setIsAddingTask] = useState(false);

    // State to hold new task details
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        date: currentDate,
        start_time: "",
    });

    // Function to adjust the current date
    const adjustDate = (days) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        setCurrentDate(newDate.toISOString().split("T")[0]);
    };

    // Function to handle date input from the calendar widget
    const handleDateChange = (e) => {
        setCurrentDate(e.target.value);
    };

    // Sort events by date and time
    const sortedSchedule = scheduleList.sort((a, b) => {
        const dateComparison = new Date(a.date) - new Date(b.date);
        if (dateComparison !== 0) return dateComparison;

        // Compare times if dates are the same
        const timeA = new Date(`1970-01-01T${a.start_time}`).getTime();
        const timeB = new Date(`1970-01-01T${b.start_time}`).getTime();
        return timeA - timeB;
    });

    // Filter events for the selected date
    const eventsForDate = sortedSchedule.filter(
        (event) => event.date === currentDate
    );

    // Function to handle form input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({ ...prev, [name]: value }));
    };

    // Utility function to convert 24-hour time to AM/PM format
    const toAmPmFormat = (time24) => {
        const [hour, minute] = time24.split(":");
        const hourInt = parseInt(hour, 10);
        const period = hourInt >= 12 ? "PM" : "AM";
        const hour12 = hourInt % 12 || 12; // Convert 0 to 12 for AM/PM format
        return `${hour12}:${minute} ${period}`;
    };

    // Function to post new task
    const postNewTask = () => {
        const updatedScheduleList = [
            ...scheduleList,
            {
                ...newTask,
                start_time: toAmPmFormat(newTask.start_time), // Convert to AM/PM format
                schedule_id: (scheduleList.length + 1).toString(),
                employee_id: employeeId,
            },
        ];
        setScheduleList(updatedScheduleList);
        setIsAddingTask(false); // Switch back to schedule view
    };

    return (
        <div className="rounded-xl bg-neutral-50 w-full p-4 mt-16 shadow-md">
            {isAddingTask ? (
                <div className="space-y-5">
                    <h2 className="font-bold text-xl text-right">
                        Add New Task
                    </h2>
                    <form className="space-y-5">
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="agenda-title">Title</label>
                            <input
                                id="agenda-title"
                                type="text"
                                name="title"
                                value={newTask.title}
                                onChange={handleFormChange}
                                className="rounded-md border text-lg p-1"
                            />
                        </div>
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="agenda-description">
                                Description
                            </label>
                            <textarea
                                id="agenda-description"
                                name="description"
                                value={newTask.description}
                                onChange={handleFormChange}
                                className="rounded-md border text-lg p-1"
                            ></textarea>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="agenda-date">Date</label>
                            <input
                                id="agenda-date"
                                type="date"
                                name="date"
                                value={newTask.date}
                                onChange={handleFormChange}
                                className="rounded-md border text-lg p-1"
                            />
                        </div>
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="agenda-start-time">
                                Start Time
                            </label>
                            <input
                                id="agenda-start-time"
                                type="time"
                                name="start_time"
                                value={newTask.start_time}
                                onChange={handleFormChange}
                                className="rounded-md border text-lg p-1"
                            />
                        </div>
                    </form>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setIsAddingTask(false)}
                            className="bg-gray-400 p-2 w-fit rounded-md text-white"
                        >
                            Back
                        </button>
                        <button
                            onClick={postNewTask}
                            className="bg-blue-500 p-2 w-fit rounded-md text-white"
                        >
                            Add
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-5">
                    <h2 className="font-bold text-xl text-right">
                        Your Agenda
                    </h2>

                    {/* Date Navigation and Calendar Widget */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => adjustDate(-1)}
                            className="bg-blue-500 text-white rounded-md w-20 p-2"
                        >
                            Previous
                        </button>
                        <input
                            type="date"
                            value={currentDate}
                            onChange={handleDateChange}
                            className="rounded-md border text-lg p-1"
                        />
                        <button
                            onClick={() => adjustDate(1)}
                            className="bg-blue-500 text-white rounded-md w-20 p-2"
                        >
                            Next
                        </button>
                    </div>

                    {/* Add Task Button */}
                    <button
                        onClick={() => setIsAddingTask(true)}
                        className="bg-green-500 text-white rounded-md px-4 py-2 mt-4"
                    >
                        Add Task
                    </button>

                    {/* Display Events */}
                    {eventsForDate.length > 0 ? (
                        <ul className="space-y-5">
                            {eventsForDate.map((event) => (
                                <li
                                    key={event.schedule_id}
                                    className="rounded-xl p-4 bg-gray-100 shadow-md"
                                >
                                    <h3 className="font-semibold text-lg">
                                        {event.title}
                                    </h3>
                                    <p>{event.description}</p>
                                    <div className="flex justify-end">
                                        <span className="text-sm">
                                            {event.start_time}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center">
                            No tasks scheduled for this day.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Agenda;
