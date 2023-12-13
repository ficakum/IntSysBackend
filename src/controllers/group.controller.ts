import { NextFunction, Response } from 'express';

import Logger from '../utils/winston.logger';
import { ItemsPage } from '../utils/types';
import groupService from '../services/group.service';
import { Group } from '../models/group.model';
import GroupUpdateSchemaValidator from '../models/validators/updateValidators/group.update.validator';
import GroupCreateSchemaValidator from '../models/validators/createValidators/group.create.validator';
import ValidationException from '../exceptions/validation.exception';
import { User } from '../models/user.model';
import HttpException from '../exceptions/http.exception';

import {
  GetGroupRequestType,
  GetGroupsRequestType,
  UpdateGroupRequestType,
  DeleteGroupRequestType,
  CreateGroupRequestType,
  JoinGroupRequestType,
  LeaveGroupRequestType,
} from './requestTypes/group.request.types';

class GroupController {
  async getGroup(
    req: GetGroupRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      const group: Group = await groupService.getGroup(id);

      res.status(200).json(group);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getGroup method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async getGroups(
    req: GetGroupsRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { query } = req;

    try {
      const groups: ItemsPage<Group> = await groupService.getGroups(query);

      res.status(200).json(groups);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getGroups method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async createGroup(
    req: CreateGroupRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { body } = req;

    try {
      const group: Partial<Group> = {
        ...body,
        membersNum: 0,
      };
      const { value, error } = GroupCreateSchemaValidator.validate(group);

      if (error) {
        throw new ValidationException(error.message);
      }

      const createdGroup: Group = await groupService.createGroup(value);
      Logger.info(`group with id: ${createdGroup.id} created`);

      res.status(200).json(createdGroup);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - createGroup method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async updateGroup(
    req: UpdateGroupRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
      body,
    } = req;

    try {
      const { value, error } = GroupUpdateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException(error.message);
      }

      const updatedGroup: Group = await groupService.updateGroup(id, value);
      Logger.info(`group with id: ${id} updated`);

      res.status(200).json(updatedGroup);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - updateGroup method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async deleteGroup(
    req: DeleteGroupRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      await groupService.deleteGroup(id);
      Logger.info(`group with id: ${id} deleted`);

      res.status(200).json();
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - deleteGroup method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async joinGroup(
    req: JoinGroupRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
      user,
    } = req;

    try {
      await groupService.joinGroup(id, (user as User).id);
      Logger.info(
        `user with id: ${(user as User).id} joined group with id: ${id}`,
      );

      res.status(200).json();
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - joinGroup method: ${
          (error as HttpException).message
        }`,
      );

      next(error);
    }
  }

  async leaveGroup(
    req: LeaveGroupRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
      user,
    } = req;

    try {
      await groupService.leaveGroup(id, (user as User).id);
      Logger.info(
        `user with id: ${(user as User).id} left group with id: ${id}`,
      );

      res.status(200).json();
    } catch (error) {
      Logger.info(
        `Error in ${__filename} - leaveGroup method: ${
          (error as HttpException).message
        }`,
      );

      next(error);
    }
  }
}

const groupController: GroupController = new GroupController();

export default groupController;
