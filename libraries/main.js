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

//var now = moment();
//var time = now.hour() + ':' + now.minutes() + ':' + now.seconds();
//console.log(time);


var count = $('#tbody tr').length;

database.ref().on("value", function (snapshot) {

    var snap = snapshot.val();
    var fireArray = Object.keys(snap);
    //console.log(fireArray.length);
    var nextAway = [];
    for (var i = 0; i < fireArray.length; i++) {

        var getKey = fireArray[i];
        //console.log(getKey);
        var getObj = snap[getKey];
        //console.log(getObj);
        //console.log(getObj);

        var formated = moment(getObj.firstTrain, "hh:mm").subtract(1, "years");
        //console.log("First Train: " + getObj.firstTrain);
        var diff = moment().diff(moment(formated), "minutes");
        var apart = diff % getObj.frequency;
        //console.log("Frequency: " + getObj.frequency);
        var away = getObj.frequency - apart;
        nextAway.push(away);
        var whereTo = getObj.destination;
        //console.log(whereTo);
        //nextAway.push(whereTo);
        //console.log(nextAway);
        //console.log("Destination is: " + whereTo);
        var next = Math.min(...nextAway);
//        var aaaaa = nextAway.indexOf(next);
//        console.log(aaaaa);
        //var nextDest = getObj.indexOf(Math.min(...nextAway));
        //console.log(nextDest);
//        
//        console.log(aaaaa);
        //console.log(getObj.indexOf(next));
        $(".next").html(next);
        //console.log("Minutes away: " + away);
        var arrival = moment().add(away, "minutes").format("hh:mm");
        //console.log("Next Arrival: " + arrival);

//snapshot.preventDefault();
//   var clean = $("#tbody").append();
//   clean.html();

        $("#tbody").text();

        var newTR = $("<tr>");
        $("#tbody").append(newTR);
        newTR.append("<td>" + $('#tbody tr').length + "</td>");
        //console.log(getObj);
        newTR.append("<td>" + getObj.train + "</td>");
        newTR.append("<td>" + getObj.destination + "</td>");
        newTR.append("<td>" + getObj.frequency + "</td>");
        newTR.append("<td>" + arrival + "</td>");
        newTR.append("<td>" + away + "</td>");
    }
});


$("#submitButton").on("click", function (event) {

    event.preventDefault();

    var now = moment();
    var train = $("#fieldTrain").val().trim();
    var destination = $("#fieldDest").val().trim();
    var firstTrain = $("#fieldFirstTr").val().trim();
    var frequency = $("#fieldFrequency").val().trim();

    //firstTrainTime = $("#fieldFirstTr").val().trim();


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


    //console.log(train);
    //console.log(destination);
    //console.log(firstTrain);
    //console.log(frequency);

    $("#fieldTrain").val("");
    $("#fieldDest").val("");
    $("#fieldFirstTr").val("");
    $("#fieldFrequency").val("");
//    var monthsNeg = moment(date, "DD/MM/YY").diff(mome

});

database.ref().on("child_added", function (snapshot) {

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
