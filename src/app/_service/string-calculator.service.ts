import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringCalculatorService {
  private callCount: number = 0;

  constructor() {}

  public add(numbers: string): number {
    this.callCount++;

    if (!numbers) return 0;

    let delimiters = [',', '\n'];
    let numbersWithoutDelimiters = numbers;

    if (numbers.startsWith('//')) {
      const delimiterIndex = numbers.indexOf('\n');
      const delimiterSection = numbers.substring(2, delimiterIndex);
      delimiters = [...delimiters, ...this.parseDelimiters(delimiterSection)];
      numbersWithoutDelimiters = numbers.substring(delimiterIndex + 1);
    }

    const numberList = numbersWithoutDelimiters
      .split(
        new RegExp(`[${delimiters.map(this.multipleDelimiters).join('')}]`)
      )
      .map((num) => parseInt(num, 10));

    const negativeNumbers = numberList.filter((n) => n < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers not allowed: ${negativeNumbers.join(', ')}`
      );
    }

    return numberList
      .filter((n) => n <= 1000)
      .reduce((acc, val) => acc + val, 0);
  }

  private parseDelimiters(delimiterSection: string): string[] {
    if (delimiterSection.startsWith('[') && delimiterSection.endsWith(']')) {
      return delimiterSection
        .substring(1, delimiterSection.length - 1)
        .split('][');
    }
    return [delimiterSection];
  }

  private multipleDelimiters(delimiter: string): string {
    return delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  public getCalledCount(): number {
    return this.callCount;
  }
}
