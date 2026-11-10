export class SlotUnavailableException extends Error {
  constructor(date: string, time: string) {
    super(`El horario ${time} del día ${date} ya se encuentra reservado.`);
    this.name = 'SlotUnavailableException';
  }
}

