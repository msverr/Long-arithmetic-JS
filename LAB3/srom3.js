const deg = 293;
const gen =
    "100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100001000011";
const inv = "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110";

function add(bin1, bin2) {
    if (bin1.length !== bin2.length) {
        if (bin1.length > bin2.length) {
            bin2 = add0(bin2, bin1);
        } else {
            bin1 = add0(bin1, bin2);
        }
    }
    let res = "";
    for (let i = 0; i < bin1.length; i++) {
        if (bin1[i] === bin2[i]) res += "0";
        else res += "1";
    }
    while (res[0] === "0")
        res = res.substring(1)
    return (res);
}

function add0(bin1, bin2) {
    while (bin1.length !== bin2.length) bin1 = "0" + bin1;
    return bin1;
}

function lshift(bin, v) {
    return bin + "0".repeat(v);
}

function compare(bin1, bin2) {
    let maxlength = Math.max(bin1.length, bin2.length);

    if (bin1.length < bin2.length) bin1 = add0(bin1, bin2)[0];
    else bin2 = add0(bin2, bin1)[0];

    for (let i = 0; i < maxlength; i++) {
        if (bin1[i] > bin2[i]) return 1;
        else if (bin2[i] > bin1[i]) return -1;
    }

    return 0;
}

function mod(bin) {
    let r = bin;
    while (r.length >= gen.length) {
        let t = lshift(gen, r.length - gen.length);
        r = add(r, t);
    }
    return r;
}

function mul(bin1, bin2) {
    let first,
        second,
        temp,
        c = "0";
    if (compare(bin1, bin2) === 1) {
        first = bin1;
        second = add0(bin2, bin1);
    } else if (compare(bin1, bin2) === -1) {
        first = bin2;
        second = add0(bin1, bin2);
    } else {
        first = bin1;
        second = first;
    }
    for (let i = 0; i < first.length; i++) {
        if (second[i] === "1") {
            temp = lshift(first, second.length - i - 1);
            c = add(c, temp);
        }
    }
    c = mod(c);
    while (c[0] === "0")
        c = c.substring(1)
    return c;
}

function Trace(bin) {
    let result = "0";
    let prev = bin, val;
    for (let i = 0; i < deg; i++) {
        val = mul(prev, prev)
        result = add(result, val)
        prev = val;
    }
    return result[result.length - 1]
}

function pow(bin, pow) {
    while (bin[0] === "0")
        bin = bin.substring(1)
    let result = "1";
    while (pow[0] === "0")
        pow = pow.substring(1)
    for (let i = 0; i < pow.length; i++) {
        if (pow[i] === '1')
            result = mul(bin, result);
        if (i !== pow.length - 1)
            result = mul(result, result);

    }
    return (result)
}

function inverse(bin) {
    return pow(bin, inv)
}

function pow2(bin) {
    return mul(bin, bin);
}

let first =
    "11111101001101100000101111001101001111001100001001100011001100111001010001010001000010110100011101100111101101011010010011011001111000001110010010010111011101010010111110001000000010010000000011101100001000100001011010100100000110111001101111100000111110011011001101010000110101110110111010001";
let second =
    "01001000111100001001010101001101001110000110101001001100110011010100100010100100001110000011011001100111110000111001011001001001100011101110110011101111100110111100110011011001000110011000101111011001101001100011011011010100010001111110111010110100011101111011011110011101110100111100110001111";
let third =
    "00110100000000000111001000101010001101100100001011111010000010110110011011001010001000101000110100110101000001111001000110100000110101001111001100111110101001101110010010100101101000000111001011000100111101011110110101101010010000001110010010001100101001000001101010000100101110101101101010010";
// console.log(add(first, second));
// console.log(mul(first, second));
// console.log(Trace(first));

let t1 = "0100101111110001101010111100110000000010110010111111001";
let t2 = "1001101010110001110011110011110001111100111010000101111";
let t3 = "0001111100111010000101000111110011101000010100011111001";
// console.log(add(t1, t2));
// console.log(mul(t1, t2));
// console.log(Trace(t1));
// console.log(mul(pow2(pow2(t1)), t1));
// console.log(pow(t1, 2))
// console.log(inverse(t1))
// console.log(pow("10", 293))
