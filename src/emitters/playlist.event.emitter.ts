import { Observable, Subject, Subscription, interval, sampleTime } from 'rxjs';

import { PlaylistEvent } from '../utils/types';
import { playlistEventService } from '../services/event.service';
import trackService from '../services/track.service';
import config from '../configs/env.config';
import NotFoundException from '../exceptions/notFound.exception';

class PlaylistEventEmitter {
  private playlistWithRateLimit: Map<string, Observable<PlaylistEvent>>;

  constructor() {
    this.playlistWithRateLimit = new Map<string, Observable<PlaylistEvent>>();
  }

  subscribeToPlaylist(
    key: string,
    sbscrFn: (value: PlaylistEvent) => void,
  ): Subscription {
    const eventObservable: Observable<PlaylistEvent> | undefined =
      this.playlistWithRateLimit.get(key);

    if (!eventObservable) {
      throw new NotFoundException("Event emitter doesn't exist");
    }

    return eventObservable.subscribe(sbscrFn);
  }

  addObservable(key: string): void {
    if (!this.playlistWithRateLimit.has(key)) {
      playlistEventService.addSubject(key);
      playlistEventService.subscribeToObservable(key);
      const subject: Subject<PlaylistEvent> =
        playlistEventService.getSubject(key);
      this.playlistWithRateLimit.set(
        key,
        subject.pipe(sampleTime(config.PLAYLIST_RATE_LIMIT)),
      );
      interval(config.PLAYLIST_RATE_LIMIT).subscribe(() =>
        this.emitPlaylist(key),
      );
    }
  }

  async emitPlaylist(room: string): Promise<void> {
    playlistEventService.addSubject(room);
    const playlist: PlaylistEvent = await trackService.getPlaylist(room);
    playlistEventService.emitEvent(playlist, room);
  }

  removeObservable(key: string): void {
    playlistEventService.removeSubject(key);

    const eventObservable: Observable<PlaylistEvent> | undefined =
      this.playlistWithRateLimit.get(key);

    if (!eventObservable) {
      throw new NotFoundException("Event emitter doesn't exist");
    }

    this.playlistWithRateLimit.delete(key);
  }
}

const playlistEventEmitter: PlaylistEventEmitter = new PlaylistEventEmitter();

export default playlistEventEmitter;
