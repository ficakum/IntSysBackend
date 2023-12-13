import { NextFunction, Response } from 'express';

import Logger from '../utils/winston.logger';
import { ItemsPage } from '../utils/types';
import TrackService from '../services/track.service';
import { Track } from '../models/track.model';
import TrackUpdateSchemaValidator from '../models/validators/updateValidators/track.update.validator';
import TrackCreateSchemaValidator from '../models/validators/createValidators/track.create.validator';
import ValidationException from '../exceptions/validation.exception';
import HttpException from '../exceptions/http.exception';

import {
  GetTrackRequestType,
  GetTracksRequestType,
  UpdateTrackRequestType,
  DeleteTrackRequestType,
  CreateTrackRequestType,
} from './requestTypes/track.request.types';

class TrackController {
  async getTrack(
    req: GetTrackRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      const Track: Track = await TrackService.getTrack(id);
      res.status(200).json(Track);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getTrack method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async getTracks(
    req: GetTracksRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { query } = req;

    try {
      const Tracks: ItemsPage<Track> = await TrackService.getTracks(query);

      res.status(200).json(Tracks);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getTracks method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async createTrack(
    req: CreateTrackRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { body } = req;

    try {
      const { value, error } = TrackCreateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException(error.message);
      }

      const createdTrack: Track = await TrackService.createTrack(value);
      Logger.info(`track with id: ${createdTrack.id} created`);

      res.status(200).json(createdTrack);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - createTrack method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async updateTrack(
    req: UpdateTrackRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
      body,
    } = req;

    try {
      const { value, error } = TrackUpdateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException(error.message);
      }

      const updatedTrack: Track = await TrackService.updateTrack(id, value);
      Logger.info(`track with id: ${id} updated`);

      res.status(200).json(updatedTrack);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - updateTrack method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }

  async deleteTrack(
    req: DeleteTrackRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      await TrackService.deleteTrack(id);
      Logger.info(`track  id: ${id} deleted`);

      res.status(200).json();
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - deleteTrack method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }
}

const trackController: TrackController = new TrackController();

export default trackController;
