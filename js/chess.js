/**
 * NEXUS GAMING - CHESS LOGIC
 * Powered by chess.js and chessboard.js
 */

document.addEventListener('DOMContentLoaded', () => {
    let board = null;
    const game = new Chess();
    const $status = $('#status');
    
    function onDragStart (source, piece, position, orientation) {
        // do not pick up pieces if the game is over
        if (game.game_over()) return false;
        
        // only pick up pieces for the side to move
        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    }
    
    function onDrop (source, target) {
        // see if the move is legal
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });
        
        // illegal move
        if (move === null) return 'snapback';
        
        updateStatus();
    }
    
    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    function onSnapEnd () {
        board.position(game.fen());
    }
    
    function updateStatus () {
        let statusHTML = '';
        
        let moveColor = 'White';
        let neonClass = 'primary-neon';
        if (game.turn() === 'b') {
            moveColor = 'Black';
            neonClass = 'secondary-neon';
        }
        
        // checkmate?
        if (game.in_checkmate()) {
            statusHTML = `Game over, <span style="color:var(--${neonClass})">${moveColor}</span> is in checkmate.`;
        }
        // draw?
        else if (game.in_draw()) {
            statusHTML = 'Game over, drawn position';
        }
        // game still on
        else {
            statusHTML = `<span style="color:var(--${neonClass})">${moveColor}</span> to move`;
            
            // check?
            if (game.in_check()) {
                statusHTML += ', <span style="color:var(--secondary-neon)">' + moveColor + ' is in check!</span>';
            }
        }
        
        $status.html(statusHTML);
    }
    
    const config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
    };
    
    board = Chessboard('myBoard', config);
    
    updateStatus();

    // Event Listeners for controls
    $('#reset-btn').on('click', () => {
        game.reset();
        board.start();
        updateStatus();
    });

    $('#undo-btn').on('click', () => {
        game.undo();
        board.position(game.fen());
        updateStatus();
    });
});
