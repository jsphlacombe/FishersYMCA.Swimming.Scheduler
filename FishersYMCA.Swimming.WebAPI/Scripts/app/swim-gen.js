require(['../Scripts/app/pool'], function (pool) {
    $(document).ready(function () {
        pool.init();



        //var daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
        //var daySchedules = [];
        //var schedIdx = 0;


        //var i;
        //for (i = 0; i < daysOfWeek.length; i += 1)
        //    daySchedules.push(new pool.DaySchedule(daysOfWeek[i]));
     

        //$('#add-entry').click(function () {
        //    daySchedules[schedIdx].addEntry();
        //});

        //$('#save').click(function () {
        //    daySchedules[schedIdx].addEntries();
        //});

        //$('#cancel').click(function () {
        //    daySchedules[schedIdx].closeEntrySection
        //});

        //$('#add-entry-form').submit(function () {
        //    daySchedules[schedIdx].addEntries();
        //});

        //$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        //    schedIdx = daysOfWeek.indexOf(e.target.innerText);
        //    //e.target // activated tab
        //    //alert(e.target.id);
        //    //e.relatedTarget // previous tab
        //})

    });

});