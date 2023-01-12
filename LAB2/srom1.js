const hexValues = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
}

function reverse(str) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

function toBinary(hex) {
    let number = "";
    for (let i = 0; i < hex.length; i++)
        number += hexValues[hex[i]];
    return number;
}

function toHex(bin) {
    let hex = "";
    let numberOfZeroes = 4 - bin.length % 4, zeroes = "";
    while (numberOfZeroes !== 0) {
        zeroes += "0";
        numberOfZeroes--;
    }
    if (zeroes !== "0000")
        bin = zeroes + bin;
    let maket = "";
    for (let i = 0; i < bin.length; i += 4) {
        maket = bin[i] + bin[i + 1] + bin[i + 2] + bin[i + 3];
        hex += Object.keys(hexValues).find(key => hexValues[key] === maket);
    }
    if (hex[0] === "0")
        hex = hex.substring(1);
    return hex;
}

function addO(n1, n2) {
    let max = Math.max(n1.length, n2.length);
    return ["0".repeat(max - n1.length) + n1, "0".repeat(max - n2.length) + n2];
}

function lshift(bin, v) {
    return (bin + "0".repeat(v));
}

function rshift(bin, v) {
    if (bin.substring(0, bin.length - v) === "")
        return "0";
    return bin.substring(0, bin.length - v);
}

function compare(bin1, bin2) {
    let first = bin1, second = bin2;
    if (first.length !== second.length)
        return (first.length > second.length) ? 1 : -1;
    for (let i = 0; i < first.length; i++) {
        if (first[i] > second[i])
            return 1;
        if (first[i] < second[i])
            return -1;
    }
    return 0;
}


function binarySum(first, second) {
    if (second === "0000")
        return first;
    let c = "";
    let normalizator = addO(first, second);
    first = normalizator[0];
    second = normalizator[1];
    let carry = 0, temp;
    for (let i = Math.max(first.length, second.length) - 1; i >= 0; i--) {
        temp = +first[i] + +second[i] + carry;
        c += (temp & 1);
        carry = temp >> 1;
    }
    if (carry === 0)
        return reverse(c);
    else
        return carry + reverse(c);
}

function binarySub(first, second) {
    if (second === "0000")
        return first;
    while (first[0] === "0")
        first = first.substring(1);
    while (second[0] === "0")
        second = second.substring(1);
    let c = "";
    if (compare(first, second) === -1)
        return "error";
    let borrow = 0, temp;
    let normalizator = addO(first, second);
    first = normalizator[0];
    second = normalizator[1];
    for (let i = first.length - 1; i >= 0; i--) {
        temp = +first[i] - +second[i] - borrow;
        if (temp >= 0) {
            c += temp;
            borrow = 0;
        } else {
            c += (2 + +temp);
            borrow = 1;
        }
    }
    c = reverse(c);
    while (c[0] === "0") {
        c = c.substring(1);
    }
    if (c === "")
        return "0";
    return c;
}

function binaryMul(big1, big2) {
    let f1 = big1, f2 = big2, c = "0";
    let first, second, temp;
    if (f1 === "0001" && f2 === "0001")
        return f1;
    if (compare(f1, f2) === 1) {
        first = f1;
        second = f2;
    } else if (compare(f1, f2) === -1) {
        first = f2;
        second = f1;
    } else {
        first = f1;
        second = first;
    }
    for (let i = 0; i < first.length; i++) {
        if (second[i] === "1") {
            temp = lshift(first, second.length - i - 1);
            c = binarySum(c, temp);
        }
    }
    return c;
}

function binaryPow(bin, value) {
    if (value === "0")
        return "1";
    if (value === "1")
        return bin;
    let c = "1";
    for (let i = 0; i < toBinary(value).length; i++) {
        if (toBinary(value)[i] === "1")
            c = hexMul(c, bin);
        if (i !== toBinary(value).length - 1)
            c = hexMul(c, c);
    }
    return c;
}

function binaryDiv(bin1, bin2) {
    let result = "";
    let r = "";

    for (let i = 0; i < bin1.length; i++) {
        if (compare(r, bin2) === 1 || compare(r, bin2) === 0)
            break;

        r += bin1[i];

        if (compare(r, bin2) === -1) {
            result += 0;
        } else {
            r = binarySub(r, bin2);
            result += 1;
        }
    }

    return [result, r];

}

function hexSum(first, second) {
    return toHex(binarySum(toBinary(first), toBinary(second)));
}

function hexSub(first, second) {
    return toHex(binarySub(toBinary(first), toBinary(second)));
}

function hexMul(first, second) {
    if (first.length > 512) {
        first = first.slice(first.length - 512,);
    }
    if (second.length > 512) {
        second = second.slice(second.length - 512,);
    }
    return toHex(binaryMul(toBinary(first), toBinary(second)));
}

function hexPow(first, second) {
    if (second < "0")
        return "error";
    let res = binaryPow(first, second);
    if (res.length > 512)
        res = res.slice(res.length - 512,);
    return (res);
}

function hexDiv(first, second) {
    if (second === "0")
        return "error";
    first = toBinary(first);
    second = toBinary(second);
    return [toHex(binaryDiv(first, second)[0]), toHex(binaryDiv(first, second)[1])];

}

