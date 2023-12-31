const fs = require("fs");
const showdown  = require('showdown');

function construct_html(template){
    // Temporary Index
    let index = '<html><head><style>{{ style }}</style></head><body><h1>Temporary File</h1>{{ body }}</body></html>';
    let style = '* {box-sizing: border-box;}';
    let body = '<h2>You are not supposed to read this</h2>';
    index = index.replace('{{ style }}', style);
    index = index.replace('{{ body }}', body);
    // End Temporary Index

    try{
        let index_path = __dirname + '/index.html'
        let style_path = __dirname + `/../templates/${template}/style.css`
        let body_path = __dirname + `/../templates/${template}/index.md`

        index = fs.readFileSync(index_path, {encoding:'utf8'});
        style = fs.readFileSync(style_path, {encoding:'utf8'});
        body = fs.readFileSync(body_path, {encoding:'utf8'});


        // Convert markdown to html
        let converter = new showdown.Converter({
            openLinksInNewWindow: true,
        })
        body = converter.makeHtml(body);


        index = index.replace('{{ style }}', style);
        index = index.replace('{{ body }}', body);


    }catch (e) {
        console.log(e.message)
    }

    return index;
}

module.exports = { construct_html }