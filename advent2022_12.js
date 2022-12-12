import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_12_file', 'utf8').trim().split('\n');
var cases = array.map((v,i) => v.split('').map((w,j) => ({
    neighbours : [],
    letter : w,
    position : {x : i , y : j},
    dist_to_S : 1000000
})))

const rev = ((tab) => tab.map((v,i) => tab[tab.length -1 -i]))

const getcol = ((indexcol) => cases.map((v,i) => v[indexcol]))

const height = ((char) => {
    if (char == 'S') {return 1}
    if (char == 'E') {return 26}
    else {
        return char.charCodeAt() -96
    }
})
const operation = ((tab) => tab.reduce((acc,cur) => {
    if (acc == 0) {}
    else{
        if (height(acc.letter)-height(cur.letter) <=1) {
            cur.neighbours.push(acc.position)
        }
    }
    return {position : cur.position , letter : cur.letter}
} , 0))

cases.map((v,i) => {
    operation(cases[i])
    operation(rev(cases[i]))})

cases[0].map((v,i) => {
    operation(getcol(i))
    operation(rev(getcol(i)))})

const copy_cases = JSON.parse(JSON.stringify(cases))

const change_dist = ((tile) => tile.neighbours.map((v,i) => {
    if (cases[v.x][v.y].dist_to_S > tile.dist_to_S +1) {
        cases[v.x][v.y].dist_to_S = tile.dist_to_S +1
        to_visit.add(cases[v.x][v.y])
    }
    to_visit.delete(tile)
}
))

const getmin = (() => Array.from(to_visit).reduce((acc,cur) => {
    if (acc.dist_to_S > cur.dist_to_S) {
        return cur
    }
    return acc
}, {dist_to_S : Infinity}))

const posS = cases.map(x => (x.filter(x => x.letter == 'S'))).filter(x => x.length >0)[0][0].position
const posE = cases.map(x => (x.filter(x => x.letter == 'E'))).filter(x => x.length >0)[0][0].position

var to_visit = new Set()

const dist_to_E = (({xstart,ystart}) => {
    cases = copy_cases
    to_visit.add(cases[xstart][ystart])
    cases[xstart][ystart].dist_to_S = 0
    while (to_visit.size > 0) {
        const min_pos = getmin().position
        change_dist(cases[min_pos.x][min_pos.y])
    }
    return cases[posE.x][posE.y].dist_to_S
})

const result1 = dist_to_E({xstart : posS.x , ystart : posS.y})

var SET_a = new Set()

cases.map((v) => v.map((w) => {
    if (w.letter == 'a') {SET_a.add(w)}
}))

const array_dist = Array.from(SET_a).map((v) => 
dist_to_E({xstart : v.position.x, ystart : v.position.y})
)

const result2 = Math.min(...array_dist)

console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)
