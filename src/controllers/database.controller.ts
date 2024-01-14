import { NextFunction, Response } from 'express';

import Logger from '../utils/winston.logger';
import { ItemsPage } from '../utils/types';
import groupService from '../services/group.service';
import GroupModel, { Group } from '../models/group.model';
import { User } from '../models/user.model';
import GroupUpdateSchemaValidator from '../models/validators/updateValidators/group.update.validator';
import GroupCreateSchemaValidator from '../models/validators/createValidators/group.create.validator';
import ValidationException from '../exceptions/validation.exception';
import HttpException from '../exceptions/http.exception';
import userService from 'services/user.service';
import { SeedRequestType } from './requestTypes/database.request.types';

class DatabaseController {

  async seedData(
    req: SeedRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
        this.seedUsers(req, res, next);
        this.seedGroups(req, res, next);


      res.status(200);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - seedData method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async seedUsers(
    req: SeedRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      for (let i=0; i<50; i++)
      {
        let user = {
            userName: "user" + Math.floor(Math.random()*100001),
            email: "email"+Math.floor(Math.random()*100001)+"@mail.com",
            password: "Pas$word" + Math.floor(Math.random()*1001).toString(),
            group: null
        };

        await userService.createUser(user as User);
      }

      res.status(200);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - seedUsers method: ${
          (error as HttpException).message
        }`,
      );

      next(error);
    }
  }

  async seedGroups(
    req: SeedRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
        for (let i=0; i<50; i++)
        {
          let maxMembers = Math.floor(Math.random()*20+1);
          let membersNum = Math.floor(Math.random()*maxMembers);

          let group = {
            groupName: "group" + Math.floor(Math.random()*100001),
            currentTrack: null,
            maxMembers: maxMembers,
            membersNum: membersNum
          };
  
          var response = await groupService.createGroup(group as Group);

          if (response.id != null)
          {
            let query = new Map<string, any>{['searchQuery', {}], ['$page', 1], ['$limit', 0]};
            var users = (await userService.getUsers(query));             //Hocu sve korisnike da mi vrati

            for(let j=0; j<membersNum;j++)
            {
              let user = users.items[Math.floor(Math.random()*users.totalCount)];
              await groupService.joinGroup(response.id, (user as User).id);
            }
          }
        }

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

  //Treba da se napravi metoda za dodavanje pesama u grupe. Dodati to kada se prepravi model za grupu sa tim podatkom.
}

const databaseController: DatabaseController = new DatabaseController();

export default databaseController;
