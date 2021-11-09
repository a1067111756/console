class VconsoleSetting {
    constructor () {
        this.tags = []
        this.enable = true
        this.enableStackInfo = true
        this.level = [Vconsole.STATIC_VCONSOLE_TYPE.DEFAULT]
    }

    setEnabled (value) {
        if (typeof value !== 'boolean') {
            throw new Error('enable配置项只接受boolean类型参数')
        }

        this.enable = value
        return this
    }

    setEnableStackInfo (value) {
        if (typeof value !== 'boolean') {
            throw new Error('enableStackInfo配置项只接受boolean类型参数')
        }

        this.enableStackInfo = value
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

export default class Vconsole {
    static STATIC_VCONSOLE_TYPE = {
        'DEFAULT': 0,
        'LOG': 1,
        'INFO': 2,
        'DEBUG': 3,
        'WARNING': 4,
        'ERRORS': 5
    }

    constructor () {
        this.setting = new VconsoleSetting()
        this.CONSOLE_TYPE = Vconsole.STATIC_VCONSOLE_TYPE
    }

    // 输出普通信息
    log () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'log'
        const time = this._getLogTime()

        const levelStyle = this._getLogLevelStyle(level)
        const commonStyle = 'color: #606266'

        this._isConsole(Vconsole.STATIC_VCONSOLE_TYPE.LOG, tag)
            && console.log(`%c ${level} %c ${time} ${this._getStackInfo()}[${tag}]:`, levelStyle, commonStyle, ...msg)
    }

    // 输出提示信息
    info () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'info'
        const time = this._getLogTime()

        const levelStyle = this._getLogLevelStyle(level)
        const commonStyle = 'color: #000000'

        this._isConsole(Vconsole.STATIC_VCONSOLE_TYPE.INFO, tag)
            && console.info(`%c ${level} %c ${time} ${this._getStackInfo()}[${tag}]:`, levelStyle, commonStyle, ...msg)
    }

    // 输出调试信息
    debug () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'debug'
        const time = this._getLogTime()

        const levelStyle = this._getLogLevelStyle(level)
        const commonStyle = 'color: #409EFF'

        this._isConsole(Vconsole.STATIC_VCONSOLE_TYPE.DEBUG, tag)
            && console.debug(`%c ${level} %c ${time} ${this._getStackInfo()}[${tag}]:`, levelStyle, commonStyle, ...msg)
    }

    // 输出警告信息
    warn () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'warn'
        const time = this._getLogTime()

        const levelStyle = this._getLogLevelStyle(level)
        const commonStyle = 'color: #E6A23C'

        this._isConsole(Vconsole.STATIC_VCONSOLE_TYPE.WARNING, tag)
            && console.warn(`%c ${level} %c ${time} ${this._getStackInfo()}[${tag}]:`, levelStyle, commonStyle, ...msg)
    }

    // 输出错误信息
    error () {
        const { tag, msg } = this._getLogParams(arguments)
        const level = 'error'
        const time = this._getLogTime()

        const levelStyle = this._getLogLevelStyle(level)
        const commonStyle = 'color: red'

        this._isConsole(Vconsole.STATIC_VCONSOLE_TYPE.ERRORS, tag)
            && console.error(`%c ${level} %c ${time} ${this._getStackInfo()}[${tag}]:`, levelStyle, commonStyle, ...msg)
    }

    // 输出图片信息
    ascii () {
        const tag = arguments[0]
        const content = arguments[1]
        const color = arguments[2] || '#000000'

        const level = 'info'
        const time = this._getLogTime()

        const levelStyle = this._getLogLevelStyle(level)
        const commonStyle = 'color: #000000'
        const contentStyle =  `color: ${color}`

        this._isConsole(Vconsole.STATIC_VCONSOLE_TYPE.INFO, tag)
            && console.info(`%c ${level} %c ${time} ${this._getStackInfo()}[${tag}]: %c ${content}`, levelStyle, commonStyle, contentStyle)
    }

    // 输出图片信息
    image () {
        const tag = arguments[0]
        const url = arguments[1]
        const style = arguments[2]
        const level = 'info'
        const time = this._getLogTime()

        const levelStyle = this._getLogLevelStyle(level)
        const commonStyle = 'color: #000000'

        this._isConsole(Vconsole.STATIC_VCONSOLE_TYPE.INFO, tag)
            && console.info(`%c ${level} %c ${time} ${this._getStackInfo()}[${tag}]: \n %c `, levelStyle, commonStyle, `background: url(${url}) no-repeat; background-size: 100% 100%; ${style}`)
    }

    // 输出日志模板
    version () {
        const tag = arguments[0]
        const imageParams = arguments[1]
        const titleParams = arguments[2]
        const contentParams = arguments[3]

        const level = 'info'
        const time = this._getLogTime()

        const levelStyle = this._getLogLevelStyle(level)
        const commonStyle = 'color: #000000'

        this._isConsole(Vconsole.STATIC_VCONSOLE_TYPE.INFO, tag)
            && console.info(
                `%c ${level} %c ${time} ${this._getStackInfo()}[${tag}]: \n %c %c \n ${titleParams.title} %c \n ${contentParams.content}`,
                levelStyle,
                commonStyle,
                `background: url(${imageParams.url}) no-repeat; background-size: 100% 100%; ${imageParams.style}`,
                titleParams.style,
                contentParams.style
            )
    }

    // 判断是否输出日志 - 存在VCONSOLE_TYPE.DEFAULT表示都要打印
    _isConsole (type, logTag) {
        // 开关控制
        const enableMatch = this.setting.enable

        // 等级控制
        const levelMatch = this.setting.level.includes(Vconsole.STATIC_VCONSOLE_TYPE.DEFAULT) || this.setting.level.includes(type)

        // tag控制
        const logTagList = this._getLogTag(logTag)
        const tagMatch = Array.isArray(this.setting.tags) && (this.setting.tags.length <= 0 || this.setting.tags.some(tag => logTagList.includes(tag)))

        return enableMatch && levelMatch && tagMatch
    }

    // 获取打印标志样式
    _getLogLevelStyle (type) {
        const strategy = {
            log: 'background: #606266; color: #ffffff; border-radius: 3px; padding: 2px 0px 2px 0px;',
            info: 'background: #000000; color: #ffffff; border-radius: 3px; padding: 2px 0px 2px 0px;',
            debug: 'background: #409EFF; color: #ffffff; border-radius: 3px; padding: 2px 0px 2px 0x;',
            warn: 'background: #E6A23C; color: #ffffff; border-radius: 3px; padding: 2px 0px 2px 0px;',
            error: 'background: red; color: #ffffff; border-radius: 3px; padding: 2px 0px 2px 0px;'
        }

        return strategy[type]
    }

    // 获取打印tag标签
    _getLogTag (tag) {
        return tag.split(' ')
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

    // 获取栈信息
    _getStackInfo (){
        if (!this.setting.enableStackInfo) {
            return ''
        }

        try {
            const orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function(_, stack) { return stack; };
            const err = new Error;
            const stack = err.stack;
            Error.prepareStackTrace = orig;

            let fileName = stack[2].getFileName()
            const lineNumber = stack[2].getLineNumber()

            if (fileName.includes('(')) {
                fileName = fileName.slice(fileName.lastIndexOf('('), -1)
                return `${fileName} `
            } else {
                fileName = fileName.slice(fileName.lastIndexOf('/') + 1)
                fileName = fileName.split('?')[0]
                return `${fileName}:${lineNumber} `
            }
        } catch (e) {
            return ''
        }
    }
}
