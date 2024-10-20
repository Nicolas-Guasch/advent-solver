import {
  OverlayModule,
  Overlay,
  OverlayRef,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import {
  Component,
  contentChildren,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomSelectService } from '../../services/custom-select.service';
import { CustomSelectOptionComponent } from './custom-select-option/custom-select-option.component';
import { noop } from 'rxjs';

export interface CustomSelectEvent {
  source: CustomSelectComponent;
  selected: any;
}

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [OverlayModule, PortalModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css',
  host: { '(window:resize)': 'onWinResize()' },
  providers: [CustomSelectService],
})
export class CustomSelectComponent {
  public inputId = input<string>('', { alias: 'id' });
  public label = input<string>('');
  public placeholder = input<string>('');

  public required = input(false);
  public disabled = input(false);
  public error = input(false);
  public multiple = input(false);
  public search = input(false);

  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledby = input<string>('', { alias: 'aria-labelledby' });

  change = output<CustomSelectEvent>();

  public contentTemplate = viewChild.required<CdkPortal>(CdkPortal);
  public select = viewChild.required<ElementRef>('select');

  public displayText!: SafeHtml;

  public options = contentChildren<CustomSelectOptionComponent>(
    CustomSelectOptionComponent,
  );

  private selectedOption!: CustomSelectOptionComponent;
  private showing: boolean = false;
  private showPlaceholder: boolean = true;
  private overlayRef!: OverlayRef;

  private selectService: CustomSelectService = inject(CustomSelectService);

  constructor(
    private domSanitizer: DomSanitizer,
    private overlay: Overlay,
  ) {
    this.selectService.register(this);
  }

  ngOnInit() {
    if (!this.displayText) {
      this.displayText = this.domSanitizer.bypassSecurityTrustHtml(
        this.placeholder(),
      );
    }
  }

  ngAfterContentInit() {
    for (let option of this.options()) {
      if (option.selected()) {
        this.selectOption(option);
        break;
      }
    }
  }

  public mainSelectClasses(): { [key: string]: any } {
    return {
      mainSelect: true,
      error: this.error(),
      disabled: this.disabled(),
      placeholder: this.showPlaceholder,
    };
  }

  public onChangeFn: any = (_: any) => noop();

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  private onChange(): void {
    this.onChangeFn(this.selectedOption.value);

    this.change.emit({
      source: this,
      selected: this.selectedOption,
    });
  }

  public onTouched(): void {}

  public onKeyDown(event: KeyboardEvent) {}

  public onDropMenuIconClick(event: UIEvent) {
    if (!this.disabled) {
      event.stopPropagation();
      this.select().nativeElement.focus();
      this.select().nativeElement.click();
    }
  }

  showDropdown() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate());
    //this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
  }

  private hide(): void {
    this.overlayRef.detach();
    this.showing = false;
  }

  private syncWidth(): void {
    if (this.overlayRef) {
      const refRectWidth =
        this.select().nativeElement.getBoundingClientRect().width;
      this.overlayRef.updateSize({ width: refRectWidth });
    }
  }

  public onWinResize(): void {
    this.syncWidth();
  }

  getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.select().nativeElement)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private updateDisplayText(): void {
    if (this.selectedOption !== undefined) {
      this.displayText = this.domSanitizer.bypassSecurityTrustHtml(
        this.selectedOption.getOptionElement().innerHTML,
      );
      this.showPlaceholder = false;
    } else {
      this.displayText = this.domSanitizer.bypassSecurityTrustHtml(
        this.placeholder(),
      );
      this.showPlaceholder = true;
    }
  }

  public selectOption(option: CustomSelectOptionComponent) {
    if (this.showing) this.hide();
    if (this.selectedOption !== option) {
      this.selectedOption = option;
      this.onChange();
      this.updateDisplayText();
    }
  }
}
