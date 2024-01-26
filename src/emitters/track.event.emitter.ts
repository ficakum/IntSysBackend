import { trackEventService } from '../services/event.service';
import trackService from '../services/track.service';
import groupService from '../services/group.service';
import { Track } from '../models/track.model';
import { Group } from '../models/group.model';
import { TrackEventState, TrackState } from '../constants/constant';
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
        startTime: Date.now(),
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
          state: TrackEventState.CONTINUE,
        },
        group.id,
      );
    }
  }

  async emitNextTrack(group: string): Promise<void> {
    const trackUnit = (await trackService.getPlaylist(group)).playlist[0];
    if (!trackUnit) {
      trackEventService.emitEvent(
        {
          id: '',
          infoId: '',
          name: '',
          timeOffset: 0,
          audio_link: '',
          vocals_link: '',
          instrumental_link: '',
          album_cover_link: '',
          externalId: '',
          state: TrackEventState.FINISHED,
        },
        group,
      );
      return;
    }
    const id: string = trackUnit.id;
    let nextTrack: Track = await trackService.getTrack(id);
    await groupService.updateGroup(group, {
      currentTrack: nextTrack ? nextTrack.id : null,
    });
    if (!nextTrack) {
      return;
    }

    nextTrack = await trackService.updateTrack(nextTrack.id, {
      startTime: Date.now(),
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
        timeOffset: Math.round(Date.now() - nextTrack.startTime),
        audio_link: nextTrackInfo.audio_link,
        vocals_link: nextTrackInfo.vocals_link,
        instrumental_link: nextTrackInfo.instrumental_link,
        album_cover_link: nextTrackInfo.album_cover_link,
        externalId: nextTrackInfo.externalId,
        state: TrackEventState.CONTINUE,
      },
      group,
    );
  }
}

const trackEventEmitter: TrackEventEmitter = new TrackEventEmitter();

export default trackEventEmitter;
