var pool = function() {
        // Initialize some jQuery objects
    var
        $error = $('#error'),
        $info = $('#info'),
        $entry_section = $('#add-entry-section'),
        $entry_name = $('#entry-name'),
        $clone = $('#clone'),
        $generate = $('#generate'),
        $addLane = $('#AddLaneAssignment');
        $addEntry =  $('#add-entry');

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

        function init() {
            // Hide Stuff
            //$('#slotDetails').hide();
            //$('#slotDesc').hide();
            $('#errorAlert').hide();
            $entry_section.hide();
            $error.hide();
            $info.hide();

            

            var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            var daySchedules = [];
            var schedIdx = 0;


            var i;
            for (i = 0; i < daysOfWeek.length; i += 1)
                daySchedules.push(new schedule.DaySchedule(daysOfWeek[i]).GetAllLaneAssignments());

            // Activate buttons
            $('#add-entry').click(function () {
                daySchedules[schedIdx].addEntry();
            });

            $('#save').click(function () {
                daySchedules[schedIdx].addEntries();
            });

            $('#cancel').click(function () {
                daySchedules[schedIdx].closeEntrySection
            });

            $('#add-entry-form').submit(function () {
                daySchedules[schedIdx].addEntries();
            });

            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                schedIdx = daysOfWeek.indexOf(e.target.innerText);

            })

            //$(function () {
            //    $("#datepicker").datepicker({
            //        selectWeek: true,
            //        closeOnSelect: false
            //    });
            //});

            $(document).on('click', '.LaneAssign', function (e) {

                //$('.LaneAssign').not(this).popover('hide');
                var that = this;

                var detailsPopup = $(this).popover({
                    html: true,
                    //title: "Lane Activity Information",
                    title: '<span class="text-info"><strong>Lane Activity Information</strong><span></span><a class="close" href="#">&times;</a>',
                    trigger: 'click',
                    animation: false,
                    content: function () {

                        return $('#slotDesc').html();
                    },

                    placement: "right"

                }).on('shown.bs.popover', function () {
              
                    $('.LaneAssign').not(this).popover('destroy');
          
                });

           
                var laneSchedule = daySchedules[schedIdx].GetLaneDetail($(this).data("id"));

                laneSchedule.done(function (data) {
                    $.each(data, function (key, value) {
                        //stringify
                        var jsonData = JSON.stringify(value);

                        //Parse JSON
                        var objData = $.parseJSON(jsonData);

                        var category = objData.Category;


                        var DetailsViewModel = function () {
                            this.instructorName = objData.InstructorName;
                            this.instructorPhone = objData.InstructorPhone;
                            this.studentName = objData.StudentName;
                            this.studentPhone = objData.StudentPhone;
                            this.activityDescription = objData.Description;
                        }

                        ko.applyBindings(new DetailsViewModel());

                    });
                }).then(function () {
             

                    detailsPopup.popover('show');

                    //reposition the popover on window resize
                    $(window).resize(function () { if ($('.LaneAssign').is(":visible")) { detailsPopup.popover('show'); } });
                    
                });

                laneSchedule.fail(function (xhr) {
                   // $('#errorAlert').hide();
                    $('#errorAlert').show();
                });

                e.stopPropagation();
      

            });

            $(document).click(function (e) {
                if (($(e.target).is('.close'))) {
                    $('.LaneAssign').popover('destroy');
                }
            });



            // Prevent text selection on double-click
            $('.actions a')
                .attr('unselectable', 'on')
                .css('MozUserSelect', 'none')
                .bind('selectstart.ui', function () {
                    return false;
                });

            //Add custom code for creating value in database.
            $addLane.click(AddLaneAssignment);


        }
       
        ////function object for the day's schedule
        //var DaySchedule = function (day) {
        //    var table = $('<table id="' + day + 'Schedule"></table>');

        //    table.addClass('table table-bordered table-condensed');

        //    $('#tab' + day).append(table);

        //    this.name = function () {
        //        //if (val && name !== val) {
        //            name = table.id;
        //        //}

        //        return name;
        //    };

        //    this.addEntry = function () {
        //        // Prevent entry deletion when section is open
        //        table.find('.entry').removeClass('deletable').removeAttr('title');

        //        // Show section
        //        $entry_section.slideDown(function () {
        //            $entry_name.focus();
        //        });

        //        // Make the table cells selectable
        //        table.selectable({
        //            filter: 'td'
        //        });

        //        return false;
        //    }

        //    this.closeEntrySection = function() {
        //        // Hide section
        //        $entry_section.slideUp();

        //        // Get rid of selectables
        //        table.selectable('destroy');
        //        $('.ui-selected').removeClass('ui-selected');

        //        // We're done with input value, so empty it
        //        $entry_name.val('');

        //        // Make entries deletable
        //        table.find('.entry').addClass('deletable').attr('title', 'Click to delete');

        //        return false;
        //    }

        //    // Add entries to table
        //    this.addEntries = function() {
        //        // Get the input text
        //        var entryValue = $entry_name.val();
        //        entryValue = $.trim(entryValue);

        //        // Get selected table cells
        //        var $selected = $('.ui-selected');

        //        if (!entryValue) {
        //            $error.message("Hey!", "You didn't enter a name.");
        //        } else if (!$selected.length) {
        //            $error.message("Hey!", "You didn't select anything.");
        //        } else {
        //            // Add entry to each selected cell
        //            var entry = '<span class="entry deletable">' + entryValue + '</span>';
        //            $selected.append(entry);

        //            // Close the section
        //            this.closeEntrySection();

        //            $info.message("Sweet!", entryValue + " has been added.");

        //        }

        //        return false;
        //    }

        //    this.GetAllLaneAssignments = function () {
        //        //Apply Table Column  Headers
        //        table.append($('<thead><tr><th>Time</th>' +
        //            '<th>Lane 1</th>' +
        //            '<th>Lane 2</th>' +
        //            '<th>Lane 3</th>' +
        //            '<th>Lane 4</th>' +
        //            '<th>Lane 5</th>' +
        //            '<th>Lane 6</th>' +
        //            '<th>Lane 7</th>' +
        //            '</tr></thead>'));


        //        $.ajax({
        //            type: "GET",
        //            url: "http://localhost/FishersYMCASwimmingService/Lanes/Schedule/Day/" + day,
        //            contentType: "json",
        //            dataType: "json",
        //            success: function (data) {



        //                $.each(data, function (key, value) {
        //                    //stringify
        //                    var jsonData = JSON.stringify(value);

        //                    //Parse JSON
        //                    var objData = $.parseJSON(jsonData);


        //                    var Lane1Obj = objData.Lane1;
        //                    var Lane2Obj = objData.Lane2;
        //                    var Lane3Obj = objData.Lane3;

        //                    //var id = Lane1Obj.ID;
        //                    var day = objData.Day;
        //                    var timeblock = objData.Time;
        //                    var lane = objData.Lane;
        //                    var lane1 = Lane1Obj.Description;
        //                    var lane2 = objData.Lane2;
        //                    var lane3 = objData.Lane3;
        //                    var lane4 = objData.Lane4;
        //                    var lane5 = objData.Lane5;
        //                    var lane6 = objData.Lane6;
        //                    var lane7 = objData.Lane7;


        //                    // alert(Lane1Obj.ID + "," + Lane2Obj.ID + "," + Lane3Obj.ID);

        //                    table.append($('<tr><th>' + timeblock + '</th>' +
        //                      '<td><span class="entry-' + Lane1Obj.Category + ' LaneAssign" data-id="' + Lane1Obj.ID + '">' + Lane1Obj.Description + '</span></td>' +
        //                      '<td><span class="entry-' + Lane2Obj.Category + ' LaneAssign" data-id="' + Lane2Obj.ID + '">' + Lane2Obj.Description + '</span></td>' +
        //                      '<td><span class="entry-' + Lane3Obj.Category + ' LaneAssign" data-id="' + Lane3Obj.ID + '">' + Lane3Obj.Description + '</span></td>' +
        //                      '<td><span class="entry-' + "undefined" + ' ">' + lane4 + '</span></td>' +
        //                      '<td><span class="entry-' + "undefined" + ' ">' + lane5 + '</span></td>' +
        //                      '<td><span class="entry-' + "undefined" + ' ">' + lane6 + '</span></td>' +
        //                      '<td><span class="entry-' + "undefined" + ' ">' + lane7 + '</span></td></tr>'));

        //                });
        //            },
        //            error: function (xhr) {
        //                alert(xhr.responseText);
        //            }
        //        });
        //    }

        //    this.GetLaneDetail = function (id) {

       
        //        // alert($(this).data("id"));
        //        $.ajax({
        //            type: "GET",
        //            url: "http://localhost/FishersYMCASwimmingService/Lanes/Detail/" + id,
        //            contentType: "json",
        //            dataType: "json",
        //            success: function (data) {
        //                $.each(data, function (key, value) {
        //                    //stringify
        //                    var jsonData = JSON.stringify(value);

        //                    // alert(jsonData);
        //                    //Parse JSON
        //                    var objData = $.parseJSON(jsonData);
        //                    var objData = $.parseJSON(jsonData);

        //                    // alert(objData.InstructorName);
        //                    // var id = objData.ID;
        //                    var InstName = objData.InstructorName;
        //                    var StudName = objData.StudentName;
        //                    var InstPhone = objData.InstructorPhone;
        //                    var StudPhone = objData.StudentPhone;
        //                    var Category = objData.Category;


        //                    $('#LaneDetails').text(InstName + ", " + InstPhone + ", " + StudName + ", " + StudPhone + ", " + Category);
        //                });
        //            },
        //            error: function (xhr) {
        //                alert(xhr.responseText);
        //            }
        //        });
        //    }

        //    this.GetAllLaneAssignments();
        //};



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

        //
        return {
            init: init
            //DaySchedule: time.DaySchedule
        };
   // }();

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