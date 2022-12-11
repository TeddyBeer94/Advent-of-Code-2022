import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_11_file', 'utf8').trim().split('\n\n');

var monkeys = array.map((v,i) => ({
    number : v.split('\n')[0].split(' ')[1][0],
    items : v.split('\n')[1].split(':')[1].split(', ').map((w,j)=> Number(w)),
    right : v.split('\n')[2].split('= ')[1].split(' ')[2],
    op : v.split('\n')[2].split('= ')[1].split(' ')[1],
    Test : Number(v.split('\n')[3].split(' ').pop()),
    True : Number(v.split('\n')[4].split('monkey ')[1]),
    False : Number(v.split('\n')[5].split('monkey ')[1]),
    score : 0
}))
let copy_m = JSON.parse(JSON.stringify(monkeys))

const new_anxietey1  = ((anxiety,op,right) => {
    if (right == 'old') {
        right = anxiety
    }
    switch (op) {
        case '+' : return Math.floor((anxiety + Number(right))/3)
        case '*' : return Math.floor((anxiety * Number(right))/3)
    }
})

const moveItem = ((monkey,new_anx) => {
    let anxiety =  new_anx(monkey.items.pop(), monkey.op, monkey.right)
    if (anxiety % monkey.Test == 0) {
        monkeys[monkey.True].items.push(anxiety)
    } 
    else {
        monkeys[monkey.False].items.push(anxiety)
    }
    monkey.score += 1
})

const turn = ((monkey,new_anx) => {
    let a = Array.from({length : monkey.items.length})
    a.map((v,i) => moveItem(monkey,new_anx))
})

const round = ((new_anx) => monkeys.map((v,i) => turn (v,new_anx)))

Array.from({length : 20}).map(() => round(new_anxietey1))

const scores = monkeys.map((v,i) => v.score).sort((a,b) => b-a)
const result1 = scores[0]*scores[1]

monkeys = copy_m
const prodTest = monkeys.reduce((acc,cur) => acc * cur.Test ,1)

const new_anxietey2 = ((anxiety,op,right) => {
    if (right == 'old') {
        right = anxiety
    }
    switch (op) {
        case '+' : return (anxiety + Number(right))%prodTest
        case '*' : return (anxiety * Number(right))%prodTest
    }
})

Array.from({length : 10000}).map(() => round(new_anxietey2))
const scores2 = monkeys.map((v,i) => v.score).sort((a,b) => b-a)
const result2 = scores2[0]*scores2[1]

console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)