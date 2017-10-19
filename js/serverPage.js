$(document).ready(function() {
    $.getJSON("../gameData/servers.json", function(json) {
        for(var i = 0; i < json.servers.length; i++) {
            $("#serverList").append('<a href="index.html?=' + json.servers[i] + '"><li>' + json.servers[i] + '</li></a>');
        }
    });
});