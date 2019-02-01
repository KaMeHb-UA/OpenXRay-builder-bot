import * as stream from 'stream';
declare class AsyncChildProcess extends Promise<string>{
    stdout: stream.Readable
    stderr: stream.Readable
    stdin: stream.Writable
    stdio: [stream.Writable, stream.Readable, stream.Readable]
}

declare var _: {
    [x: string]: (...args: string[]) => AsyncChildProcess
}

export = _
