require(['../Scripts/app/pool'], function (pool) {
    $(document).ready(function () {
        pool.init();
        window.resizeTo(800, 600);

    });

});