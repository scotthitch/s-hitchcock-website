import type { QuadraticRoot } from "../types";

class QuadraticRoots {
    roots: QuadraticRoot[];

    constructor(a: number, b: number, c: number) {
        this.roots = this.calculateRoots(a, b, c);
    }

    getRoots() {
        return this.roots
    }

    getImaginaryRoots() {
        return [this.roots[0].imaginary, this.roots[1].imaginary]
    }

    getRealRoots() {
        return [this.roots[0].real, this.roots[1].real]
    }

    containsImaginaryRoots() {
        return !this.getImaginaryRoots().every(imaginaryRoot => imaginaryRoot === 0)
    }


    calculateRoots(a: number, b: number, c: number): QuadraticRoot[] {
        const discriminant = b*b - 4*a*c;
        const roots: QuadraticRoot[] = [
            {
                real: 0,
                imaginary: 0
            },
            {
                real: 0,
                imaginary: 0
            }
        ]
    
        if (discriminant > 0) {
            // Two real roots
            roots[0].real = (-b + Math.sqrt(discriminant)) / (2 * a);
            roots[0].imaginary = 0;
            roots[1].real = (-b - Math.sqrt(discriminant)) / (2 * a);
            roots[1].imaginary = 0;
    
        } else if (discriminant === 0) {
            // One real root (repeated root)
            roots[0].real = -b / (2 * a);
            roots[0].imaginary = 0;
            roots[1].real = roots[0].real;
            roots[1].imaginary = 0;
    
        } else {
            // Two complex roots
            const realPart = -b / (2 * a);
            const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);
            roots[0].real = realPart;
            roots[0].imaginary = imaginaryPart;
            roots[1].real = realPart;
            roots[1].imaginary = -imaginaryPart;
        }
        
        return roots;
    }
}

export default QuadraticRoots