

function getAccountDetails() {

	var subscription_token = "f3c0503b730b465097a7b71d3a9eace2";
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
    	alert("getAccountDetails Request Timed Out!");
    }
    xhttp.send(null);   
}

function getAccountTransactions() {

	var subscription_token = "f3c0503b730b465097a7b71d3a9eace2";
	var account_id =  "6b0bfffc-6190-4a19-95fa-293d9fc02ed2";	
	var url = "https://bluebank.azure-api.net/api/v0.7/accounts/";
	var full_txn_url = url + account_id + "/transactions";
	
	var timeout = 10000;
		
	var xhttp = new XMLHttpRequest();
	
	document.getElementById("progress").style.display = "block";
	bearer_token = document.getElementById("bearerText").value;
	
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4) { 
    	
    		if (this.status == 200) {
    		
    			var array_length = JSON.parse(this.responseText).results.length;
    			var max_display_size = 20;
    			
    			for (var i = 0; i < max_display_size; i++) {
    			
    				var date_time = JSON.parse(this.responseText).results[array_length - i - 1].transactionDateTime;
    	   			var description = JSON.parse(this.responseText).results[array_length - i - 1].transactionDescription;	
    	   			var amount = JSON.parse(this.responseText).results[array_length - i - 1].transactionAmount;	
    				var balance = JSON.parse(this.responseText).results[array_length - i - 1].accountBalance;	    				
    				
    				date_field = date_time.split('T')[0];
    				long_time_field = date_time.split('T')[1];
    				time_field = long_time_field.split('.')[0];
    				    				
    				document.getElementById("txn_table").rows[i + 1].cells[0].innerHTML = date_field + " " + time_field;
    				document.getElementById("txn_table").rows[i + 1].cells[1].innerHTML = description;
     				document.getElementById("txn_table").rows[i + 1].cells[2].innerHTML = amount;   				
    				document.getElementById("txn_table").rows[i + 1].cells[3].innerHTML = balance;    				
    				
    			}  			

        	}	
        	else if (this.status == 403) {
    			document.getElementById("progress").style.display = "none";
    			alert ("403: Access Forbidden!");
        	}       	     	
        }
    };
	
    xhttp.open('GET', full_txn_url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.setRequestHeader('Ocp-Apim-Subscription-Key',subscription_token);
    xhttp.setRequestHeader('Authorization', bearer_token);
    xhttp.timeout = timeout;
    xhttp.ontimeout = function(){
    	alert("getAccountTransactions Request Timed Out!");
    }
    xhttp.send(null);
    
}

function refreshDetails() {
	getAccountDetails(); 
	getAccountTransactions(); 
}

