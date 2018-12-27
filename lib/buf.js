const BACK_SLASH = 0x5c;

class InputBuffer {
    constructor(input) {
        this._buf = input instanceof Buffer ? input : Buffer.from(input);
        this._replace();
    }

    _replace() {
        if (this._buf.indexOf(BACK_SLASH) < 0) {
            return;
        }
        let len = this._buf.length;
        for (let i = 0; i < len; i++) {
            if (this._buf[i] === BACK_SLASH && this._buf[i+1] === BACK_SLASH) {
                this._buf = Buffer.concat([this._buf.slice(0,i), this._buf.slice(i+1)]);
                len -= 1;
            }
        }
    }

    toString() {
        return this._buf.toString('utf-8');
    }
}

module.exports = InputBuffer;