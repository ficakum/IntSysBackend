import cron, { ScheduledTask } from 'node-cron';

import { Group } from '../models/group.model';
import { Track } from '../models/track.model';
import config from '../configs/env.config';
import playlistEventEmitter from '../emitters/playlist.event.emitter';
import trackEventEmitter from '../emitters/track.event.emitter';
import { TrackState } from '../constants/constant';
import Logger from '../utils/winston.logger';

import groupService from './group.service';
import trackService from './track.service';
import { trackEventService } from './event.service';
import { TrackInformation } from '../models/trackInformation.model';
import trackInformationService from './trackInformation.service';

class CronService {
  startCronSchedules(): ScheduledTask {
    return cron.schedule(
      `${config.cron.CRON_TRACK}`,
      async (): Promise<void> => {
        await this.paralelizeTrackUpdate();
      },
    );
  }

  async paralelizeTrackUpdate(): Promise<void> {
    try {
      let groupCount: number = await groupService.getGroupCount({
        active: true,
        currentTrack: { $ne: null },
      });

      let page: number = 1;
      while (groupCount > 0) {
        this.updateTracksForEvents(page, 20);
        page++;
        groupCount -= 20;
      }
    } catch (err) {
      Logger.error((err as { message: string }).message);
    }
  }

  async updateTracksForEvents(page: number, limit: number): Promise<void> {
    const { items } = await groupService.getGroups(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new Map<string, any>([
        [
          'searchQuery',
          {
            currentTrack: { $ne: null },
          },
        ],
        ['$page', page],
        ['$limit', limit],
      ]),
    );

    await Promise.all(
      items.map(async (item: Group) => {
        trackEventService.addSubject(item.id);

        const currentTrack: Track = await trackService.getTrack(
          item.currentTrack,
        );
        const group: string = item.id;
        const timeOffset: number = Math.round(
          (Date.now() - Number(currentTrack.startTime)) / 1000,
        );
        const currentTrackInfo: TrackInformation =
          await trackInformationService.getTrackInformation(
            currentTrack.trackInformation,
          );

        if (timeOffset >= currentTrackInfo.duration) {
          await trackService.updateTrack(currentTrack.id, {
            state: TrackState.FINISHED,
          });

          await trackEventEmitter.emitNextTrack(group);

          await playlistEventEmitter.emitPlaylist(group);
        } else {
          trackEventService.emitEvent(
            {
              id: currentTrack.id,
              name: currentTrackInfo.name,
              timeOffset: timeOffset,
              audio_link: currentTrackInfo.audio_link,
              vocals_link: currentTrackInfo.vocals_link,
              instrumental_link: currentTrackInfo.instrumental_link,
              album_cover_link: currentTrackInfo.album_cover_link,
              externalId: currentTrackInfo.externalId,
            },
            group,
          );
        }
      }),
    );
  }
}

const cronService: CronService = new CronService();

export default cronService;
