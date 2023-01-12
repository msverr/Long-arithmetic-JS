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

