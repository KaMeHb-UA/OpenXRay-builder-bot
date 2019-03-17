type V = Promise<void>
export default class Notifier{
    constructor(commit: string)
    building(): V
    linking(): V
    packing(): V
    done(): V
    error(): V
}
