import mongoose, { Model, Document } from 'mongoose';

import { ItemsPage } from '../utils/types';
import NotFoundException from '../exceptions/notFound.exception';

export default class Repository<E extends Document> {
  model: Model<E>;

  constructor(model: Model<E>) {
    this.model = model;
  }

  async getItemCount(searchQuery: Record<string, unknown>): Promise<number> {
    return this.model.countDocuments(searchQuery);
  }

  async getItem(id: string, properties: string = ''): Promise<E> {
    this.validateId(id);

    const item: E | null = await this.model.findById(id).select(properties);

    if (!item) {
      throw new NotFoundException(
        `Item not found. type: ${this.model.collection.collectionName}, id: ${id}`,
      );
    }

    return item;
  }

  async getItemByProperties(
    searchQuery: Record<string, unknown>,
  ): Promise<E | null> {
    return this.model.findOne(searchQuery);
  }

  async getItemBySpecificProperties(
    searchQuery: Record<string, unknown>,
    select: string = '',
  ): Promise<E> {
    const item: E | null = await this.model.findOne(searchQuery).select(select);

    if (!item) {
      throw new NotFoundException(
        `Item not found. type: ${
          this.model.collection.collectionName
        }, searchQuery: ${JSON.stringify(searchQuery)}`,
      );
    }

    return item;
  }

  async getItemWithMaxPropertyValue(
    property: string,
    searchQuery: Record<string, unknown>,
  ): Promise<E | null> {
    return this.model.findOne(searchQuery).sort(property);
  }

  async getItems(query: Map<string, unknown>): Promise<ItemsPage<E>> {
    const totalCount: number = await this.model.countDocuments(
      query.get('searchQuery') ?? '',
    );

    const items: E[] = await this.model
      .find(query.get('searchQuery') ?? '')
      .sort(query.get('$sort') as string)
      .skip(
        (query.get('$limit') as number) *
          (query.get('$page') === 0 ? 0 : (query.get('$page') as number) - 1),
      )
      .limit(query.get('$limit') as number);

    return {
      items,
      currentPage: query.get('$page') as number,
      totalPages:
        query.get('$limit') !== 0
          ? Math.ceil(totalCount / (query.get('$limit') as number))
          : totalCount !== 0
            ? 1
            : 0,
      totalCount,
    };
  }

  async createItem(item: Partial<E>): Promise<E> {
    return this.model.create(item);
  }

  async updateItem(id: string, item: Partial<E>): Promise<E> {
    this.validateId(id);

    const updatedItem: E | null = await this.model.findByIdAndUpdate(id, item, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      throw new NotFoundException(
        `Item not found. type: ${this.model.collection.collectionName}, id: ${id}`,
      );
    }

    return updatedItem;
  }

  async deleteItem(id: string): Promise<void> {
    this.validateId(id);

    await this.model.findByIdAndDelete(id);
  }

  private validateId(id: string): void {
    if (!mongoose.isValidObjectId(id)) {
      throw new NotFoundException(
        `Item not found. type: ${this.model.collection.collectionName}, id: ${id}`,
      );
    }
  }
}
