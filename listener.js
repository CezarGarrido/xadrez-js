function CreateKeyboardListener(squares) {
    const state = {
        observers: [],
        currentPlayer: 'white',
        lastPiece: null,
        lastCurrentPieceType: null,
        lastCurrentPosition: null
    }

    function registerPlayer(player) {
        state.currentPlayer = player;
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function(event) {
            let piece = event.target;
            let board = piece.parentNode;
            let currentPosition = board.getAttribute('id');
            let pieceType = piece.getAttribute('class').split(' ')[1];
            if (currentPosition != null) {
                state.lastPiece = piece;
                state.lastCurrentPosition = currentPosition;
                state.lastCurrentPieceType = pieceType;
                const command = {
                    type: 'click:piece',
                    payload: {
                        'piece_type': pieceType,
                        'current_position': currentPosition
                    }
                }
                notifyAll(command);
                return
            }
            let player = state.lastCurrentPieceType.split('-')[1];

            const command = {
                type: 'move:piece',
                payload: {
                    'piece_type': state.lastCurrentPieceType,
                    'current_position': state.lastCurrentPosition,
                    'last_piece': state.lastPiece,
                    'current_piece': piece,
                    'player': player,
                }
            }
            notifyAll(command);


        }, false);
    }

    return {
        subscribe,
        registerPlayer
    }
}