const m = 293;
const inv = "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110";
const p = 2*m+1;
function mod(n, m) {
    return (n % m);
}

function pow(x, n) {
    let result = x;
    for (let i = 1; i < n; i++) {
        result *= x;
    }
    return result;
}

function pow2(bin){
    return rshift(bin, 1)
}

function rshift(bin, value){
    return element.slice(0, i).concat(element.slice(i));
}

function lshift(bin, value){
    return bin+"0".repeat(value);
}

function create(){
    let multiplicativeMatrix = [];
    let row = [], state = 0;
    for (let i = 0; i < m; i++) {
        row = [];
        for (let j = 0; j < m; j++)
            if (mod((pow(2, i) + pow(2, j)), p) === 1) {
                state = 1;
            } else if (mod((pow(2, i) - pow(2, j)), p) === 1) {
                state = 1;
            } else if (mod((-pow(2, i) + pow(2, j)), p) === 1) {
                state = 1;
            } else if (mod((-pow(2, i) - pow(2, j)), p) === 1) {
                state = 1;
            }
            row[j] = state;
        multiplicativeMatrix[i] = row;
    }
}



function matrixMul(bin, l, r) {
    let first = "", result = 0, a, b;
    for(let i = 0; i < bin.length; i++) {
        let cell = 0;
        for(let j = 0; j < bin.length; i++) {
            a = l.vector[j].toNumber;
            b = bin.matrix[i][j].toNumber;
            cell += a * b
        }
        first += (cell % 2).toString();
    }
    for(let i = 0; i < bin.length; i++)
        result += first[i].toNumber * r.vector[i].toNumber;
    return (result % 2).toString();
}


function add(bin1, bin2) {
    let res = "";
    for (let i = 0; i < bin1.length; i++) {
        if (bin1[i] === bin2[i]) res += "0";
        else res += "1";
    }
    return (res);
}

function Trace(bin){
    let trace = "0";
    for char bit: bin.toCharArray()){
        trace = add(trace, bit)
    }
    return trace;
}

function mul(bin1, bin2){
    result = "";
    for(let i = 0; i < bin1.length; i++){
        result = add(result, bin1.matrixMul(lshift(bin1, i), lshift(bin2, i)));
    }
    result = add(result, bin1.mul_mtr(lshift(bin1, i), lshift(bin2, i)))
    return result;
}

function powB(bin, value) {
    let result = "1".repeat(m);
    for (let i = 0; i < value; i++) {
        if (value[i] === 1) {
            result = mul(result, bin);
        }
        result = rshift(result, 1);
    }
    return result;
}

function inverse(bin) {
    return powB(bin, inv)
}
