import pinyin, { STYLE_NORMAL } from "pinyin"
import { statSync, readFileSync } from 'fs'
import NameUtil from './NameUtil.js'
const nameGenerate = new NameUtil()
import RandomAccessFile from 'random-access-file'
import { rejects } from "assert"


/**
 * 汉字转拼音
 * 
 * @param {string} words 文字列表
 */
function pin_yin(words) {
    let result = pinyin(words, { style: STYLE_NORMAL })
    return result
}

/**
 * 全唐诗
 */
async function quan_tang_shi() {
    return new Promise(function (resolve, reject) {
        let filepath = new URL('data/全唐诗.txt', import.meta.url)
        let length = 30 * 1024
        let size = statSync(filepath).size - length
        let start = Math.floor(size * Math.random())
        console.log(start)
        let file = new RandomAccessFile(decodeURI(filepath.pathname.substring(1)))
        file.read(start, length, function (err, buffer) {
            if (err) {
                reject(err)
                return
            }
            let str = buffer.toString()
            console.log(str)
            let strs = str.split(/卷\d+_\d+/g)
            strs.shift()
            strs.pop()
            let shis = strs.filter((shi) => {
                shi = shi.trim()
                let ss = shi.split(/\n/)
                let names = ss[0].split(/[【】]/)
                return names.length > 2
            }).map((shi) => {
                shi = shi.trim()
                let ss = shi.split(/\n/)
                let names = ss[0].split(/[【】]/)
                return {
                    title: names[1].trim(),
                    author: names[2].trim(),
                    content: ss.slice(1, ss.length).join('\n').trim()
                }
            })
            resolve(shis[Math.floor(Math.random() * shis.length - 1)])
            file.close(function () {
                console.log('file is closed')
            })
        })
    })
}

/**
 * 脑筋急转弯
 */
function nao_jin_ji_zhuan_wan() {
    let file = new URL('data/脑筋急转弯大全.txt', import.meta.url)
    let content = readFileSync(file, 'utf-8')
    let lines = content.split('\n')
    let results = lines.filter((line) => {
        return line.includes('答案：')
    }).map((line) => {
        let qa = line.split('答案：')
        return { q: qa[0].trim(), a: qa[1].trim() }
    })
    return results[Math.floor(Math.random() * results.length - 1)]
}

/**
 * 增广贤文
 */
function zeng_guang_xian_wen() {
    let file = new URL('data/《增广贤文》.txt', import.meta.url)
    let content = readFileSync(file, 'utf-8')
    let lines = content.split('\n')
    let results = lines.filter((line) => {
        return line.length > 5
    }).map((line) => {
        return line.trim()
    })
    return results[Math.floor(Math.random() * results.length - 1)]
}

/**
 * 网络小说
 */
function wang_luo_xiao_shuo() {
    let file = new URL('data/网络小说列表.txt', import.meta.url)
    let content = readFileSync(file, 'utf-8')
    let lines = content.split('\n')
    let results = lines.filter((line) => {
        return line.length > 5
    }).map((line) => {
        return line.trim()
    })
    return results[Math.floor(Math.random() * results.length - 1)]
}
/**
 * 头像
 */
function head_image() {
    let file = new URL('data/head_image.txt', import.meta.url)
    let content = readFileSync(file, 'utf-8')
    let lines = content.split('\n')
    let results = lines.filter((line) => {
        return line.length > 5
    }).map((line) => {
        return line.trim()
    })
    return results[Math.floor(Math.random() * results.length - 1)]
}
/**
 * 图片
 */
function image() {
    let file = new URL('data/image.txt', import.meta.url)
    let content = readFileSync(file, 'utf-8')
    let lines = content.split('\n')
    let results = lines.filter((line) => {
        return line.length > 5
    }).map((line) => {
        return line.trim()
    })
    return results[Math.floor(Math.random() * results.length - 1)]
}

/**
 * 获取随机文本行
 */
function findRandomTxtLine(name) {
    let dir = new URL('data/', import.meta.url)
    let file = new URL(name, dir)
    let content = readFileSync(file, 'utf-8')
    let lines = content.split('\n')
    let results = lines.map((line) => {
        return line.trim()
    }).filter((line) => {
        return line.length > 1
    })
    return results[Math.floor(Math.random() * results.length - 1)]
}



/**
 * 姓名
 */
function xing_ming() {
    return nameGenerate.get()
}

function di_ming() {
    let line = findRandomTxtLine('地名.txt')
    return line.split(/ +/)[1]
}

function xue_xiao_ming_zi() { return findRandomTxtLine('学校名字.txt') }

export {
    pin_yin,
    quan_tang_shi,
    nao_jin_ji_zhuan_wan,
    zeng_guang_xian_wen,
    wang_luo_xiao_shuo,
    xing_ming,
    head_image,
    image,
    di_ming,
    xue_xiao_ming_zi,
}