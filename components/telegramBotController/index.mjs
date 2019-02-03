import Telegraf from 'telegraf'
import settings from './settings'

const tg_interface = new Telegraf(settings.token).telegram

class Bot{

    async send(text, extra){
        return await tg_interface.sendMessage(settings.targetChat, text, extra)
    }

    async edit(id, text, extra){
        return await tg_interface.editMessageText(settings.targetChat, id, null, text, extra)
    }

    async reply(id, text, extra){
        return await tg_interface.sendMessage(settings.targetChat, text, Object.assign({
            reply_to_message_id: id
        }, extra))
    }
}

export default new Bot
