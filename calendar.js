var calendar;
let selectedDate; // 선택한 날짜를 저장할 변수

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [],

        dateClick: function (info) {
            console.log("Clicked event occurs: date = " + info.dateStr);
            
            // 모달을 열 때 선택한 날짜를 저장
            selectedDate = info.dateStr;
            
            const modal = document.getElementById('modal');
            modal.style.display = 'block';
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
        
        if(eventTitle && selectedDate) {
            var newEvent = {
                title: eventTitle,
                start: selectedDate,
            };

            calendar.addEvent(newEvent);
            document.getElementById("event-title").value = "";
            selectedDate = null; // 선택한 날짜 초기화
            const modal = document.getElementById('modal');
            modal.style.display = 'none'; // 모달 닫기
        } else {
            alert("일정 제목을 입력하세요.");
        }
    })
});

function addEventToCalendar(event) {
    if (calendar) {
        calendar.addEvent(event);
    } else {
        console.log("Calendar is not initialized.");
    }
}

// 모달 닫기 버튼 클릭
document.getElementById('modal-close').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});

// 모달 저장 버튼 클릭
document.getElementById('modal-save').addEventListener('click', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});
