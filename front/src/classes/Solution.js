import Enumerable from 'linq';

export class Solver {
    h = 1.054571800 * 10e-34;
    m = 9.1093837015e-31;
    a = 2e-10;
    U = 15.168e-18;
    eps = 1e7;
    constructor(step=1e-12) {
        this.setStep(step || 1);
        this.setA(2e-10);
    }
    #getRange(start, stop, step) {
        if (typeof stop == 'undefined') {
            stop = start;
            start = 0;
        }
        if (typeof step == 'undefined') {
            step = 1;
        }
        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
            return [];
        }
        const result = [];
        for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
            console.log(i)
            result.push(i);
        }
        return result;
};
    #getArrange() {
        const arr = [];
        for (let i=-this.delta; i<=this.delta; i+=this.step){
            arr.push(i);
        }
        return arr;
    }
    setDelta(value) {
        this.delta = value;
    };
    setStep(value) {
        this.step = value;
    };
    setA(value) {
        this.a = value;
        this.setDelta(2*value);
    };
    setU(value) {
        this.U = value;
    }
    #V(x) {
        if (Math.abs(x)<=this.a) return -Math.abs(this.U);
        else return 0;
    }
    #calculateDistanceBetweenTwoPoints(x1, x2, y1, y2) {
        return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
    }
    #getIntersection(x1, x2, y1, y2, eps) {
        let points = [];
        this.#getRange(0, x1.toString().length, 1).forEach((i)=>{
            console.log(i, x1.toString().length)
            let dist = this.#calculateDistanceBetweenTwoPoints(x1[i], x2[i], y1[i], y2[i]);
            console.log(dist)
            if (dist <= eps) points.push([x1[i], y1[i], dist]);
        });
        console.log(points)
        points = Enumerable.from(points);

        let minDistance = points.select(function (i) {
            return i[2];
        }).min();
        return points.where(function (i) {
            return i[2] === minDistance;
        }).first();
    }
    getDataForPotentialPitDraw() {
        let xAxis = this.#getArrange()
        let yAxis = [];
        this.#getRange(0, xAxis.length, 1).forEach((x)=>{
            let value = this.#V(xAxis[x]);
            yAxis.push(value);
        });
        return {x: xAxis, y: yAxis};
    }

    getRightFromLeft() {
        let result = []
        let right = []
        let k2 = Math.sqrt(2 * this.m * this.U) / this.h;
        console.log(k2)
        let xAxisLeft = this.#getRange(0, k2, this.eps);
        let yAxisLeft = this.#getRange(0, k2, this.eps).map(x => x * this.a);
        this.#getRange(0, 5, 1).forEach((i) => {
            let xAxisRight = [];
            let yAxisRight = [];
            this.#getRange(0, Math.floor(k2), this.eps).forEach((j)=>{
                xAxisRight.push(j);
                yAxisRight.push(Math.PI * i - 2 * Math.asin((this.h * j) / Math.sqrt(2 * this.m * this.U)))
            })
            let point = this.#getIntersection(xAxisLeft, xAxisRight, yAxisLeft, yAxisRight)
            result.push([point[0], point[1]])
            right.push({x: xAxisRight, y: yAxisRight})
        })
        return {
            points: result,
            left: {
                x: xAxisLeft,
                y: yAxisLeft
            },
            right: right
        }
    }
}