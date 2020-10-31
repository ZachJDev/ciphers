class SubstitutionCipher {
  constructor(key) {
    try {
      // confirm that the key is actually a string:
      if (typeof key !== "string")
        throw new TypeError(
          "key must be of type string. Instead got type " +
            typeof key
        );
      //confirm it is the correct length
      if (key.length !== 26)
        throw new Error("key must be of length 26");
      //confirm everything is an alphabet character
      // and that it only occurs once.
      const freqList = {};
      for (let i = 0; i < 26; i++) {
        let char = key.charAt(i).toUpperCase();
        let charCode = char.charCodeAt(0);
        if (charCode < 65 || charCode > 90)
          throw new TypeError(
            "All members of key must be alphabet characters"
          );
        freqList[char] = ++freqList[char] || 1;
        if (freqList[char] > 1)
          throw new Error(
            "Each letter must occur exactly once in key"
          );
      }
      //

      this._key = key.toUpperCase();
    } catch (e) {
      console.log(e);
    }
  }

  _getAlphaIndex(charCode) {
    // converts the charCode to the position in the alphabet.
    if (charCode < 91) return charCode - 65;
    return this._getAlphaIndex(charCode - 32);
  }
  encipher(string) {
    // Returns an encoded string.
    let splitString = string.split("");
    for (let i = 0; i < splitString.length; i++) {
      let char = splitString[i];
      let alphaCheck = char.toUpperCase().charCodeAt(0);
      // if it is an alpha character
      if (alphaCheck >= 65 && alphaCheck <= 90) {
        let alphaIndex = this._getAlphaIndex(char.charCodeAt(0));
        let cipherLetter = this._key[alphaIndex].valueOf();
        //Convert if different cases:
        if (char.charCodeAt(0) >= 97 && cipherLetter.charCodeAt(0) <= 90) {
          // if the input char is lowercase and the cipher is uppercase
          cipherLetter = cipherLetter.toLowerCase();
        } else if (
          char.charCodeAt(0) <= 90 &&
          cipherLetter.charCodeAt(0) >= 97
        ) {
          //if input is upper and cipher is lower
          cipherLetter = cipherLetter.toUpperCase();
        }
        splitString[i] = cipherLetter;
      }
    }
    return splitString.join("");
  }

  decipher(string) {
    // returns a decoded string.
    let splitString = string.split("");
    for (let i = 0; i < splitString.length; i++) {
        let char = splitString[i];
      let alphaCheck = char.toUpperCase().charCodeAt(0);
      if (alphaCheck >= 65 && alphaCheck <= 90) { 
          let index = this._key.indexOf(char.toUpperCase())
          let decoded = String.fromCharCode(index + 65)

          if(char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
              splitString[i] = decoded.toLowerCase()
          }
          else splitString[i] = decoded
      }

    }
    return splitString.join('')
  }
}


