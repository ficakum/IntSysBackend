import { trackEventService } from '../services/event.service';
import trackService from '../services/track.service';
import groupService from '../services/group.service';
import { Track } from '../models/track.model';
import { Group } from '../models/group.model';
import { TrackState } from '../constants/constant';
import { TrackInformation } from '../models/trackInformation.model';
import trackInformationService from '../services/trackInformation.service';

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
      const trackInfo: TrackInformation =
        await trackInformationService.getTrackInformation(
          track.trackInformation,
        );

      trackEventService.emitEvent(
        {
          id: track.id,
          infoId: trackInfo.id,
          name: trackInfo.name,
          timeOffset: Math.round((Date.now() - Number(track.startTime)) / 1000),
          audio_link: trackInfo.audio_link,
          vocals_link: trackInfo.vocals_link,
          instrumental_link: trackInfo.instrumental_link,
          album_cover_link: trackInfo.album_cover_link,
          externalId: trackInfo.externalId,
        },
        group.id,
      );
    }
  }

  async emitNextTrack(group: string): Promise<void> {
    const id: string = (await trackService.getPlaylist(group)).playlist[0].id;
    let nextTrack: Track = await trackService.getTrack(id);
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
    const nextTrackInfo = await trackInformationService.getTrackInformation(
      nextTrack.trackInformation,
    );

    trackEventService.emitEvent(
      {
        id: nextTrack.id,
        infoId: nextTrackInfo.id,
        name: nextTrackInfo.name,
        timeOffset: Math.round(
          (Date.now() - Number(nextTrack.startTime)) / 1000,
        ),
        audio_link: nextTrackInfo.audio_link,
        vocals_link: nextTrackInfo.vocals_link,
        instrumental_link: nextTrackInfo.instrumental_link,
        album_cover_link: nextTrackInfo.album_cover_link,
        externalId: nextTrackInfo.externalId,
      },
      group,
    );
  }
}

const trackEventEmitter: TrackEventEmitter = new TrackEventEmitter();

export default trackEventEmitter;
