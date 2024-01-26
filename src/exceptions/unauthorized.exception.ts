import HttpException from './http.exception';

export default class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}
