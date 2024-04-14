export default function RoundToDecimal(
  num: number,
  decimalPlaces: number
): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}
