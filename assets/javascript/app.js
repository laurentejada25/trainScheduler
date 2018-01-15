// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBaPXIelz9A9Ds68yp_sa5U39WrlNKCiEs",
    authDomain: "trainscheduler-514eb.firebaseapp.com",
    databaseURL: "https://trainscheduler-514eb.firebaseio.com",
    projectId: "trainscheduler-514eb",
    storageBucket: "trainscheduler-514eb.appspot.com",
    messagingSenderId: "419061906147"
  };
  firebase.initializeApp(config);

 var database = firebase.database();
 
 //2. Button for adding Trains 
 $("#add-train-btn").on("click", function (event){
 	event.preventDefault();

 	//Grabs user input
 	var trainInput = $("#train-name-input").val().trim();
 	var destinationInput = $("#destination-input").val().trim();
 	var timeInput = $("#time-input").val().trim();
 	var frequencyInput = $("#frequency-input").val().trim();

 	//Creates local "temporary" object for holding train data
 	var newTrain = {
 		train: trainInput,
 		destination: destinationInput,
 		time: timeInput,
 		frequency: frequencyInput
 	};

 	//Uploads train data to the database
 	database.ref().push(newTrain);

 	//Logs everything to console
 	console.log(newTrain.train);
 	console.log(newTrain.destination);
 	console.log(newTrain.time);
 	console.log(newTrain.frequency);

 	//Alert
 	alert("Train successfully added");

 	//Clears all of the text-boxes
 	$("#train-name-input").val("");
 	$("#destination-input").val("");
 	$("#time-input").val("");
 	$("#frequency-input").val("");

 });

 	//3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
 	database.ref().on("child_added", function (childSnapshot, prevChildKey){
 		console.log(childSnapshot.val());

 		//Store everything into variable
 		var trainInput = childSnapshot.val().train;
 		var destinationInput = childSnapshot.val().destination;
 		var timeInput = childSnapshot.val().time;
 		var frequencyInput = childSnapshot.val().frequency;

 		//Train Info
 		console.log(trainInput);
 		console.log(destinationInput);
 		console.log(timeInput);
 		console.log(frequencyInput);

 		//Format the train time and frequency
 		console.log(timeInput);
 		var trainTimeFormat = moment(timeInput, "HHmm").format("HH:mm");

 		//Current time
 		// var currentTime = moment().format("HH:mm");
 		console.log("time now is " + moment().format())

 		//Calculate minutes away relative to current time

 		// var minutesAwayMath = moment(time).diff(moment().format("HH:mm"));
 		// var minutesAwayMath = moment().diff(moment.unix(trainTimeFormat));
 		// console.log(trainTimeFormat, moment().format("HH:mm"));
 		// console.log('what is this?', minutesAwayMath, trainTimeFormat); 


 		// var minutesAwayMath = moment(timeInput, "HH:mm").subtract(moment().format("HH:mm")).format("HH:mm");
 		

 		var minutesAwayMath = Math.floor(moment(moment().diff(moment(timeInput, "HH:mm"))) / 60000);
 		var minutesAwayMath = Math.floor(moment(moment(timeInput, "HH:mm").diff(moment())) / 60000);
 		console.log('mmak', minutesAwayMath);
 		if (minutesAwayMath < 0) {
 			minutesAwayMath += 1440
 		}

 		// 	var minutesAwayMath = Math.floor(moment(moment(timeInput, "HH:mm").diff(moment())) / 60000);
 		// console.log('mmak', minutesAwayMath);
 		// if (minutesAwayMath < 0) {
 		// 	minutesAwayMath += 1440
 		// }


 		//Add each train's data into the table
 		$("#train-table > tbody").append("<tr><td>" + trainInput + "</td><td>" + destinationInput + "</td><td>" +
  		frequencyInput + "</td><td>" + trainTimeFormat +"</td><td>" + minutesAwayMath + "</td></tr>");
 	});


