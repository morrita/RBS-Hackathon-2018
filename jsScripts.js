

function getDetails(func_detail, subscription_token, account_id, url) {


	var timeout = 10000;
		
		
	if (func_detail == "Account") {
		var full_url = url + account_id;	
		
	}
	else if (func_detail == "Transactions") {
		var full_url = url + account_id + "/transactions";
	
	}
	else {
		alert("func_detail passed to getDetails not recognized!");
	
	}
			
	var xhttp = new XMLHttpRequest();
	
	document.getElementById("progress").style.display = "block";
	bearer_token = document.getElementById("bearerText").value;
	
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4) { 
    	
    		if (this.status == 200) {
    		
    			if (func_detail == "Account") {		//display account summary
    				var acct_name = JSON.parse(this.responseText).accountFriendlyName;
    				var sort_code = JSON.parse(this.responseText).sortCode;
    	   			var account_number = JSON.parse(this.responseText).accountNumber;	
    				var balance = JSON.parse(this.responseText).accountBalance;
    			
    			    document.getElementById("acct_table").rows[0].cells[1].innerHTML = acct_name;
    				document.getElementById("acct_table").rows[1].cells[1].innerHTML = sort_code;
    				document.getElementById("acct_table").rows[2].cells[1].innerHTML = account_number;
    				document.getElementById("acct_table").rows[3].cells[1].innerHTML = '£' + balance;
    			
    				document.getElementById("progress").style.display = "none";
    			}
    			else if (func_detail == "Transactions") {	// display transaction details
    			
    				var array_length = JSON.parse(this.responseText).results.length;
    				var max_display_size = 50; 
    				
    				var tab = document.getElementById("txn_table");
		
    				for (var i = 0; i < array_length; i++) {
    				
    				    if (i < max_display_size) {
    			
    						var date_time = JSON.parse(this.responseText).results[array_length - i - 1].transactionDateTime;
    	   					var description = JSON.parse(this.responseText).results[array_length - i - 1].transactionDescription;	
    	   					var amount = JSON.parse(this.responseText).results[array_length - i - 1].transactionAmount;	
    						var balance = JSON.parse(this.responseText).results[array_length - i - 1].accountBalance;	 
    					

							var table = document.getElementById("txn_table");
							var row = document.createElement("tr");
							var cell0 = document.createElement("td");
							cell0.setAttribute("class", "td0");
							row.appendChild(cell0);
							var cell1 = document.createElement("td");
						    cell1.setAttribute("class", "td1");
							row.appendChild(cell1);   					
							var cell2 = document.createElement("td");
							cell2.setAttribute("class", "td2");
							row.appendChild(cell2);    
							var cell3 = document.createElement("td");
							cell3.setAttribute("class", "td3");
							row.appendChild(cell3);	
							table.appendChild(row);	
						
														
    						date_field = date_time.split('T')[0];
    						long_time_field = date_time.split('T')[1];
    						time_field = long_time_field.split('.')[0];
    				    				
    						document.getElementById("txn_table").rows[i].cells[0].innerHTML = date_field + " " + time_field;
    						document.getElementById("txn_table").rows[i].cells[1].innerHTML = description;
     						document.getElementById("txn_table").rows[i].cells[2].innerHTML = amount;   				
    						document.getElementById("txn_table").rows[i].cells[3].innerHTML = balance;    				
				    	
    				    
    				    }
    				    
    				} 	
    				
    				document.getElementById("progress").style.display = "none";		  			
    			
    			}
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


function refreshDetails() {	
	var subscription_token = "f3c0503b730b465097a7b71d3a9eace2";
	var account_id =  "6b0bfffc-6190-4a19-95fa-293d9fc02ed2";	
	var url = "https://bluebank.azure-api.net/api/v0.7/accounts/";
	getDetails("Account", subscription_token, account_id, url); 
	//getDetails("Transactions", subscription_token, account_id, url); 
	
}


function getTransactions() {	
	var subscription_token = "f3c0503b730b465097a7b71d3a9eace2";
	var account_id =  "6b0bfffc-6190-4a19-95fa-293d9fc02ed2";	
	var url = "https://bluebank.azure-api.net/api/v0.7/accounts/";
//	getDetails("Account", subscription_token, account_id, url); 
	getDetails("Transactions", subscription_token, account_id, url); 
	
}

