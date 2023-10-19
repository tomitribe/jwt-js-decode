const max = 10000000000000; // biggest 10^n integer that can still fit 2^53 when multiplied by 256

export default class Int10 {
    buf: any[];

    constructor(value?) {
        this.buf = [+value || 0];
    }

    mulAdd(m, c) {
        // assert(m <= 256)
        const b = this.buf,
            l = b.length;
        let i, t;
        for (i = 0; i < l; ++i) {
            t = b[i] * m + c;
            if (t < max) c = 0;
            else {
                c = 0 | (t / max);
                t -= c * max;
            }
            b[i] = t;
        }
        if (c > 0) b[i] = c;
    }

    sub(c) {
        // assert(m <= 256)
        const b = this.buf,
            l = b.length;
        let i, t;
        for (i = 0; i < l; ++i) {
            t = b[i] - c;
            if (t < 0) {
                t += max;
                c = 1;
            } else c = 0;
            b[i] = t;
        }
        while (b[b.length - 1] === 0) b.pop();
    }

    toString(base?: number) {
        if ((base || 10) != 10) throw 'only base 10 is supported';
        const b = this.buf;
        let s = b[b.length - 1].toString();
        for (let i = b.length - 2; i >= 0; --i) s += (max + b[i]).toString().substring(1);
        return s;
    }

    valueOf() {
        const b = this.buf;
        let v = 0;
        for (let i = b.length - 1; i >= 0; --i) v = v * max + b[i];
        return v;
    }

    simplify() {
        const b = this.buf;
        return b.length == 1 ? b[0] : this;
    }
}

export { Int10 };
