class CaesarCipher {
  constructor(rotation) {
    try {
      // confirm is number
      if (typeof rotation !== "number") throw new TypeError("Expected Rotation to be type number. Instead got " + "\'"+ typeof rotation + "\'");
        // simplify
        this._rot = rotation % 26;
        this.rotation = rotation
    } catch (e) {
       console.log(e) 
    }
  }
  _isAlpha(c) {
     check = c.toUpperCase().charCodeAt(0)
    return check >= 65 && check <=90
  }
  _getAlphaIndex(charCode) {
    // converts the charCode to the position in the alphabet.
    if (charCode < 91) return charCode - 65;
    return this._getAlphaIndex(charCode - 32);
  }
  encipher(string) {
    for(let char in string){

    }

  }
}

let rot13 = new CaesarCipher("s")