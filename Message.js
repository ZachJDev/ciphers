class Message {
  constructor(m) {
    this.message = m;
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
}
