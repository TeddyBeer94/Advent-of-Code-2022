import fs from 'fs';
console.time('\nExecution time')
//const array = fs.readFileSync('example','utf8').trim().split('\n')
const array = fs.readFileSync('adv2022_16_file', 'utf8').trim().split('\n');
var valves0 = array.map((v,i) => ({
   name : v.split(';')[0].split(' ')[1],
   flow_rate : Number(v.split(';')[0].split('=')[1]),
   neighbours : v.split(';')[1].split(' ').slice(5).map((w,j) => w.split(',')[0].split('\r')[0]),
   max_score : 0,
   active : (Number(v.split(';')[0].split('=')[1]) >0),
   distances : new Map()
}))

var valves = new Map()
valves0.map((v,i) => {v.distances.set(v.name,0);valves.set(v.name,v)})
var best_score = 0

const set_dist = ((start,valve,set) => valve.neighbours.map((v) => {
    let next_valve = valves.get(v)
    if (typeof(start.distances.get(next_valve.name)) == 'undefined') {
        start.distances.set(next_valve.name,1+start.distances.get(valve.name))
        set.push(next_valve)
    }
    else {
        if (start.distances.get(next_valve.name) > 1+start.distances.get(valve.name)) {
            start.distances.set(next_valve.name,1+start.distances.get(valve.name))
            set.push(next_valve)
        }
    }
}))

const dist_to_start = ((start) => {
    let to_visit = [start]
    while (to_visit.length >0) {
        let valve = to_visit.shift()
        set_dist(start,valve,to_visit)        
    }
})

valves.forEach((value) => dist_to_start(value))

let start_state = {open : [], time : 0, position : 'AA',score : 0}

const next_states = ((state) => {
    let values = Array.from(valves.values())    
    return values.reduce((acc,cur) => {
        if (cur.active && state.open.includes(cur.name)== false) {
            let d = valves.get(state.position).distances.get(cur.name)
            let next = {...state} ; next.time += d +1
            if (next.time <30) {
                next.open = next.open.concat([cur.name])
                next.position = cur.name
                next.score += (30- next.time)*cur.flow_rate
                if (next.score > best_score) {best_score = next.score}
                acc.push(next)
        }}
        return acc
    },[])
})

const iterate = ((states) => states.reduce((acc,cur) => {
    acc = acc.concat(next_states(cur))
    return acc
}, []))

const step1 = (() => {
    let states = [start_state]
    while (states.length >0) {
        states = iterate(states)
    }
    return best_score
})

/** 
let start_state_2 = {pos : 'AA', pos_E : 'AA', open :[], time : 0 , timeE : 0,score : 0}

const next_statesE = ((state) => {
    let state_h = {...state}
    let next = next_states(state_h)
})

*/
const result1 = step1()
const result2 = 0

console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)