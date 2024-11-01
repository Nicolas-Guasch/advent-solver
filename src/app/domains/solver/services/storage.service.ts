import { Injectable } from '@angular/core';
import { AOCYear } from '../models/aoc-year';

interface selectStore {
  dayLabel: string;
  customInput: string;
}

const YEARLABEL = 'contestYear';
const SELECTLABEL = 'select';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storedData: selectStore;
  private storedYear: AOCYear;

  constructor() {
    this.storedYear = this.retrieveYear();
    this.storedData = this.retrieveSelectData();
  }

  private retrieveYear(): AOCYear {
    const DEFAULTYEAR = '2023';
    const storage = localStorage.getItem(YEARLABEL);
    if (storage) {
      return JSON.parse(storage);
    } else {
      return DEFAULTYEAR;
    }
  }

  private retrieveSelectData(): selectStore {
    const storage = localStorage.getItem(SELECTLABEL);
    if (storage) {
      return JSON.parse(storage);
    } else
      return {
        dayLabel: 'day1',
        customInput: '',
      };
  }

  public getYear(): AOCYear {
    return this.storedYear;
  }

  public getSelectedDay(): string {
    return this.storedData.dayLabel;
  }

  public isCustomActive(): boolean {
    return this.storedData.customInput != '';
  }

  public getCustomInput(): string {
    return this.storedData.customInput;
  }

  public storeSelectedDay(day: string) {
    this.storedData.dayLabel = day;
    localStorage.setItem(SELECTLABEL, JSON.stringify(this.storedData));
  }

  public storeCustomInput(input: string) {
    this.storedData.customInput = input;
    localStorage.setItem(SELECTLABEL, JSON.stringify(this.storedData));
  }

  public storeYear(year: AOCYear) {
    this.storedYear = year;
    localStorage.setItem(YEARLABEL, JSON.stringify(this.storedYear));
  }
}
