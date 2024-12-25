// Ex: formatNumber(1000000) => 1,000,000
// Ex: formatNumber(1000000.62) => 1,000,001
// Ex: formatNumber(1000000, true) => 1M
// Ex: formatNumber(1000000, false, 3) => 1,000,000.000
export const formatNumber = (data: number | undefined, shorten?: boolean, fixed?: number) => {
  if (!data) {
    return '0'
  } else if (!shorten) {
    return data.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  } else {
    if (data < 1e3) return data + ' '
    if (data >= 1e3 && data < 1e6) return +(data / 1e3).toFixed(1) + 'K'
    if (data >= 1e6 && data < 1e9) return +(data / 1e6).toFixed(1) + 'M'
    if (data >= 1e9 && data < 1e12) return +(data / 1e9).toFixed(1) + 'B'
    if (data >= 1e12) return +(data / 1e12).toFixed(1) + 'T'
  }
}
