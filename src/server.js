const http = require('http');
const process = require('process');

let hostname = '127.0.0.1';
let port = 3000;

function usage() {
    console.log(`Usage: npm run server [OPTIONS]`);
    console.log("Options:");
    console.log(" -h,  --help                Display this help message");
    console.log(" -hn, --hostname [HOSTNAME] Specify hostname");
    console.log(" -p,  --port [PORT]         Specify port");
}

function handle_options() {
    for(var i = 0; i < process.argv.length; ++i) {
        console.log(`${i}: ${process.argv[i]}`);
        let next_arg = null;
        if(i < process.argv.length-1){
            next_arg = process.argv[i+1];
        }
        
        
    }
}

function main() {
    console.log("Hello world");
    
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

if (require.main === module) {
    main();
}

