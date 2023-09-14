const fs = require("fs");

function construct_html(template){
    // Temporary Index
    let index = '<html><head><style>{{ style }}</style></head><body><h1>Temporary File</h1>{{ body }}</body></html>';
    let style = '* {box-sizing: border-box;}';
    let body = '<h2>You are not supposed to read this</h2>';
    index = index.replace('{{ style }}', style);
    index = index.replace('{{ body }}', body);

    let index_path = __dirname + '/index.html'
    let style_path = __dirname + `/../templates/${template}/style.css`
    let body_path = __dirname + '/index.html'

    if(!fs.existsSync(index_path)) {
        throw 'Index not found';
    }else if(!fs.existsSync(style_path)) {
        throw 'Style not found';
    }else if(!fs.existsSync(body_path)) {
        throw 'Body not found';
    }
    index = fs.readFileSync(index_path, {encoding:'utf8'});
    style = fs.readFileSync(style_path, {encoding:'utf8'});
    index = index.replace('{{ style }}', style);
    //    index = index.replace('{{ html }}', html);

    return index;
}

module.exports = { construct_html }