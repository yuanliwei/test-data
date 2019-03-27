async function start() {
    const index = require('./index');
    let result = index.pin_yin('士大夫')
    console.log(result);
    result = index.nao_jin_ji_zhuan_wan()
    console.log(result);
    result = await index.quan_tang_shi()
    console.log(result);
    result = index.zeng_guang_xian_wen()
    console.log(result);
    result = index.xing_ming()
    console.log(result);
}
start()