var slytherin = 0;
var ravenclaw = 0;
var hufflepuff = 0;
var gryffindor = 0;
var total = 0;
var responce;

$(document).ready(function() {
	$.ajax({    //create an ajax request to view.php
		type: "GET",
		url: "view.php",             
		dataType: "html",   //expect html to be returned                
		success: function(response){                    
			$("#responsecontainer").html(response); 
			responce = response;
			
			while(responce.indexOf("id=") != -1) {
				//trim begining
				responce = responce.substr(responce.indexOf("id="));
			//get the points
				responce = responce.substr(responce.indexOf("id='point'>"));
				var first = responce.indexOf(">") + 1;
				var second = responce.indexOf("<");
				var points = parseInt(responce.substr(first,second-first));
			//check if adding or subtracting
				responce = responce.substr(responce.indexOf("id='add'>"));
				first = responce.indexOf(">") + 1;
				second = responce.indexOf("<");
				var add = responce.substr(first,second-first);
			//get the house
				responce = responce.substr(responce.indexOf("id='house'>"));
				first = responce.indexOf(">") + 1;
				second = responce.indexOf("<");
				var house = responce.substr(first,second-first);
			//add points to house
				if (house == "Slytherin") {
					if(add == "add") slytherin += points;
					else slytherin -= points;
				} else if (house == "Ravenclaw") {
					if(add == "add") ravenclaw += points;
					else ravenclaw -= points;
				} else if (house == "Hufflepuff") {
					if(add == "add") hufflepuff += points;
					else hufflepuff -= points;
				} else if (house == "Gryffindor") {
					if(add == "add") gryffindor += points;
					else gryffindor -= points;
				}
				if(points) {
					if (add == "add") total += points;
					else total -= points;
				}
			}
			//coloring the divs to more visually show who is first
			var ravenarr = [ravenclaw, "ravenclaw"];
			var slytharr = [slytherin, "slytherin"];
			var hufflarr = [hufflepuff, "hufflepuff"];
			var gryffarr = [gryffindor, "gryffindor"];
			var pointsarr = [ravenarr, slytharr, hufflarr, gryffarr];
			pointsarr.sort(function(a, b){return b[0] - a[0]});
			//first
			document.getElementById(pointsarr[0][1]).className += "success";
			//seccond
			if(pointsarr[0][0] == pointsarr[1][0])
				document.getElementById(pointsarr[1][1]).className += "success";
			else
				document.getElementById(pointsarr[1][1]).className += "warning";
			//third
			if(pointsarr[0][0] == pointsarr[2][0])
				document.getElementById(pointsarr[2][1]).className += "success";
			else
				document.getElementById(pointsarr[2][1]).className += "warning";
			//last
			if(pointsarr[0][0] == pointsarr[3][0])
				document.getElementById(pointsarr[3][1]).className += "success";
			else
				document.getElementById(pointsarr[3][1]).className += "alert";
			
			//put the points in the divs
			var ravenpoints = parseInt(ravenclaw/total * 100) + "%" + " of the total at: " + ravenclaw;
			var slythpoints = parseInt(slytherin/total * 100) + "%" + " of the total at: " + slytherin;
			var hufflpoints = parseInt(hufflepuff/total * 100) + "%" + " of the total at: " + hufflepuff;
			var gryffpoints = parseInt(gryffindor/total * 100) + "%" + " of the total at: " + gryffindor;
			//console.log("things");
			document.getElementById("ravenclawPoint").innerText += ravenpoints; 
			document.getElementById("slytherinPoint").innerText += slythpoints;
			document.getElementById("hufflepuffPoint").innerText += hufflpoints;
			document.getElementById("gryffindorPoint").innerText += gryffpoints;
		}
	});
});
