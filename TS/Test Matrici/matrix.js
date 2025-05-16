var matrix = Array.from(Array(4), function () { return Array.from(Array(4), function () { return random(1, 10); }); });
var indexes = Array.from(Array(matrix.length * matrix[0].length), function (_, i) { return ({
    row: Math.floor(i / matrix.length),
    col: i % matrix[0].length
}); });
console.table(matrix);
var index = indexes[random(1, 16)];
console.log("Valore: ".concat(matrix[index.row][index.col], " | Indice: ").concat(index.row, "-").concat(index.col));
function random(min, max) {
    return Math.floor((max - min) * Math.random()) + min;
}
