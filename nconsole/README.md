# 🚀 VConsole
> ⌨️ 该工具仅用于web端开发时打印格式化日志，便于日志的管控，配合浏览器开发者工具食用更佳

> ⌨️ 原计划是将browser和node版本兼容为一个版本，开发中发现browser和node控制台输出样式方式是不一致的，且考虑node端后期可能会增加日志文件输出等功能，没办法很好的兼容browser端，计划将node端拆分为新的一个工具库NConsole(🔗)

### ❤️ 插件的背景和目标
___
- 背景 - 在实际开发项目中想更好的控制输出打印、更快的进行日志筛选、更样式化的定制打印


- 目标 - 尽可能简单的api, 与原生console api保持一致。尽可能的很好配合浏览器开发者工具的日志操作


- 声明 - 该插件旨在减化自己工作中重复工作的工具，实现原理简单，自身能力有限，使用者勿喷，如果有好的想法和建议也可在issue中提出

### ✨️ 插件的基本功能
___
 - 支持日志分级别打印，不同级别日志显示不同颜色区分 ✓
 - 支持日志控制开关 ✓
 - 支持日志过滤标记 ✓
 - 内置一些常见打印，比如提交日志、图标 - （部分完成，部分待完善） 
 - 内置一些测试性能的打印 - （待完成）

 > level timestamp [tag] - 内容

### 😊️  插件的使用
___
📦 Install:
```bash
$ yarn add @chengyu/vconsole -D
```

🔨 Usage

Import to your script:
```js
    import 'vconsole'
```

Use in code:
```javascript
    vconsole.log('test', '我是log日志')
    vconsole.info('test', '我是info日志')
    vconsole.debug('test', '我是debug日志')
    vconsole.warn('test', '我是warn日志')
    vconsole.error('test', '我是error日志')
```

### ✌  插件的选项
___
#### 一些前置概念
```javascript
    支持的日志等级(与开发者工具等级分类基本一致)
        [
            // 默认等级
            'DEFAULT',
            // 普通日志
            'LOG',
            // 信息日志
            'INFO',
            // 调试日志
            'DEBUG',
            // 警告日志
            'WARNING',
            // 错误日志
            'ERRORS'
        ]

    日志实例:
        vconsole内部没有导出任何实例给外部, 只在import时自动生成了一个实例并挂载到了window对象上,
        也就是说你可以在window对象上直接找到vconsole这个实例, 在代码中像调用原生console一样直接
        调用vconsole
```

#### 全局配置项
该插件默认不需要配置，但可以对其进行配置以支持自定义日志控制功能:

```javascript
    vconsole
        .setting
        // 开启日志打印，表示是否开启插件
        .setEnabled(true)
        // 设置过滤的tag，表示需要过滤打印的tag日志
        .setTags(['layer'])
        // 设置过滤的等级，表示需要过滤打印的日志等级
        .setLevel([vconsole.VCONSOLE_TYPE.DEBUG])
```

#### 内置函数

#### vconsole.log(tag: string, ...msg: any[])

```javascript
vconsole.log('test', '我是log日志')
```
![log日志](./doc/images/log.png)

<br/>

#### vconsole.info(tag: string, ...msg: any[])
```javascript
vconsole.info('test', '我是info日志')
```
![info日志](./doc/images/info.png)

<br/>

#### vconsole.debug(tag: string, ...msg: any[])
```javascript
vconsole.debug('test', '我是debug日志')
```
![debug日志](./doc/images/debug.png)

<br/>

#### vconsole.warn(tag: string, ...msg: any[])
```javascript
vconsole.warn('test', '我是warn日志')
```
![warn日志](./doc/images/warn.png)

<br/>

#### vconsole.error(tag: string, ...msg: any[])
```javascript
vconsole.error('test', '我是error日志')
```
![error日志](./doc/images/error.png)

<br/>

#### vconsole.image(tag: string, url: string, style: string)
```javascript
vconsole.image('test', 'https://www.baidu.com/img/flexible/logo/pc/result.png', 'padding-left: 150px; padding-bottom:40px;')
```
![image日志](./doc/images/image.png)

<br/>

#### vconsole.version(tag: string, imageParams: { url: string, style: string }, titleParams: { title: string, style: string }, contentParams: { content: string, style: string })
```javascript
    vconsole.version(
    'version',
    {
        url: 'http://xxxx/animate-dashboard.gif',
        style: 'padding-left:300px; padding-bottom:280px;'
    },
    {
        title: 'vconsole版本模板',
        style: 'color: red; font-weight: bold; font-size: 20px; margin-top: 10px;'
    },
    {
        style: 'color: #000000; line-height: 20px;',
        content: `
    branch: dev
    commit: 初始功能完成测试
    version: 0.0.1
    lastCommitTime: 2021-11-04 12:00:00
            `
    }
)
```
![version日志](./doc/images/version.png)