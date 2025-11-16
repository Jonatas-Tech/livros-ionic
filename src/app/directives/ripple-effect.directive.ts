import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rippleEffect]',
  standalone: true
})
export class RippleEffectDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden'); 
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const ripple = this.renderer.createElement('span');

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    this.renderer.setStyle(ripple, 'position', 'absolute');
    this.renderer.setStyle(ripple, 'border-radius', '50%');
    this.renderer.setStyle(ripple, 'pointer-events', 'none');
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);
    this.renderer.setStyle(ripple, 'background', 'rgba(255,255,255,0.35)');
    this.renderer.setStyle(ripple, 'transform', 'scale(0)');
    this.renderer.setStyle(ripple, 'transition', 'transform 0.45s ease-out, opacity 0.6s ease-out');

    this.renderer.appendChild(this.el.nativeElement, ripple);

    setTimeout(() => {
      this.renderer.setStyle(ripple, 'transform', 'scale(2)');
      this.renderer.setStyle(ripple, 'opacity', '0');
    }, 10);

    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, ripple);
    }, 600);
  }
}
