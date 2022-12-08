import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_8_file', 'utf8').trim().split('\n');
var lines = array.map((v,i) => v.split('').map((w,j) => ({height:Number(w) , seen : false,score :1})))

const rev = ((tab) => tab.map((v,i) => tab[tab.length -1 -i]))

const getcol = ((indexcol) => lines.map((v,i) => v[indexcol]))

const operation = ((tab) => tab.reduce((acc,cur,index)=> {
    if (cur.height > acc.height || index ==0) {cur.seen = true , acc.height = cur.height ,cur.score = cur.score * index}
    else {
        cur.score = cur.score * count_sight(cur.height,acc.line).tot
    }
    acc.line.push(cur)
    return acc
    }
, {height : 0 , line : []}
))

const count_sight = ((height , line) => rev(line).reduce((acc,cur) => {
    if (acc.stop == false) {
        {acc.tot = acc.tot +1}
        if (height <= cur.height) {acc.stop = true} 
    }
    return acc
}, {tot : 0, stop : false}))


const testleft = ((indexl)=> operation(lines[indexl]))

const testright = ((indexl)=> operation(rev(lines[indexl])))

const testtop = ((indexcol) => operation(getcol(indexcol)))

const testbot = ((indexcol) => operation(rev(getcol(indexcol))))

lines.map((v,i) => {
    testleft(i)
    testright(i)
})

getcol(0).map((v,i) => {
    testtop(i)
    testbot(i)
})

const countseen = ((line) => line.reduce((acc,cur) => {
    if (cur.seen == true) {return acc + 1}
    else return acc
},0))

const result1 = lines.reduce((acc,cur) => {
    return acc + countseen(cur)
    },0)

const result2 = lines.reduce((acc,cur) => {
    let x = cur.reduce((acc1,cur1) => {
        if (cur1.score > acc1) {return cur1.score}
        return acc1
    } , 0)
    if (x>acc) {return x}
    return acc
} , 0)
console.timeEnd('\nExecution time')

console.log(result1)
console.log(result2)