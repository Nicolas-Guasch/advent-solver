import { Solution } from '../../app/domains/solver/models/solution';

interface SpringRow {
  records: string;
  clues: number[];
}

export class Day12 extends Solution {
  memo: number[][] = [];
  calculateArrangements(row: SpringRow): number {
    this.memo = Array.from({ length: row.records.length }, (_, _i) =>
      Array.from({ length: row.clues.length }, (_, _i) => -1),
    );
    return this.arrangementsDP(row, 0, 0);
  }

  arrangementsDP(
    row: SpringRow,
    recordIndex: number,
    cluesIndex: number,
  ): number {
    if (cluesIndex == row.clues.length)
      return row.records.includes('#', recordIndex) ? 0 : 1;
    if (recordIndex >= row.records.length) return 0;
    if (this.memo[recordIndex][cluesIndex] != -1)
      return this.memo[recordIndex][cluesIndex];
    let res = 0;
    if (row.records[recordIndex] != '#')
      res = this.arrangementsDP(row, recordIndex + 1, cluesIndex);
    const groupLength = row.clues[cluesIndex];
    if (recordIndex + groupLength <= row.records.length) {
      const group =
        !row.records
          .slice(recordIndex, recordIndex + groupLength)
          .includes('.') &&
        (recordIndex + groupLength == row.records.length ||
          row.records[recordIndex + groupLength] != '#');
      res = group
        ? res +
          this.arrangementsDP(
            row,
            recordIndex + groupLength + 1,
            cluesIndex + 1,
          )
        : res;
    }

    this.memo[recordIndex][cluesIndex] = res;
    return res;
  }

  override partOne(input: string): string {
    let arrangementsSum = 0;
    for (let line of input.split('\n').filter((line) => line != '')) {
      const [records, clues] = line.split(' ');
      const row: SpringRow = {
        records: records,
        clues: clues.split(',').map((value) => parseInt(value)),
      };
      arrangementsSum += this.calculateArrangements(row);
    }
    return arrangementsSum.toString();
  }
  override partTwo(input: string): string {
    let unfolded: string = '';
    for (let line of input.split('\n').filter((line) => line != '')) {
      console.log(line);
      let [records, clues] = line.split(' ');
      records = Array(5).fill(records).join('?');
      clues = Array(5).fill(clues).join(',');
      line = [records, clues].join(' ');
      unfolded += line + '\n';
      console.log(line);
    }

    return this.partOne(unfolded);
  }
}
