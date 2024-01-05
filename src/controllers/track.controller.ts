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
  CreateTrackInfoRequestType,
  UpdateTrackInfoRequestType,
  DeleteTrackInfoRequestType,
} from './requestTypes/track.request.types';
import { TrackInformation } from '../models/trackInformation.model';
import trackInformationService from '../services/trackInformation.service';
import TrackInformationCreateSchemaValidator from '../models/validators/createValidators/trackInformation.create.validator';
import TrackInformationUpdateSchemaValidator from '../models/validators/updateValidators/trackInformation.update.validator';

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
      const track: Track = await TrackService.getTrack(id);
      const trackInfo: TrackInformation =
        await trackInformationService.getTrackInformation(
          track.trackInformation,
        );

      res.status(200).json({ ...trackInfo, ...track });
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
      const tracks: ItemsPage<Track> = await TrackService.getTracks(query);

      res.status(200).json({
        ...tracks,
        items: await Promise.all(
          tracks.items.map(async (track: Track) => {
            return {
              ...(await trackInformationService.getTrackInformation(
                track.trackInformation,
              )),
              ...track,
            };
          }),
        ),
      });
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

  async createTrackInfo(
    req: CreateTrackInfoRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { body } = req;

    try {
      const { value, error } =
        TrackInformationCreateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException(error.message);
      }

      const createdTrackInfo: TrackInformation =
        await trackInformationService.createTrackInformation(value);
      Logger.info(`track info with id: ${createdTrackInfo.id} created`);

      res.status(200).json(createdTrackInfo);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - createTrackInfo method: ${
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

  async updateTrackInfo(
    req: UpdateTrackInfoRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
      body,
    } = req;

    try {
      const { value, error } =
        TrackInformationUpdateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException(error.message);
      }

      const updatedTrackInfo: TrackInformation =
        await trackInformationService.updateTrackInformation(id, value);
      Logger.info(`track info with id: ${id} updated`);

      res.status(200).json(updatedTrackInfo);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - updateTrackInfo method: ${
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

  async deleteTrackInfo(
    req: DeleteTrackInfoRequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      await trackInformationService.deleteTrackInformation(id);
      Logger.info(`track info id: ${id} deleted`);

      res.status(200).json();
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - deleteTrackInfo method: ${
          (error as HttpException).message
        }`,
      );
      next(error);
    }
  }
}

const trackController: TrackController = new TrackController();

export default trackController;
