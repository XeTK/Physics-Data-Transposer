/*
 * Author  : Tom Rosier
 * Contact : tom.rosier92@gmail.com
 */

// Import extra functions that we will need.
var fs         = require('fs');
var readline   = require('readline');
var math       = require('mathjs');

// Constants change theses if you want.
var FILE_EXTENSION = 'txt';
var SOURCE_FILE    = 'file.txt';
var SAVE_DIR       = 'data';
var FILE_NAME      = 'test';

// Buffers and flags that we may need later.
var count     = 1;
var firstLine = '';
var first     = false;

// Open up the file reader and read in the source file.
var rd = readline.createInterface(
  {
    input:    fs.createReadStream(SOURCE_FILE),
    output:   process.stdout,
    terminal: false
  }
);

// Read the source file line by line.
rd.on(
  'line', 
  function(line) {

    // Get the first row which will be the constant throughtout all of the files.
    if (!first) {

      // Store that first line.
      firstLine = line;

      // Keep a flag to say we have found the first item.
      first = true;

      // Dirty dirty quick exit becuse we don't want todo anything else....
      return;
    }

    // Convert the lines into an array of elements.
    var firstRow  = firstLine.split('\t');
    var secondRow = line.split('\t');

    // Combine them back together into a 2d array with both rows.
    var dataSet   = [firstRow, secondRow];

    // Transpose the data to flip the rows and columns.
    dataSet = math.transpose(dataSet);

    // Keep a buffer to contain the string we are working on.
    var cont = '';

    // Loop through the entire data set.
    for (var i = 0; i < dataSet.length; i++) {

      // Grab the row we are currently working on.
      var oneSet = dataSet[i];

      // Build a row into a text string. 
      for (var j = 0; j < oneSet.length; j++) 
        cont += oneSet[j] + '\t';
      
      // Create a new line once we are done.
      cont += '\n';
    }

    // Write the contents out to file, with a unique id.
		fs.writeFile(
			SAVE_DIR + "/" + FILE_NAME + '_' + count + '.' + FILE_EXTENSION, 
			cont, 
			function(err) {
		    if(err) {
		      console.log(err);
		    } else {
		      console.log("The file was saved!");
		    }
	    }
    ); 

    // Increment the unique ID for the next line in the file.
    count++;
	}
);