import { cnso2Table, getCnsO2TimeLimit } from '../../constants/cnsO2'

describe('getCnsO2TimeLimit', () => {
    it('gives infinity below 0.6', () => {
        expect(getCnsO2TimeLimit(0)).toEqual(Infinity)
        expect(getCnsO2TimeLimit(0.1)).toEqual(Infinity)
        expect(getCnsO2TimeLimit(0.2)).toEqual(Infinity)
        expect(getCnsO2TimeLimit(0.3)).toEqual(Infinity)
        expect(getCnsO2TimeLimit(0.4)).toEqual(Infinity)
        expect(getCnsO2TimeLimit(0.5)).toEqual(Infinity)
        expect(getCnsO2TimeLimit(0.5999)).toEqual(Infinity)
    })
    it('gives exact results on precise data points', () => {
        cnso2Table.forEach(point => {
            expect(getCnsO2TimeLimit(point.p)).toBeCloseTo(point.t, .001)
        })
    })
    it('linearly interpolates', () => {
        expect(getCnsO2TimeLimit(1.55)).toBeCloseTo(82.5, .001)
        expect(getCnsO2TimeLimit(1.45)).toBeCloseTo(135, .001)
        expect(getCnsO2TimeLimit(1.35)).toBeCloseTo(165, .001)
        expect(getCnsO2TimeLimit(1.25)).toBeCloseTo(195, .001)
        expect(getCnsO2TimeLimit(1.15)).toBeCloseTo(225, .001)
        expect(getCnsO2TimeLimit(1.025)).toBeCloseTo(285, .001)
        expect(getCnsO2TimeLimit(.925)).toBeCloseTo(345, .001)
        expect(getCnsO2TimeLimit(.825)).toBeCloseTo(427.5, .001)
        expect(getCnsO2TimeLimit(.775)).toBeCloseTo(472.5, .001)
        expect(getCnsO2TimeLimit(.675)).toBeCloseTo(585, .001)
    })
})