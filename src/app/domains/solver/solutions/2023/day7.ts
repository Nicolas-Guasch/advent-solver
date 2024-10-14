import { Solution } from '../solution';

type handType =
  | 'FiveOfAKind'
  | 'FourOfAKind'
  | 'FullHouse'
  | 'ThreeOfAKind'
  | 'TwoPair'
  | 'OnePair'
  | 'HighCard';

type hand = {
  value: string[];
  type: handType;
  bid: number;
};
export class Day7 extends Solution {
  private cardLabels: string[] = [
    'A',
    'K',
    'Q',
    'J',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
  ];

  private allHands: handType[] = [
    'FiveOfAKind',
    'FourOfAKind',
    'FullHouse',
    'ThreeOfAKind',
    'TwoPair',
    'OnePair',
    'HighCard',
  ];

  private cardStrength: Map<string, number> = new Map();

  private typeStrength: Map<handType, number> = new Map();

  private compareLabels = (cardA: string, cardB: string): number => {
    return this.cardStrength.get(cardA)! - this.cardStrength.get(cardB)!;
  };

  private compareSameType = (handA: string[], handB: string[]): number => {
    let index = 0;
    while (
      !this.compareLabels(handA[index], handB[index]) &&
      index < handA.length - 1
    )
      index++;
    return this.compareLabels(handA[index], handB[index]);
  };

  private compareHands = (handA: hand, handB: hand): number => {
    if (handA.type == handB.type)
      return this.compareSameType(handA.value, handB.value);
    return (
      this.typeStrength.get(handA.type)! - this.typeStrength.get(handB.type)!
    );
  };

  private determineHand = (hand: string[]): handType => {
    let handValues: { label: string; amount: number }[] = [];
    for (let card of hand) {
      if (!handValues.find((value) => value.label == card)) {
        handValues.push({
          label: card,
          amount: hand.filter((value) => value == card).length,
        });
      }
    }
    handValues.sort((a, b) => b.amount - a.amount);

    if (handValues.length == 1) return 'FiveOfAKind';
    if (handValues[0].amount == 4) return 'FourOfAKind';
    if (handValues.length == 2) return 'FullHouse';
    if (handValues[0].amount == 3) return 'ThreeOfAKind';
    if (handValues[1].amount == 2) return 'TwoPair';
    if (handValues[0].amount == 2) return 'OnePair';
    return 'HighCard';
  };

  private init() {
    this.cardStrength.clear();
    let strength = this.cardLabels.length;
    for (let label of this.cardLabels) this.cardStrength.set(label, strength--);
    this.typeStrength.clear();
    strength = this.allHands.length;
    for (let hand of this.allHands) this.typeStrength.set(hand, strength--);
  }

  override partOne(input: string): string {
    this.init();
    let handList: hand[] = [];
    for (let line of input.split('\n').filter((line) => line != '')) {
      const [hand, bid] = line.split(' ');
      handList.push({
        value: hand.split(''),
        type: this.determineHand(hand.split('')),
        bid: parseInt(bid),
      });
    }
    handList.sort(this.compareHands);
    console.log(handList);

    let totalWinnings = 0,
      rank = 1;
    for (let hand of handList) totalWinnings += hand.bid * rank++;

    return totalWinnings.toString();
  }

  private determineHandWithJokers = (hand: string[]): handType => {
    let handValues: { label: string; amount: number }[] = [];
    let jokers = 0;
    for (let card of hand) {
      if (card == 'J') {
        jokers++;
      } else if (!handValues.find((value) => value.label == card)) {
        handValues.push({
          label: card,
          amount: hand.filter((value) => value == card).length,
        });
      }
    }
    handValues.sort((a, b) => b.amount - a.amount);
    if (handValues.length == 0) return 'FiveOfAKind';

    handValues[0].amount += jokers;

    if (handValues.length == 1) return 'FiveOfAKind';
    if (handValues[0].amount == 4) return 'FourOfAKind';
    if (handValues.length == 2) return 'FullHouse';
    if (handValues[0].amount == 3) return 'ThreeOfAKind';
    if (handValues[1].amount == 2) return 'TwoPair';
    if (handValues[0].amount == 2) return 'OnePair';
    return 'HighCard';
  };

  override partTwo(input: string): string {
    this.init();
    this.cardStrength.set('J', 0);
    console.log(Array.from(this.cardStrength.entries()));
    let handList: hand[] = [];
    for (let line of input.split('\n').filter((line) => line != '')) {
      const [hand, bid] = line.split(' ');
      handList.push({
        value: hand.split(''),
        type: this.determineHandWithJokers(hand.split('')),
        bid: parseInt(bid),
      });
    }
    handList.sort(this.compareHands);
    console.log(handList);

    let totalWinnings = 0,
      rank = 1;
    for (let hand of handList) totalWinnings += hand.bid * rank++;

    return totalWinnings.toString();
  }
}
