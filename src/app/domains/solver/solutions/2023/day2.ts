import { Solution } from '../solution';

type rgb = {
  red: number;
  green: number;
  blue: number;
};

type game = {
  id: number;
  samples: rgb[];
};

export class Day2 extends Solution {
  private analyzeSample(sample: string): rgb {
    let cubes: rgb = { red: 0, green: 0, blue: 0 };
    for (let colorCube of sample.split(', ')) {
      let [amount, color] = colorCube.split(' ');
      switch (color) {
        case 'red':
          cubes.red = parseInt(amount);
          break;
        case 'green':
          cubes.green = parseInt(amount);
          break;
        case 'blue':
          cubes.blue = parseInt(amount);
          break;
      }
    }
    return cubes;
  }

  private checkPossible(game: game, constraint: rgb): boolean {
    for (let sample of game.samples) {
      if (
        sample.red > constraint.red ||
        sample.green > constraint.green ||
        sample.blue > constraint.blue
      )
        return false;
    }
    return true;
  }

  private parse(line: string): game {
    let [gameLabel, sampleList] = line.split(': ');
    let [, idNumber] = gameLabel.split(' ');
    let sampleDesc: string[] = sampleList.split('; ');
    return {
      id: parseInt(idNumber),
      samples: sampleDesc.map((sample) => this.analyzeSample(sample)),
    };
  }

  override partOne(input: string): string {
    let idSum = 0;
    const constraint: rgb = { red: 12, green: 13, blue: 14 };
    for (let line of input.split('\n').filter((line) => line != '')) {
      const currentGame = this.parse(line);
      if (this.checkPossible(currentGame, constraint)) {
        idSum += currentGame.id;
      } else console.log(currentGame);
    }
    return idSum.toString();
  }

  private power(bag: rgb): number {
    return bag.red * bag.blue * bag.green;
  }

  private minimalBag(game: game): rgb {
    let bag: rgb = { red: 0, green: 0, blue: 0 };
    for (let sample of game.samples) {
      bag.red = Math.max(bag.red, sample.red);
      bag.blue = Math.max(bag.blue, sample.blue);
      bag.green = Math.max(bag.green, sample.green);
    }
    return bag;
  }

  override partTwo(input: string): string {
    let powerSum = 0;
    for (let line of input.split('\n').filter((line) => line != '')) {
      const currentGame = this.parse(line);
      powerSum += this.power(this.minimalBag(currentGame));
    }
    return powerSum.toString();
  }
}
