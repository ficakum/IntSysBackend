import { NextFunction, Response } from 'express';

import Logger from '../utils/winston.logger';
import { ItemsPage } from '../utils/types';
import userService from '../services/user.service';
import { User } from '../models/user.model';
import UserUpdateSchemaValidator from '../models/validators/updateValidators/user.update.validator';
import ValidationException from '../exceptions/validation.exception';
import HttpException from '../exceptions/http.exception';

import {
  ChangePasswordRequestType,
  DeleteUserRequestType,
  GetUserRequestType,
  GetUsersRequestType,
  UpdateUserRequestType,
} from './requestTypes/user.request.types';

class UserController {
  async getUser(
    req: GetUserRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      const user: User = await userService.getUser(id);

      res.status(200).json(user);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getUser method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async getUsers(
    req: GetUsersRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { query } = req;

    try {
      const users: ItemsPage<User> = await userService.getUsers(query);

      res.status(200).json(users);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getUsers method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async updateUser(
    req: UpdateUserRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
      body,
    } = req;

    try {
      const { value, error } = UserUpdateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException(error.message);
      }

      const updatedUser: User = await userService.updateUser(id, value);
      Logger.info(`user with id: ${id} updated`);

      res.status(200).json(updatedUser);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - updateUser method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async deleteUser(
    req: DeleteUserRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      await userService.deleteUser(id);
      Logger.info(`user with id: ${id} deleted`);

      res.status(200).json();
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - deleteUser method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async changePassword(
    req: ChangePasswordRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
      body: { newPassword, oldPassword },
    } = req;

    try {
      const updatedUser: User = await userService.changePassword(
        id,
        newPassword,
        oldPassword,
      );
      Logger.info(`user with id: ${id} changed password`);

      res.status(200).json(updatedUser);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - changePassword method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }
}

const userController: UserController = new UserController();

export default userController;
