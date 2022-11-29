const X_COUNT = 5;
const Y_COUNT = 5;
const PX_COUNT = 150;
const BORDER = 2;
const MOVEMENT_MS = 500;

const handleUpdate = (emptyBox, movingBox) => {
    if (!movingBox.classList.contains('board')) {
        const startingY = movingBox.style.top;
        const startingX = movingBox.style.left;
        const endingY = emptyBox.style.top;
        const endingX = emptyBox.style.left;
        
        movingBox.style.top = endingY;
        movingBox.style.left = endingX;
        movingBox.style.zIndex = 999;

        movingBox.style.setProperty('--startingX', movingBox.style.left);
        movingBox.style.setProperty('--startingY', movingBox.style.top);

        movingBox.style.setProperty('--endingX', emptyBox.style.left);
        movingBox.style.setProperty('--endingY', emptyBox.style.top);

        movingBox.id = 'moving-box';

        emptyBox.style.top = startingY;
        emptyBox.style.left = startingX;

        setTimeout(() => {
            movingBox.id = null;
            movingBox.style.zIndex = 1;
        }, MOVEMENT_MS);
    }

}

const scaleSize = (position = 0, constant = 0) => `${PX_COUNT * position + constant}px`;

const createPiece = (data) => {
    const {
        xPosition,
        yPosition,
    } = data;

    const piece = document.createElement('div');

    // piece.style.backgroundColor = `rgb(${Math.trunc(255 / X_COUNT * xPosition)}, ${Math.trunc(255 / Y_COUNT * yPosition)}, 128)`;

    piece.style.top = scaleSize(yPosition); 
    piece.style.left = scaleSize(xPosition);
    piece.style.width = scaleSize(0, PX_COUNT);
    piece.style.height = scaleSize(0, PX_COUNT);

    piece.classList.add('box');
    piece.style.backgroundPosition = `-${xPosition * PX_COUNT}px -${yPosition * PX_COUNT}px`;
    
    return piece;
}

const createBoard = () => {
    const board = document.querySelector(".board");
    const emptyBox = createPiece({ xPosition: 0, yPosition: 0 });
    const pieces = [];
    const randomizedPieces = [];

    board.style.width = scaleSize(X_COUNT, BORDER);
    board.style.height = scaleSize(Y_COUNT, BORDER);

    for (xPosition = 0; xPosition < X_COUNT; xPosition++) {
        for (yPosition = 0; yPosition < Y_COUNT; yPosition++) {
            if (!(xPosition === 0 && yPosition === 0)) {
                pieces.push(createPiece({ xPosition, yPosition }));
            }
        }
    }

    while (pieces.length) {
        randomizedPieces.push(pieces.splice(Math.trunc(Math.random() * pieces.length),1)[0]);
    }

    randomizedPieces.forEach((piece, index) => {
        setTimeout(() => {
            board.appendChild(piece);
            handleUpdate(emptyBox, piece)
        }, 50 * index);
    })

    board.addEventListener('mouseover', (e) => handleUpdate(emptyBox, e.target));

    return board;
}

const board = createBoard();
