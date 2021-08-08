import { Pressure, Minute } from "../types";

// From Shearwater/NOAA https://www.shearwater.com/monthly-blog-posts/shearwater-and-the-cns-oxygen-clock/
export const cnso2Table: { p: Pressure, t: Minute }[] = [
    { p: .6, t: 720 },
    { p: .7, t: 540 },
    { p: .8, t: 450 },
    { p: .9, t: 360 },
    { p: 1.0, t: 300 },
    { p: 1.1, t: 240 },
    { p: 1.2, t: 210 },
    { p: 1.3, t: 180 },
    { p: 1.4, t: 150 },
    { p: 1.5, t: 120 },
    { p: 1.6, t: 45 },
]
// Linearlly interpolate between the cnsO2 table to get the value for a given pressure
export function getCnsO2TimeLimit(p: Pressure): Minute {
    if (p < .6) {
        return Infinity
    }
    if (p > 1.6) {
        throw `not implemented ${p}`
    }

    // find the lower bound
    let lowerBound = 0;
    cnso2Table.forEach((point, i) => {
        if (point.p < p) {
            lowerBound = i
        }
    })

    // interpolate between the lower and upper bound
    const ratio = (p - cnso2Table[lowerBound].p) / (0.1)
    const limit = cnso2Table[lowerBound].t + (cnso2Table[lowerBound + 1].t - cnso2Table[lowerBound].t) * ratio

    return limit
}