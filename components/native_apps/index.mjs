import { spawn } from 'child_process';

class AsyncChildProcess{
    constructor(appName, args, opts){
        if(typeof appName !== 'string') return;
        var cp = spawn(appName, args, opts),
            stdout = '',
            stderr = '';

        const promise = new Promise((resolve, reject) => {
            cp.on('error', reject);
            cp.on('exit', code => {
                if(code) reject(new Error(`Process exited with code ${code}: ${stderr}`)); else resolve(stdout);
            });
            cp.stdout.on('data', chunk => stdout += chunk);
            cp.stderr.on('data', chunk => stderr += chunk);
        });

        promise.stdout = cp.stdout;
        promise.stderr = cp.stderr;
        promise.stdin = cp.stdin;
        promise.stdio = cp.stdio;
        return promise
    }
}

export default class NativeApp{
    constructor(){
        const TargetCP = AsyncChildProcess.bind(null, '/usr/bin/env');
        return new Proxy({}, {
            get(_, name){
                if(typeof name !== 'string') return ;
                return (...args) => {
                    var opts = {};
                    if(typeof args[0] === 'object' && args[0] !== null) opts = args.shift();
                    return new TargetCP([name, ...args], opts)
                }
            }
        })
    }
}
