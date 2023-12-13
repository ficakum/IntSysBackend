import { Types } from 'mongoose';

import GroupModel, { Group } from '../models/group.model';
import Repository from '../repositories/mongo.repository';
import ValidationException from '../exceptions/validation.exception';
import { ItemsPage } from '../utils/types';
import playlistEventEmitter from '../emitters/playlist.event.emitter';

import userService from './user.service';
import { trackEventService } from './event.service';
import { User } from '../models/user.model';

class GroupService {
  repository: Repository<Group>;

  constructor() {
    this.repository = new Repository<Group>(GroupModel);
  }

  async getGroup(id: string): Promise<Group> {
    return this.repository.getItem(id);
  }

  async getGroups(query: Map<string, unknown>): Promise<ItemsPage<Group>> {
    return this.repository.getItems(query);
  }

  async getGroupCount(searchQuery: Record<string, unknown>): Promise<number> {
    return this.repository.getItemCount(searchQuery);
  }

  async createGroup(group: Group): Promise<Group> {
    const createdGroup: Group = await this.repository.createItem(group);

    playlistEventEmitter.addObservable(createdGroup.id);
    trackEventService.addSubject(createdGroup.id);

    return createdGroup;
  }

  async updateGroup(id: string, group: Partial<Group>): Promise<Group> {
    return this.repository.updateItem(id, group);
  }

  async deleteGroup(id: string): Promise<void> {
    await this.removeUsersFromGroup(id);
    await this.repository.deleteItem(id);

    playlistEventEmitter.removeObservable(id);
    trackEventService.removeSubject(id);
  }

  async joinGroup(groupId: string, userId: string): Promise<void> {
    const group: Group = await this.getGroup(groupId);

    if (group.membersNum < group.maxMembers) {
      await this.updateGroup(groupId, {
        membersNum: group.membersNum + 1,
      });
      await userService.updateUser(userId, {
        group: new Types.ObjectId(groupId),
      });
    } else {
      throw new ValidationException('Group is full');
    }
  }

  async leaveGroup(groupId: string, userId: string): Promise<void> {
    const group: Group = await this.getGroup(groupId);

    const updateGroup: Partial<Group> = {
      membersNum: group.membersNum - 1,
    };

    group.membersNum !== 1
      ? this.updateGroup(groupId, updateGroup)
      : this.deleteGroup(groupId);
    userService.updateUser(userId, { group: null });
  }

  private async removeUsersFromGroup(groupId: string): Promise<void> {
    const users: User[] = (
      await userService.getUsers(
        new Map<string, unknown>([
          ['searchQuery', { group: groupId }],
          ['$page', 1],
          ['$limit', 0],
        ]),
      )
    ).items;

    await Promise.all(
      users.map((user) => {
        return userService.updateUser(user.id, { group: null });
      }),
    );
  }
}

const groupService: GroupService = new GroupService();

export default groupService;
