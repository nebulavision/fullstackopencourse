export const reverse = (string) => {
    return string.split('').reverse().join('')
}

export const average = (array) => {
    return array.length === 0
    ? 0
    : array.reduce((sum, acc) => sum+acc, 0) / array.length
}