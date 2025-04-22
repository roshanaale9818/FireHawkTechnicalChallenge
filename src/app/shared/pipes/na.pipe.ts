import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na',
})
export class NaPipe implements PipeTransform {
  /**
   * Transforms nullish or empty values into a fallback text.
   *
   * @param value - The value to be transformed
   * @param fallback - Optional fallback text (default is 'N/A')
   * @returns Transformed value or fallback
   */
  transform(
    value: unknown,
    fallback: string = 'N/A'
  ): string | number | boolean {
    const isNullish = value === null || value === undefined;
    const isEmptyString = typeof value === 'string' && value.trim() === '';
    const isInvalidNumber = typeof value === 'number' && isNaN(value);

    if (isNullish || isEmptyString || isInvalidNumber) {
      return fallback;
    }

    return value as string | number | boolean;
  }
}
