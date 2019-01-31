const { spawn } = require('child_process');

class AsyncChildProcess extends Promise{
    constructor(callback, cp){
        super(callback);
        this.stdout = cp.stdout;
        this.stderr = cp.stderr;
        this.stdin = cp.stdin;
        this.stdio = cp.stdio;
    }
}

class AsyncChildProcessError extends Error{
    constructor(code, message){
        super(`Process exited with code ${code}: ${message}`);
    }
}

module.exports = new Proxy({}, {
    get(_, appName){
        return new Proxy({}, {
            get(_, name){
                return (...args) => {
                    var cp = spawn(appName, [name, ...args], { stdio: 'ignore' }),
                        stdout = '',
                        stderr = '';

                    cp.stdout.on('data', chunk => stdout += chunk);
                    cp.stderr.on('data', chunk => stderr += chunk);
                    
                    return new AsyncChildProcess((resolve, reject) => {
                        cp.on('exit', code => {
                            if(code) reject(new AsyncChildProcessError(code, stderr)); else resolve(stdout);
                        })
                    }, cp)
                }
            }
        })
    }
})
