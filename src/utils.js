/**
 *
 */
export function noop () { }

export function isNumber (val) {
  return !isNaN(parseFloat(val))
}

const toFixedFix = (num, decs, format) => {
  const k = Math.pow(10, decs)
  return '' + (Math[format](num * k) / k).toFixed(decs)
}

export function formatNumber (number, decimal, decimals, separator = ',', isRound) {
  const format = isRound ? 'round' : 'floor'
  let result = []

  result = (decimals ? toFixedFix(number, decimals, format) : '' + Math[format](number)).split('.')

  if (result[0].length > 3) {
    result[0] = result[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separator)
  }

  if ((result[1] || '').length < decimals) {
    result[1] = result[1] || ''
    result[1] += new Array(decimals - result[1].length + 1).join('0')
  }

  return result.join(decimal)
}
