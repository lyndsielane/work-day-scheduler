var currentDate = moment();
var currentDateFormatted = currentDate.format("dddd, MMMM Do, YYYY");
var localStorageName = "myEvents";

function init() {
    buildTimeblocks();
    $("#currentDay").append(currentDateFormatted);
}

function getSavedEvents() {
    var currentEvents = JSON.parse(localStorage.getItem(localStorageName) || "{}");

    if (!currentEvents[currentDateFormatted]) {
        currentEvents[currentDateFormatted] = {};
    }

    return currentEvents;
}

function buildTimeblocks() {
    var tblBody = $('#timeblocks tbody');
    var timeIds = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
    var currentEvents = getSavedEvents();

    for(var i = 0; i < timeIds.length; i++){
        var timeBlockEvent = currentEvents[currentDateFormatted][timeIds[i]] || "";
        var colorClass = "future";

        var timeBlockStartTime = moment(timeIds[i], "h a");
        var timeBlockEndTime = moment(timeIds[i], "h a").add(1, 'hour').add(-1, 'second');

        if (currentDate >= timeBlockStartTime && currentDate <= timeBlockEndTime) {
            colorClass = "present";
        } else if (currentDate >= timeBlockEndTime) {
            colorClass = "past";
        }

        tblBody.append(`
            <tr class="time-block-row">
                <td class="hour">${timeIds[i]}</td>
                <td class="time-block ${colorClass}" contenteditable="true">${timeBlockEvent}</td>
                <td class="saveBtn"><i class="fas fa-save"></i></td>
            </tr>`
        );
    }

    //pull the userTime into the timeIds...

    $(".saveBtn").on("click", function(event) {
        var eventEntry = $(this).parent().find(".time-block").text();
        var hour = $(this).parent().find(".hour").text();
        var currentEvents = getSavedEvents();

        currentEvents[currentDateFormatted][hour] = eventEntry;
        
        localStorage.setItem(localStorageName, JSON.stringify(currentEvents));

    });
}

init();