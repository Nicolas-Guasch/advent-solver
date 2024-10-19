import {
  OverlayModule,
  Overlay,
  OverlayRef,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface CustomSelectEvent {
  source: CustomSelectComponent;
  selected: any;
}

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [OverlayModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css',
  host: { '(window:resize)': 'onWinResize()' },
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

  private showing: boolean = false;
  private showPlaceholder: boolean = true;
  private overlayRef!: OverlayRef;

  constructor(
    private domSanitizer: DomSanitizer,
    private overlay: Overlay,
  ) {}

  ngOnInit() {
    if (!this.displayText) {
      this.displayText = this.domSanitizer.bypassSecurityTrustHtml(
        this.placeholder(),
      );
    }
  }

  public mainSelectClasses(): { [key: string]: any } {
    return {
      mainSelect: true,
      error: this.error,
      disabled: this.disabled,
      placeholder: this.placeholder,
    };
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
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
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
}
