import TrackModel, { Track } from '../models/track.model';
import Repository from '../repositories/mongo.repository';
import { ItemsPage, PlaylistEvent } from '../utils/types';
import playlistEventEmitter from '../emitters/playlist.event.emitter';
import trackUnitEventEmitter from '../emitters/track.event.emitter';
import { TrackState } from '../constants/constant';
import trackInformationService from './trackInformation.service';
import { TrackInformation } from '../models/trackInformation.model';
import { User } from '../models/user.model';
import userService from './user.service';

class TrackService {
  repository: Repository<Track>;

  constructor() {
    this.repository = new Repository<Track>(TrackModel);
  }

  async getTrack(id: string): Promise<Track> {
    return this.repository.getItem(id);
  }

  async getTrackBySpecificProperties(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchQuery: Record<string, any>,
  ): Promise<Track> {
    return this.repository.getItemBySpecificProperties(searchQuery);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getTracks(query: Map<string, any>): Promise<ItemsPage<Track>> {
    return this.repository.getItems(query);
  }

  async createTrack(track: Track, user: User): Promise<Track> {
    const createdTrack: Track = await this.repository.createItem(track);
    !user.songList.includes(track.trackInformation) &&
      user.songList.push(track.trackInformation);

    await userService.updateUser(user.id, user);

    await playlistEventEmitter.emitPlaylist(track.group);
    await trackUnitEventEmitter.emitFirstTrack(createdTrack);

    return createdTrack;
  }

  async updateTrack(id: string, track: Partial<Track>): Promise<Track> {
    return this.repository.updateItem(id, track);
  }

  async deleteTrack(id: string): Promise<void> {
    const track: Track = await this.getTrack(id);

    await this.repository.deleteItem(id);

    await playlistEventEmitter.emitPlaylist(track.group);
  }

  async getPlaylist(group: string): Promise<PlaylistEvent> {
    const { items } = await this.getTracks(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new Map<string, any>([
        [
          'searchQuery',
          {
            state: TrackState.SCHEDULED,
            group,
          },
        ],
        ['$limit', 0],
        ['$page', 1],
      ]),
    );

    const trackInfoItems: TrackInformation[] = await Promise.all(
      items.map((track: Track) =>
        trackInformationService.getTrackInformation(track.trackInformation),
      ),
    );

    const tracks: PlaylistEvent = {
      playlist: trackInfoItems.map(
        (trackInfo: TrackInformation, index: number) => {
          return {
            id: items[index].id,
            name: trackInfo.name,
            author: trackInfo.author,
          };
        },
      ),
    };

    return tracks;
  }
}

const trackService: TrackService = new TrackService();

export default trackService;
