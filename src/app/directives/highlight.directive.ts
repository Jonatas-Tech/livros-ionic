import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

// Cor de destaque padrão (exemplo: azul claro ou amarelo)
// Altere este valor!
const HIGHLIGHT_COLOR = '#5c6ea0'; // Exemplo: Amarelo (pode ser qualquer cor hexadecimal, RGB ou nome)

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') query = ''; // Recebe a query de busca (ex: 'tecnologia')

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.highlightText(this.el.nativeElement.innerHTML);
  }

  private highlightText(originalText: string) {
    if (!this.query) {
      this.el.nativeElement.innerHTML = originalText;
      return;
    }

    const regex = new RegExp(`(${this.query.trim()})`, 'gi');

    // Remove qualquer destaque anterior
    let newHtml = originalText.replace(new RegExp(`<span style="background-color: ${HIGHLIGHT_COLOR};">`, 'g'), '');
    newHtml = newHtml.replace(/<\/span>/g, '');
    
    // Aplica o novo destaque
    newHtml = newHtml.replace(regex, `<span style="background-color: ${HIGHLIGHT_COLOR};">$1</span>`);

    this.el.nativeElement.innerHTML = newHtml;
  }
}