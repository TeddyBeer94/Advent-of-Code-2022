import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_25_file', 'utf8').trim().split('\n');

const SNAFUS = array.map((v) => (v.split('')).map((w) => {
    if (w == '='){return -2}
    if (w== '-') {return -1}
    return Number(w)
}))

const decode = ((snafu) => {
    if (snafu.length == 0) {return 0}
    else {
        return snafu.pop() + 5 * (decode(snafu))
    } 
})

const encode = ((dec) => {
    if (dec == 0) {return []}
    let r = dec%5 
    if (r <= 2) {
        let q = (dec - r)/5
        let l = encode(q)
        l.push(r)
        return l
    }
    if (r ==3) {
        let q = (dec-r)/5 +1
        let l = encode(q)
        l.push('=')
        return l
    }
    if (r ==4) {
        let q = (dec-r)/5 +1
        let l = encode(q)
        l.push('-')
        return l
    }
})

const decoded = SNAFUS.map((v) => decode(v))
const result1 = encode(decoded.reduce((acc,cur) => acc + cur,0)).join('')

console.timeEnd('\nExecution time')
console.log(result1)
