const process = require('process');

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
});
//const fs = require('fs');
//const path = require('path');
//const markdownIt = require('markdown-it');
//const md = new markdownIt();
//const templateFolder = path.join(__dirname, 'templates');
//const outputFolder = path.join(__dirname, 'output');
//const stylesFile = path.join(__dirname, 'styles.css');
//
//// Ensure the output folder exists
//if (!fs.existsSync(outputFolder)) {
//    fs.mkdirSync(outputFolder);
//}
//
//// Read the stylesheet
//const styles = fs.readFileSync(stylesFile, 'utf-8');
//
//// Read all Markdown files in the templates folder
//fs.readdirSync(templateFolder).forEach((file) => {
//    if (file.endsWith('.md')) {
//        const markdown = fs.readFileSync(path.join(templateFolder, file), 'utf-8');
//        const html = md.render(markdown);
//
//        // Create HTML file with stylesheet
//        const htmlWithStyles = `
//      <html>
//        <head>
//          <style>
//            ${styles}
//          </style>
//        </head>
//        <body>
//          ${html}
//        </body>
//      </html>
//    `;
//
//        // Write HTML to output folder
//        const outputFileName = file.replace('.md', '.html');
//        fs.writeFileSync(path.join(outputFolder, outputFileName), htmlWithStyles);
//
//        console.log(`Converted ${file} to HTML and added stylesheet.`);
//    }
//});

console.log('Conversion complete.');
