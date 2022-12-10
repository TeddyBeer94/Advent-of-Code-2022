import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_10_file', 'utf8').trim().split('\n');
const instructions = array.map((v,i) => ({action : v.split(' ')[0], n : Number(v.split(' ')[1])}))

var progression = {cycle_count : 0 , total : 1}
var image = ''

const check = (() => {
    if (Math.abs(progression.total - (progression.cycle_count%40)) >1) {
        image = image + '.'
    }
    if (Math.abs(progression.total - (progression.cycle_count%40)) <=1) {
        image = image + '#'
    }
    {progression.cycle_count = progression.cycle_count +1}

    if (progression.cycle_count%40 == 20) {
        return progression.total * progression.cycle_count
    }
    if (progression.cycle_count%40 == 0) {
        image = image + '\n'
    }
    return 0
})

const follow_inst = (({action,n}) => {
    if (action == 'noop') {return check()}
    else {
        const x1 = check()
        const x2 = check()
        progression.total = progression.total + n
        return x1 + x2
    }
})

const result1 =instructions.reduce((acc,cur) => acc + follow_inst(cur), 0)

console.timeEnd('\nExecution time')
console.log(result1)
console.log(image)