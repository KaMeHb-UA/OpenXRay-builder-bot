import Git from 'components/git'
import bot from 'components/telegramBotController'
import Builder from 'components/builder'

const langPhrases = {
    [-Infinity]: 'Обнаружен новый коммит: ',
    0: 'Этап 1. Сборка проекта',
    1: 'Этап 2. Линковка бинарников',
    2: 'Этап 3. Упаковка в AppImage',
    [Infinity]: 'Успешно завершено',
    [NaN]: 'Ошибка'
}

const targetDir = '/xray-16';

const git = new Git(targetDir),
    builder = new Builder(targetDir);


function startedBuildNotify(commit){
    return bot.send(`${langPhrases[-Infinity]}${commit}\n${langPhrases[0]}`)
}

function builtNotify(latestMessage){
    return bot.edit(latestMessage.message_id, `${latestMessage.text}\n${langPhrases[1]}`)
}

function linkedNotify(latestMessage){
    return bot.edit(latestMessage.message_id, `${latestMessage.text}\n${langPhrases[2]}`)
}

function doneNotify(latestMessage){
    return bot.edit(latestMessage.message_id, `${latestMessage.text}\n${langPhrases[Infinity]}`)
}

function doneNotify(latestMessage){
    return bot.edit(latestMessage.message_id, `${latestMessage.text}\n${langPhrases[Infinity]}`)
}

function errorNotify(latestMessage){
    return bot.edit(latestMessage.message_id, `${latestMessage.text}\n${langPhrases[Infinity]}`)
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
