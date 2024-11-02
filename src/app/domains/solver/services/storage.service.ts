import { Injectable } from '@angular/core';
import { AOCYear } from '../models/aoc-year';
import { dayId } from '../../shared/models/dayId';
import { of } from 'rxjs';

interface storedDay {
  dayLabel: dayId;
  year: AOCYear;
}

const CURRENTLABEL = 'current';
const CUSTOMLABEL = 'custom';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  loadCurrent() {
    const DEFAULT: storedDay = { dayLabel: 'day1', year: '2023' };
    const storage = localStorage.getItem(CURRENTLABEL);
    return of(storage ? (JSON.parse(storage) as storedDay) : DEFAULT);
  }

  loadCustom() {
    const DEFAULT = '';
    const storage = localStorage.getItem(CUSTOMLABEL);
    return of(storage ? (JSON.parse(storage) as string) : DEFAULT);
  }

  saveCurrent(current: storedDay) {
    localStorage.setItem(CURRENTLABEL, JSON.stringify(current));
  }

  saveCustom(custom: string) {
    localStorage.setItem(CUSTOMLABEL, JSON.stringify(custom));
  }
}
