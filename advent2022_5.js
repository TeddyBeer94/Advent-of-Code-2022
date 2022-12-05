import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_5_file', 'utf8').split('\n\n')

const moves = array[1].split('\n').filter(x =>x).map((v,i) =>({
    nbmoves : Number(v.split(' ')[1]) ,
    from : Number(v.split(' ')[3]) ,
    to : Number(v.split(' ')[5])}));

const rowstack = array[0].split('\n').map((v,i) => v.split('    ').map(x=>x.split(' ')).join().split(','))
const nbstacks = rowstack[0].length
const zeros = Array.from({length: nbstacks}, (v,i) => 0)
var col_stack = zeros.map((v,i) => rowstack.map((w,j) => {
    if (w[i] != '')  return w[i]})).map((v,i) => v.filter((w,j) => j+1< v.length)).map((v,i) => v.filter(x => x))

const rev = ((tab) => tab.map((v,i) => tab[tab.length -1 -i]))

const move_n = (({nbmoves,from,to}) => {
    if (nbmoves >= col_stack[from -1]) {
        const moved = col_stack[from -1]
        var x = rev(col_stack[to-1])
        col_stack[to-1] = rev(x.concat(moved))
        col_stack[from-1] = []
    }
    else {
        const moved = col_stack[from -1].slice(0,nbmoves)
        col_stack[from-1] = col_stack[from -1].slice(nbmoves)
        var x = rev(col_stack[to-1])
        col_stack[to-1] = rev(x.concat(moved))
    }

})

const allmoves = moves.map((v,i) => {
    move_n(v)
})

console.log(col_stack.map((v,i) => v[0]))

var col_stack = zeros.map((v,i) => rowstack.map((w,j) => {
    if (w[i] != '')  return w[i]})).map((v,i) => v.filter((w,j) => j+1< v.length)).map((v,i) => v.filter(x => x))

const move_n2 = (({nbmoves,from,to}) => {
    if (nbmoves >= col_stack[from -1]) {
        const moved = col_stack[from -1]
        col_stack[to-1] = moved.concat(col_stack[to-1])
        col_stack[from-1] = []
      }
    else {
        const moved = col_stack[from -1].slice(0,nbmoves)
        col_stack[from-1] = col_stack[from -1].slice(nbmoves)
        col_stack[to-1] = moved.concat(col_stack[to-1])
    }

})

const allmoves2 = moves.map((v,i) => {
    move_n2(v)
})

console.log(col_stack.map((v,i) => v[0]))
console.timeEnd('\nExecution time')
