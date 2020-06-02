function NewGame(squares, pieces) {
    let state = {
        players: {},
        moves: {},
        currentPlayer: 'white',
        colums: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    }

    function Run() {
        console.log('Running game.')
    }

    function MovePiece(command) {
        if (command.type != 'move:piece') {
            return
        }

        togleLegalMoves();
        let player = command.payload.player;
        if (player != state.currentPlayer) {
            return
        }
        let square = command.payload.current_position;
        let pieceType = command.payload.piece_type;
        let piece = command.payload.current_piece;
        let possibleMoves = verifyMoves(pieceType, square);
        let proxID = piece.getAttribute('id');
        Object.keys(possibleMoves).forEach(function(i) {
            const index = possibleMoves[i]
            if (proxID == index) {
                piece.appendChild(command.payload.last_piece);
                if (state.currentPlayer == "white") {
                    state.currentPlayer = "black"
                } else {
                    state.currentPlayer = "white"
                }
                return
            }
        });
    }

    function ClickPiece(command) {
        if (command.type != 'click:piece') {
            return
        }
        togleLegalMoves();
        let square = command.payload.current_position;
        let pieceType = command.payload.piece_type;
        let player = command.payload.player;
        setStyleIsCurrentPiece(square);
        let elPiece = document.getElementById(square)
        let possibleMoves = verifyMoves(pieceType, square);
        Object.keys(possibleMoves).forEach(function(i) {
            document.getElementById(possibleMoves[i]).classList.toggle('legal-move-hint')
        });

        if (command.payload.last_current_position != null) {
            if (player != state.currentPlayer) {
                let lastCurrenPosition = document.getElementById(command.payload.last_current_position);
                let lastSquare = lastCurrenPosition.getAttribute('id');
                let lastPiece = lastCurrenPosition.children[0];
                let lastPieceType = lastPiece.getAttribute('class').split(' ')[1];
                let possibleMovesLastPiece = verifyMoves(lastPieceType, lastSquare);
                let piece = command.payload.current_piece;
                Object.keys(possibleMovesLastPiece).forEach(function(i) {
                    let index = possibleMovesLastPiece[i];
                    if (square == index) {
                        piece.remove()
                        elPiece.appendChild(command.payload.last_piece);
                        if (state.currentPlayer == "white") {
                            state.currentPlayer = "black"
                        } else {
                            state.currentPlayer = "white"
                        }
                    }
                    return
                });
            }
        }
    }

    function CapturePiece(player, possibleMoves) {
        if (player != state.currentPlayer) {}
    }

    function setStyleIsCurrentPiece(id) {
        document.getElementById(id).classList.toggle('current-piece');
    }

    function togleLegalMoves() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].classList.remove('legal-move-hint')
        }
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].classList.remove('current-piece')
        }
    }

    function verifyMoves(pieceType, square) {

        let line = Number(square[1]);
        let column = square[0];
        let newLine = line + 1;
        let moves = {};
        let moviment = 0;
        let indiceColum = Find(state.colums, column);
        let proxima = Number(indiceColum) + 1;
        let anterior = Number(indiceColum) - 1;
        let lineDiagonal = line + 1;

        if (pieceType == 'pawn-white') {
            if (line == 2) {
                for (let i = 0; i < 2; i++) {
                    let pos = document.getElementById(column + (newLine++));
                    if (pos.childElementCount == 0) {
                        moviment++;
                        moves[moviment] = pos.getAttribute('id');
                    } else {
                        break
                    }
                }
            } else {
                for (let i = 0; i < 1; i++) {
                    let pos = document.getElementById(column + (newLine++));
                    console.log('pos ->', pos);
                    if (pos == null) {
                        continue;
                    }
                    if (pos.childElementCount == 0) {
                        moviment++;
                        moves[moviment] = pos.getAttribute('id');
                    } else {
                        break
                    }
                }
            }


        } else if (pieceType == 'pawn-black') {
            if (line == 7) {
                for (let i = 7; i >= 5; --i) {
                    if (i != 7) {
                        let pos = document.getElementById(column + i);
                        if (pos.childElementCount == 0) {
                            moviment++;
                            moves[moviment] = pos.getAttribute('id');
                        } else {
                            break
                        }
                    }
                }
            } else {
                for (let i = line; i >= line - 1; --i) {
                    if (i != line) {
                        let pos = document.getElementById(column + i);
                        if (pos.childElementCount == 0) {
                            moviment++;
                            moves[moviment] = pos.getAttribute('id');
                        } else {
                            break
                        }
                    }
                }
            }
        }

        if (FindIndex(state.colums, proxima) != null) {
            console.log('state.colums[proxima] ->', state.colums[proxima]);
            console.log('lineDiagonal ->', lineDiagonal);
            let coluna = state.colums[proxima] + lineDiagonal;
            console.log('encontrou ' + coluna);
            let pos = document.getElementById(coluna);
            if (pos != null) {
                if (pos.childElementCount == 1) {
                    //if (pos.getAttribute('class').indexOf('black')) {
                    moviment++;
                    moves[moviment] = coluna;
                    //}
                }
            }
            // if($('#'+coluna).find('.piece').size() == 1){
            //     var pecaEncontrada = $('#'+coluna).find('.piece').attr('class');
            //     if(pecaEncontrada.indexOf(typeAttack) >= 0){
            //         x++;
            //         moves[x] = coluna;
            //     }
            // }
        }
        return moves;
    }

    function FindIndex(obj, index) {
        let result = null;
        Object.keys(obj).forEach(function(i, val) {
            if (i == index) {
                result = i;
            }
        })
        return result;
    }

    function Find(obj, valor) {
        let result = null;
        Object.keys(obj).forEach(function(i) {
            if (valor == obj[i]) {
                result = i;
            }
        })
        return result;
    }

    return {
        FindIndex,
        ClickPiece,
        MovePiece
    }
}


let Piece = {
    color: '',
    type: '',
    X: '',
    Y: ''
}