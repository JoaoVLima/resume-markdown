const http = require('http');
const process = require('process');
const path = require('node:path');

let hostname = '127.0.0.1';
let port = 3000;
let template = 'github-style';

function usage() {
    console.log(`Usage: npm run server [OPTIONS]`);
    console.log('Options:');
    console.log(' -h,  --help                Display this help message');
    console.log(' -hn, --hostname [HOSTNAME] Specify hostname           default: 127.0.0.1');
    console.log(' -p,  --port [PORT]         Specify port               default: 3000');
    console.log(' -t,  --template [TEMPLATE] Specify template           default: github-style');
}

function handle_options() {
    let status = true;

    for(var i = 0; i < process.argv.length; ++i) {
        let arg = process.argv[i]

        let next_arg = null;
        // Verify if there is a next_argument
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

function main() {
    let status = handle_options();
    if (!status) return;
    
    let index = 'nice';

    fetch(path.resolve(__dirname, 'src/index.html'))
         .then(result => result.text())
         .then(data => {
             index = data;
         })
        .catch(error => {console.error(error)});

    console.log(index);

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Length', Buffer.byteLength(index));
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(index);
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

if (require.main === module) {
    main();
}
