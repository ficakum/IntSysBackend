import Repository from '../repositories/mongo.repository';
import { ItemsPage } from '../utils/types';
import TrackInformationModel, {
  TrackInformation,
} from '../models/trackInformation.model';

class TrackInformationService {
  repository: Repository<TrackInformation>;

  constructor() {
    this.repository = new Repository<TrackInformation>(TrackInformationModel);
  }

  async getTrackInformation(id: string): Promise<TrackInformation> {
    return this.repository.getItem(id);
  }

  async getTrackInformationBySpecificProperties(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchQuery: Record<string, any>,
  ): Promise<TrackInformation> {
    return this.repository.getItemBySpecificProperties(searchQuery);
  }

  async getTrackInformations(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: Map<string, any>,
  ): Promise<ItemsPage<TrackInformation>> {
    return this.repository.getItems(query);
  }

  async createTrackInformation(
    trackInformation: TrackInformation,
  ): Promise<TrackInformation> {
    return await this.repository.createItem(trackInformation);
  }

  async updateTrackInformation(
    id: string,
    trackInformation: Partial<TrackInformation>,
  ): Promise<TrackInformation> {
    return this.repository.updateItem(id, trackInformation);
  }

  async deleteTrackInformation(id: string): Promise<void> {
    await this.getTrackInformation(id);
  }
}

const trackInformationService: TrackInformationService =
  new TrackInformationService();

export default trackInformationService;
