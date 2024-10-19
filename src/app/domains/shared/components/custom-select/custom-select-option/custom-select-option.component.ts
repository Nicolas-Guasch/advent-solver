import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { CustomSelectService } from '../../../services/custom-select.service';
import { CustomSelectComponent } from '../custom-select.component';

@Component({
  selector: 'app-custom-select-option',
  standalone: true,
  imports: [],
  template: `<span #option><ng-content></ng-content></span>`,
  styleUrl: './custom-select-option.component.css',
  host: {
    role: 'listbox',
    '[attr.aria-label]': 'value()',
    '[class.disabled]': 'disabled()',
    '(click)': 'onClick($event)',
  },
})
export class CustomSelectOptionComponent {
  public value = input.required<any>();
  public disabled = input(false);
  public selected = input(false);

  private option = viewChild<ElementRef>('option');
  private select: CustomSelectComponent;
  private dropdownService: CustomSelectService = inject(CustomSelectService);

  constructor() {
    this.select = this.dropdownService.getSelect();
  }

  onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled()) {
      this.select.selectOption(this);
    }
  }

  public getOptionElement() {
    return this.option()?.nativeElement;
  }
}
