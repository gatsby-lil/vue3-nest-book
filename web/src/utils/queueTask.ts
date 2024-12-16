import { isArry } from "./share"

export class QueueTask {
    public isRuning = false
    public isCancel = false
    public taskResult: any[] = []
    public taskList: Function[] = []
    private curIndex = 0
    constructor(public notify: Function, initTaskList: Function[]) {
        if(isArry(initTaskList)) {
            this.taskList = initTaskList;
        }
    }

    pushTask(fn: Function | Function[]) {
        if(isArry(fn)) {
            this.taskList.push(...fn);
            return;
        }
        this.taskList.push(fn);
    }

    startTask() {
        if (this.isRuning) {
            return;
        }
        return new Promise(async (resolve, reject) => {
            this.isRuning = true;
            while (this.curIndex < this.taskList.length) {
                if (!this.isRuning) {
                    return;
                }
                if (this.isCancel) {
                    return reject()
                }
                try {
                    const task = this.taskList[this.curIndex++];
                    const result = await task();
                    this.taskResult.push(result)
                    typeof this.notify === 'function' && this.notify(result);
                } catch (error) {
                    this.resetTaskFlag()
                    return reject(error);
                }
            }
            resolve(this.taskResult);
            this.resetTaskFlag();
        })
    }

    stopTask() {
        this.isRuning = false;
    }

    cancelTask() {
        this.isCancel = true;
    }

    resetTaskFlag() {
        this.isRuning = false;
        this.isCancel = false;
        this.curIndex = 0;
        this.taskResult = []
    }

}
