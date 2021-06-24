var currentDate = moment();
var UserTime = moment().local();

function init() {
    buildTimeblocks();
    $("#currentDay").append(currentDate.format("dddd, MMMM Do"));
}

function buildTimeblocks() {
    var tblBody = $('#timeblocks tbody');
    var timeIds = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

    for(var i = 0; i < timeIds.length; i++){
        tblBody.append(`
            <tr class="time-block-row">
                <td class="hour">${timeIds[i]}</td>
                <td class="time-block" contenteditable="true">Events</td>
                <td class="saveBtn"><i class="fas fa-save"></i></td>
            </tr>`
        );
    }

    //pull the userTime into the timeIds...

    $(".saveBtn").on("click", function(event) {
        var eventEntry = $(this).parent().find(".time-block").text()
        console.log(eventEntry);
    });
}

init();