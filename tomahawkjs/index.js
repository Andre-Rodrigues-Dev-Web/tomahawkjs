const { execSync } = require('child_process');
const { program } = require('commander');
const inquirer = require('inquirer');
const path = require('path');

program
  .option('-l, --layout <layout>', 'Specify the layout type: react or angular')
  .parse(process.argv);

const layout = program.layout.toLowerCase() || 'react';

if (!layout) {
  console.error('Missing layout option. Please specify either "react" or "angular".');
  process.exit(1);
}

if (layout === 'react') {
  console.log('Initializing React project...');

  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'options',
        message: 'Select additional options:',
        choices: [
          { name: 'Styled Components' },
          { name: 'Axios' },
          { name: 'React Router DOM' }
        ]
      }
    ])
    .then(answers => {
      const selectedOptions = answers.options;
      const optionsString = selectedOptions.join(' ');

      console.log('Installing dependencies...');
      const projectPath = path.resolve('my-react-app');
      execSync(`npx create-react-app ${projectPath} && cd ${projectPath} && npm install ${optionsString}`);
      console.log('Success!');
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
} else if (layout === 'angular') {
  console.log('Initializing Angular project...');
  execSync('npx @angular/cli new my-angular-app');
  console.log('Success!');
} else {
    console.log('Erro de execução!');
}