//Lab2

function binBarretReduction(first, n) {
    while (n[0] === "0")
        n = n.substring(1);
    let u = lshift("1", 2 * n.length)
    u = binaryDiv(u, n)[0];
    let r = "";
    let q = rshift(first, n.length - 1);
    q = binaryMul(q, u);
    q = rshift(q, n.length + 1);
    r = binarySub(first, binaryMul(q, n));
    while (compare(r, n) !== -1) {
        r = binarySub(r, n);
    }
    if (r === "")
        return "0";
    return r;
}

function hexBarretReduction(first, n) {
    first = toBinary(first);
    n = toBinary(n);
    return toHex(binBarretReduction(first, n));
}

function findBinFraction(bin, module) {
    if (compare(bin, binaryMul(module, module)) !== 1) {
        console.log("barr")
        return binBarretReduction(bin, module);
    } else {
        console.log("%")
        return binaryDiv(bin, module)[1];
    }
}

function findHexFraction(hex, module) {
    if (compare(hex, hexMul(module, module)) !== 1) {
        console.log("barr")
        return hexBarretReduction(hex, module);
    } else {
        console.log("%")
        return hexDiv(hex, module)[1];
    }
}

function ifPair(bin) {
    if (bin[bin.length - 1] === "0")
        return 0;
    else
        return 1;
}

function gcd(bin1, bin2) {
    let d = "1";
    while (ifPair(bin1) === 0 && ifPair(bin2) === 0) {
        bin1 = rshift(bin1, 1);
        bin2 = rshift(bin2, 1);
        d = lshift(d, 1);
    }
    while (ifPair(bin1) === 0)
        bin1 = rshift(bin1, 1);
    while (bin2 !== "0") {
        while (ifPair(bin2) === 0)
            bin2 = rshift(bin2, 1);
        if (compare(bin1, bin2) === 1) {
            let temp = bin1;
            bin1 = bin2;
            bin2 = binarySub(temp, bin2);
        } else {
            let temp = bin1;
            bin1 = bin2;
            bin2 = binarySub(bin2, temp);
        }
    }
    d = binaryMul(d, bin1);
    return d;
}

function lcm(bin1, bin2) {
    let result = binaryMul(bin1, bin2);
    return binaryDiv(result, gcd(bin1, bin2))[0];
}

function hexgcd(first, second) {
    return toHex(gcd(toBinary(first), toBinary(second)));
}

function hexlcm(first, second) {
    return toHex(lcm(toBinary(first), toBinary(second)));
}

function binModSum(bin1, bin2, module) {
    return findBinFraction(binarySum(bin1, bin2), module);
}

function binModSub(bin1, bin2, module) {
    return findBinFraction(binarySub(bin1, bin2), module);
}

function binModMul(bin1, bin2, module) {
    return findBinFraction(binaryMul(bin1, bin2), module);
}

function binModPow(bin1, pow, module) {
    return findBinFraction(binaryPow(bin1, pow), module);
}

function hexModSum(first, second, module) {
    return findHexFraction(hexSum(first, second), module);
}

function hexModSub(first, second, module) {
    return findHexFraction(hexSub(first, second), module);
}

function noLimitMul(first, second) {
    return toHex(binaryMul(toBinary(first), toBinary(second)));
}

function noLimitPow(first, value, module) {
    if (value < "0")
        return "error";
    if (value === "0")
        return "1";
    if (value === "1")
        return first;
    let c = "1";
    for (let i = 0; i < toBinary(value).length; i++) {
        if (toBinary(value)[i] === "1") {
            c = hexMul(c, first);
            c = findHexFraction(c, module);
        }
        if (i !== toBinary(value).length - 1) {
            c = hexMul(c, c);
            c = findHexFraction(c, module);
        }
    }
    return c;

}

function hexModMul(first, second, module) {
    return findHexFraction(noLimitMul(first, second), module);
}

function hexModPow(first, pow, module) {
    return findHexFraction(noLimitPow(first, pow, module), module);
}


class BigNumber {
    constructor(hex) {
        if (typeof (hex) === "string")
            this.hex = hex.toUpperCase();
        else
            console.log("Type error");
    }
}

let a = new BigNumber("418C1C9CEC447DF13925BB1E7FCED45650342ED8C038B5F65C039");
let b = new BigNumber("114B2C4EE1A4E4CD7814B219EF8434894CA74B5C144C91C0A7B50C");
let n = new BigNumber("8e06e4dffb37b57a66ecc52cf2d7d888c49c2794e6fb944c4183a128203932febea4b6e62b2ebdad4ff0b80dbedc8439d31280d13e7e523596d92861f6a89e81");

console.log(hexMul(a.hex, b.hex))
// console.log(hexlcm(a.hex, b.hex))
// console.log(hexModSum(a.hex, b.hex, n.hex));
// console.log(hexModSub(a.hex, b.hex, n.hex));
// console.log(hexModMul(a.hex, b.hex, n.hex));
// console.log(hexModPow(a.hex, b.hex, n.hex));


