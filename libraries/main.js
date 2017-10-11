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
$(".hours").html(moment().hours());
$(".minutes").html(moment().minutes());
console.log();
var count = $('#tbody tr').length;
    console.log(count);

$("#submitButton").on("click", function (event) {

    event.preventDefault();

    var train = $("#fieldTrain").val().trim();
    var destination = $("#fieldDest").val().trim();
    var firstTrain = $("#fieldFirstTr").val().trim();
    var frequency = $("#fieldFrequency").val().trim();
    
//    var monthsNeg = moment(date, "DD/MM/YY").diff(moment(), "months");
//    var months = Math.abs(monthsNeg);
//    var billed = rate * months;

    database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
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

    $("#tbody").append("<tr>");
    $("#tbody").append("<td>" + ($('#tbody tr').length + 1) + "</td>");
    $("#tbody").append("<td>" + snapshot.val().train + "</td>");
    $("#tbody").append("<td>" + snapshot.val().destination + "</td>");
    $("#tbody").append("<td>" + snapshot.val().frequency + "</td>");
    $("#tbody").append("<td>" + snapshot.val().firstTrain + "</td>");
    $("#tbody").append("<td>" + "" + "</td>");


});

