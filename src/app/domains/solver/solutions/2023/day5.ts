import { Solution } from '../solution';

type map = {
  destination: number;
  source: number;
  length: number;
};

export class Day5 extends Solution {
  private mapLabels = [
    'seed-to-soil map:',
    'soil-to-fertilizer map:',
    'fertilizer-to-water map:',
    'water-to-light map:',
    'light-to-temperature map:',
    'temperature-to-humidity map:',
    'humidity-to-location map:',
  ];

  INF = 10000000000;

  private getMaps(data: string[], label: string): string[] {
    let mapping: string[] = [];
    let pos = data.findIndex((line) => line === label) + 1;
    while (pos < data.length && data[pos] != '') {
      mapping.push(data[pos]);
      pos++;
    }
    return mapping;
  }
  private parseMap(description: string): map {
    const [dest, src, len] = description.split(' ').map((num) => parseInt(num));
    return { destination: dest, source: src, length: len };
  }

  private getLocation(seed: number, maps: map[][]): number {
    //let log = `Seed: ${seed}\n`;
    for (let mapCategory of maps) {
      const mapRange = mapCategory.find(
        (map) => map.source <= seed && seed < map.source + map.length,
      );
      if (mapRange) {
        seed = mapRange.destination + (seed - mapRange.source);
      }
      //log += `${seed}\n`;
    }
    //console.log(log);
    return seed;
  }
  override partOne(input: string): string {
    let [seedData, ...mapsData] = input.split('\n');
    seedData = seedData.slice('seeds: '.length);
    const seeds = seedData.split(' ').map((num) => parseInt(num));

    const mappings: map[][] = [];
    for (let label of this.mapLabels) {
      mappings.push(
        this.getMaps(mapsData, label).map((desc) => this.parseMap(desc)),
      );
    }

    let nearestLocation = this.INF;

    for (let seed of seeds) {
      nearestLocation = Math.min(
        nearestLocation,
        this.getLocation(seed, mappings),
      );
    }

    return nearestLocation.toString();
  }
  override partTwo(input: string): string {
    let [seedData, ...mapsData] = input.split('\n');
    seedData = seedData.slice('seeds: '.length);
    const seedSequence = seedData.split(' ').map((num) => parseInt(num));

    const mappings: map[][] = [];
    for (let label of this.mapLabels) {
      mappings.push(
        this.getMaps(mapsData, label).map((desc) => this.parseMap(desc)),
      );
    }

    let nearestLocation = this.INF;

    const zip = (a: any[], b: any[]) => a.map((e, i) => [e, b[i]]);
    const seedRanges = zip(
      seedSequence.filter((e, i) => !(i % 2)),
      seedSequence.filter((e, i) => i % 2),
    );

    console.log(seedRanges);
    for (let range of seedRanges) {
      console.log(range[0]);
      for (let seedNum = range[0]; seedNum < range[0] + range[1]; seedNum++) {
        nearestLocation = Math.min(
          nearestLocation,
          this.getLocation(seedNum, mappings),
        );
      }
    }

    return nearestLocation.toString();
  }
}
