const currentDateElement = document.querySelector(".current-date");
const daysElement = document.querySelector(".days");
const miniCalendar = document.getElementById("mini-calendar");

const events = [];

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDay = date.getDate();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    function renderCalendar() {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currDayOfWeek = daysOfWeek[new Date(currentYear, currentMonth, currentDay).getDay()];
    
        currentDateElement.textContent = `${months[currentMonth]} ${currentYear}`;
    
        daysElement.innerHTML = "";
    
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            daysElement.innerHTML += '<li></li>';
        }
    
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const dayElement = document.createElement("li");
            dayElement.textContent = day;
    
            if (day === currentDay && currentMonth === date.getMonth() && currentYear === date.getFullYear()) {
                dayElement.classList.add("active");
                dayElement.addEventListener("click", () => {
                    currentYear = new Date(currentYear, currentMonth, day).getFullYear();
                    currentMonth = new Date(currentYear, currentMonth, day).getMonth();
                    currentDay = day;
                    generateMiniCalendar();
                    renderCalendar();
                });
            }
    
            const eventForDate = events.find(event => {
                const eventDate = new Date(event.date);
                const eventYear = eventDate.getFullYear();
                const eventMonth = eventDate.getMonth();
                const eventDay = eventDate.getDate();
            
                return eventYear === currentYear && eventMonth === currentMonth && eventDay === day;
            });
            
    
            if (eventForDate) {
                dayElement.classList.add("has-event");
                dayElement.addEventListener("click", () => {
                    // Handle event click (e.g., show event details)
                    alert(`Event: ${eventForDate.title}`);
                });
            }
    
            daysElement.appendChild(dayElement);
        }
    }
    

function generateMiniCalendar() {
    const miniCalendarDate = document.getElementById("date");
    const miniCalendarDay = document.getElementById("day");
    const miniCalendarMonth = document.getElementById("month");
    const miniCalendarYear = document.getElementById("year");

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currDayOfWeek = daysOfWeek[new Date(currentYear, currentMonth, currentDay).getDay()];

    miniCalendarDate.textContent = currentDay;
    miniCalendarDay.textContent = currDayOfWeek;
    miniCalendarMonth.textContent = months[currentMonth];
    miniCalendarYear.textContent = currentYear;
}

function updateEventList() {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    for (const event of events) {
        const li = document.createElement("li");
        li.textContent = `${event.date}: ${event.title}`;
        eventList.appendChild(li);
    }
}

document.getElementById("add-event").addEventListener("click", () => {
    const eventDate = document.getElementById("event-date").value;
    const eventTitle = document.getElementById("event-title").value;

    if (eventDate && eventTitle) {
        events.push({ date: eventDate, title: eventTitle });
        updateEventList();
        renderCalendar();
    }
});

renderCalendar();
generateMiniCalendar();
updateEventList();
