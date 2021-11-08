const path = require('path')
const chalk = require('chalk')

class NConsoleSetting {
    constructor () {
        this.enable = true
        this.tags = []
        this.level = [NConsole.STATIC_VCONSOLE_TYPE.DEFAULT]
    }

    setEnabled (value) {
        if (typeof value !== 'boolean') {
            throw new Error('enable配置项只接受boolean类型参数')
        }

        this.enable = value
        return this
    }

    filterTags (value) {
        if (!Array.isArray(value)) {
            throw new Error('tags配置项只接受Array类型参数')
        }

        this.tags = value
        return this
    }

    filterLevel (value) {
        if (!Array.isArray(value)) {
            throw new Error('level配置项只接受Array类型参数')
        }

        this.level = value
        return this
    }
}

class NConsole {
    static STATIC_VCONSOLE_TYPE = {
        'DEFAULT': 0,
        'LOG': 1,
        'INFO': 2,
        'DEBUG': 3,
        'WARNING': 4,
        'ERRORS': 5
    }

    constructor () {
        this.setting = new NConsoleSetting()
        this.VCONSOLE_TYPE = NConsole.STATIC_VCONSOLE_TYPE
    }

    // 输出普通信息
    log () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'log'
        const time = this._getLogTime()
        const logTag = this._getLogTag(tag)

