var app = function() {
    setTimeout(function() {
        app();
        console.log('test');
    }, 2000);
};

app();