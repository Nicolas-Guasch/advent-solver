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
    fixedPages.sort((a, b) => (this.goesBefore[a].includes(b) ? -1 : +1));
    return fixedPages;
  }

  findMiddle(pages: number[]): number {
    return pages.filter(
      (page) =>
        this.goesBefore[page].filter((p) => pages.includes(p)).length ===
        Math.trunc(pages.length / 2),
    )[0];
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
      if (!this.rightOrder(pages)) middlesSum += this.findMiddle(pages);
    }
    return middlesSum.toString();
  }
}
