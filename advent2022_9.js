import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const instructions = array.map((v,i) => ({direction : v.split(' ')[0], nbmoves : Number(v.split(' ')[1])}))

var head = {x : 0 , y : 0}
var tail = {x : 0, y : 0}
var visited1 = new Set()

const dist = ((x1,y1,x2,y2) => (x1-x2)**2 + (y1-y2)**2)

const movehead = ((direction,mover) =>{
    switch (direction) {
        case 'U' : return {x : mover.x ,y : mover.y+1}
        case 'D' : return {x : mover.x ,y : mover.y-1}
        case 'R' : return {x : mover.x +1 ,y : mover.y}
        case 'L' : return {x : mover.x -1 ,y : mover.y}
    }
})

const signe = ((x) => {
    if (x>0) {return 1}
    if (x==0) {return 0}
    if (x<0) {return -1}
})

const movetail = ((mover,follower) => {
    if (dist(mover.x, mover.y,follower.x,follower.y)>=4) {
        return {x : follower.x + signe(mover.x - follower.x), y : follower.y + signe(mover.y - follower.y)}
    }
    return {x : follower.x , y : follower.y}
})

const follow_inst = (({direction,nbmoves}) => {
    Array.from({length : nbmoves}).map(() => {
        head = movehead(direction,head)
        tail = movetail(head,tail)
        visited1.add(tail.x.toString()+","+tail.y.toString())
    })
})

instructions.map((v,i) => {follow_inst(v)})
const result1 = visited1.size

var rope = Array.from({length : 10} , (v,i) => ({x:0 , y:0}))
var visited2 = new Set()

const moverope = ((direction) => rope.reduce((acc,cur,index) => {
    if (index ==0) {
        let newpos = movehead(direction,cur)
        cur.x = newpos.x
        cur.y = newpos.y
        return cur
    }
    else {
        let newpos = movetail(acc,cur)
        cur.x = newpos.x
        cur.y = newpos.y
        if (index ==9) {
            visited2.add(cur.x.toString()+","+cur.y.toString())
        }
        return cur
    }
}, {x: 0, y : 0}))

const moveropen = (({direction,nbmoves}) => 
Array.from({length : nbmoves}).map(() => {moverope(direction)}))

instructions.map((v,i) => moveropen(v))
const result2 = visited2.size

console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)