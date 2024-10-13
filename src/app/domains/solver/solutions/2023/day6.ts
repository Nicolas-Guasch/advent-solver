import { Solution } from '../solution';

type race = {
  time: number;
  distance: number;
};

export class Day6 extends Solution {
  private retrieve(list: string): string[] {
    let values: string[] = [];
    while (list) {
      list = list.trim();
      const valueLength = list.indexOf(' ');
      if (valueLength != -1) {
        values.push(list.slice(0, valueLength));
        list = list.slice(valueLength).trim();
      } else {
        values.push(list);
        list = '';
      }
    }
    return values;
  }
  override partOne(input: string): string {
    let possibleWins = 1;
    let [timeList, distanceList] = input.split('\n');
    timeList = timeList.slice('Time:'.length);
    distanceList = distanceList.slice('Distance:'.length);

    let races: race[];
    const zip = (a: string[], b: string[]) =>
      a.map((e, i) => {
        return { time: parseInt(e), distance: parseInt(b[i]) };
      });
    races = zip(this.retrieve(timeList), this.retrieve(distanceList));

    for (let race of races) {
      let t = race.time,
        x = race.distance;
      const winningMoves =
        Math.ceil((t + Math.sqrt(t * t - 4 * x)) / 2) -
        1 -
        (Math.floor((t - Math.sqrt(t * t - 4 * x)) / 2) + 1) +
        1;
      console.log(winningMoves);
      possibleWins *= winningMoves;
    }

    return possibleWins.toString();
  }

  private removeKerning(list: string): string {
    let fixed: string = '';
    for (let c of list) {
      if (c != ' ') fixed += c;
    }
    return fixed;
  }

  override partTwo(input: string): string {
    let possibleWins = 1;
    let [timeList, distanceList] = input.split('\n');
    timeList = timeList.slice('Time:'.length);
    distanceList = distanceList.slice('Distance:'.length);

    const t = parseInt(this.removeKerning(timeList)),
      x = parseInt(this.removeKerning(distanceList));
    console.log(`${t}, ${x}`);
    possibleWins =
      Math.ceil((t + Math.sqrt(t * t - 4 * x)) / 2) -
      1 -
      (Math.floor((t - Math.sqrt(t * t - 4 * x)) / 2) + 1) +
      1;

    return possibleWins.toString();
  }
}
