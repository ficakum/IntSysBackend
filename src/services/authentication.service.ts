import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import config from '../configs/env.config';
import { User } from '../models/user.model';
import { Tokens } from '../utils/types';
import ValidationException from '../exceptions/validation.exception';
import UnauthorizedException from '../exceptions/unauthorized.exception';

import userService from './user.service';

class AuthenticationService {
  async signIn(userName: string, passwordToCheck: string): Promise<Tokens> {
    const user: User = await userService.getUserByPropertiesWithPassword({
      userName,
    });

    await this.comparePasswords(passwordToCheck, user.password);

    const jwtToken: string = this.getToken(user.id, config.JWT_EXPIRATION_TIME);
    const refresh_token: string = this.getToken(
      user.id,
      config.JWT_REFRESH_TOKEN_EXPIRATION,
    );

    return {
      access_token: jwtToken,
      token_type: 'Bearer',
      expires_in: config.JWT_EXPIRATION_TIME,
      refresh_token,
    };
  }

  async signUp(user: User): Promise<Tokens> {
    const createdUser: User = await userService.createUser(user);

    const jwtToken: string = this.getToken(
      createdUser._id,
      config.JWT_EXPIRATION_TIME,
    );
    const refresh_token: string = this.getToken(
      user.id,
      config.JWT_REFRESH_TOKEN_EXPIRATION,
    );

    return {
      access_token: jwtToken,
      token_type: 'Bearer',
      expires_in: config.JWT_EXPIRATION_TIME,
      refresh_token,
    };
  }

  async refreshToken(refresh_token: string): Promise<Tokens> {
    const payload: JwtPayload | string = jwt.verify(
      refresh_token,
      config.JWT_SECRET,
    );

    if (typeof payload === 'string') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { id } = payload;

    const jwtToken: string = this.getToken(id, config.JWT_EXPIRATION_TIME);

    return {
      access_token: jwtToken,
      token_type: 'Bearer',
      expires_in: config.JWT_EXPIRATION_TIME,
      refresh_token,
    };
  }

  async resetPassword(userName: string, newPassword: string): Promise<void> {
    const user: User = await userService.getUserByProperties({
      userName,
    });

    await userService.updateUser(user.id, { password: newPassword });
  }

  private getToken(id: string, expirationTime: number): string {
    const jwtToken: string = jwt.sign({ id }, config.JWT_SECRET, {
      expiresIn: expirationTime,
    });
    return jwtToken;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      hashedPassword,
    );

    if (!isPasswordCorrect) {
      throw new ValidationException('Incorrect password');
    }
  }
}

const authenticationService: AuthenticationService =
  new AuthenticationService();

export default authenticationService;
