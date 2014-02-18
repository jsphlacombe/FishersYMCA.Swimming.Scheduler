$(document).ready(function () {
    FishersYMCA.init();
});

var FishersYMCA = function () {
        // Initialize some jQuery objects
        var
            $error = $('#error'),
            $info = $('#info'),
            $entry_section = $('#add-entry-section'),
            $entry_name = $('#entry-name'),
            $schedule = $('#schedule'),
            $TuesSchedule = $('#TuesSchedule'),
            $WedSchedule = $('#WedSchedule'),
            $clone = $('#clone'),
            $generate = $('#generate');
        $addLane = $('#AddLaneAssignment');

        // My extensions========================================
        $.fn.message = function (strongText, plainText) {
            return this.each(function () {
                $(this)
                    .empty().fadeIn()
                    .html('<p><strong>' + strongText + '</strong> ' + plainText + '</p>')
                    .delay(2000).fadeOut();
            });
        };

        $.fn.randomChild = function (settings) {
            return this.each(function () {
                var c = $(this).children().length;
                var r = Math.ceil(Math.random() * c);
                $(this).children().hide().parent().children(':nth-child(' + r + ')').show();
            });
        };
        // =====================================================

        // Start the setup
        ////init();

        // Setup code
        function init() {
            // Hide Stuff
            $entry_section.hide();
            $error.hide();
            $info.hide();

            // Activate buttons
            $('#add-entry').click(openEntrySection);
            $('#save').click(addEntries);
            $('#cancel').click(closeEntrySection);
            $('#add-entry-form').submit(addEntries);
            $('#add-row')
                .click(addRow)
                .hover(addRowHighlight, addRowUndoHighlight);
            $('#remove-row')
                .click(removeRow)
                .hover(removeRowHighlight, removeRowUndoHighlight);
            $('#remove-entries')
                .click(removeEntries)
                .hover(removeEntriesHighlight, removeEntriesUndoHighlight);
            $('#generate').click(generateSchedule);

            // Whenever entries are created, let them be deletable
            $(document).on('click', '.LaneAssign', GetLaneDetail);

            // Prevent text selection on double-click
            $('.actions a')
                .attr('unselectable', 'on')
                .css('MozUserSelect', 'none')
                .bind('selectstart.ui', function () {
                    return false;
                });

            //Add custom code for creating value in database.
            $addLane.click(AddLaneAssignment);


            //Get Pool Lane Assignments
            GetAllLaneAssignments($schedule, "Monday");

            GetAllLaneAssignments($TuesSchedule, "Tuesday");

            GetAllLaneAssignments($WedSchedule, "Wednesday");



        }

        function GetInstructorById() {
            
            $.ajax({
                type: "GET",
                url: "http://localhost/FishersYMCASwimmingService/instructor/2",
                contentType: "json",
                dataType: "json",
                success: function (data) {
                    //stringify
                    var jsonData = JSON.stringify(data);

                    //alert(jsonData);
                    //Parse JSON
                    var objData = $.parseJSON(jsonData);

                    var objData = $.parseJSON(jsonData);
                    var id = objData.ID;
                    var fname = objData.FirstName;
                    var lname = objData.LastName;

                    $('<tr><td>' + id + '</td><td>' + fname +
                                '</td><td>' + lname + '</td></tr>').appendTo('#instructors');
                },
                error: function (xhr) {
                    alert(xhr.responseText);
                }
            });
        }

        function GetAllInstructors() {
            $.ajax({
                type: "GET",
                url: "http://localhost/FishersYMCASwimmingService/instructors",
                contentType: "json",
                dataType: "json",
                success: function (data) {

                    $.each(data, function (key, value) {
                        //stringify
                        var jsonData = JSON.stringify(value);
                        //Parse JSON
                        var objData = $.parseJSON(jsonData);
                        var id = objData.ID;
                        var fname = objData.FirstName;
                        var lname = objData.LastName;

                        $('<tr><td>' + id + '</td><td>' + fname +
                                            '</td><td>' + lname + '</td></tr>').appendTo('#instructors');

                    });
                },
                error: function (xhr) {
                    alert(xhr.responseText);
                }
            });

        }

        function AddLaneAssignment() {

            var poolData = {
                "Time": "11:00 PM",
                "Lane1": "1",
                "Lane2": "2",
                "Lane3": "3",
                "Lane4": "4",
                "Lane5": "5",
                "Lane6": "6",
                "Lane7": "7",
                "Day": "Monday"
            };

            $.ajax({
                type: "POST",
                url: "http://localhost/FishersYMCASwimmingService/Schedule/Add",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                processData: true,
                data: JSON.stringify(poolData),
                success: function (data, status, jqXHR) {
                    //stringify

                    // alert("success..." + data);
                    GetAllLaneAssignments();
                },
                error: function (xhr) {
                    alert(xhr.responseText);
                }


            });
        }

        function GetAllLaneAssignments(element, day) {

            element.empty();

            //Apply Table Column  Headers
            $('<thead><tr><th>Time</th>' +
                '<th>Lane 1</th>' +
                '<th>Lane 2</th>' +
                '<th>Lane 3</th>' +
                '<th>Lane 4</th>' +
                '<th>Lane 5</th>' +
                '<th>Lane 6</th>' +
                '<th>Lane 7</th>' +
                '</tr></thead>').appendTo(element);


                    $.ajax({
                        type: "GET",
                        url: "http://localhost/FishersYMCASwimmingService/Lanes/Schedule/Day/" + day,
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

                                $('<tr><th>' + timeblock + '</th>' +
                                '<td><span class="entry deletable LaneAssign" data-id="' + Lane1Obj.ID + '">' + Lane1Obj.Description + '</span></td>' +
                                '<td><span class="entry deletable LaneAssign" data-id="' + Lane2Obj.ID + '">' + Lane2Obj.Description + '</span></td>' +
                                '<td><span class="entry deletable LaneAssign" data-id="' + Lane3Obj.ID + '">' + Lane3Obj.Description + '</span></td>' +
                                '<td><span class="entry deletable">' + lane4 + '</span></td>' +
                                '<td><span class="entry deletable">' + lane5 + '</span></td>' +
                                '<td><span class="entry deletable">' + lane6 + '</span></td>' +
                                '<td><span class="entry deletable">' + lane7 + '</span></td></tr>').appendTo(element);

                                //$('<tr><td>' + timeblock + '</td>' +
                                //'<td><span class="entry deletable">' + day + '</span></td>' +
                                //'<td><span class="entry deletable">' + lane + '</span></td>' +
                                //'</tr>').appendTo(element);




                            });
                        },
                        error: function (xhr) {
                            alert(xhr.responseText);
                        }
                    });

        }

        function GetLaneDetail() {

            // alert($(this).data("id"));
            $.ajax({
                type: "GET",
                url: "http://localhost/FishersYMCASwimmingService/Lanes/Detail/" + $(this).data("id"),
                contentType: "json",
                dataType: "json",
                success: function (data) {
                    $.each(data, function (key, value) {
                        //stringify
                        var jsonData = JSON.stringify(value);

                        // alert(jsonData);
                        //Parse JSON
                        var objData = $.parseJSON(jsonData);
                        var objData = $.parseJSON(jsonData);

                        // alert(objData.InstructorName);
                        // var id = objData.ID;
                        var InstName = objData.InstructorName;
                        var StudName = objData.StudentName;
                        var InstPhone = objData.InstructorPhone;
                        var StudPhone = objData.StudentPhone;
                        var AssignDetails = objData.AssignmentDetails;

                        //$('<tr><td>' + id + '</td><td>' + fname +
                        //            '</td><td>' + lname + '</td></tr>').appendTo('#instructors');
                        //alert(InstName + ", " + InstPhone + ", " + StudName + ", " + StudPhone + ", " + AssignDetails);
                        $('#LaneDetails').text(InstName + ", " + InstPhone + ", " + StudName + ", " + StudPhone + ", " + AssignDetails);
                    });
                },
                error: function (xhr) {
                    alert(xhr.responseText);
                }
            });
        }

        // Add a row to the table
        function addRow() {
            $schedule.find('tbody').append('<tr><th><input type="text" /></th><td></td><td></td><td></td><td></td><td></td></tr>');
            addRowUndoHighlight();
            addRowHighlight();
            return false;
        }

        // Highlight bottom row of table to cue user of add action
        function addRowHighlight() {
            $schedule.find('tbody tr:last-child *').addClass('adding');
        }

        // Undo highlight
        function addRowUndoHighlight() {
            $schedule.find('tbody tr *').removeClass('adding');
        }

        // Delete last row from the table
        function removeRow() {
            $schedule.find('tbody tr').last().remove();
            removeRowUndoHighlight();
            removeRowHighlight();
            return false;
        }

        // Highlight row to be deleted to cue user of delete action
        function removeRowHighlight() {
            $schedule.find('tbody tr:last-child *').addClass('deleting');
        }

        // Undo highlight
        function removeRowUndoHighlight() {
            $schedule.find('tbody tr *').removeClass('deleting');
        }

        // Show "add entry" section
        function openEntrySection() {
            // Prevent entry deletion when section is open
            $schedule.find('.entry').removeClass('deletable').removeAttr('title');

            // Show section
            $entry_section.slideDown(function () {
                $entry_name.focus();
            });

            // Make the table cells selectable
            $schedule.selectable({
                filter: 'td'
            });

            return false;
        }

        // Hide "add entry" section
        function closeEntrySection() {
            // Hide section
            $entry_section.slideUp();

            // Get rid of selectables
            $schedule.selectable('destroy');
            $('.ui-selected').removeClass('ui-selected');

            // We're done with input value, so empty it
            $entry_name.val('');

            // Make entries deletable
            $schedule.find('.entry').addClass('deletable').attr('title', 'Click to delete');

            return false;
        }

        // Add entries to table
        function addEntries() {
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
                closeEntrySection();

                $info.message("Sweet!", entryValue + " has been added.");

            }

            return false;
        }

        // Delete entry from the table
        function clickEntry() {
            //alert($(".LaneAssign").data("id"));
            //alert($(this).data("id"));
            ////$("#themodal").modal("show");

            //$(this).effect('explode', 500, function() {
            //	$(this).remove();
            //});
            return false;
        }

        // Delete all entries from the table
        function removeEntries() {
            // Find all entries
            var $entries = $schedule.find('.entry');

            // Delete them
            $entries.fadeOut(function () {
                $entries.remove();
            });

            return false;
        }

        // Highlight entries to be deleted to cue user of deletion action
        function removeEntriesHighlight() {
            $('.entry').addClass('deleting');
        }

        // Undo highlight
        function removeEntriesUndoHighlight() {
            $('.entry').removeClass('deleting');
        }


        // Generate a schedule from the table
        function generateSchedule() {
            // Clone the table
            $clone.empty()
            $schedule.clone().removeAttr('id').removeClass('ui-selectable').addClass('cloned').appendTo($clone);

            // Remove input fields
            // Prevent entries from deletion
            // Display random entry for each cell
            $clone
                .find('input').each(function (index) {
                    var text = $(this).val();
                    $(this).replaceWith('<div>' + text + '</div>');
                }).end()
                .find('.deletable').removeClass('deletable').removeAttr('title').end()
                .find('.ui-selectee').removeClass('ui-selectee').end()
                .find('.ui-selected').removeClass('ui-selected').end()
                .find('.cloned tbody td').randomChild();

            return false;
        }


    //};

    // FishersYMCA.init();
//
        return {
            init: init
        };
}();


//; (function ($) {
    /* 
	 * Random Child (0.1)
	 * by Mike Branski (www.leftrightdesigns.com)
	 * mikebranski@gmail.com
	 *
	 * Copyright (c) 2008 Mike Branski (www.leftrightdesigns.com)
	 * Licensed under GPL (www.leftrightdesigns.com/library/jquery/randomchild/gpl.txt)
	 */
    //$.fn.randomChild = function (settings) {
    //    return this.each(function () {
    //        var c = $(this).children().length;
    //        var r = Math.ceil(Math.random() * c);
    //        $(this).children().hide().parent().children(':nth-child(' + r + ')').show();
    //    });
    //};

    //// My extensions
    //$.fn.message = function (strongText, plainText) {
    //    return this.each(function () {
    //        $(this)
	//			.empty().fadeIn()
	//			.html('<p><strong>' + strongText + '</strong> ' + plainText + '</p>')
	//			.delay(2000).fadeOut();
    //    });
    //};
//});