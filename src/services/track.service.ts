import TrackModel, { Track } from '../models/track.model';
import Repository from '../repositories/mongo.repository';
import { ItemsPage } from '../utils/types';
import playlistEventEmitter from '../emitters/playlist.event.emitter';
import trackUnitEventEmitter from '../emitters/track.event.emitter';
import { TrackState } from '../constants/constant';

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

  async createTrack(track: Track): Promise<Track> {
    const createdTrack: Track = await this.repository.createItem(track);

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

  async getPlaylist(group: string): Promise<Track[]> {
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

    return items;
  }
}

const trackService: TrackService = new TrackService();

export default trackService;
