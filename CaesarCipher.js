class CaserCipher {
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
}

let rot13 = new CaserCipher("s")