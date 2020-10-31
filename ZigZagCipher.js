class ZigZagCipher {
  constructor(numRows) {
    this.numRows = numRows;
  }

  // I like this pattern of having both static
  // and instance methods to get ciphered text, but
  // I don't know if this is 1. good for performance or
  // 2. a good way to express this.
  encipher(s) {
    return ZigZagCipher.quickEncipher(s, this.numRows);
  }

  decipher(s) {
    return ZigZagCipher.quickDecipher(s, this.numRows);
  }
  static quickEncipher(s, numRows) {
    if (s.length === 1 || numRows === 1) return s;
    // There is one more way to return s: if numRows > s.length. But
    // That is handled correctly below, so it's not explicated here.
    let final = "";

    // This method builds final row-by-row, in order of 
    // the letter appearing in the final string, not by
    // manipulating the insertion index.
    let cycleUp = numRows * 2 - 2;
    let cycleDown = 0;

    for (let i = 0; i < numRows; i++) {
      let pos = i;
      let up = true;
      while (pos < s.length) {
        final += s[pos];
        if (cycleUp !== 0 && cycleDown !== 0) pos += up ? cycleUp : cycleDown;
        else pos += numRows * 2 - 2;
        up = !up;
      }
      // for rows other than the first or last, the cycle is broken into two parts:
      // going towards the last row and going towards the top row. This flip/flops
      // in the while statement above.
      cycleUp -= 2;
      cycleDown += 2;
    }
    return final;
  }
  static quickDecipher(s, numRows) {
      let final = "";
      // These edges cases make it feel hacky to me....
      // It would be very nice to handle these with the rest of the code.
      // All it tells me is that the main loop of the decipherer can be improved.
      // (probably).
      if(numRows === 1) return s
      if(numRows === 2) {
          for(let i = 0; i < Math.ceil(s.length / 2); i++) {
            final += s[i]
            if(final.length < s.length)final += s[Math.ceil(s.length / 2) + i]
          }
      }
    let cycleLen = numRows * 2 - 2;
    let numFullCycles = Math.floor(s.length / cycleLen);
    let numInTopRow = Math.ceil(s.length / cycleLen);
    let cycleRemainder = s.length % (numRows * 2 - 2); // total number of letters in the final cycle.

    const getCycleRemainderInRow = (rowNum) => {
        if(cycleRemainder > cycleLen - rowNum) return 2
        if(cycleRemainder > rowNum) return 1
        return 0
    };
    // This function adds the first half of a cycle calling itself with each successive row.
    // after calling itself, it adds on the next letter, effectively filling in the second half of the 
    // cycle.
    const recursiveZag = (offset, rowsLeft, i) => {
      let rowNum = numRows-rowsLeft;
      // Each cycle has two letters in one row, up and down.
      let numInRow = (numFullCycles * 2) + getCycleRemainderInRow(rowNum);
        // This conditional (and it's sibling at the end) also makes it feel hacky to me.
      if(final.length < s.length) final += s[offset];

      if (rowsLeft === 1) return;

      switch (rowsLeft) {
        case numRows:
          recursiveZag(offset + numInTopRow + i, rowsLeft - 1, i);
          break;
        case 2: //2nd to last row; next row has 1/2 as many
          recursiveZag(offset + numInRow - i, rowsLeft - 1, i);
          break;
        default:
          recursiveZag(offset + numInRow, rowsLeft - 1, i);
          break;
      }
      // The top row does not add it's neighbor as the next call in the for loop will start
      // with that letter. And obviously we don't want to add something once we're finished
      // with the final string.
      if (rowsLeft !== numRows && final.length < s.length) final += s[offset + 1];
    };
    for (let i = 0; i < numInTopRow; i++) {
      recursiveZag(i, numRows, i);
    }
    return final;
  }
}



////////// A few Tests ////////////
let message = "DISCOVEREDDONOTADVANCE".repeat(100)
const MAX_ROWS = 300
let randomRowCipher = new ZigZagCipher(Math.floor(Math.random() * MAX_ROWS) + 1)
let cipher = randomRowCipher.encipher(message);

for(let i = 1; i < MAX_ROWS; i++) {
    let decoded = ZigZagCipher.quickDecipher(cipher, i)
    if(decoded === message){
         console.log("Code Deciphered: " + i + " Rows.")
        break;
    }
}
console.log("answer: " + randomRowCipher.numRows + " Rows")

// for(let i = 1; i < 10; i++) {
// let code = ZigZagCipher.quickEncipher("THIS_IS_A_TEST12345678", i)
// let solved = ZigZagCipher.quickDecipher(code, i)

// console.log(i + " Code: " + code + "\n" + i + " Deciphered: " + solved)
// }
