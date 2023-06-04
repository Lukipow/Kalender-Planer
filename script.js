// Initialisierung
var currentDate = new Date();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

// Ereignisse in diesem Monat
var events = [];

// Monat anzeigen
function showCalendar() {
  var firstDay = new Date(currentYear, currentMonth, 1).getDay();
  var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  var table = document.getElementById("calendarBody");
  table.innerHTML = "";

  var monthYearText = document.getElementById("currentMonth");
  monthYearText.textContent = new Intl.DateTimeFormat('de-DE', { year: 'numeric', month: 'long' }).format(currentDate);

  var date = 1;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        var cell = document.createElement("td");
        var cellText = document.createTextNode(date);
        cell.appendChild(cellText);

        // Markiere das Wochenende
        if (j === 5 || j === 6) {
          cell.classList.add("weekend");
        }

        // Prüfe, ob ein Ereignis an diesem Datum vorhanden ist
        var event = getEventByDate(currentYear, currentMonth, date);
        if (event) {
          var eventSpan = document.createElement("span");
          eventSpan.textContent = event.name;
          cell.appendChild(document.createElement("br"));
          cell.appendChild(eventSpan);
        }

        row.appendChild(cell);
        date++;
      }
    }

    table.appendChild(row);
  }
}

// Hilfsfunktion, um Ereignis anhand des Datums zu suchen
function getEventByDate(year, month, day) {
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var eventDate = new Date(event.date);
    if (eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === day) {
      return event;
    }
  }
  return null;
}

// Vorheriger Monat
function previousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  currentDate = new Date(currentYear, currentMonth);
  showCalendar();
}

// Nächster Monat
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  currentDate = new Date(currentYear, currentMonth);
  showCalendar();
}

// Ereignis hinzufügen
function addEvent() {
  var eventNameInput = document.getElementById("eventName");
  var eventDateInput = document.getElementById("eventDate");
  var eventTimeInput = document.getElementById("eventTime");

  var eventName = eventNameInput.value.trim();
  var eventDate = eventDateInput.value;
  var eventTime = eventTimeInput.value;

  if (eventName === "") {
    alert("Bitte füge deinem Ereignis einen Namen hinzu");
    return;
  }

  events.push({
    name: eventName,
    date: eventDate,
    time: eventTime
  });

  eventNameInput.value = "";
  eventDateInput.value = "";
  eventTimeInput.value = "";

  showEvents();
  showCalendar();
}

// Ereignisse anzeigen
function showEvents() {
  var eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  for (var i = 0; i < events.length; i++) {
    var eventItem = document.createElement("li");
    eventItem.classList.add("event-item");

    var eventDetails = document.createElement("div");
    var eventName = document.createElement("span");
    eventName.textContent = events[i].name;
    eventDetails.appendChild(eventName);

    var eventDate = document.createElement("span");
    eventDate.textContent = events[i].date;
    eventDetails.appendChild(eventDate);

    var eventTime = document.createElement("span");
    eventTime.textContent = events[i].time;
    eventDetails.appendChild(eventTime);

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Löschen";
    deleteButton.setAttribute("data-index", i);
    deleteButton.addEventListener("click", deleteEvent);
    eventDetails.appendChild(deleteButton);

    eventItem.appendChild(eventDetails);
    eventList.appendChild(eventItem);
  }
}

// Ereignis löschen
function deleteEvent(event) {
  var index = event.target.getAttribute("data-index");
  events.splice(index, 1);
  showEvents();
  showCalendar();
}

// Ereignisse nach Namen suchen
function searchEvents() {
  var searchName = document.getElementById("searchEventName").value.trim();
  if (searchName === "") {
    showEvents();
    return;
  }

  var filteredEvents = events.filter(function(event) {
    return event.name.toLowerCase().includes(searchName.toLowerCase());
  });

  var eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  for (var i = 0; i < filteredEvents.length; i++) {
    var eventItem = document.createElement("li");
    eventItem.classList.add("event-item");

    var eventDetails = document.createElement("div");
    var eventName = document.createElement("span");
    eventName.textContent = filteredEvents[i].name;
    eventDetails.appendChild(eventName);

    var eventDate = document.createElement("span");
    eventDate.textContent = filteredEvents[i].date;
    eventDetails.appendChild(eventDate);

    var eventTime = document.createElement("span");
    eventTime.textContent = filteredEvents[i].time;
    eventDetails.appendChild(eventTime);

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Löschen";
    deleteButton.setAttribute("data-index", events.indexOf(filteredEvents[i]));
    deleteButton.addEventListener("click", deleteEvent);
    eventDetails.appendChild(deleteButton);

    eventItem.appendChild(eventDetails);
    eventList.appendChild(eventItem);
  }
}

// Initialisierung
showCalendar();
showEvents();
