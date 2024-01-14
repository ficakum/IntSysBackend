import { Subject, Subscription } from 'rxjs';

import NotFoundException from '../exceptions/notFound.exception';
import { PlaylistEvent, TrackEvent } from '../utils/types';

export default class EventService<T> {
  private eventObservables: Map<string, Subject<T>>;

  constructor() {
    this.eventObservables = new Map<string, Subject<T>>();
  }

  getSubject(key: string): Subject<T> {
    const eventObservable: Subject<T> | undefined =
      this.eventObservables.get(key);

    if (!eventObservable) {
      throw new NotFoundException("Event emitter doesn't exist");
    }

    return eventObservable;
  }

  subscribeToObservable(
    key: string,
    sbscrFn?: (value: T) => void,
  ): Subscription {
    const eventObservable: Subject<T> | undefined =
      this.eventObservables.get(key);

    if (!eventObservable) {
      throw new NotFoundException("Event emitter doesn't exist");
    }

    return eventObservable.subscribe(sbscrFn);
  }

  serializeEvent(event: string, data: T): string {
    const jsonString: string = JSON.stringify(data);
    return `event: ${event}\ndata: ${jsonString}\n\n`;
  }

  emitEvent(event: T, key: string): void {
    const eventObservable: Subject<T> | undefined =
      this.eventObservables.get(key);

    if (!eventObservable) {
      throw new NotFoundException("Event emitter doesn't exist");
    }

    eventObservable.next(event);
  }

  addSubject(key: string): void {
    if (!this.eventObservables.has(key)) {
      this.eventObservables.set(key, new Subject<T>());
    }
  }

  removeSubject(key: string): void {
    const eventObservable: Subject<T> | undefined =
      this.eventObservables.get(key);

    if (!eventObservable) {
      throw new NotFoundException("Event emitter doesn't exist");
    }

    eventObservable.unsubscribe();
    this.eventObservables.delete(key);
  }
}

const playlistEventService: EventService<PlaylistEvent> =
  new EventService<PlaylistEvent>();

const trackEventService: EventService<TrackEvent> =
  new EventService<TrackEvent>();

export { playlistEventService, trackEventService };
