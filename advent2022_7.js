import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_7_file', 'utf8').trim().split('$')
const commandes = array.map((v,i) =>({
    commande : v.split('\n')[0].split(' ').slice(1) ,
    output : v.split('\n').slice(1).map((w,j) => {
        if (w.split(' ')[0] == 'dir') {
            return {type : 'dir' , name : w.split(' ')[1]}
        }
        else return {type : 'file' , size : Number(w.split(' ')[0])}
    })})).slice(1)

const dict = new Object()

const a1 =commandes.reduce((acc,cur) => {
    var x = cur.commande[0]
    if (x == 'cd'){
        if (cur.commande[1] =='/') {acc.path = ['/']}
        else {
            if (cur.commande[1] == '..') {acc.path.pop()}
            else {acc.path.push(cur.commande[1])} }
        }       
    else {
        dict[acc.path] = {
            sons : cur.output}}
    return {path : acc.path }
},{path : []})


const sizedir = ((path) => {
    return dict[path].sons.reduce((acc,cur) => {
    if (cur.type == 'file') { return acc + cur.size}
    if (cur.type == 'dir') {
        return acc + sizedir(path.concat(cur.name))}},0)
    })

const arraysize = Object.entries(dict).map((v,i) => ({size : sizedir(v[0].split(','))}))

const arrayfilter1 = arraysize.filter(x => x.size <=100000)
const result1 = arrayfilter1.reduce((acc,cur) => acc + cur.size , 0)

const todelete = sizedir(['/']) - 40000000

const arrayfilter2 = arraysize.filter(x => x.size >= todelete).map((v,i) => v.size)
const result2 = Math.min(...arrayfilter2)

console.timeEnd('\nExecution time')
console.log(result1)
console.log(result2)
