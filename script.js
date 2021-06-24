function init() {
    buildTimeblocks();
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

    $(".saveBtn").on("click", function() {
        console.log("save this");
    });
}



init();