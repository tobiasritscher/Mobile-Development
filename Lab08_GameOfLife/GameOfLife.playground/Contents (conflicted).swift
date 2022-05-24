import UIKit

var boardSize = 10
var newBoard = Array(repeating: Array(repeating: 0, count: boardSize), count: boardSize)
var oldBoard = Array(repeating: Array(repeating: 0, count: boardSize), count: boardSize)

//fill old board
for (index, rows) in oldBoard.enumerated() {
    for (i, _) in rows.enumerated() {
        oldBoard[index][i] = Int(arc4random() % 2)
    }
}

func countLiveNeighbors(y: Int, x: Int) -> Int{
    var neighbors = 0
    var i = y-1
    while (i <= y+1) {
        if (i < 0 || i >= boardSize) {i += 1;continue}
        var j = x-1
        while (j <= x+1) {
            if j < 0 || j >= boardSize {j += 1;continue}
            if(!(i == y && j == x)){
                neighbors += oldBoard[i][j]
            }
           j += 1
        }
        i += 1
    }
    return neighbors
}

//calculate new board
for (index, rows) in oldBoard.enumerated() {
    for (i, _) in rows.enumerated() {
        let liveNeighbors = countLiveNeighbors(y: index, x: i)
        if (oldBoard[index][i] != 0) { //alive
            if liveNeighbors < 2 { //underpopulation
                newBoard[index][i] = 0;
            } else if liveNeighbors > 3 { //overpopulation
                newBoard[index][i] = 0;
            } else { //2 or 3 neighbors -> stays alive (no change)
                newBoard[index][i] = 1;
            }
        } else { //dead
            if liveNeighbors == 3 { //reproduction
                newBoard[index][i] = 1;
            } else { //dead stays dead (no change)
                newBoard[index][i] = 0;
            }
        }
    }
}

print("---- 0 ----")
for (_, rows) in oldBoard.enumerated() {
    print(rows)
}
print("---- 1 ----")
for (_, rows) in newBoard.enumerated() {
    print(rows)
}

