import fs from 'fs';
console.time('\nExecution time')
const array = fs.readFileSync('adv2022_2_file', 'utf8').split('\n'); // il faut retirer la ligne blanche à la fin du fichier input
const a0 = array.map((v,i) => v.split(' '))
const arrayf = a0.map((v,i) => ({opponent : v[0] , mymove : v[1]}))

const value_move = (x => 
    {switch (x) {
        case 'X' : return 1
        case 'Y' : return 2
        case 'Z' : return 3
        case 'A' : return 1
        case 'B' : return 2
        case 'C' : return 3
    }
})

const score1 = (({opponent , mymove}) => {
    var x = (3 + value_move(mymove) - value_move(opponent))%3
    switch(x) {
        case 0 : return 3
        case 1 : return 6
        case 2 : return 0
    }
})

const arrayf_score = arrayf.map((v,i) => ({score : score1(v) , value_move : value_move(v.mymove)}))
const result1 = arrayf_score.reduce((acc,cur) => 
{return acc + cur.value_move+ cur.score},0)
console.log(result1)

const arrayf2 = a0.map((v,i) => ({opponent : v[0] , result : v[1]}))
const score2 = (x => {
    switch(x) {
        case 'X' : return 0
        case 'Y' : return 3
        case 'Z' : return 6
    }
})

const mymove_score = (({opponent,result}) => {
    var x = score2(result)
    switch(x) {
        case 3 : return value_move(opponent)
        case 6 : return 1 + (value_move(opponent)%3)
        case 0 : return 1 + ((1+value_move(opponent))%3)
    }
})

const arrayf2_score = arrayf2.map((v,i) => ({mymove_score : mymove_score(v) , score : score2(v.result)}))
const result2 = arrayf2_score.reduce((acc,cur) => 
{return acc + cur.mymove_score+ cur.score},0)
console.log(result2)
console.timeEnd('\nExecution time')



