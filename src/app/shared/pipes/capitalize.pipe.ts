import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: unknown): string {
    const noValue = 'N/A'; // Default value for empty strings
    if (typeof value !== 'string') {
      console.warn(
        `[CapitalizePipe]: Expected a string but received ${typeof value}`
      );
      return noValue;
    }

    const trimmed = value.trim();
    if (!trimmed) return noValue;

    return trimmed
      .split(/\s+/) // split by any whitespace
      .map((word) => this.capitalizeWord(word))
      .join(' ');
  }

  private capitalizeWord(word: string): string {
    return word
      .split('-') // handle hyphenated words
      .map((part) => this.formatPart(part))
      .join('-');
  }

  private formatPart(part: string): string {
    if (!part) return '';

    // Convert acronyms like 'usa' to 'USA' if 2–3 letters
    const isAcronym = /^[a-z]{2,3}$/.test(part);
    if (isAcronym) {
      return part.toUpperCase();
    }

    // Normal capitalization
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }
}
