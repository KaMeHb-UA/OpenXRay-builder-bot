import NativeApp from 'components/native_apps'
import { mkdirSync as mkdir } from 'fs'

const cmake = new NativeApp('cmake'),
    make = new NativeApp('make'),
    mv = new NativeApp('mv');

export default class Builder{
    constructor(targetDir){
        this._targetDir = targetDir;
        this._binDir = targetDir + '/bin'
    }
    async build(){
        mkdir(this._binDir);
        await cmake({ cwd: this._binDir }, '..')
    }
    async link(){
        mkdir('/game/bin', { recursive: true });
        await make({ cwd: this._binDir }, 'DESTDIR=/game/bin', 'install');
        await mv('/game', '/game.AppDir')
    }
    async compress(){
        //
    }
}
