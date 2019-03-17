import NativeApp from 'components/native_apps'
import fs from 'fs'

const git = new NativeApp('git');

class Git{
    constructor(cwd){
        /** @type {string} */
        this._cwd = cwd;
        /** @typedef {(...args: string[]) => ReturnType<typeof git>} OptlessACPF */
        /** @type {OptlessACPF} */
        this._git = git.bind(this, { cwd });
        this._storage = new Map;
        var __log = this._git.bind(this, 'log');
        this.log = Object.assign(__log, {
            pretty: Object.assign(
                format => __log.bind(null, `--pretty${format ? `=format:'${format}'`: ''}`),
            {
                oneline: __log.bind(null, '--pretty=oneline'),
                short: __log.bind(null, '--pretty=short'),
                full: __log.bind(null, '--pretty=full'),
                fuller: __log.bind(null, '--pretty=fuller'),
            })
        });
        this.pull = this._git.bind(this, 'pull');
    }
    on(event, callback){
        var subscribeF = this[`__on_${event}`];
        if(subscribeF) subscribeF.call(this, callback);
        return this
    }
    __on_commit(callback){
        fs.watchFile(`${this._cwd}/.git/FETCH_HEAD`, () => {
            this.log.pretty('%h')('-n', 1).then(commit => {
                commit = commit.slice(1, -1);
                if(commit !== this._storage.get('latestCommit')){
                    this._storage.set('latestCommit', commit);
                    callback(commit)
                }
            })
        })
    }
    subscribeToOrigin(interval){
        setInterval(this.pull, interval * 1000);
        return this
    }
}

export default Git
