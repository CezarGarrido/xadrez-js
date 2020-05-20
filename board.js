function Board(board, squares, game) {
    let state = {
        pieces: {
            a8: 'rook-black',
            b8: 'knight-black',
            c8: 'bishop-black',
            d8: 'queen-black',
            e8: 'king-black',
            f8: 'bishop-black',
            g8: 'knight-black',
            h8: 'rook-black',

            a7: 'pawn-black',
            b7: 'pawn-black',
            c7: 'pawn-black',
            d7: 'pawn-black',
            e7: 'pawn-black',
            f7: 'pawn-black',
            g7: 'pawn-black',
            h7: 'pawn-black',

            a2: 'pawn-white',
            b2: 'pawn-white',
            c2: 'pawn-white',
            d2: 'pawn-white',
            e2: 'pawn-white',
            f2: 'pawn-white',
            g2: 'pawn-white',
            h2: 'pawn-white',

            a1: 'rook-white',
            b1: 'knight-white',
            c1: 'bishop-white',
            d1: 'queen-white',
            e1: 'king-white',
            f1: 'bishop-white',
            g1: 'knight-white',
            h1: 'rook-white'
        }
    }

    function Render() {
        let light = 1;
        let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (let l = 8; l >= 1; --l) {
            for (let c = 0; c < columns.length; ++c) {
                let sq = columns[c] + l;
                let lightdark = (light == 1) ? 'light' : 'dark';
                board.insertAdjacentHTML('beforeend', '<div class="square-board ' + lightdark + '" id="' + sq + '"></div>')
                light ^= 1;
            }
            light ^= 1;
        }
        renderPieces();
    }

    function renderPieces() {
        for (let i = squares.length - 1; i >= 0; i--) {
            let square = squares[i];
            let sq = square.getAttribute('id');
            if (game.FindIndex(state.pieces, sq) != null) {
                square.innerHTML = '<div class="piece ' + state.pieces[sq] + '"></div>';
            }
        }
    }
    
    return {
        Render
    }
}