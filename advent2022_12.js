import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_12_file', 'utf8').trim().split('\n');
var cases = array.map((v,i) => v.split('').map((w,j) => ({
    neighbours : [],
    letter : w,
    position : {x : i , y : j},
    dist_to_S : 1000000
})))
const init = JSON.parse(JSON.stringify(cases))

const rev = ((tab) => tab.map((v,i) => tab[tab.length -1 -i]))
const getcol = ((indexcol) => cases.map((v,i) => v[indexcol]))

const height = ((char) => {
    if (char == 'S') {return 1}
    if (char == 'E') {return 26}
    else {return char.charCodeAt() -96}
})
const height2 = ((char) => 26-height(char))

const operation = ((tab,heightf) => tab.reduce((acc,cur) => {
    if (acc != 0) {
        if (heightf(acc.letter)-heightf(cur.letter) <=1) {
            cur.neighbours.push(acc.position)
        }
    }
    return {position : cur.position , letter : cur.letter}
} , 0))


const format = ((heightf) => {
    cases.map((v,i) => {
        operation(cases[i],heightf)
        operation(rev(cases[i]),heightf)})
    cases[0].map((v,i) => {
        operation(getcol(i),heightf)
        operation(rev(getcol(i)),heightf)})
}) 

format(height)
const cases_up = JSON.parse(JSON.stringify(cases))
cases = init
format(height2)
const cases_down = JSON.parse(JSON.stringify(cases))

const change_dist = ((tile) => tile.neighbours.map((v,i) => {
    if (cases[v.x][v.y].dist_to_S > tile.dist_to_S +1) {
        cases[v.x][v.y].dist_to_S = tile.dist_to_S +1
        to_visit.push(cases[v.x][v.y])
    }
}))

const posS = cases.map(x => (x.filter(x => x.letter == 'S'))).filter(x => x.length >0)[0][0].position
var to_visit = []

const dist_to_E = (({xstart,ystart,charend,up}) => {
    if (up) {cases = cases_up}
    else {cases = cases_down}
    to_visit = []
    to_visit.push(cases[xstart][ystart])
    cases[xstart][ystart].dist_to_S = 0
    while (to_visit.length > 0) {
        const min_pos = to_visit.shift().position
        change_dist(cases[min_pos.x][min_pos.y])
        if (cases[min_pos.x][min_pos.y].letter == charend) {
            return cases[min_pos.x][min_pos.y]
        }
        }
})

const result1 = dist_to_E({xstart : posS.x , ystart : posS.y,charend : 'E',up : true})
const result2 = dist_to_E({xstart : result1.position.x , ystart : result1.position.y,charend : 'a', up : false}).dist_to_S

console.timeEnd('\nExecution time')
console.log(result1.dist_to_S)
console.log(result2)