        this._isConsole(NConsole.STATIC_VCONSOLE_TYPE.LOG, logTag)
            && console.log(
                this._getLogGap() +
                chalk.bgWhiteBright(level) +
                this._getLogGap() +
                chalk.white(time) +
                this._getLogGap() +
                chalk.white(this._getStackInfo()) +
                this._getLogGap() +
                chalk.white(logTag),
                ...msg
            )
    }

    // 输出提示信息
    info () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'info'
        const time = this._getLogTime()
        const logTag = this._getLogTag(tag)

        this._isConsole(NConsole.STATIC_VCONSOLE_TYPE.INFO, logTag)
            && console.info(
                this._getLogGap() +
                chalk.bgBlackBright(level) +
                this._getLogGap() +
                chalk.blackBright(time) +
                this._getLogGap() +
                chalk.blackBright(this._getStackInfo()) +
                this._getLogGap() +
                chalk.blackBright(logTag),
                ...msg
            )
    }

    // 输出调试信息
    debug () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'debug'
        const time = this._getLogTime()
        const logTag = this._getLogTag(tag)

        this._isConsole(NConsole.STATIC_VCONSOLE_TYPE.DEBUG, logTag)
            && console.debug(
                this._getLogGap() +
                chalk.bgBlue(level) +
                this._getLogGap() +
                chalk.blue(time) +
                this._getLogGap() +
                chalk.blue(this._getStackInfo()) +
                this._getLogGap() +
                chalk.blue(logTag),
                ...msg
            )
    }

    // 输出警告信息
    warn () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'warn'
        const time = this._getLogTime()
        const logTag = this._getLogTag(tag)

        this._isConsole(NConsole.STATIC_VCONSOLE_TYPE.WARNING, logTag)
            && console.warn(
                this._getLogGap() +
                chalk.bgYellow(level) +
                this._getLogGap() +
                chalk.yellow(time) +
                this._getLogGap() +
                chalk.yellow(this._getStackInfo()) +
                this._getLogGap() +
                chalk.yellow(logTag),
                ...msg
            )
    }

    // 输出错误信息
    error () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'error'
        const time = this._getLogTime()
        const logTag = this._getLogTag(tag)

        this._isConsole(NConsole.STATIC_VCONSOLE_TYPE.ERRORS, logTag)
            && console.error(
                this._getLogGap() +
                chalk.bgRed(level) +
                this._getLogGap() +
                chalk.red(time) +
                this._getLogGap() +
                chalk.red(this._getStackInfo()) +
                this._getLogGap() +
                chalk.red(logTag),
                ...msg
            )
    }

    // 输出ascii信息
    ascii () {
        const tag = arguments[0]
        const content = arguments[1]
        const color = arguments[2] || '#ffffff'

        const level = 'info'
        const time = this._getLogTime()
        const logTag = this._getLogTag(tag)

        this._isConsole(NConsole.STATIC_VCONSOLE_TYPE.INFO, logTag)
            && console.info(
                this._getLogGap() +
                chalk.bgBlackBright(level) +
                this._getLogGap() +
                chalk.blackBright(time) +
                this._getLogGap() +
                chalk.blackBright(this._getStackInfo()) +
                this._getLogGap() +
                chalk.blackBright(logTag),
                chalk.hex(color)(content)
            )
    }

    // 输出日志模板
    version () {
        const tag = arguments[0]
        const titleParams = arguments[1]
        const contentParams = arguments[2]

        const level = 'info'
        const time = this._getLogTime()
        const logTag = this._getLogTag(tag)

        this._isConsole(NConsole.STATIC_VCONSOLE_TYPE.INFO, logTag)
            && console.info(
                this._getLogGap() +
                chalk.bgBlackBright(level) +
                this._getLogGap() +
                chalk.blackBright(time) +
                this._getLogGap() +
                chalk.blackBright(this._getStackInfo()) +
                this._getLogGap() +
                chalk.blackBright(logTag),
                this._getLogWrap() + this._getLogGap(),
                chalk.hex(titleParams.color || '#ffffff')(titleParams.title),
                chalk.hex(contentParams.color || '#ffffff')(contentParams.content),
            )
    }

    // 判断是否输出日志 - 存在VCONSOLE_TYPE.DEFAULT表示都要打印
    _isConsole (type, logTag) {
        // 开关控制
        const enableMatch = this.setting.enable

        // 等级控制
        const levelMatch = this.setting.level.includes(NConsole.STATIC_VCONSOLE_TYPE.DEFAULT) || this.setting.level.includes(type)

        // tag控制
        const tagMatch = Array.isArray(this.setting.tags) && (this.setting.tags.length <= 0 || this.setting.tags.some(tag => logTag.includes(tag)))

        return enableMatch && levelMatch && tagMatch
    }

    // 获取打印tag标签
    _getLogTag (tag) {
        return `[${tag}]:`
    }

    // 获取打印参数
    _getLogParams (params) {
        if (params.length < 2) {
            throw new Error('vconsole必须至少包含两个参数')
        }

        const tag = params[0]
        const msg = Object.assign([], Array.from(params).slice(1))

        return {
            tag,
            msg
        }
    }

    // 获取打印时间
    _getLogTime () {
        const dayjs = new Date()
        const year = dayjs.getFullYear()
        const month = dayjs.getMonth() + 1
        const day = dayjs.getDay()
        const hours = dayjs.getHours()
        const minutes = dayjs.getMinutes()
        const seconds = dayjs.getSeconds()

        const complete = (number) => {
            return parseInt(number) < 10 ? '0' + number : number
        }

        return `${year}-${complete(month)}-${complete(day)} ${complete(hours)}:${complete(minutes)}:${complete(seconds)}`
    }

    // 打印信息间的间隔
    _getLogGap () {
        return '  '
    }

    // 打印信息间的换行
    _getLogWrap () {
        return '\n'
    }

    // 获取栈信息
    _getStackInfo (){
        function getException() {
            try {
                throw Error('nconsole throw error for catch stack info');
            } catch (err) {
                return err;
            }
        }

        const err = getException();
        const stack = err.stack;
        const stackArr = stack.split('\n');

        let callerLogIndex = 0;
        for (let i = 0; i < stackArr.length; i++) {
            if (stackArr[i].indexOf('Object.<anonymous>') > 0 && i + 1 < stackArr.length) {
                callerLogIndex = i;
                break;
            }
        }

        if (callerLogIndex !== 0) {
            const callerStackLine = stackArr[callerLogIndex];
            const fileAndLine = callerStackLine.slice(callerStackLine.lastIndexOf('(') + 1, -1)
            return path.basename(fileAndLine)
        } else {
            return '';
        }
    }
}

module.exports = NConsole
