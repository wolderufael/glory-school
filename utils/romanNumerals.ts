/**
 * Convert Roman numeral to number
 */
export function romanToNumber(roman: string): number {
  const romanNumerals: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanNumerals[roman[i]];

    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }

    prevValue = currentValue;
  }

  return result;
}

/**
 * Convert number to Roman numeral
 */
export function numberToRoman(num: number): string {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];

  let result = "";

  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += numerals[i];
      num -= values[i];
    }
  }

  return result;
}

/**
 * Increment a Roman numeral by a specified amount
 */
export function incrementRomanNumeral(
  roman: string,
  increment: number = 1
): string {
  const number = romanToNumber(roman);
  const newNumber = number + increment;
  return numberToRoman(newNumber);
}

/**
 * Get next level Roman numeral (increment by 1)
 */
export function getNextLevel(currentLevel: string): string {
  return incrementRomanNumeral(currentLevel, 1);
}

 // Helper function to convert Roman numerals to integers
  export const romanToInt = (roman: string): number => {
    const romanNumerals: { [key: string]: number } = {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 5,
      VI: 6,
      VII: 7,
      VIII: 8,
      IX: 9,
      X: 10,
    };
    return romanNumerals[roman.toUpperCase()] || 0;
  };