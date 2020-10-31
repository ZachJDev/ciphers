class CaesarCipher {
  constructor(rotation) {
    try {
      // confirm is number
      if (typeof rotation !== "number")
        throw new TypeError(
          "Expected Rotation to be type number. Instead got " +
            "'" +
            typeof rotation +
            "'"
        );
      // simplify
      this._rot = rotation % 26;
      this.rotation = rotation;
    } catch (e) {
      console.log(e);
    }
  }
  _isAlpha(c) {
    let check = c.toUpperCase().charCodeAt(0);
    return check >= 65 && check <= 90;
  }
  _getAlphaIndex(charCode) {
    // converts the charCode to the position in the alphabet.
    if (charCode < 91) return charCode - 65;
    return this._getAlphaIndex(charCode - 32);
  }
  _getCharCodeFromAlpha;
  encipher(string) {
    let final = "";
    for (let char of string) {
      let newChar = char;
      if (this._isAlpha(char)) {
        let charCode = char.charCodeAt(0);
        let newCode = charCode + (this._rot % 26);
        // This converts rotations that go too high for charCode:
        // e.g. rotating 'Z' by anything will move it off of the 
        // range (and potentially into lowercase territory.)
        if (
          (charCode >= 65 && charCode <= 90 && newCode > 90) ||
          (charCode >= 97 && charCode <= 122 && newCode > 122)
        ) {
          newCode -= 26;
        }
        newChar = String.fromCharCode(newCode);
      }
      final += newChar;
    }
    return final;
  }
}

let rot13 = new CaesarCipher(13);
console.log(rot13.encipher("AND YES I am hungry, thank you!"));
