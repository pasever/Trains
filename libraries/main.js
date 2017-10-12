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
//var now = moment();
//var time = now.hour() + ':' + now.minutes() + ':' + now.seconds();

//setInterval(function(){
//    $('#firstLine').html(moment().format('hh:mm:ss A'))
//  }, 1000);
//  
 setInterval(function(){ 
$(".hours").html(moment().hours());
$(".minutes").html(moment().minutes());
//$(".seconds").html(moment().seconds());
}, 1000); 


var count = $('#tbody tr').length;

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


    database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        arrival: arrival,
        away: away
                // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });


    console.log(train);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    $("#fieldTrain").val("");
    $("#fieldDest").val("");
    $("#fieldFirstTr").val("");
    $("#fieldFrequency").val("");
//    var monthsNeg = moment(date, "DD/MM/YY").diff(mome

});

database.ref().on("child_added", function (snapshot) {

    console.log(snapshot.val());

    var newTR = $("<tr>");
    $("#tbody").append(newTR);
    newTR.append("<td>" + $('#tbody tr').length + "</td>");
    newTR.append("<td>" + snapshot.val().train + "</td>");
    newTR.append("<td>" + snapshot.val().destination + "</td>");
    newTR.append("<td>" + snapshot.val().frequency + "</td>");
    newTR.append("<td>" + snapshot.val().arrival + "</td>");
    newTR.append("<td>" + snapshot.val().away + "</td>");
});





