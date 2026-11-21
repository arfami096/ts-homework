import Buyable from './Buyable';

export default class Movie implements Buyable {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly originalName: string,
    readonly price: number,
    readonly year: number,
    readonly country: string,
    readonly slogan: string,
    readonly genres: string[],
    readonly durationMinutes: number,
    readonly isImax: boolean = false,
  ) {}

  get duration(): string {
    const hours = Math.floor(this.durationMinutes / 60);
    const minutes = this.durationMinutes % 60;
    const pad = (n: number): string => String(n).padStart(2, '0');
    return `${this.durationMinutes} мин. / ${pad(hours)}:${pad(minutes)}`;
  }
}
