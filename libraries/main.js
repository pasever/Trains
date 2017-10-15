$(document).ready(function () {});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4zU3ISjRmaA-LReFF5FtWjnyz5i8VLpE",
    authDomain: "trains-3ee78.firebaseapp.com",
    databaseURL: "https://trains-3ee78.firebaseio.com",
    projectId: "trains-3ee78",
    storageBucket: "",
    messagingSenderId: "692633907646"
};
firebase.initializeApp(config);

var database = firebase.database();


setInterval(function () {
    $(".hours").html(moment().hours());
    $(".minutes").html(moment().minutes());
//$(".seconds").html(moment().seconds());
}, 1000);

var nextAway = [];

var count = $('#tbody tr').length;

database.ref().on("value", function (snapshot) {

    var snap = snapshot.val();
    var fireArray = Object.keys(snap);
    var snap = snapshot.val();
    var fireArray = Object.keys(snap);
    nextAway = [];
    
     $("#tbody").empty();
    
    for (var i = 0; i < fireArray.length; i++) {

        var getKey = fireArray[i];
        var getObj = snap[getKey];
        var formated = moment(getObj.firstTrain, "hh:mm").subtract(1, "years");
        var diff = moment().diff(moment(formated), "minutes");
        var apart = diff % getObj.frequency;
        var away = getObj.frequency - apart;
        var arrival = moment().add(away, "minutes").format("HH:mm");
        var whereTo = getObj.destination;

        nextAway.push({...getObj, away});

        var newTR = $("<tr>");
        $("#tbody").append(newTR);
        newTR.append("<td>" + $('#tbody tr').length + "</td>");
        newTR.append("<td>" + getObj.train + "</td>");
        newTR.append("<td>" + getObj.destination + "</td>");
        newTR.append("<td>" + getObj.frequency + "</td>");
        newTR.append("<td>" + arrival + "</td>");
        newTR.append("<td>" + away + "</td>");
    }

    console.log(nextAway);

    if (nextAway.length) {

        nextAway.sort(function (a, b) {
            if (a.away >= b.away)
                return 1;
            else
                return -1;
        });

        $(".next").html(nextAway[0].away);
        $(".nextDest").html(nextAway[0].destination);

    }

});

/*
 var minArray = [];
 
 function findNext() {
 var len = nextAway.length;
 for (var i = 0; i < len; i++) {
 if (i === 0) {
 minArray.push(nextAway[i]);
 } else {
 if (nextAway[i].away < minArray[0].away) {
 minArray.pop();
 minArray.push(nextAway[i]);
 }
 
 }
 
 }
 //console.log(minArray[0].away);
 //console.log(minArray[0].destination);    
 
 $(".next").html(minArray[0].away);
 $(".nextDest").html(minArray[0].destination);
 
 
 }
 */


$("#submitButton").on("click", function (event) {

    event.preventDefault();

    var now = moment();
    var train = $("#fieldTrain").val().trim();
    var destination = $("#fieldDest").val().trim();
    var firstTrain = $("#fieldFirstTr").val().trim();
    var frequency = $("#fieldFrequency").val().trim();


    var formated = moment(firstTrain, "hh:mm").subtract(1, "years");
    var diff = moment().diff(moment(formated), "minutes");
    var apart = diff % frequency;
    var away = frequency - apart;
    var arrival = moment().add(away, "minutes").format("hh:mm");

//    var now = moment();
//    var time = now.hour() + ':' + now.minutes() + ':' + now.seconds();
//    console.log(time);

//
    database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        arrival: arrival,
        away: away
                // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#fieldTrain").val("");
    $("#fieldDest").val("");
    $("#fieldFirstTr").val("");
    $("#fieldFrequency").val("");
//    var monthsNeg = moment(date, "DD/MM/YY").diff(mome

});

database.ref().once("child_added", function (snapshot) {

    //console.log(snapshot.val());

    var newTR = $("<tr>");
    $("#tbody").append(newTR);
    newTR.append("<td>" + $('#tbody tr').length + "</td>");
    newTR.append("<td>" + snapshot.val().train + "</td>");
    newTR.append("<td>" + snapshot.val().destination + "</td>");
    newTR.append("<td>" + snapshot.val().frequency + "</td>");
    newTR.append("<td>" + snapshot.val().arrival + "</td>");
    newTR.append("<td>" + snapshot.val().away + "</td>");

});

$(document).ready(function () {
    setInterval(function () {
        $('.flash').toggleClass('active');
    }, 1500);
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(document).ready(function () {
    setInterval(function flash() {
        $(".flash").css("color", getRandomColor());
    }, 1500);
});
