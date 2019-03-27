var pinyin = require("pinyin");
const fs = require('fs');
const path = require('path');
const NameUtil = require('./NameUtil');
const nameGenerate = new NameUtil()

/**
 * 汉字转拼音
 * 
 * @param {string} words 文字列表
 */
function pin_yin(words) {
    var result = pinyin(words, { style: pinyin.STYLE_NORMAL })
    return result
}

/**
 * 全唐诗
 */
async function quan_tang_shi() {
    return new Promise(function (resolve, reject) {
        var filepath = path.join(__dirname, '/data/全唐诗.txt')
        var length = 30 * 1024
        var size = fs.statSync(filepath).size - length
        var start = parseInt(size * Math.random())
        console.log(start);
        var randomAccessFile = require('random-access-file')
        var file = randomAccessFile(filepath)
        file.read(start, length, function (err, buffer) {
            var str = String(buffer)
            var strs = str.split(/卷\d+_\d+/g)
            strs.shift()
            strs.pop()
            var shis = strs.filter((shi) => {
                shi = shi.trim()
                var ss = shi.split(/\n/)
                var names = ss[0].split(/[【】]/)
                return names.length > 2
            }).map((shi) => {
                shi = shi.trim()
                var ss = shi.split(/\n/)
                var names = ss[0].split(/[【】]/)
                return {
                    title: names[1].trim(),
                    author: names[2].trim(),
                    content: ss.slice(1, ss.length).join('\n').trim()
                }
            })
            resolve(shis[parseInt(Math.random() * shis.length - 1)])
            file.close(function () {
                console.log('file is closed')
            })
        })
    });
}

/**
 * 脑筋急转弯
 */
function nao_jin_ji_zhuan_wan() {
    var file = path.join(__dirname, '/data/脑筋急转弯大全.txt')
    var content = fs.readFileSync(file, 'utf-8')
    var lines = content.split('\n')
    var results = lines.filter((line) => {
        return line.includes('答案：')
    }).map((line) => {
        var qa = line.split('答案：')
        return { q: qa[0].trim(), a: qa[1].trim() }
    })
    return results[parseInt(Math.random() * results.length - 1)]
}

/**
 * 增广贤文
 */
function zeng_guang_xian_wen() {
    var file = path.join(__dirname, '/data/《增广贤文》.txt')
    var content = fs.readFileSync(file, 'utf-8')
    var lines = content.split('\n')
    var results = lines.filter((line) => {
        return line.length > 5
    }).map((line) => {
        return line.trim()
    })
    return results[parseInt(Math.random() * results.length - 1)]
}

/**
 * 网络小说
 */
function wang_luo_xiao_shuo() {
    var file = path.join(__dirname, '/data/网络小说列表.txt')
    var content = fs.readFileSync(file, 'utf-8')
    var lines = content.split('\n')
    var results = lines.filter((line) => {
        return line.length > 5
    }).map((line) => {
        return line.trim()
    })
    return results[parseInt(Math.random() * results.length - 1)]
}

/**
 * 姓名
 */
function xing_ming() {
    return nameGenerate.get()
}


exports.pin_yin = pin_yin
exports.quan_tang_shi = quan_tang_shi
exports.nao_jin_ji_zhuan_wan = nao_jin_ji_zhuan_wan
exports.zeng_guang_xian_wen = zeng_guang_xian_wen
exports.wang_luo_xiao_shuo = wang_luo_xiao_shuo
exports.xing_ming = xing_ming
