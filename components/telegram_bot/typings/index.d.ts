import Telegraf from 'telegraf'

declare var telegraf_instance: Telegraf<any>
type MessagePromise = ReturnType<typeof telegraf_instance.telegram.sendMessage>

interface Bot{
    send(text: string, extra: object): MessagePromise
    edit(id:number, text: string, extra: object): MessagePromise
    reply(id:number, text: string, extra: object): MessagePromise
}

declare var bot: Bot

export default bot
