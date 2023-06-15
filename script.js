var currentWeekStart;
var currentWeekEnd;
var events = [];

// Seite initialisieren
function initPage() {
  currentWeekStart = new Date();
  currentWeekEnd = new Date();
  currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay() + 1);
  currentWeekEnd.setDate(currentWeekEnd.getDate() - currentWeekEnd.getDay() + 7);

  showCalendar();
}

// Kalender anzeigen
function showCalendar() {
  var weekInfo = document.getElementById("weekInfo");
  weekInfo.textContent = "KW " + getWeekNumber(currentWeekStart) + " - " + getMonthName(currentWeekStart.getMonth());

  var calendarBody = document.getElementById("calendarBody");
  calendarBody.innerHTML = "";

  var currentDate = new Date(currentWeekStart);
  while (currentDate <= currentWeekEnd) {
    var row = document.createElement("tr");
    var weekCell = document.createElement("td");
    var dateCells = [];

    weekCell.textContent = getWeekNumber(currentDate);
    row.appendChild(weekCell);

    for (var i = 0; i < 7; i++) {
      var dateCell = document.createElement("td");

      if (currentDate >= currentWeekStart && currentDate <= currentWeekEnd) {
        dateCell.textContent = currentDate.getDate();

        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
          dateCell.classList.add("weekend");
        }

        var event = getEvent(currentDate);
        if (event) {
          var eventText = document.createElement("div");
          eventText.textContent = event.name;
          dateCell.appendChild(eventText);
        }
      }

      row.appendChild(dateCell);
      dateCells.push(dateCell);

      currentDate.setDate(currentDate.getDate() + 1);
    }

    calendarBody.appendChild(row);
  }
}

// Vorherige Woche anzeigen
function previousWeek() {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  currentWeekEnd.setDate(currentWeekEnd.getDate() - 7);
  showCalendar();
}

// Nächste Woche anzeigen
function nextWeek() {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);
  showCalendar();
}

// Ereignis hinzufügen
function addEvent() {
  var eventName = document.getElementById("eventName").value;
  var eventDate = document.getElementById("eventDate").value;
  var eventTime = document.getElementById("eventTime").value;

  if (eventName && eventDate && eventTime) {
    var event = {
      name: eventName,
      date: eventDate,
      time: eventTime
    };

    events.push(event);

    showEvents();
  }

  document.getElementById("eventName").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventTime").value = "";
}

// Ereignis löschen
function deleteEvent(index) {
  events.splice(index, 1);
  showEvents();
}

// Ereignisse anzeigen
function showEvents() {
  var eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  for (var i = 0; i < events.length; i++) {
    var event = events[i];

    var eventItem = document.createElement("li");
    eventItem.className = "event-item";

    var eventText = document.createElement("div");
    eventText.textContent = event.name + " - " + event.date + " " + event.time;
    eventItem.appendChild(eventText);

    var deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Löschen";
    deleteButton.addEventListener("click", createDeleteEventHandler(i));
    eventItem.appendChild(deleteButton);

    eventList.appendChild(eventItem);
  }
}

// Ereignis suchen
function searchEvents() {
  var searchEventName = document.getElementById("searchEventName").value;
  var filteredEvents = events.filter(function(event) {
    return event.name.toLowerCase().includes(searchEventName.toLowerCase());
  });

  var eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  for (var i = 0; i < filteredEvents.length; i++) {
    var event = filteredEvents[i];

    var eventItem = document.createElement("li");
    eventItem.className = "event-item";

    var eventText = document.createElement("div");
    eventText.textContent = event.name + " - " + event.date + " " + event.time;
    eventItem.appendChild(eventText);

    var deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Löschen";
    deleteButton.addEventListener("click", createDeleteEventHandler(events.indexOf(event)));
    eventItem.appendChild(deleteButton);

    eventList.appendChild(eventItem);
  }
}

// Ereignis anhand des Datums abrufen
function getEvent(date) {
  var event = events.find(function(event) {
    return event.date === formatDate(date);
  });

  return event;
}

// Datum formatieren (YYYY-MM-DD)
function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
}

// Kalenderwoche abrufen
function getWeekNumber(date) {
  var dateObject = new Date(date.getTime());
  dateObject.setHours(0, 0, 0);
  dateObject.setDate(dateObject.getDate() + 4 - (dateObject.getDay() || 7));
  var yearStart = new Date(dateObject.getFullYear(), 0, 1);
  var weekNo = Math.ceil((((dateObject - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

// Monatsname abrufen
function getMonthName(month) {
  var monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  return monthNames[month];
}

// Ereignis löschen Event Handler erstellen
function createDeleteEventHandler(index) {
  return function() {
    deleteEvent(index);
  };
}

// Seite initialisieren
initPage();
