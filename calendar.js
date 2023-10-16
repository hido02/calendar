var calendar;
        let selectedDate; // 선택한 날짜를 저장할 변수

        document.addEventListener('DOMContentLoaded', function() {
            var addEventButton = document.getElementById("add-event");
            var selectedDateForAddEvent; // 선택한 날짜를 저장할 변수
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
                dayMaxEvents: true,

                // 날짜를 클릭할 때 실행되는 이벤트 핸들러
                dateClick: function (info) {
                    console.log("Clicked event occurs: date = " + info.dateStr);

                    // 선택한 날짜를 저장하고 모달을 엽니다.
                    selectedDate = info.dateStr;
                    const modal = document.getElementById('modal');
                    modal.style.display = 'block';

                    const todoContainer = document.getElementById("todoContainer");

    // 선택한 날짜에 해당하는 일정 가져오기
    const events = calendar.getEvents(); // 캘린더의 모든 이벤트 가져오기
    const selectedEvents = events.filter(function(event) {
        var inputDate = new Date(event.start.toISOString());

// 원하는 형식으로 날짜 문자열 변환
var year = inputDate.getFullYear();
var month = String(inputDate.getMonth() + 1).padStart(2, '0');
var day = String(inputDate.getDate()).padStart(2, '0');

var formattedDate = year + '-' + month + '-' + day;

        return formattedDate === selectedDate;
    });

    if (selectedEvents.length > 0) {
        // 선택한 날짜에 일정이 있는 경우
        const ul = document.createElement("ul"); // ul 요소 생성
    
        selectedEvents.forEach(function(event) {
            const li = document.createElement("li"); // li 요소 생성
            li.textContent = event.title;
            ul.appendChild(li); // li를 ul에 추가
        });
    
        todoContainer.innerHTML = ""; // todoContainer 내용 초기화
        todoContainer.appendChild(ul); // ul을 todoContainer에 추가
    } else {
        // 선택한 날짜에 일정이 없는 경우
        todoContainer.innerHTML = "일정이 없습니다.";
    }
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

            document.getElementById("rounded-button").addEventListener("click", function() {
                const modal = document.getElementById('modal');
                modal.style.display = 'block';
                
                selectedDateForAddEvent = selectedDate; // dateClick에서 가져온 날짜 사용
                console.log(selectedDateForAddEvent);
            
                // 모달 열기 이후에 입력 필드에 접근
                setTimeout(function() {
                    const eventTitleInput = document.getElementById("event-title");
                    eventTitleInput.focus();
                }, 0);
            
                // 선택한 날짜에 해당하는 일정을 출력하기 위해 새로운 이벤트를 생성
                const eventTitle = document.getElementById("event-title").value;
            
                // 일정 제목이 비어 있지 않은지 확인
                if (eventTitle) {
                    var newEvent = {
                        title: eventTitle,
                        start: selectedDate,
                    };
            
                    // 일정을 캘린더에 추가한 후, 입력 필드를 초기화하고 모달을 닫습니다.
                    addEventToCalendar(newEvent); // 추가한 이벤트를 캘린더에 추가
                    document.getElementById("event-title").value = "";
                    modal.style.display = 'none';
                } else {
                    alert("일정 제목을 입력하세요.");
                }
            });
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
            const eventTitle = document.getElementById("event-title").value;
        
            if (eventTitle && selectedDate) {
                // 일정 객체를 생성합니다.
                var newEvent = {
                    title: eventTitle,
                    start: selectedDate,
                };
        
                // 일정을 캘린더에 추가한 후, 입력 필드를 초기화하고 모달을 닫습니다.
                addEventToCalendar(newEvent); // 추가한 이벤트를 캘린더에 추가
                document.getElementById("event-title").value = "";
                const modal = document.getElementById('modal');
                modal.style.display = 'none';
            } else {
                alert("일정 제목을 입력하세요.");
            }
        });