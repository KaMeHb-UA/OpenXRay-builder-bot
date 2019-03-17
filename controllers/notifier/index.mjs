import { dictionary } from 'settings'
import bot from 'components/telegram_bot'

const phrases = {
    found: dictionary[-Infinity],
    building: dictionary[0],
    linking: dictionary[1],
    packing: dictionary[2],
    done: dictionary[Infinity],
    error: dictionary[NaN],
}

/**
 * @type {Map<Notifier, Map<string, any>>}
 */
const activeNotifiersStorage = new Map

export default class Notifier{
    constructor(commit){
        const storage = new Map;
        activeNotifiersStorage.set(this, storage);
        storage.set('commit', commit)
    }
    async building(){
        const storage = activeNotifiersStorage.get(this);
        storage.set('target message', await bot.send(`${
                phrases.found
            }${
                storage.get('commit')
            }\n${
                phrases.building
            }`)
        )
    }
    async __routineStage(name){
        const storage = activeNotifiersStorage.get(this);
        const msg = storage.get('target message');
        storage.set('target message', await bot.edit(msg.message_id, `${msg.text}\n${phrases[name]}`))
    }
    linking = () => this.__routineStage('linking')
    packing = () => this.__routineStage('packing')
    done = () => this.__routineStage('done')
    error = () => this.__routineStage('error')
}
