import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringCalculatorService {
  private callCount: number = 0;

  constructor() {}

  public add(numbers: string): number {
    if (!numbers) {
      return 0;
    }

    let numberList = numbers.split(',').map((num) => parseInt(num, 10));

    let result = numberList.reduce((acc, val) => acc + val, 0);

    return result;
  }
}
