import { TestBed } from '@angular/core/testing';
import { StringCalculatorService } from './string-calculator.service';

describe('StringCalculatorService', () => {
  let service: StringCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringCalculatorService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should handle empty string', () => {
    expect(service.add('')).toEqual(0);
  });

  it('Should handle single number', () => {
    expect(service.add('1')).toEqual(1);
  });

  it('Should handle two numbers', () => {
    expect(service.add('1,2')).toEqual(3);
  });

  it('Should handle multiple numbers', () => {
    expect(service.add('1,2,3,4,5')).toEqual(15);
  });

  it('Should handle numbers with whitespace', () => {
    expect(service.add('1, 2, 3')).toEqual(6);
  });
  it('Should handle numbers with newline and whitespace', () => {
    expect(service.add('1\n 2 \n3')).toEqual(6);
  });
  it('Should handle custom delimiter and newline', () => {
    expect(service.add('//;\n1;2\n3')).toEqual(6);
  });

  it('Should handle custom delimiter with brackets and newline', () => {
    expect(service.add('//[**][%%]\n1**2%%3')).toEqual(6);
  });

  it('Should throw error for negative numbers', () => {
    expect(() => service.add('1,-2,3')).toThrowError(
      'Negative numbers not allowed: -2'
    );
  });

  it('Should ignore numbers greater than 1000', () => {
    expect(service.add('2,1001')).toEqual(2);
  });

  it('Should handle delimiters of any length', () => {
    expect(service.add('//[***]\n1***2***3')).toEqual(6);
  });
  it('Should handle multiple delimiters of any length', () => {
    expect(service.add('//[**][%%]\n1**2%%3')).toEqual(6);
  });

  it('Should count the number of times "add" function was called', () => {
    service.add('1,2');
    service.add('3,4');
    expect(service.getCalledCount()).toEqual(2);
  });
});
