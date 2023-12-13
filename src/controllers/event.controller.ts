import { NextFunction, Response } from 'express';
import { Subscription } from 'rxjs';

import Logger from '../utils/winston.logger';
import { PlaylistEvent, TrackEvent } from '../utils/types';
import { EventType } from '../constants/constant';
import playlistEventEmitter from '../emitters/playlist.event.emitter';
import { Track } from '../models/track.model';
import trackService from '../services/track.service';
import groupService from '../services/group.service';
import {
  playlistEventService,
  trackEventService,
} from '../services/event.service';
import HttpException from '../exceptions/http.exception';

import { EventRequest } from './requestTypes/event.request.types';

class EventController {
  async subscribeToPlaylist(
    req: EventRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { groupId },
    } = req;

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    try {
      playlistEventEmitter.addObservable(groupId);
      const playlist: PlaylistEvent = {
        playlist: (await trackService.getPlaylist(groupId)).map(
          (track: Track) => ({
            name: track.name,
          }),
        ),
      };
      res.write(
        playlistEventService.serializeEvent(EventType.PLAYLIST, playlist),
      );

      const playlistSubscription: Subscription =
        playlistEventEmitter.subscribeToPlaylist(
          groupId,
          (playlist: PlaylistEvent) => {
            res.write(
              playlistEventService.serializeEvent(EventType.PLAYLIST, playlist),
            );
          },
        );

      req.on('close', () => {
        playlistSubscription.unsubscribe();
      });
    } catch (err) {
      Logger.error(
        `Error in ${__filename} - subscribeToPlaylist method: ${
          (err as HttpException).message
        }`,
      );
      next(err);
    }
  }

  async subscribeToCurrentTrackUnit(
    req: EventRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { groupId },
    } = req;

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    try {
      trackEventService.addSubject(groupId);
      const { currentTrack } = await groupService.getGroup(groupId);
      if (currentTrack) {
        const currentUnit: Track = await trackService.getTrack(currentTrack);

        res.write(
          trackEventService.serializeEvent(EventType.CURRENT_TRACK, {
            id: currentUnit.id,
            name: currentUnit.name,
            timeOffset: Math.round(
              (Date.now() - Number(currentUnit.startTime)) / 1000,
            ),
            externalId: currentUnit.externalId,
          }),
        );
      }

      const currentTrackUnitSubscription: Subscription =
        trackEventService.subscribeToObservable(
          groupId,
          (value: TrackEvent) => {
            res.write(
              trackEventService.serializeEvent(EventType.CURRENT_TRACK, value),
            );
          },
        );

      req.on('close', () => {
        currentTrackUnitSubscription.unsubscribe();
      });
    } catch (err) {
      Logger.error(
        `Error in ${__filename} - subscribeToCurrentTrackUnit method: ${
          (err as HttpException).message
        }`,
      );
      next(err);
    }
  }
}

const eventController: EventController = new EventController();

export default eventController;
