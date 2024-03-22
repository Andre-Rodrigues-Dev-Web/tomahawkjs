#!/usr/bin/env node

const { exec } = require('child_process');
const { program } = require('commander');

program
  .option('-l, --layout <layout>', 'Specify the layout type: react or angular')
  .parse(process.argv);

const layout = program.layout.toLowerCase();

if (layout === 'react') {
  console.log('Initializing React project...');
  exec('npx create-react-app my-react-app', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Success: ${stdout}`);
  });
} else if (layout === 'angular') {
  console.log('Initializing Angular project...');
  exec('npx @angular/cli new my-angular-app', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Success: ${stdout}`);
  });
} else {
  console.error('Invalid layout type. Please specify either "react" or "angular".');
}
