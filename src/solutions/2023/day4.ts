import { Solution } from '../../app/domains/solver/models/solution';

export class Day4 extends Solution {
  private countWinners(winning: number[], cardNumbers: number[]): number {
    const winningNumbers = new Set(winning);
    let count = 0;
    for (let num of cardNumbers) {
      if (winningNumbers.has(num)) {
        count++;
      }
    }
    return count;
  }

  private getValues(card: string) {
    return card.split(' | ').map((list) =>
      list
        .split(' ')
        .filter((num) => num != '')
        .map((num) => parseInt(num)),
    );
  }

  override partOne(input: string): string {
    let totalPoints = 0;

    for (let line of input.split('\n').filter((line) => line != '')) {
      const [_label, scratchcard] = line.split(': ');
      const [winning, cardNumbers] = this.getValues(scratchcard);
      const cardWinners = this.countWinners(winning, cardNumbers);
      totalPoints += cardWinners ? 2 ** (cardWinners - 1) : 0;
    }

    return totalPoints.toString();
  }
  override partTwo(input: string): string {
    const cardDescriptions = input.split('\n').filter((line) => line != '');
    let totalCards = 0;
    let cards = Array(cardDescriptions.length).fill(1);
    for (let i = 0; i < cardDescriptions.length; i++) {
      const line = cardDescriptions[i];
      const [_label, scratchcard] = line.split(': ');
      const [winning, cardNumbers] = this.getValues(scratchcard);
      const cardWinners = this.countWinners(winning, cardNumbers);
      for (
        let j = i + 1;
        j < i + 1 + cardWinners && j < cardDescriptions.length;
        j++
      ) {
        cards[j] += cards[i];
      }
    }
    for (let cardAmount of cards) totalCards += cardAmount;

    return totalCards.toString();
  }
}
