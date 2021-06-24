var currentDate = moment();
var UserTime = moment().local();

function init() {
    buildTimeblocks();
    $("#currentDay").append(currentDate.format("dddd, MMMM Do"));
}

function buildTimeblocks() {
    var tblBody = $('#timeblocks tbody');
    var timeIds = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
    var currentEvents = JSON.parse(localStorage.getItem("myEvents") || "{}");

    for(var i = 0; i < timeIds.length; i++){
        var timeBlockEvent = currentEvents[timeIds[i]] || "";
        var colorClass = "past";

        var timeBlockStartTime = moment(timeIds[i], "h a");
        var timeBlockEndTime = moment(timeIds[i + 1], "h a").add(-1, 'second');

        if (currentDate >= timeBlockStartTime && currentDate < timeBlockEndTime) {
            colorClass = "present";
        } else if (currentDate >= timeBlockEndTime) {
            colorClass = "future";
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
        var currentEvents = JSON.parse(localStorage.getItem("myEvents") || "{}");

        currentEvents[hour] = eventEntry;
        
        localStorage.setItem("myEvents", JSON.stringify(currentEvents));

    });
}

init();