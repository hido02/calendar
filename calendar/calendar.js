    // 현재 날짜 가져오기
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let currentMonthElement =  document.getElementById("current-month");

    const categoryColors = {
        "회의": "#FF5722",
        "일정": "#007bff",
        "파티": "#FF9800"
    }

    const events = [
        {
          date: new Date(2023, 10, 16), // 이벤트 날짜 (년, 월, 일을 나타내는 Date 객체)
          title: "회의", // 이벤트 제목
          description: "프로젝트 회의", // 이벤트 설명
          category: "회의",
          color: categoryColors,
        },
        // 다른 이벤트들을 추가할 수 있습니다.
      ];

      function updateEventList() {
        const eventList = document.getElementById('event-list'); 
        // 이벤트 목록을 비우고 다시 채웁니다.
        eventList.innerHTML = '';
    
        events.forEach((event, index) => {
            const listItem = document.createElement('li');
            const formattedDate = formatDate(event.date);
            event.color = categoryColors[event.category] || "#000";
            listItem.dataset.index = index; // 인덱스 설정
    
            // 이벤트의 카테고리를 확인하고 뱃지 생성
            const categoryBadge = document.createElement('div');
            categoryBadge.className = 'category-badge';
            categoryBadge.textContent = event.category;
    
            listItem.innerHTML = `
                <h2>${event.title}</h2>
                <div class="category-badge" style="background-color: ${event.color}; color: white;">${event.category}</div>
                ${formattedDate}<br>
                ${event.description}<br>
                <i class="fas fa-trash delete-event" data-index="${index}"></i>
            `;
    
            // 삭제 버튼에 클릭 이벤트 리스너 추가
            const deleteButton = listItem.querySelector('.delete-event');
            deleteButton.addEventListener('click', function () {
              event.stopPropagation(); // 부모 요소의 click 이벤트 전파 방지
                deleteEvent(index);
            });

            eventList.appendChild(listItem);

            listItem.addEventListener('click', function () {
              console.log("리스트 아이템 클릭됨");
              displayEventDetails(event);
            });


        });
    }

          // 캘린더 업데이트 함수
          function updateCalendar() {
            const monthDays = document.createDocumentFragment();
            const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
        
            // 달의 첫날 가져오기
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        
            for (let i = 0; i < firstDay; i++) {
              const day = document.createElement("div");
              day.className = "empty";
              monthDays.appendChild(day);
            }
        
             // 이전에 캘린더에 표시되었던 날짜들을 제거하고, 그 다음에 새로운 날짜 요소를 추가
            while (calendar.firstChild) {
              calendar.removeChild(calendar.firstChild);
            }
        
            for (let day = 1; day <= lastDay; day++) {
              const date = new Date(currentYear, currentMonth, day);
              const dayElement = document.createElement("div");
              dayElement.className = "day";
              dayElement.textContent = day;
        
              // Check if there is an event on this date
              const event = events.find((event) => {
                const eventDate = new Date(event.date);
                const currentDate = new Date(date);
                const eventDateString = eventDate.getFullYear() + '-' + (eventDate.getMonth() + 1) + '-' + eventDate.getDate();
                const currentDateString = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
                console.log("이벤트 객체의 date", );
                console.log("현재 날짜의 date", currentDateString);

                const categoryColor = categoryColors[event.category] || "#000";
                
        
                return eventDateString=== currentDateString;
              });
        
              if (event) {
                dayElement.innerHTML += `
                <div class="markup"></div>
                `
        
                // Add an event handler to display event details
                dayElement.addEventListener("click", function () {
                  displayEventDetails(event);
                });
              }
        
              monthDays.appendChild(dayElement);
            }
        
            calendar.innerHTML = "";
            calendar.appendChild(monthDays);
        
            // 전역 `currentMonthElement`를 사용
            currentMonthElement.textContent = `${currentYear}년 ${currentMonth + 1}월`;
          }

          
        function formatDate(date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고, 두 자리로 포맷
            const day = date.getDate().toString().padStart(2, '0'); // 날짜를 두 자리로 포맷
          
            return `${year}-${month}-${day}`;
          }

document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const eventModal = document.getElementById('event-add-modal');
    const eventShowModal = document.getElementById('event-show-modal');

    const addEventBtn = document.getElementById('add-event');
    const closeEventModalBtn = document.getElementById('close-modal');
    const closeShowEventModalBtn = document.getElementById('close-show-modal'); // 추가: 이벤트 모달 업데이트
    const saveEventBtn = document.getElementById('save-event');
    const eventDateInput = document.getElementById('event-date');
    const eventTitleInput = document.getElementById('event-title');
    const eventDescriptionInput = document.getElementById('event-description');
    const eventCategory =  document.getElementById('event-category');
    const eventList = document.getElementById('event-list');


          // 이벤트 삭제 함수
