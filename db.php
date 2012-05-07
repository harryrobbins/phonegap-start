<!DOCTYPE HTML>
<html>
<head>
<title>DB test</title>
<style type='text/css'>

</style>
</head>

<body>
This is a db test:


</body>
<script type='text/javascript'>
	    var mydb=false;
		
 
    // initialise the database
    function initDb() {
      try { 
        if (!window.openDatabase) { 
          alert('not supported'); 
        } else { 
          var shortName = 'phonegap'; 
          var version = '1.0'; 
          var displayName = 'PhoneGap Test Database'; 
          var maxSize = 65536; // in bytes 
          mydb = openDatabase(shortName, version, displayName, maxSize); 
		  return mydb;
         }
      } catch(e) { 
        // Error handling code goes here. 
        if (e == INVALID_STATE_ERR) { 
          // Version number mismatch. 
          alert("Invalid database version."); 
        } else { 
          alert("Unknown error "+e+"."); 
        } 
        return; 
      } 
    }
	
	function populateDB(tx) {
		 tx.executeSql('DROP TABLE IF EXISTS DEMO');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
		 tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
		 tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
	}
	
	function queryDB(tx) {
	 try { 
		return tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
		} catch(e) { 
        // Error handling code goes here. 
        if (e == INVALID_STATE_ERR) { 
          // Version number mismatch. 
          alert("Invalid database version."); 
        } else { 
          alert("Unknown error "+e+"."); 
        } 
        return; 
      } 
		
	}

	function querySuccess(tx, results) {
		var len = results.rows.length;
		console.log("DEMO table: " + len + " rows found.");
		for (var i=0; i<len; i++){
			console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
		}
	}


	function errorCB(err) {
		alert("Error processing SQL: "+err.code, err);
	}

	function successCB() {
		// console.log("successCB!");
	}

	mydb = initDb();
	mydb.transaction(populateDB, errorCB, successCB);
	var result = mydb.transaction(queryDB, errorCB, successCB);
	console.log(result);
	
</script>

</html>
