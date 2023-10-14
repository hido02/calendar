var calendar;

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [],

        dateClick: function (info) {
            console.log("Clicked event occurs: date = " + info.dateStr);
            addEventToCalendar({ start: info.dateStr });
        },

        eventClick: function(info) {
            // 이벤트 클릭 시 처리 (일정 삭제)
            if (confirm("일정을 삭제하시겠습니까?")) {
                info.event.remove();
            }
        },

        editable: true, // 이벤트 편집 활성화
        eventDrop: function(info) {
            // 이벤트 드롭(재정렬) 처리
            // 할 일 목록 순서를 업데이트할 수 있습니다.
        }, 
    });
    calendar.render();

    var addEventButton = document.getElementById("add-event");
    addEventButton.addEventListener("click", function() {
        var eventTitle = document.getElementById("event-title").value;
        var eventDate = document.getElementById("event-date").value;

        if(eventTitle && eventDate) {
            var newEvent = {
                title: eventTitle,
                start: eventDate,
            }
        };

        calendar.addEvent(newEvent);
        document.getElementById("event-title").value = "";
        document.getElementById("event-date").value = "";
    })
});

function addEventToCalendar(event) {
    if (calendar) {
        calendar.addEvent(event);
    } else {
        console.log("Calendar is not initialized.");
    }
}
