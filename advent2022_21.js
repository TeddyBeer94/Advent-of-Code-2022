import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_21_file', 'utf8').trim().split('\n');

// ce programme suppose une structure "en arbre binaire de l'input" :
// - chaque noeud a 0 ou 2 fils, 
// - chaque fils n'a qu'un père

const operation = ((op) => {
    switch(op){
        case '+' : return ((a,b) => a + b)
        case '-' : return ((a,b) => a - b)
        case '*' : return ((a,b) => a * b)
        case '/' : return ((a,b) => a / b)
    }
})

const format = array.map((v,i) => {
    let split = v.split(':')
    if (split[1].split(' ').length >2) {
        return {
        name : split[0], 
        op : split[1].split(' ')[2],
        left : split[1].split(' ')[1],
        right : split[1].split(' ')[3].split('\r')[0]
    }}
    else {return {name : split[0], value : Number(split[1])}}
})

var monkeys = new Map() 

format.map((v,i) => monkeys.set(v.name,v))

const get_value = ((monkey) => {
    if (typeof(monkey.value) == 'undefined') {
        let left = monkeys.get(monkey.left); let right = monkeys.get(monkey.right)
        return (operation(monkey.op)(get_value(left),get_value(right)))
    }
    else {return monkey.value}
})

const result1 = get_value(monkeys.get('root'))

const find_father = ((monkey) =>
    format.reduce((acc,cur) => {
        if (acc == 0) {
            if (cur.left === monkey.name || cur.right === monkey.name) {return cur}
        }
        return acc
    }, 0)
)

const find_downward_path = ((monkey) => {
    if (monkey.name === 'root') {return [monkeys.get('root')]}
    else {
        let p = find_downward_path(find_father(monkey))
        p.push(monkey)
        return p
    }
})

const rev_op = ((top_value,value,operation,is_left) => {
    if (top_value == false) {return value}
    else {
        switch(operation) {
            case '+' : return top_value - value
            case '*' : return top_value/value
            case '/' : {if (is_left) {
                return top_value * value
            } else {return value/top_value}}
            case '-': {if (is_left) {
                return top_value + value
            } else {return value - top_value}}
        }
    }
})

const desc = (() => {
    let top_value = false
    let value = 0
    let i =0
    let path = find_downward_path(monkeys.get('humn'))
    let current_monkey = path[0]
    while(true) {
        if (current_monkey.left == 'humn') {
            value = get_value(monkeys.get(current_monkey.right))
            top_value = rev_op(top_value, value, current_monkey.op,true)
            break
        }
        if (current_monkey.right == 'humn') {
            value = get_value(monkeys.get(current_monkey.right))
            top_value = rev_op(top_value, value, current_monkey.op,false)
            break
        }
        if(current_monkey.left === path[i+1].name) {
            value = get_value(monkeys.get(current_monkey.right))
            top_value = rev_op(top_value, value, current_monkey.op,true)
            current_monkey = path[i+1]
            i +=1
        }
        if(current_monkey.right === path[i+1].name) {
            value = get_value(monkeys.get(current_monkey.left))
            top_value = rev_op(top_value, value, current_monkey.op,false)
            current_monkey = path[i+1]
            i +=1
        }
    }
    return top_value
})

const result2 = desc()

console.timeEnd('\nExecution time')
console.log(result1) 
console.log(result2)