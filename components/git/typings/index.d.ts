import NativeApp from 'components/native_apps'

declare var app: NativeApp

declare function _(...args: string[]): ReturnType<typeof app._>

type OptlessACPF = typeof _

type ImplementedEvents = {
    commit: (commitHash: string) => void
}

declare class Git{
    constructor(cwd: string)

    log: OptlessACPF & {
        pretty: ((format: string) => OptlessACPF) & {
            oneline: OptlessACPF,
            short: OptlessACPF,
            full: OptlessACPF,
            fuller: OptlessACPF,
        },
    }

    pull: OptlessACPF

    subscribeToOrigin(interval: number): this

    on<T extends keyof ImplementedEvents>(event: T, callback: ImplementedEvents[T]): void
}

export = Git
