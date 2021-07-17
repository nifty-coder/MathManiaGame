var myTimer, gameLevel1, gameLevel2, timerCount, gameStarted;

gameLevel1 = 10;

gameLevel2 = 10;

timerCount = 60;

gameStarted = false;

/* This function checks if Enter key is pressed and calls checkIfvalidorNot to
 verify the answer submitted. This is setup against the answer text box. */
function checkEnter() {
	var keyPressed = event.which || event.keyCode;
	if (keyPressed == 13) {
		checkIfvalidorNot();
		return true;
	} else if (keyPressed >= 48 && keyPressed <= 57) {
		return true;
	} else {
		return false;
	}
}

// This function checks what is the option selected
function checkSelection() {
	changeDisplay("init", 0);
	var selectedOption = getSelection("list1");
	enableLevels();
	document.getElementById("compare-operation").style.display = "none";
	document.getElementById("answer").style.display = "inline";
	clearInterval(myTimer);
	var modal = document.getElementById('myModal');
	if (modal.style.display === "block") {
		displayHelp();
	}
	clearInterval(myTimer);
	/* The below switch-case construct checks the option selected and sets the
	operation symbol between the numbers accordingly and changes answer box */
	switch (selectedOption) {
		case "addition":
			document.getElementById("display").innerHTML = "+";
			break;
		case "subtraction":
			document.getElementById("display").innerHTML = "-";
			break;
		case "multiplication":
			document.getElementById("display").innerHTML = "x";
			break;
		case "division":
			document.getElementById("display").innerHTML = "/";
			break;
		case "compare":
			document.getElementById("display").innerHTML = "( )";
			document.getElementById("compare-operation").value = "( )";
			document.getElementById("compare-operation").style.display = "inline";
			document.getElementById("answer").style.display = "none";
			break;
		default:
			document.getElementById("display").innerHTML = "";
	}
}

function getSelection(element) {
	var answerOptions = document.getElementById(element);
	var selectedOption = answerOptions.options[answerOptions.selectedIndex].value;
	return selectedOption;
}

function answerSelection() {
	// The below code moves whatever selected option to the display between the numbers
	document.getElementById("display").innerHTML = getSelection("compare-operation");
}

/* This function calls startGame function if pressed Play 
and calls stopGame function if pressed Stop */
function nextClicked() {
	var buttonText = document.getElementById('generate').innerHTML;
	if (getSelection("list1") === "plsselect") {
		changeDisplay("invalid", 0);
	} else if (buttonText === "Play" && gameStarted === false) {
		startGame();
		showElements();
	} else {
		stopGame();
		hideElements();
	}
}
// This function starts the game 
function startGame() {

	var num1;
	var num2;

	changeDisplay("init", 0);
	disableLevels();

	// Changes the button text
	document.getElementById('generate').innerText = "Stop";
	// If a valid operation is not selected, don't give any numbers
	if (getSelection("list1") === "plsselect") {
		changeDisplay("invalid", 0);
	}
	/* If a valid option is chosen, then do everything 
	in the else part */
	else {
		checkOption();
		if ((document.getElementById("list1").value === "compare") && (gameLevel1 === 1000)) {
			gameLevel1 = gameLevel1 * 1000;
			gameLevel2 = gameLevel2 * 1000;
		}
		if ((document.getElementById("list1").value === "compare") && (gameLevel1 === 100)) {
			gameLevel1 = gameLevel1 * 100;
			gameLevel2 = gameLevel2 * 100;
		}
		if ((document.getElementById("list1").value === "compare") && (gameLevel1 === 10)) {
			gameLevel1 = gameLevel1 * 10;
			gameLevel2 = gameLevel2 * 10;
		}
		if ((document.getElementById("list1").value === "multiplication") && (gameLevel2 === 1000)) {
			gameLevel2 = 100;
		}

		// Get two random numbers 
		num1 = Math.floor(Math.random() * gameLevel1);
		num2 = Math.floor(Math.random() * gameLevel2);
		if (document.getElementById('list1').value === "division") {
			if (gameLevel1 === 100) {
				num1 = Math.floor((Math.random() * 10)) + 11;
				num2 = Math.floor((Math.random() * 5)) + 11;
			} else if (gameLevel1 === 1000) {
				num1 = Math.floor((Math.random() * 5)) + 16
				num2 = Math.floor((Math.random() * 5)) + 16;
			}
		}
		/* Countdown timer is getting from timerCount variable */
		document.getElementById('timer').innerHTML =
			00 + ":" + timerCount;
		/* To avoid infinite loops due to multiple clicks of Play button,
		first clear the timer and then restart the timer */
		clearInterval(myTimer);
		startTimer();

		/* Assign the numbers to the HTML elements so that they are visible to user */
		document.getElementById('num2').value = num2;
		document.getElementById('num1').value = num1;
		/* If multiplication is chosen, replace num1 with (num1 times(x) num2).
			   This will make sure num1 is divisible by num2 */
		if (document.getElementById("display").innerHTML === "/") {
			document.getElementById('num1').value = num1 * num2;
			if (num2 == "0") {
				num2++;
				document.getElementById('num2').value = num2;
			}
		} else if (document.getElementById("display").innerHTML === "-") {
			if (num1 < num2) {
				document.getElementById('num1').value = num2;
				document.getElementById('num2').value = num1;
			} else {
				document.getElementById('num1').value = num1;
			}
		}
		// Make the numbers appear in bold
		document.getElementById('num1').style.fontWeight = "bold";
		document.getElementById('num2').style.fontWeight = "bold";
	}
}

