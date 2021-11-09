const NConsole = require('./nconsole')

function bindThis () {
    if (typeof global !== 'undefined') {
        global.nconsole = new NConsole()
    } else {
        throw new Error('插件找不到global对象，browser开发请使用vconsole库')
    }
}

bindThis()

