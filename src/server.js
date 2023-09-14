const http = require('http');
const fs = require("fs");
const process = require('process');
const path = require('path');
const markdown = require('./markdown');

let hostname = '127.0.0.1';
let port = 3000;
let template = 'github-style';

function usage() {
    console.log(`Usage: npm run dev [OPTIONS]`);
    console.log('Options:');
    console.log(' -h,  --help                Display this help message');
    console.log(' -hn, --hostname [HOSTNAME] Specify hostname           default: 127.0.0.1');
    console.log(' -p,  --port [PORT]         Specify port               default: 3000');
    console.log(' -t,  --template [TEMPLATE] Specify template           default: github-style');
}

function handle_options() {
    let status = true;

    for(let i = 0; i < process.argv.length; ++i) {
        let arg = process.argv[i]

        let next_arg = null;
        // Verify if there is a next argument
        if(i < process.argv.length-1){
            next_arg = process.argv[i+1];
        }
        
        if(['-h', '--help'].includes(arg)){
            usage();
            status = false;
            break;
        }

        if(!next_arg) continue;

        if(['-hn', '--hostname'].includes(arg)){
            hostname = next_arg;
        }else if(['-p', '--port'].includes(arg)){
            port = parseInt(next_arg);
        }else if(['-t', '--template'].includes(arg)){
            template = next_arg;
        }
    }

    return status;
}

function create_server(){
    const server = http.createServer((req, res) => {
        let index = markdown.construct_html(template);
        res.statusCode = 200;
        res.setHeader('Content-Length', Buffer.byteLength(index));
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(index);
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

    return server;
}

function main() {
    let status = handle_options();
    if (!status) return;

    let server = create_server();

    fs.watch(__dirname + `/../templates/${template}/`, {recursive:true}, (eventType, filename) => {
        console.log('File "' + filename + '" was changed: ' + eventType);
        server.close(create_server)

    });
}

if (require.main === module) {
    main();
}