/* This function starts the timer counting each second until time remaining
   becomes zero */
function startTimer() {

	// Start the timer with 1 second (1000 milliseconds) interval
	myTimer = setInterval(checkSecond, 1000);

	/* Capture the current time and break it into minutes and seconds holding each
	   part in timeArray variable */
	var presentTime = document.getElementById('timer').innerHTML;
	var timeArray = presentTime.split(/[:]+/);

	// Minutes
	var m = timeArray[0];

	// Seconds
	var s = timeArray[1];

	// This function calculates remaining minutes and seconds after every second
	function checkSecond() {
		s = s - 1;
		if (s < 10 && s >= 0) {
			s = "0" + s;
		} // add zero in front of numbers if < 10

		// If seconds went below zero, that means minutes should be reduced by 1.
		if (s < 0) {
			s = "59";
			m = m - 1;
		}

		// Assign the calculated time to the timer element on the HTML
		document.getElementById('timer').innerHTML =
			m + ":" + s;
		// If time remaining is 0, then stop the timer and show the timeUp message
		if ((s == 0) && (m == 0)) {
			clearInterval(myTimer);
			changeDisplay("timeUp", 0);
		}
	}
}
/* This function stops game if pressed Stop */
function stopGame() {
	changeDisplay("init", 0);
	enableLevels();
	clearInterval(myTimer);
	document.getElementById("generate").innerText = "Play";
}
// The below function checks if the answer submitted is valid or not
function checkIfvalidorNot() {

	// Convert the num1 and num2 values from the HTML into integers
	var num1 = parseInt(document.getElementById('num1').value);
	var num2 = parseInt(document.getElementById('num2').value);
	var calculated;
	// Clear the myTimer
	clearInterval(myTimer);

	// Convert the answer text box value into a Float
	var answer = parseFloat(document.getElementById('answer').value);

	// Make the answer text box as bold
	document.getElementById('answer').style.fontWeight = "bold";

	// Read what is the action shown on the screen
	var action = document.getElementById("display").innerHTML;
	/*  The below switch-case construct will calculate the result of the
	   operation chosen by the user and store the calculated correct value
	   in the "calculated" variable */

	switch (action) {
		case "+":
			calculated = num1 + num2;
			break;
		case "-":
			calculated = num1 - num2;
			break;
		case "x":
			calculated = num1 * num2;
			break;
		case "/":
			calculated = (num1 / num2).toFixed(2);
			answer = (answer).toFixed(2);
			break;
			/* When reading the symbols > and <, JavaScript converts them to equivalent
			value &gt and &lt respectively.  So we are checking for those.  The below
			three case statements handle compare operation.
			*/
		case "&gt;":
		case "&lt;":
		case "=":
			answer = action;
			switch (true) {
				case num1 == num2:
					calculated = "=";
					break;
				case num1 > num2:
					calculated = "&gt;";
					break;
				case num1 < num2:
					calculated = "&lt;";
					break;
			}
			break;
		default:

			/* If no valid option is chosen, show appropriate message to user 
			and show losing picture. */
			changeDisplay("invalid", 0);
			return;
	}

	/* This if else statement checks if the calculated value and the answer match.
		  If they match, the user entered the correct answer.  If the answer does match,
		  then show celebrate picture, winning message, change colors of text-happy element and play
		  happy song.  Also, resets num1, num2 and answer boxes for next round of playing */

	if (calculated === answer) {
		changeDisplay("win", calculated);
	}

	/* If the answer does not match, then show the losing picture, losing message,
	  change colors of text-happy element, and play sad song.  Also, resets
	  num1, num2 and answer boxes for next round of playing */
	else {
		changeDisplay("lose", calculated);
	}
}

