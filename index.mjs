import Git from 'components/git'
import bot from 'components/telegramBotController'
import Builder from 'components/builder'
import { RU as dictionary } from 'components/dictionary'

const targetDir = '/xray-16';

const git = new Git(targetDir),
    builder = new Builder(targetDir);

function startedBuildNotify(commit){
    return bot.send(`${dictionary[-Infinity]}${commit}\n${dictionary[0]}`)
}

function builtNotify(latestMessage){
    return bot.edit(latestMessage.message_id, `${latestMessage.text}\n${dictionary[1]}`)
}

function linkedNotify(latestMessage){
    return bot.edit(latestMessage.message_id, `${latestMessage.text}\n${dictionary[2]}`)
}

function doneNotify(latestMessage){
    return bot.edit(latestMessage.message_id, `${latestMessage.text}\n${dictionary[Infinity]}`)
}

function errorNotify(latestMessage){
    return bot.edit(latestMessage.message_id, `${latestMessage.text}\n${dictionary[NaN]}`)
}

git.subscribeToOrigin(30 /* seconds */).on('commit', async hash => {
    var firstMessage = startedBuildNotify(hash);
    try{
        await builder.build();
        builtNotify(await firstMessage);
        await builder.link();
        linkedNotify(await firstMessage);
        await builder.compress();
        doneNotify(await firstMessage);
    } catch(e){
        errorNotify(await firstMessage);
    }
})
