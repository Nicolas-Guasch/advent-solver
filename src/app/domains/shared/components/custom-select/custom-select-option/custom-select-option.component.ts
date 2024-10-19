import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-select-option',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './custom-select-option.component.css',
  host: {
    role: 'listbox',
    '[attr.aria-label]': 'value()',
    '[class.disabled]': 'disabled()',
  },
})
export class CustomSelectOptionComponent {
  public value = input.required<any>();
  public disabled = input(false);
}
