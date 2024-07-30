/*
 * Re-maps a number from one range to another.
 */
function mapping(
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number,
    withinBounds: boolean = false
): number {
    // Calculate the proportion of the value within the source range
    const proportion = (value - start1) / (stop1 - start1)

    // Map the proportion to the target range
    let mappedValue = start2 + proportion * (stop2 - start2)

    // Optionally constrain the mapped value to the target range
    if (withinBounds) {
        mappedValue = Math.max(start2, Math.min(stop2, mappedValue))
    }

    return mappedValue
}

export default mapping