// Changes display based on resultIndicator
function changeDisplay(resultIndicator, result) {

	var winSongs = ["Bhali Bhali.mp3", "Chale Chalo.mp3", "Jai Ho.mp3", "Manasa Gelupu.mp3", "Congratulations.mp3", "Eureka.mp3", "Kodite Kottalira.mp3"];
	var winRandom = Math.floor(Math.random() * winSongs.length);

	var loseSongs = ["Haanikarak.mp3", "whatamma.mp3", "Kyse Hua.mp3", "Why This Kolaveri Dhi.mp3", "Next Enti.mp3", "Tharki Chokro.mp3", "Yemaindo Teleyadu.mp3", "Try Again.mp3"];
	var loseRandom = Math.floor(Math.random() * loseSongs.length);

	switch (resultIndicator) {
		case "init":
			// Initializing all the screen variables
			document.getElementById('dance').src = "";
			document.getElementById('dance').style.display = "none";
			document.getElementById('text-happy').innerHTML = "";
			document.getElementById('text-happy').style.backgroundColor = "";
			document.getElementById('text-happy').style.color = "orange";
			document.getElementById("congrats").src = "";
			document.getElementById("ohno").src = "";
			document.getElementById('timer').innerHTML = "";
			enableLevels();
			hideElements();
			break;
		case "win":
			// Change the display when answer is correct    
			document.getElementById('dance').src = "./celebrate.jpg";
			document.getElementById('dance').style.display = "block";
			document.getElementById('text-happy').innerHTML = "Yey! You won!";
			document.getElementById('text-happy').style.color = "white";
			document.getElementById('text-happy').style.backgroundColor = "green";
			var songElementWin = document.getElementById('congrats');
			songElementWin.src = "./" + winSongs[winRandom];
			songElementWin.play();
			enableLevels();
			hideElements();
			break;
		case "timeUp":
			// Change the display when timer is up
			document.getElementById('dance').src = "./losing.jpg";
			document.getElementById('dance').style.display = "block";
			document.getElementById("text-happy").innerHTML = "Sorry! Time up. Better luck next time!!";
			document.getElementById('text-happy').style.color = "white";
			document.getElementById('text-happy').style.backgroundColor = "red";
			enableLevels();
			hideElements();
			break;
		case "lose":
			// Change the display when the answer is wrong
			document.getElementById('dance').src = "./losing.jpg";
			document.getElementById('dance').style.display = "block";
			document.getElementById("text-happy").innerHTML = "Sorry! The answer is " + result + ".";
			document.getElementById('text-happy').style.color = "white";
			document.getElementById('text-happy').style.backgroundColor = "red";
			var songElementLose = document.getElementById('ohno');
			songElementLose.src = "./" + loseSongs[loseRandom];
			songElementLose.play();
			enableLevels();
			hideElements();
			break;
		case "invalid":
			// Change the display when proper operation is not selected
			document.getElementById('dance').src = "./losing.jpg";
			document.getElementById('dance').style.display = "block";
			document.getElementById("text-happy").innerHTML = "Please select a valid option!!!";
			document.getElementById("text-happy").backgroundColor = "";
			enableLevels();
			hideElements();
			break;
		default:
			break;
	}
	/* Once the answer is submitted reset the values for num1, num2 and answer */
	if ((resultIndicator != "init") && (resultIndicator != "invalid answer")) {
		document.getElementById('num1').value = '';
		document.getElementById('num2').value = '';
		document.getElementById('answer').value = '';
	} else if (document.getElementById('list1').value == "compare") {
		compareOptions = document.getElementById('compare-operation').options;
		compareOptions.selectedIndex = 0;
		document.getElementById('display').innerHTML = "( )";
	}
}
/* This function shows num1, num2, and display elements */
function showElements() {
	document.getElementById('generate').innerText = "Stop";
	document.getElementById("num1").style.display = "inline";
	document.getElementById("num2").style.display = "inline";
	document.getElementById("display").style.display = "inline";
	document.getElementById('wrap-page').style.display = "block";
	document.getElementById("answer").focus();
	gameStarted = true;
}

