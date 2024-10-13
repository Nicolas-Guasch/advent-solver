import { Solution } from '../solution';

type map = {
  destination: number;
  source: number;
  length: number;
};

type interval = {
  start: number;
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
    for (let mapCategory of maps) {
      const mapRange = mapCategory.find(
        (map) => map.source <= seed && seed < map.source + map.length,
      );
      if (mapRange) {
        seed = mapRange.destination + (seed - mapRange.source);
      }
    }
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

  private split(seeds: interval, map: map): (interval | null)[] {
    let before: interval | null = null,
      inside: interval | null = null,
      after: interval | null = null;
    if (seeds.start + seeds.length <= map.source) before = seeds;
    else {
      if (seeds.start < map.source) {
        before = { start: seeds.start, length: map.source - seeds.length };
        inside = {
          start: map.source,
          length: seeds.length + seeds.start - map.source,
        };
      } else inside = seeds;
      const outside = map.source + map.length;
      if (inside.start >= outside) {
        after = inside;
        inside = null;
      } else if (inside.start + inside.length > outside) {
        after = {
          start: outside,
          length: inside.start + inside.length - outside,
        };
        inside = { start: inside.start, length: outside - inside.start };
      }
    }
    return [before, inside, after];
  }

  private getLocationRanges(seeds: interval, mapCategory: map[]): interval[] {
    let seedRanges: interval[] = [];
    let rangePos = 0;
    let unmapped: interval | null = seeds;
    while (unmapped && rangePos < mapCategory.length) {
      const currentMap = mapCategory[rangePos++];
      let [before, inside, after] = this.split(unmapped, currentMap);
      if (before) seedRanges.push(before);
      if (inside) {
        inside.start =
          currentMap.destination + inside.start - currentMap.source;
        seedRanges.push(inside);
      }
      unmapped = after;
    }
    if (unmapped) seedRanges.push(unmapped);

    return seedRanges;
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

    const zip = (a: number[], b: number[]) =>
      a.map((e, i) => {
        return { start: e, length: b[i] } as interval;
      });
    let seedRanges = zip(
      seedSequence.filter((e, i) => !(i % 2)),
      seedSequence.filter((e, i) => i % 2),
    );

    let mappedRanges: interval[] = [];
    for (let map of mappings) {
      map.sort((a, b) => a.source - b.source);
      for (let range of seedRanges) {
        mappedRanges = mappedRanges.concat(this.getLocationRanges(range, map));
      }
      seedRanges = mappedRanges;
      mappedRanges = [];
    }

    nearestLocation = Math.min.apply(
      Math,
      seedRanges.map((i) => i.start),
    );

    return nearestLocation.toString();
  }
}
