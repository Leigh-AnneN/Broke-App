const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

// Check if a file name is provided as a command-line argument
if (process.argv.length !== 3) {
  console.error('Please provide a file name as a command-line argument');
  process.exit(1);
}

// Get the file name from command-line argument
const fileName = process.argv[2];

// Read the URLs from the file
fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error(`Couldn't read the file ${fileName}`);
    process.exit(1);
  }

  // Split the file contents by lines
  const urls = data.trim().split('\n');

  // Process each URL
  urls.forEach((urlString) => {
    const parsedUrl = url.parse(urlString);
    const outputFileName = parsedUrl.hostname;

    // Determine the appropriate module based on tehe URL protocol
    const httpModule = parsedUrl.protocol === 'http:' ? http : https;

    // Make a GET request to the URL
    const request = httpModule.get(urlString, (res) => {
      let html = '';

      res.on('data', (chunk) => {
        html += chunk;
      });

      res.on('end', () => {
        // Write the HTML to a file
        fs.writeFile(outputFileName, html, (err) => {
          if (err) {
            console.error(`Couldn't write to the file ${outputFileName}`);
          } else {
            console.log(`Wrote to ${outputFileName}`);
          }
        });
      });
    });
    // Handle errors during the GET request
    request.on('error', (err) => {
      console.error(`Couldn't download ${urlString}`);
    });
    });
});

    //Handle error reading the original file
    process.on('uncaughtException', (err) => {
        console.error(`Couldn't read the file ${fileName}`);
        process.exit(1);
        }
        );
        
