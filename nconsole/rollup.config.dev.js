const path = require('path')
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

module.exports = {
    input: path.resolve(__dirname, './lib/index.js'), // 入口文件
    output: [
        { // 打包umd格式文件
            file: path.resolve(__dirname, './dist/nconsole.umd.js'), // 输出路劲
            format: 'umd', // umd - 统一兼容模式 cjs - commonJs模式 ejs - es6模式
            name: 'nconsole', // 对外暴露的顶级变量
            sourcemap: true // 开启sorcemap
        },
        { // 打包es格式文件
            file: path.resolve(__dirname, './dist/nconsole.es.js'), // 输出路劲
            format: 'es', // umd - 统一兼容模式 cjs - commonJs模式 ejs - es6模式
            name: 'nconsole', // 对外暴露的顶级变量
            sourcemap: true // 开启sorcemap
        },
        { // 打包es格式文件
            file: path.resolve(__dirname, './dist/nconsole.common.js'), // 输出路劲
            format: 'cjs', // umd - 统一兼容模式 cjs - commonJs模式 es - es6模式
            name: 'nconsole', // 对外暴露的顶级变量
            sourcemap: true // 开启sorcemap
        }
    ],
    globals: {
        'nconsole': 'nconsole'
    },
    // 插件
    plugins: [
        nodeResolve(),
        babel(),
        json(),
        commonjs()
    ]
}