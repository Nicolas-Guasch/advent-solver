import { Component, inject, output, signal } from '@angular/core';
import { AOCYear } from '../../models/aoc-year';
import { StorageService } from '../../services/storage.service';
import { AOCSolutionsProviderService } from '../../services/aoc-solutions-provider.service';
import { CodeFetcherService } from '../../../shared/services/code-fetcher.service';
import { InputFetcherService } from '../../../shared/services/input-fetcher.service';

@Component({
  selector: 'app-year-nav',
  standalone: true,
  imports: [],
  templateUrl: './year-nav.component.html',
  styleUrl: './year-nav.component.css',
})
export class YearNavComponent {
  storageService = inject(StorageService);
  solutionsProvider = inject(AOCSolutionsProviderService);
  codeFetcher = inject(CodeFetcherService);
  inputFetcher = inject(InputFetcherService);
  contestYear = signal<AOCYear>(this.storageService.getYear());
  yearChange = output<AOCYear>();
  availableYears: AOCYear[] = ['2023', '2024'];
  changeYear(year: AOCYear) {
    this.contestYear.set(year);
    this.solutionsProvider.changeYear(year);
    this.inputFetcher.changeYear(year);
    this.codeFetcher.changeYear(year);
    this.storageService.storeYear(year);
    this.yearChange.emit(year);
  }
}
