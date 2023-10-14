const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear(); // 현재 년도
let currMonth = date.getMonth(); // 현재 월 (0부터 시작)
let currDay = date.getDate(); // 현재 일
let currDayOfWeek = date.getDay(); 

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear() ? "active" : "";
        
        // 날짜에 해당하는 이벤트를 찾아봅니다.
        const eventForDate = events.find(event => event.date === `${currYear}-${currMonth + 1}-${i}`);
        if (eventForDate) {
            liTag += `<li class="${isToday} has-event">${i}</li>`;
        } else {
            liTag += `<li class="${isToday}">${i}</li>`;
        }
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}


const currentDateElement = document.querySelector(".current-date");
const daysElement = document.querySelector(".days");
const miniCalendar = document.getElementById("mini-calendar");

let currentYear = currYear;
let currentMonth = currMonth;

const events = [];

function generateCalendar() {
    currentDateElement.textContent = `${months[currentMonth]} ${currentYear}`;

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    daysElement.innerHTML = '';

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        daysElement.innerHTML += '<li></li>';
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        daysElement.innerHTML += `<li${day === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear() ? ' class="active"' : ''}>${day}</li>`;
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const dayElement = document.createElement('li');
        dayElement.textContent = day;
        
        // Check if the current day matches the date, month, and year
        if (day === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear()) {
            dayElement.classList.add('active');
            // Add a click event to update the mini-calendar when the current day is clicked
            dayElement.addEventListener('click', () => {
                // Update the global date and month variables
                date = new Date(currentYear, currentMonth, day);
                currDay = day;
    
                // Re-render the mini-calendar
                generateMiniCalendar();
            });
        }
        
        daysElement.appendChild(dayElement);
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const dayElement = document.createElement('li');
        dayElement.textContent = day;
        
        if (day === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear()) {
            dayElement.classList.add('active');
            dayElement.addEventListener('click', () => {
                date = new Date(currentYear, currentMonth, day);
                currDay = day;
                generateMiniCalendar(); // 미니 캘린더를 업데이트
            });
        }
        
        daysElement.appendChild(dayElement);
    }
}

generateCalendar();
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
        generateMiniCalendar();
    });
});

function generateMiniCalendar() {
    const miniCalendarDate = document.getElementById("date");
    const miniCalendarDay = document.getElementById("day");
    const miniCalendarMonth = document.getElementById("month");
    const miniCalendarYear = document.getElementById("year");

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currDayOfWeek = daysOfWeek[new Date(currentYear, currentMonth, currDay).getDay()];

    miniCalendarDate.innerHTML = currDay; // 일
    miniCalendarDay.innerHTML = currDayOfWeek; // 요일
    miniCalendarMonth.innerHTML = months[currentMonth]; // 월
    miniCalendarYear.innerHTML = currentYear; // 년
}

generateMiniCalendar();




document.getElementById("add-event").addEventListener("click", () => {
    const eventDate = document.getElementById("event-date").value;
    const eventTitle = document.getElementById("event-title").value;

    if (eventDate && eventTitle) {
        events.push({ date: eventDate, title: eventTitle });
        updateEventList();
    }
});

function updateEventList() {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    for (const event of events) {
        const li = document.createElement("li");
        li.textContent = `${event.date}: ${event.title}`;
        eventList.appendChild(li);
    }
}

updateEventList();
