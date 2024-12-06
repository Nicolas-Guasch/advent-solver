import { Solution } from '../../app/domains/solver/models/solution';

export class Y2024Day5 extends Solution {
  goesBefore: number[][] = [];

  rightOrder(pages: number[]): boolean {
    const currentPages = new Set<number>();
    for (let page of pages) {
      for (let pageRule of this.goesBefore[page]) {
        if (currentPages.has(pageRule)) return false;
      }
      currentPages.add(page);
    }
    return true;
  }

  override partOne(input: string): string {
    let middlesSum = 0;
    const [ruleInput, updateInput] = input.split('\n\n');
    this.goesBefore = Array.from<number[], number[]>({ length: 100 }, () => []);
    for (let rule of ruleInput.split('\n')) {
      const [pageA, pageB] = rule.split('|').map(Number);
      this.goesBefore[pageA].push(pageB);
    }

    for (let update of updateInput.split('\n')) {
      const pages = update.split(',').map(Number);
      if (this.rightOrder(pages))
        middlesSum += pages[Math.trunc(pages.length / 2)];
    }
    return middlesSum.toString();
  }

  fixOrder(pages: number[]): number[] {
    const fixedPages = [...pages];
    for (let i = 0; i < fixedPages.length; i++) {
      for (let j = 0; j < fixedPages.length - 1 - i; j++) {
        if (!this.goesBefore[fixedPages[j]].includes(fixedPages[j + 1])) {
          const temp = fixedPages[j];
          fixedPages[j] = fixedPages[j + 1];
          fixedPages[j + 1] = temp;
        }
      }
    }
    return fixedPages;
  }

  override partTwo(input: string): string {
    let middlesSum = 0;
    const [ruleInput, updateInput] = input.split('\n\n');
    this.goesBefore = Array.from<number[], number[]>({ length: 100 }, () => []);
    for (let rule of ruleInput.split('\n')) {
      const [pageA, pageB] = rule.split('|').map(Number);
      this.goesBefore[pageA].push(pageB);
    }

    for (let update of updateInput.split('\n')) {
      const pages = update.split(',').map(Number);
      if (!this.rightOrder(pages))
        middlesSum += this.fixOrder(pages)[Math.trunc(pages.length / 2)];
    }
    return middlesSum.toString();
  }
}
