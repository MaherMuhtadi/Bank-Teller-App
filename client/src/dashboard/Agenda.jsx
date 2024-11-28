import React, { useState } from "react";

function Agenda() {
    // Placeholder dummy schedule list relevant to a bank teller
    const scheduleList = [
        {
            schedule_id: "1",
            employee_id: "BT101",
            title: "Morning Client Appointments",
            description:
                "Assist clients with account inquiries and new account openings.",
            date: "2024-11-27",
            start_time: "9:00 AM",
        },
        {
            schedule_id: "2",
            employee_id: "BT101",
            title: "Cash Reconciliation",
            description:
                "Balance cash drawer and verify deposits from the previous day.",
            date: "2024-11-28",
            start_time: "11:30 AM",
        },
        {
            schedule_id: "3",
            employee_id: "BT101",
            title: "Compliance Training",
            description:
                "Participate in mandatory training on fraud detection and compliance policies.",
            date: "2024-11-28",
            start_time: "10:00 AM",
        },
        {
            schedule_id: "4",
            employee_id: "BT101",
            title: "Afternoon Transactions",
            description:
                "Process deposits, withdrawals, and wire transfers for clients.",
            date: "2024-11-29",
            start_time: "3:00 PM",
        },
        {
            schedule_id: "5",
            employee_id: "BT101",
            title: "Weekend Planning",
            description: "Plan next week's schedule and review targets.",
            date: "2024-11-30",
            start_time: "1:00 PM",
        },
    ];

    // State to track the current date being displayed
    const today = new Date().toISOString().split("T")[0];
    const [currentDate, setCurrentDate] = useState(today);

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

    return (
        <div className="rounded-xl bg-neutral-50 w-full p-4 mt-16 shadow-md space-y-5">
            <h2 className="font-bold text-xl text-right">Your Agenda</h2>

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
                <p className="text-center">No tasks scheduled for this day.</p>
            )}
        </div>
    );
}

export default Agenda;
