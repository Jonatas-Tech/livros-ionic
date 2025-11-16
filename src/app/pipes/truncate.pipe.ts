// src/app/pipes/truncate.pipe.ts
// Pipe para truncar textos longos JM
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 150): string {
    if (!value) return '';
    
    // Troque trimEnd() por trimRight()
    return value.length > limit ? value.slice(0, limit).trimRight() + '…' : value;
  }
}