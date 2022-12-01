import fs from 'fs';
const array = fs.readFileSync('adv2022_1_file', 'utf8').split('\n\n'); // double \ correspond à une ligne blanche

const a2 = array.map((v,i) => v.split('\n'))
const a3 = a2.map((v,i) => v.map((w,j) => Number(w)))
const arraysums = a3.map((v,i) => v.reduce((acc, cur) => acc + cur, 0))
console.log(arraysums)
const max1 = arraysums.reduce((acc,cur) => {if (cur > acc ) return cur ; else return acc},0)
console.log(max1)
const arraysums2=arraysums.filter(x => x<max1)
const max2 = arraysums2.reduce((acc,cur) => {if (cur > acc ) return cur ; else return acc},0)
console.log(max2)
const arraysums3=arraysums2.filter(x => x<max2)
const max3 = arraysums3.reduce((acc,cur) => {if (cur > acc ) return cur ; else return acc},0)
console.log(max3+max2 +max1)