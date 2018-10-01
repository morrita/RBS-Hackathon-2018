

function getDetails(func_detail, subscription_token, account_id, url) {


	var timeout = 10000;
		
		
	if (func_detail == "Account") {
		var full_url = url + account_id;	
		
	}
	else if (func_detail == "Transactions") {
		var full_url = url + account_id + "/transactions";
	}
	else {
		var full_url = url + account_id;	
	
	}

			
	var xhttp = new XMLHttpRequest();
	
	document.getElementById("progress").style.display = "block";
	bearer_token = document.getElementById("bearerText").value;
	
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4) { 
    	
    		if (this.status == 200) {
    		
    			if (func_detail == "Account") {		//display account summary
    			
    				var sort_code = JSON.parse(this.responseText).sortCode;
    	   			var account_number = JSON.parse(this.responseText).accountNumber;	
    				var balance = JSON.parse(this.responseText).accountBalance;
    			
    				document.getElementById("acct_table").rows[0].cells[1].innerHTML = sort_code;
    				document.getElementById("acct_table").rows[1].cells[1].innerHTML = account_number;
    				document.getElementById("acct_table").rows[2].cells[1].innerHTML = balance;
    			
    				document.getElementById("progress").style.display = "none";
    			}
    			else if (func_detail == "Transactions") {	// display transaction details
    			
    				var array_length = JSON.parse(this.responseText).results.length;
    				var max_display_size = 20;
    			
    				for (var i = 1; i < max_display_size; i++) {
    			
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
    				
    				    document.getElementById("progress").style.display = "none";
    				} 			  			
    			
    			}
    			else if (func_detail == "Group") {	// display group details
    			
    			
      				document.getElementById("txn_table").rows[1].cells[0].innerHTML = "2018-09-23";
    				document.getElementById("txn_table").rows[1].cells[1].innerHTML = "Restaurant Group";
     				document.getElementById("txn_table").rows[1].cells[2].innerHTML = "";   				
    				document.getElementById("txn_table").rows[1].cells[3].innerHTML = "-£25";     			
    					
    				document.getElementById("txn_table").rows[2].cells[0].innerHTML = "2018-09-30 16:19:52";
    				document.getElementById("txn_table").rows[2].cells[1].innerHTML = "Tom Walker";
     				document.getElementById("txn_table").rows[2].cells[2].innerHTML = "£25";   				
    				document.getElementById("txn_table").rows[2].cells[3].innerHTML = ""; 
 
     				document.getElementById("txn_table").rows[3].cells[0].innerHTML = "2018-09-27 18:10:42";
    				document.getElementById("txn_table").rows[3].cells[1].innerHTML = "Kate Grant";
     				document.getElementById("txn_table").rows[3].cells[2].innerHTML = "£25";   				
    				document.getElementById("txn_table").rows[3].cells[3].innerHTML = "";   
    				
    				document.getElementById("txn_table").rows[4].cells[0].innerHTML = "2018-09-25 23:11:12";
    				document.getElementById("txn_table").rows[4].cells[1].innerHTML = "Adam Willis";
     				document.getElementById("txn_table").rows[4].cells[2].innerHTML = "£25";   				
    				document.getElementById("txn_table").rows[4].cells[3].innerHTML = "";     							
    				
      				document.getElementById("txn_table").rows[5].cells[0].innerHTML = "2018-09-23 10:59:50";
    				document.getElementById("txn_table").rows[5].cells[1].innerHTML = "Pizza Express";
     				document.getElementById("txn_table").rows[5].cells[2].innerHTML = "-£100";   				
    				document.getElementById("txn_table").rows[5].cells[3].innerHTML = "";    				
    				
    				
    				
    				  
    			
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
//	getDetails("Transactions", subscription_token, account_id, url); 
	getDetails("Group", subscription_token, account_id, url); 
	
}

