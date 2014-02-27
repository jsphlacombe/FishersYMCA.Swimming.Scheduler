var schedule = function() {
    var
    $error = $('#error'),
    $info = $('#info'),
    $entry_section = $('#add-entry-section'),
    $entry_name = $('#entry-name'),
    $clone = $('#clone'),
    $generate = $('#generate'),
    $addLane = $('#AddLaneAssignment');
    $addEntry = $('#add-entry');

    //function object for the day's schedule
    var DaySchedule = function (day) {

        //var table1 = $('<table id="' + day + 'Schedule">' +
        //    '<thead>' +
        //    '<tr><th>Time</th><th>Lane 1</th><th>Lane 2</th><th>Lane 3</th><th>Lane 4</th><th>Lane 5</th><th>Lane 6</th><th>Lane 7</th></tr>' +
        //    '</thead>' +
        //    '<tbody data-bind="foreach: timeslots">' +
        //    '<tr>' +
        //     '<td><span LaneAssign" data-id="' + Lane1Obj.ID + '"data-bind="text: time"></span></td>' +
        //     '<td><span class="entry-' + Lane1Obj.Category + ' LaneAssign" data-id="' + Lane1Obj.ID + '"data-bind="text: time"></span></td>' +
        //     '<td data-bind="text: lane1"></td>' +
        //     '<td data-bind="text: lane2"></td>' +
        //     '<td data-bind="text: lane3"></td>' +
        //     '<td data-bind="text: lane4"></td>' +
        //     '<td data-bind="text: lane5"></td>' +
        //     '<td data-bind="text: lane6"></td>' +
        //     '<td data-bind="text: lane7"></td>' +
        //     '<td><a href="#" data-bind="click: $parent.removeBook">Remove</a></td>' +
        //    '</tr>' +
        //    '</tbody>' +
        //    '</table>');

        var table = $('<table id="' + day + 'Schedule"></table>');

        table.addClass('table table-condensed');

        $('#tab' + day).append(table);

        this.name = function () {
            //if (val && name !== val) {
            name = table.id;
            //}

            return name;
        };

        this.addEntry = function () {
            // Prevent entry deletion when section is open
            table.find('.entry').removeClass('deletable').removeAttr('title');

            // Show section
            $entry_section.slideDown(function () {
                $entry_name.focus();
            });

            // Make the table cells selectable
            table.selectable({
                filter: 'td'
            });

            return false;
        }

        this.closeEntrySection = function () {
            // Hide section
            $entry_section.slideUp();

            // Get rid of selectables
            table.selectable('destroy');
            $('.ui-selected').removeClass('ui-selected');

            // We're done with input value, so empty it
            $entry_name.val('');

            // Make entries deletable
            table.find('.entry').addClass('deletable').attr('title', 'Click to delete');

            return false;
        }

        // Add entries to table
        this.addEntries = function () {
            // Get the input text
            var entryValue = $entry_name.val();
            entryValue = $.trim(entryValue);

            // Get selected table cells
            var $selected = $('.ui-selected');

            if (!entryValue) {
                $error.message("Hey!", "You didn't enter a name.");
            } else if (!$selected.length) {
                $error.message("Hey!", "You didn't select anything.");
            } else {
                // Add entry to each selected cell
                var entry = '<span class="entry deletable">' + entryValue + '</span>';
                $selected.append(entry);

                // Close the section
                this.closeEntrySection();

                $info.message("Sweet!", entryValue + " has been added.");

            }

            return false;
        }

        this.GetAllLaneAssignments = function () {
            //Apply Table Column  Headers




            table.append($('<thead><tr><th>Time</th>' +
                '<th>Lane 1</th>' +
                '<th>Lane 2</th>' +
                '<th>Lane 3</th>' +
                '<th>Lane 4</th>' +
                '<th>Lane 5</th>' +
                '<th>Lane 6</th>' +
                '<th>Lane 7</th>' +
                '</tr></thead>'));


            $.ajax({
                type: "GET",
                url: "/FishersYMCASwimmingService/Lanes/Schedule/Day/" + day,
                contentType: "json",
                dataType: "json",
                success: function (data) {

      

                    $.each(data, function (key, value) {
                        //stringify
                        var jsonData = JSON.stringify(value);

                        //Parse JSON
                        var objData = $.parseJSON(jsonData);


                        var Lane1Obj = objData.Lane1;
                        var Lane2Obj = objData.Lane2;
                        var Lane3Obj = objData.Lane3;

                        //var id = Lane1Obj.ID;
                        var day = objData.Day;
                        var timeblock = objData.Time;
                        var lane = objData.Lane;
                        var lane1 = Lane1Obj.Description;
                        var lane2 = objData.Lane2;
                        var lane3 = objData.Lane3;
                        var lane4 = objData.Lane4;
                        var lane5 = objData.Lane5;
                        var lane6 = objData.Lane6;
                        var lane7 = objData.Lane7;


                        // alert(Lane1Obj.ID + "," + Lane2Obj.ID + "," + Lane3Obj.ID);

                        table.append($('<tr><th>' + timeblock + '</th>' +
                          '<td><span class="entry-' + Lane1Obj.Category + ' LaneAssign" data-id="' + Lane1Obj.ID + '">' + Lane1Obj.Description + '</span></td>' +
                          '<td><span class="entry-' + Lane2Obj.Category + ' LaneAssign" data-id="' + Lane2Obj.ID + '">' + Lane2Obj.Description + '</span></td>' +
                          '<td><span class="entry-' + Lane3Obj.Category + ' LaneAssign" data-id="' + Lane3Obj.ID + '">' + Lane3Obj.Description + '</span></td>' +
                          '<td><span class="entry-' + "undefined" + ' ">' + lane4 + '</span></td>' +
                          '<td><span class="entry-' + "undefined" + ' ">' + lane5 + '</span></td>' +
                          '<td><span class="entry-' + "undefined" + ' ">' + lane6 + '</span></td>' +
                          '<td><span class="entry-' + "undefined" + ' ">' + lane7 + '</span></td></tr>'));

                    });
                },
                error: function (xhr) {
                    alert(xhr.responseText);
                }
            });

            return this;
        }

        this.GetLaneDetail = function (id) {

            return $.ajax({
                type: "GET",
                url: "/FishersYMCASwimmingService/Lanes/Detail/" + id,
                contentType: "json",
                dataType: "json"


            });

        }

    };

    return {
        DaySchedule: DaySchedule
    };

}();