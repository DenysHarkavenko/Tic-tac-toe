const area = document.getElementById('game-area')
const cell = document.getElementsByClassName('cell')
let currentPlayer = document.getElementById('currentPlayer')

let player = 'x'

let stat = {
    'x': 0,
    'o': 0,
    'd': 0
}

const winIndex = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

for(let i = 1; i <=9; i++){
    area.innerHTML +=  `<div class="cell" pos="${i}"></div>`
}

for(let i = 0; i <=cell.length; i++){
    cell[i].addEventListener('click', cellClick, false)
}

function cellClick() {
    let data = []

    if(!this.innerHTML){
        this.innerHTML = player
        this.style.color = player === 'x' ? 'red' : 'blue';
    } else{
        alert('Cell is occupied')
        return
    }

    for(let i in cell){
        if(cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')))
        }
    }

    // console.log(data)

    if(checkWin(data)){
        stat[player] += 1
        restart(`${player.toUpperCase()} win !!!`)
    } else{
        let draw = true
        for(let i in cell){
            if (cell[i].innerHTML == '') draw = false
        }
        if(draw){
            stat.d += 1
            restart('The draw !!!')
        }
    }

    
    
    player = player == 'x' ? 'o' : 'x'
    currentPlayer.innerHTML = player.toUpperCase()
}

function checkWin(data) {
    for(let i in winIndex){
        let win = true
        for(let j in winIndex[i]){
            let id = winIndex[i][j]
            let ind = data.indexOf(id)

            if(ind == -1){
                win = false
            }  
        }

        if(win) return true 
    }
    return false
}

function restart(text) {
    console.log(stat)
    alert(text)
    for(let i = 0; i < cell.length; i++){
        cell[i].innerHTML = ''
    }
    updateStat()
}

function updateStat() {
    document.getElementById('sX').innerHTML = stat.x
    document.getElementById('sO').innerHTML = stat.o
    document.getElementById('sD').innerHTML = stat.d
}