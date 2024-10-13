import { map, range } from 'rxjs';
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

  private split(seeds: number[], map: map): number[][] {
    let before: number[] = [],
      inside: number[] = [],
      after: number[] = [];
    if (seeds[0] + seeds[1] <= map.source) before = seeds;
    else {
      if (seeds[0] < map.source) {
        before = [seeds[0], map.source - seeds[0]];
        inside = [map.source, seeds[1] + seeds[0] - map.source];
      } else inside = seeds;
      const outside = map.source + map.length;
      if (inside[0] >= outside) {
        after = inside;
        inside = [];
      } else if (inside[0] + inside[1] > outside) {
        after = [outside, inside[0] + inside[1] - outside];
        inside = [inside[0], outside - inside[0]];
      }
    }
    return [before, inside, after];
  }

  private getLocationRanges(seeds: number[], mapCategory: map[]): number[][] {
    let seedRanges: number[][] = [];
    let rangePos = 0;
    let unmapped = seeds;
    while (unmapped.length && rangePos < mapCategory.length) {
      const currentMap = mapCategory[rangePos++];
      let [before, inside, after] = this.split(unmapped, currentMap);
      if (before.length) seedRanges.push(before);
      if (inside.length) {
        inside[0] = currentMap.destination + inside[0] - currentMap.source;
        seedRanges.push(inside);
      }
      unmapped = after;
    }
    if (unmapped.length) seedRanges.push(unmapped);

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

    const zip = (a: number[], b: number[]) => a.map((e, i) => [e, b[i]]);
    let seedRanges = zip(
      seedSequence.filter((e, i) => !(i % 2)),
      seedSequence.filter((e, i) => i % 2),
    );

    let mappedRanges: number[][] = [];
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
      seedRanges.map(([a, _b]) => a),
    );

    return nearestLocation.toString();
  }
}
