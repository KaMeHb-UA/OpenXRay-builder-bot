import Git from 'components/git'

const git = new Git('/xray-16');

git.subscribeToOrigin(30 /* seconds */).on('commit', hash => {
    console.log('NEW COMMIT', hash)
})