function deleteEvent(index) {
    events.splice(index, 1); // 이벤트 목록에서 제거
    updateEventList(); // 이벤트 목록 업데이트
    updateCalendar(); // 캘린더 업데이트
  }

  function updateEventList() {
    // 이벤트 목록을 비우고 다시 채웁니다.
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const listItem = document.createElement('li');
        const formattedDate = formatDate(event.date);
        event.color = categoryColors[event.category] || "#000";

        // 이벤트의 카테고리를 확인하고 뱃지 생성
        const categoryBadge = document.createElement('div');
        categoryBadge.className = 'category-badge';
        categoryBadge.textContent = event.category;

        listItem.innerHTML = `
            <h2>${event.title}</h2>
            <div class="category-badge" style="background-color: ${event.color}; color: white;">${event.category}</div>
            ${formattedDate}<br>
            ${event.description}<br>
            <i class="fas fa-trash delete-event" data-index="${index}"></i>
        `;

        // 삭제 버튼에 클릭 이벤트 리스너 추가
        const deleteButton = listItem.querySelector('.delete-event');
        deleteButton.addEventListener('click', function () {
            deleteEvent(index);
        });

        eventList.appendChild(listItem);
    });
}


  updateEventList();
  
    // 초기 캘린더 업데이트
    updateCalendar();

    function saveEvent() {
        const date = new Date(eventDateInput.value); // 입력된 날짜 가져오기
        const title = eventTitleInput.value; // 입력된 제목 가져오기
        const description = eventDescriptionInput.value; // 입력된 설명 가져오기
        const category = eventCategory.value;
      
        // 유효한 날짜인지 확인
        if (isNaN(date.getTime())) {
          alert('올바른 날짜를 입력하세요.');
          return;
        }
      
        const color = categoryColors[category] || "#000";
      
        // 새 이벤트 생성
        const newEvent = {
          date: date,
          title: title,
          description: description,
          category: category,
        };
      
        // 이벤트 목록에 추가
        events.push(newEvent);
      
        // 모달 닫기
        eventModal.style.display = 'none';
      
        // 이벤트 목록 업데이트
        updateEventList();
      
        // 캘린더 업데이트
        updateCalendar();
      }

      saveEventBtn.addEventListener('click', saveEvent);

    addEventBtn.addEventListener('click', function() {
        eventModal.style.display = 'block'; // 모달을 표시
      });

      function closeEventModal() {
        eventModal.style.display = 'none';
    }

    closeEventModalBtn.addEventListener('click', closeEventModal);

    // 추가: 이벤트 모달 닫기 함수
    function closeShowEventModal() {
        eventShowModal.style.display = 'none';
    }

    closeShowEventModalBtn.addEventListener('click', closeShowEventModal);


  });

  function editEvent(eventToEdit) {
    const editModal = document.getElementById('edit-event-modal');
    if (editModal) {
        const saveEditBtn = document.getElementById('save-edit-event');
        const eventTitleInput = document.getElementById('edit-event-title');
        const eventDescriptionInput = document.getElementById('edit-event-description');
        const eventCategoryInput = document.getElementById('edit-event-category');

        if (eventTitleInput && eventDescriptionInput && eventCategoryInput) {
            eventTitleInput.value = eventToEdit.title;
            eventDescriptionInput.value = eventToEdit.description;
            eventCategoryInput.value = eventToEdit.category;

            saveEditBtn.onclick = function () {
                eventToEdit.title = eventTitleInput.value;
                eventToEdit.description = eventDescriptionInput.value;
                eventToEdit.category = eventCategoryInput.value;
                console.log(eventToEdit);

                updateEventList();
                displayEventDetails(eventToEdit)
                editModal.style.display = 'none';
            };
            editModal.style.display = 'block';
        }
    }
}
  
  function displayEventDetails(event) {
    // 이벤트 정보를 모달 창 내에 표시
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDate = document.getElementById('modal-date');
    const modalCategory = document.getElementById('category-badge'); 
    const showEventModal = document.getElementById('event-show-modal'); // 추가: 이벤트 모달 업데이트
    const editEventBtn = document.getElementById('edit-event');

    modalCategory.textContent = event.category;
    modalTitle.textContent = event.title;
    modalDescription.textContent = event.description;
    modalDate.textContent = formatDate(event.date);


    // 모달 창을 표시
    showEventModal.style.display = 'block';

    editEventBtn.addEventListener('click', function () {
        editEvent(event);
    });
}

const closeEditModalBtn = document.getElementById('close-edit-modal');
closeEditModalBtn.addEventListener('click', function() {
    const editEventModal = document.getElementById('edit-event-modal');
    editEventModal.style.display = 'none';
})



  

    // 탐색을 위한 이벤트 리스너
    document.getElementById("prev-month").addEventListener("click", function () {
        if (currentMonth > 0) {
          currentMonth--;
        } else {
          currentYear--;
          currentMonth = 11;
        }
        updateCalendar();
      });
      
      document.getElementById("next-month").addEventListener("click", function () {
        if (currentMonth < 11) {
          currentMonth++;
        } else {
          currentYear++;
          currentMonth = 0;
        }
        updateCalendar();
      });
      


  


 