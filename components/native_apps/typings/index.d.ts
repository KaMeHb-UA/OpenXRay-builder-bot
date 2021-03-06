import * as stream from 'stream';
import * as child from 'child_process';
declare class AsyncChildProcess extends Promise<string>{
    stdout: stream.Readable
    stderr: stream.Readable
    stdin: stream.Writable
    stdio: [stream.Writable, stream.Readable, stream.Readable]
}

declare function main(...args: string[]): AsyncChildProcess
declare function main(opts: child.SpawnOptions, ...args: string[]): AsyncChildProcess

declare var NativeApps: {
    new(cmd: string): typeof main
}

export default NativeApps
