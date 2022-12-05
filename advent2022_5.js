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
var col_stack = zeros.map((v,i) => rowstack.map((w,j) =>  w[i]))
    .map((v,i) => v.filter((w,j) => j+1< v.length))
    .map((v,i) => v.filter(x => x!= ''))

const rev = ((tab) => tab.map((v,i) => tab[tab.length -1 -i]))

const move_n = (({tab,nbmoves,from,to}) => {
    if (nbmoves >= tab[from -1].length) {
        const moved = tab[from -1]
        var x = rev(tab[to-1])
        tab[to-1] = rev(x.concat(moved))
        tab[from-1] = []
    }
    else {
        const moved = tab[from -1].slice(0,nbmoves)
        tab[from-1] = tab[from -1].slice(nbmoves)
        var x = rev(tab[to-1])
        tab[to-1] = rev(x.concat(moved))
    }
    return tab
})

const allmoves = moves.reduce((acc,cur) => {
    return move_n({tab : acc , nbmoves : cur.nbmoves , from : cur.from , to : cur.to})
}, col_stack)

console.log(allmoves.map((v,i) => v[0]))

var col_stack = zeros.map((v,i) => rowstack.map((w,j) =>  w[i]))
    .map((v,i) => v.filter((w,j) => j+1< v.length))
    .map((v,i) => v.filter(x => x!= ''))
    
const move_n2 = (({tab,nbmoves,from,to}) => {
    if (nbmoves >= tab[from -1]) {
        const moved = tab[from -1]
        tab[to-1] = moved.concat(tab[to-1])
        tab[from-1] = []
      }
    else {
        const moved = tab[from -1].slice(0,nbmoves)
        tab[from-1] = tab[from -1].slice(nbmoves)
        tab[to-1] = moved.concat(tab[to-1])
    }
    return tab
})

const allmoves2 = moves.reduce((acc,cur) => {
    return move_n2({tab : acc , nbmoves : cur.nbmoves , from : cur.from , to : cur.to})
}, col_stack)


console.log(allmoves2.map((v,i) => v[0]))
console.timeEnd('\nExecution time')