/* This function clears elements above, enables radioGroup, and hides wrap-page */
function hideElements() {
	document.getElementById('generate').innerText = "Play";
	document.getElementById('wrap-page').style.display = "none";
	document.getElementById('num1').value = "";
	document.getElementById('num2').value = "";
	document.getElementById('num1').style.display = "none";
	document.getElementById('num2').style.display = "none";
	document.getElementById('display').style.display = "none";
	enableLevels();
	clearInterval(myTimer);
	gameStarted = false;
}
/* This function populates appropriate hints for each operation and shows them
in a pop up dialog */
function displayHelp() {

	// Get the selected operation
	var selectedOption = getSelection("list1");
	var helpMessage;

	// Set the helpMessage as per the operation chosen
	switch (selectedOption) {
		case "addition":
			helpMessage = "<h3><u>Addition Hint</u></h3><ol><li>Please keep the bigger number " +
				"in mind and count the smaller number on your fingers.</li> " +
				"<li>Alternatively use the number line.</li></ol>";
			break;
		case "subtraction":
			helpMessage = "<h3><u>Subtraction Hint</u></h3><ol><li>Please keep the bigger number " +
				"in mind and count the smaller number on your fingers.</li> " +
				"<li>Alternatively use the number line.</li></ol>";
			break;
		case "multiplication":
			helpMessage = "<h3><u>Multiplication Hint</u></h3><p>Please use repeated addition." +
				"<br>For e.g., 4x3 is read as 4 times 3.<br> Add 3 repeatedly for 4 times. <br>So 4x3 = 3+3+3+3 = 12 </p>";
			break;
		case "division":
			helpMessage = "<h3><u>Division Hint</u></h3><p>Please use repeated subtraction.<br>" +
				"For e.g., 6/2 is read as 6 divided by 2. <br>Keep subtracting 2 " +
				"from 6 repeatedly till you get 0 and then count the number of 2's<br> " +
				"So,6/2=6-2-2-2 = 0.  The count of 2's is 3. So, the answer is 3.</p>";
			break;
		case "compare":
			helpMessage = "<h3><u>Comparison Hint</u></h3><ol><li>Check 1st number with 2nd number " +
				"<li>Then choose appropriate symbol.</li>" +
				"<p>For example, 11 ? 15. 11 is lesser than 15. So, fill the () with <. Start from left to right  and if they're same then check if next digit is < or >. If they're same, choose =. </p> ";			
         break;
		default:
			helpMessage = "<h3><u>No Operation Selected</u></h3><p>Please select " +
				"an operation for appropriate hints!!</p>";
	}
	// Get the modal element from the HTML
	var modal = document.getElementById('myModal');

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	// Populate the helpMessage into the myPara element
	document.getElementById('myPara').innerHTML = helpMessage;
	document.getElementById('myPara').style.textAlign = "left";
	modal.style.display = "block";

	span.onclick = function () {
		closeModal();
	}
}
// This function closes modal help
function closeModal() {
	var modal = document.getElementById('myModal');
	modal.style.display = "none";
}

function checkOption() {
	var radioOpts = document.getElementsByName('radio');
	var buttonChecked;
	for (i = 0; i < radioOpts.length; i++) {
		if (radioOpts[i].checked) {
			buttonChecked = radioOpts[i].value;
		}
	}
	switch (buttonChecked) {
			
		case "Very Easy":
			gameLevel1 = 10;
			gameLevel2 = 10;
			timerCount = 60;
			break;
		case "Easy":
			gameLevel1 = 10;
			gameLevel2 = 10;
			timerCount = 20;
			break;
		case "Medium":
			gameLevel1 = 100;
			gameLevel2 = 100;
			timerCount = 45;
			break;
		case "Hard":
			gameLevel1 = 1000;
			gameLevel2 = 1000;
			timerCount = 60;
			break;
		default:
			gameLevel1 = 10;
			gameLevel2 = 10;
			timerCount = 20;
			break;
	}
}

function enableLevels() {

	var radioOpts = document.getElementsByName('radio');
	for (i = 0; i < radioOpts.length; i++) {
		radioOpts[i].disabled = false;
	}
}

function disableLevels() {

	var radioOpts = document.getElementsByName('radio');
	for (i = 0; i < radioOpts.length; i++) {
		if (!radioOpts[i].checked) {
			radioOpts[i].disabled = true;
		}
	
	}
}
