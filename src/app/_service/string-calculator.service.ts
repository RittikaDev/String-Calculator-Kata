import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringCalculatorService {
  private callCount: number = 0;

  constructor() {}

  public add(numbers: string): number {
    if (!numbers) return 0;

    let delimiters = [',', '\n'];
    let numbersWithoutDelimiters = numbers;

    if (numbers.startsWith('//')) {
      let delimiterIndex = numbers.indexOf('\n');
      let delimiterSection = numbers.substring(2, delimiterIndex);
      delimiters = [...delimiters, ...this.parseDelimiters(delimiterSection)];
      numbersWithoutDelimiters = numbers.substring(delimiterIndex + 1);
    }

    let numberList = numbersWithoutDelimiters
      .split(new RegExp(`[${delimiters.join('')}]`))
      .map((num) => parseInt(num, 10));

    console.log('Number list', numberList);

    let result = numberList
      .filter((n) => n <= 1000)
      .reduce((acc, val) => acc + val, 0);

    return result;
  }
  private parseDelimiters(containsDelimiters: string): string[] {
    if (containsDelimiters.startsWith('[') && containsDelimiters.endsWith(']'))
      return containsDelimiters
        .substring(1, containsDelimiters.length - 1)
        .split('][');

    return [containsDelimiters];
  }
}
