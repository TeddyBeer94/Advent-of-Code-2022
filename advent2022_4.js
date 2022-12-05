import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_4_file', 'utf8').split('\n').filter(x => x);
const arraysplit = array.map((v,i) => ({left : v.split(',')[0] , right : v.split(',')[1]}))
const arrayf = arraysplit.map((v,i) =>({
    minl : Number(v.left.split('-')[0]),
    maxl : Number(v.left.split('-')[1]),
    minr : Number(v.right.split('-')[0]),
    maxr : Number(v.right.split('-')[1]),
}))

const result1 = arrayf.filter(x => x.minl <= x.minr && x.maxl >= x.maxr || x.minr <= x.minl && x.maxr >= x.maxl).length
console.log(result1)

const result2 = arrayf.filter(x => x.minl <= x.maxr && x.minr <= x.minl|| x.minr <= x.maxl && x.minr >= x.minl).length
console.log(result2)
console.timeEnd('\nExecution time')



