import { trackEventService } from '../services/event.service';
import trackService from '../services/track.service';
import groupService from '../services/group.service';
import { Track } from '../models/track.model';
import { Group } from '../models/group.model';
import { TrackState } from '../constants/constant';

class TrackEventEmitter {
  async emitFirstTrack(track: Track): Promise<void> {
    const group: Group = await groupService.getGroup(track.group);
    if (!group.currentTrack) {
      trackEventService.addSubject(track.group);
      await groupService.updateGroup(track.group, {
        currentTrack: track.id,
      });

      track = await trackService.updateTrack(track.id, {
        startTime: new Date(),
        state: TrackState.PLAYING,
      });

      trackEventService.emitEvent(
        {
          id: track.id,
          name: track.name,
          timeOffset: Math.round((Date.now() - Number(track.startTime)) / 1000),
          externalId: track.externalId,
        },
        group.id,
      );
    }
  }

  async emitNextTrack(group: string): Promise<void> {
    let nextTrack: Track = (await trackService.getPlaylist(group))[0];
    await groupService.updateGroup(group, {
      currentTrack: nextTrack ? nextTrack.id : null,
    });
    if (!nextTrack) {
      return;
    }

    nextTrack = await trackService.updateTrack(nextTrack.id, {
      startTime: new Date(),
      state: TrackState.PLAYING,
    });

    trackEventService.emitEvent(
      {
        id: nextTrack.id,
        name: nextTrack.name,
        timeOffset: Math.round(
          (Date.now() - Number(nextTrack.startTime)) / 1000,
        ),
        externalId: nextTrack.externalId,
      },
      group,
    );
  }
}

const trackEventEmitter: TrackEventEmitter = new TrackEventEmitter();

export default trackEventEmitter;
