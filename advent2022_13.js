import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_13_file', 'utf8').trim().split('\n\n');
const packets = []
const pairs = array.map((v,i) => ({
    left : JSON.parse(v.split('\n')[0]),
    right : JSON.parse(v.split('\n')[1]),
    ordered : false
}))

const cmp_array = (({left,right}) => {
    if (typeof(left) == typeof(right) && typeof(left) == 'number' ) {
        if (right - left > 0) return true
        if (right - left < 0) return false
        else return 'undecided'
    }
    else {
        if (typeof(left) == 'number') {
            return cmp_array({left : [left],right : right})
        }
        if (typeof(right) == 'number') {
            return cmp_array({left : left,right : [right]})
        }
        else {
            if (left.length == 0) {
                if (right.length == 0) {return 'undecided'}
                else {return true}
            }
            let order = left.reduce((acc,cur,i) => {
                if (acc == 'undecided') {
                    if (i < right.length) {
                        return cmp_array({left : cur , right : right[i]})
                    }
                    return false
                }
                return acc
            }, 'undecided')
            if (order == 'undecided' && left.length < right.length) {return true}
            return order
        }
    }
})

pairs.map((v,i) => {
    v.ordered = cmp_array(v)
})

const result1 = pairs.reduce((acc,cur,i) => {
    if (cur.ordered) {return acc + i +1}
    return acc
}, 0)

const cmp_to_int = (({left,right}) => {
    switch (cmp_array({left,right})) {
        case true : return -1
        case false : return 1
        case 'undecided' : return 0
    }
})

pairs.map((v,i) => {
    packets.push(v.left); packets.push(v.right)
})

packets.push([[2]]) ; packets.push([[6]])
const sorted = packets.sort((a,b) => cmp_to_int({left : a,right : b}))
const pos_2_6 = sorted.map((v,i) => {
    if (v.length ==1) {
        if (v[0].length == 1) {
            if (v[0][0] == 2 || v[0][0] == 6) return i
        }
    }
    return 0
}).filter(x => x!= 0)

const result2 = (pos_2_6[0] +1) * (pos_2_6[1] +1)
console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)