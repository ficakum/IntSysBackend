export default class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number = 500, message: string = 'Server failed') {
    super();
    this.status = status;
    this.message = message;
  }
}
