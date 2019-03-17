import Git from 'controllers/git'
import Builder from 'controllers/builder'
import Notifier from 'controllers/notifier'

const targetDir = '/xray-16';

const git = new Git(targetDir),
    builder = new Builder(targetDir);

git.subscribeToOrigin(30 /* seconds */).on('commit', async hash => {
    const notifier = new Notifier(hash);
    try{
        notifier.building();
        await builder.build();

        notifier.linking();
        await builder.link();

        notifier.packing();
        await builder.compress();

        notifier.done();
    } catch(e){
        notifier.error();
    }
})
