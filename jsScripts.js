

function getAccountDetails() {

	var subscription_token = "f3c0503b730b465097a7b71d3a9eace2";
//	var bearer_token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE1Mzc4MTQ3MDYsIm5iZiI6MTUzNzgxMTEwNiwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6ImY1Njc1NDZlLWQ4ODEtNDYzMi04ZmI3LTM4NTFkMzRkYjY2YiIsImF1ZCI6ImEwNmE3NGM1LWRlYTgtNGY4Ny1iYTc3LTlkZjZkMDMwODcyNSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiaWF0IjoxNTM3ODExMTA2LCJhdXRoX3RpbWUiOjE1Mzc4MTExMDYsIm9pZCI6ImY1Njc1NDZlLWQ4ODEtNDYzMi04ZmI3LTM4NTFkMzRkYjY2YiIsImdpdmVuX25hbWUiOiJUb20iLCJmYW1pbHlfbmFtZSI6Ik1vcnJpcyIsIm5hbWUiOiJUb20gTW9ycmlzIiwiZW1haWxzIjpbInRvbV9tb3JyaXNAYnRpbnRlcm5ldC5jb20iXSwidGZwIjoiQjJDXzFfU0kifQ.MiIIpTYbw82Ve3KFp9vRiyRFifmMN3abVqKRKKLUYKvIC8rObGqZb4sZQEzyUKW387CioSwDdBMLbwD3qKLGHntvO878rDnKO9cGTZuTYbF1M8C6W5YMZlZNVlCw-0shZ9zqMpkNmi9b0wlzG5tyOuuD6YeqKb_AISGelXGqIZmN24jEaK9dk7N8UC97zkh2iai-2QlUGN1oCuP5jbY09DQeSuO7wYnu_Ke9J4kegcz-ZxHe0qfM_A3l6kPEFOm6Z2UqPy9SyCtI49UIIDQWry-x_3HivGcfIoelA-tOPX09vWHv1kA3IMN9CWPSi77pxwxGZkmoN9nbkz6ewwSa-Q";
	var account_id =  "6b0bfffc-6190-4a19-95fa-293d9fc02ed2";	
	var url = "https://bluebank.azure-api.net/api/v0.7/accounts/";
	var full_url = url + account_id;
	var timeout = 2000;
		
	var xhttp = new XMLHttpRequest();
	
	document.getElementById("progress").style.display = "block";
	bearer_token = document.getElementById("bearerText").value;
	
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4) { 
    	
    		if (this.status == 200) {
    			var sort_code = JSON.parse(this.responseText).sortCode;
    	   		var account_number = JSON.parse(this.responseText).accountNumber;	
    			var balance = JSON.parse(this.responseText).accountBalance;
    			
    			document.getElementById("acct_table").rows[0].cells[1].innerHTML = sort_code;
    			document.getElementById("acct_table").rows[1].cells[1].innerHTML = account_number;
    			document.getElementById("acct_table").rows[2].cells[1].innerHTML = balance;
    			
    			document.getElementById("progress").style.display = "none";
        	}	
        	else if (this.status == 403) {
    			document.getElementById("progress").style.display = "none";
    			alert ("403: Access Forbidden!");
        	}       	     	
        }
    };
	
    xhttp.open('GET', full_url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.setRequestHeader('Ocp-Apim-Subscription-Key',subscription_token );
    xhttp.setRequestHeader('Authorization', bearer_token);
    xhttp.timeout = timeout;
    xhttp.ontimeout = function(){
    	alert("Request Timed Out!");
    }
    xhttp.send(null);
    
}

