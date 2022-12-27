import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_19_file', 'utf8').trim().split('\n');

const blueprints = array.map((v,i) => {
    let costs = v.split('.')
    return {ore : {ore : Number(costs[0].split(' ')[6])}, 
    clay : {ore : Number(costs[1].split(' ')[5]) },
    obsidian : {ore : Number(costs[2].split(' ')[5]), clay : Number(costs[2].split(' ')[8])},
    geode : {ore : Number(costs[3].split(' ')[5]), obsidian : Number(costs[3].split(' ')[8])}}
})

let stock = {ore : 0 , clay : 0, obsidian : 0, geode : 0}
let robots = {ore : 1 , clay : 0, obsidian : 0, geode : 0}
var best = 0

const dist = ((state,blueprint,rock) => 
    Object.keys(blueprint[rock]).reduce((acc,cur) => {
        if (state.robots[cur]==0) {
            return Infinity
        }
        else {
            let diff = blueprint[rock][cur] - state.stock[cur]
            if (diff <= 0) {return 1}
            else{
                let dist_rock = Math.ceil(diff / state.robots[cur])
                if (dist_rock +1 > acc) {
                    return dist_rock + 1 
                }
                return acc
            }
        }
    }, -Infinity)
)

const new_build = ((rock,state,blueprint) => {
    let d = dist(state,blueprint,rock)
    let new_state = {stock : {...state.stock}, robots : {...state.robots}, time : state.time + d}
    Object.keys(state.stock).map((v) => 
    new_state.stock[v] = state.stock[v] + d*state.robots[v])
    let costs = blueprint[rock]
    Object.keys(costs).map((v) => new_state.stock[v] = new_state.stock[v] - costs[v])
    new_state.robots[rock] = new_state.robots[rock] + 1
    return new_state
})

const score = ((state) => 
state.stock['geode'] + state.robots['geode'] * (24-state.time))

const next_paths = ((states,blueprint) => states.reduce((acc,cur) => {
    if (score(cur) > best) {best = score(cur)}
    Object.keys(cur.stock).map((v,i) => {
        if (dist(cur,blueprint,v) < 24 -cur.time){
            acc.push(new_build(v,cur,blueprint))
        }  
    })
    return acc
}, []))

const allextract = ((blueprint) => {
    stock = {ore : 0 , clay : 0, obsidian : 0, geode : 0}
    robots = {ore : 1 , clay : 0, obsidian : 0, geode : 0}
    let state = {stock : stock , robots : robots,time : 0}
    let states = [state]
    while(states.length > 0) {
        states = next_paths(states,blueprint)
    }
    return best
})

console.log("this is likely going to throw a JavaScript heap out of range, it will also take a while")
const result1 = Math.max(blueprints.map((v) => allextract(v)))
console.log(result1)

