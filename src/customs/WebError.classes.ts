export default class WebError extends Error {
  status: number;

  constructor({ message, status }: WebErrorDTO) {
    super(message);

    this.status = status;
  }
}

interface WebErrorDTO {
  message: string;
  status: number;
}
