import { TestBed } from '@angular/core/testing';
import { StringCalculatorService } from './string-calculator.service';

describe('StringCalculatorService', () => {
  let service: StringCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle empty string', () => {
    expect(service.add('')).toEqual(0);
  });

  it('should handle single number', () => {
    expect(service.add('1')).toEqual(1);
  });

  it('should handle two numbers', () => {
    expect(service.add('1,2')).toEqual(3);
  });
});
