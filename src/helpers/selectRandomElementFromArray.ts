const selectRandomElementFromArray = (array: any[]) => {
    return array[Math.floor(Math.random() * array.length)]
}

export default selectRandomElementFromArray