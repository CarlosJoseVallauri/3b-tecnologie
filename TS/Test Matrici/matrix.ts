const matrix: number[][] = Array.from(Array(4), () => Array.from(Array(4), () => random(1, 10)));
const indexes: {row : number, col: number}[] = Array.from(Array(matrix.length * matrix[0].length), (_, i) => ({
    row: Math.floor(i / matrix.length),
    col: i % matrix[0].length
}));

console.table(matrix);
const index: {row: number, col: number} = indexes[random(1, 16)];
console.log(`Valore: ${matrix[index.row][index.col]} | Indice: ${index.row}-${index.col}`);

function random(min: number, max: number) : number{
    return Math.floor((max - min) * Math.random()) + min;
}