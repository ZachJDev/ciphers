class ZigZagCipher {
    constructor(numRows) {
        this.numRows = numRows;
    }

    // I like this pattern of having both static
    // and instance methods to get ciphered text, but
    // I don't know if this is 1. good for performance or
    // 2. a good way to express this.
    encipher(s) {
        return ZigZagCipher.quickEncipher(s, this.numRows)
    }
    static quickEncipher(s, numRows) {
        // return this.encipher(s).bind({numRows})
        if(s.length === 1 || numRows === 1) return s
        let final = ""

        let cycleUp = (numRows * 2) - 2;
        let cycleDown = 0;

        for(let i = 0; i < numRows; i++) {
            let pos = i;
            let up = true
            while(pos < s.length) {
                final += s[pos]
                if(cycleUp !== 0 && cycleDown !== 0) pos += up ? cycleUp : cycleDown;
                else pos += (numRows * 2) - 2                
                up = !up
            }
            // for rows other than the first or last, the cycle is broken into two parts:
            // going towards the last row and going towards the top row. This flip/flops
            // in the while statement above.
            cycleUp -= 2
            cycleDown += 2
        }
        return final
    }
}

let zz3 = new ZigZagCipher(3)

console.log(zz3.encipher("PAYPALISHIRING"))

console.log(ZigZagCipher.quickEncipher("PAYPALISHIRING", 3))