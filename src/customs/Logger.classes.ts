interface LoggerInterface {
  logger: Console;
  logMessage: string;
  start(method: string, urn: string): void;
  end(status: number): void;
}

export default class Logger implements LoggerInterface {
  logger: Console;

  logMessage: string;

  constructor() {
    this.logger = console;
    this.logMessage = '';
  }

  start(method: string, urn: string): void {
    this.logMessage = `[${method}] - ${urn}`;
    this.logger.time(this.logMessage);
  }

  end(status?: number): void {
    this.logger.timeEnd(this.logMessage);

    if (status) {
      this.logger.log(`HTTP status code -> ${status}\n`);
    }
  }
}
