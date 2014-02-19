require(['../Scripts/app/pool-schedule'], function (pool) {
    $(document).ready(function () {
        pool.init();

        var daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

        var i;
        for (i = 0; i < daysOfWeek.length; i += 1)
            var daySched = new pool.DaySchedule(daysOfWeek[i]);
        

    });

});