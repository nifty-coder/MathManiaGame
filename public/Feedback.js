            /* When loaded this page, runs postFeedback function and sends data to Google Script page */

            window.addEventListener("load", function () {
            	document.getElementById("gform").addEventListener("submit", function (event) {
            		event.preventDefault();
            		postFeedback();
            		document.gform.reset();
            	});

            	function postFeedback() {

            		var xhttp = new XMLHttpRequest();

            		var myForm = new FormData(document.getElementById("gform"));

            		xhttp.onreadystatechange = function () {
            			if (this.readyState === 4) {
            				document.getElementById("result").style.display = "block";
            				document.getElementById("successText").innerHTML = "Thank you for your feedback!";
            			};
            		}

            		xhttp.open("POST", "https://script.google.com/macros/s/AKfycbwRU8hv9LJgQo7f5eKXGKtzZklMvvxmPngrGqR_phsnsXmj99mK/exec", true);
            		xhttp.send(myForm);
            	}

			});

