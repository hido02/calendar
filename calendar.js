var calendar;
        let selectedDate; // 선택한 날짜를 저장할 변수

        document.addEventListener('DOMContentLoaded', function() {
            var addEventButton = document.getElementById("add-event");
            addEventButton.addEventListener('click', function() {
                var eventTitle = document.getElementById("event-title").value;
    
                if(eventTitle && selectedDate) {
                    // 일정 객체를 생성합니다.
                    var newEvent = {
                        title: eventTitle,
                        start: selectedDate,
                    };
    
                    // 일정을 캘린더에 추가한 후, 입력 필드를 초기화하고 모달을 닫습니다.
                    calendar.addEvent(newEvent);
                    document.getElementById("event-title").value = "";
                    selectedDate = null;
                    const modal = document.getElementById('modal');
                    modal.style.display = 'none';
                } else {
                    alert("일정 제목을 입력하세요.");
                }
            });
            // 캘린더를 렌더링할 DOM 요소를 가져옵니다.
            var calendarEl = document.getElementById('calendar');

            // FullCalendar를 초기화하고 설정합니다.
            calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth', // 캘린더 초기 뷰 설정
                selectable: true, // 날짜 선택을 활성화
                events: [], // 이벤트 목록 (비어있는 배열로 시작)

                // 날짜를 클릭할 때 실행되는 이벤트 핸들러
                dateClick: function (info) {
                    console.log("Clicked event occurs: date = " + info.dateStr);

                    // 선택한 날짜를 저장하고 모달을 엽니다.
                    selectedDate = info.dateStr;
                    const modal = document.getElementById('modal');
                    modal.style.display = 'block';
                },

                // 이벤트 클릭 시 처리 (일정 삭제)
                eventClick: function(info) {
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

            // 캘린더를 렌더링합니다.
            calendar.render();
        });

        // var addEventButton = document.getElementById("add-event");


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