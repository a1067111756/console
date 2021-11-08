import Vconsole from './vconsole'

function bindThis () {
    if (typeof window !== 'undefined') {
        window.vconsole = new Vconsole()
    } else {
        throw new Error('插件找不到window对象，node开发请使用nconsole库')
    }
}

bindThis()



