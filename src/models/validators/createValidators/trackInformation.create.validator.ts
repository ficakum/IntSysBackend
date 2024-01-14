import Joi from 'joi';

import { TrackInformation } from '../../trackInformation.model';
import {
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from '../../../constants/constant';
import { messagesConstructor } from '../messages.validator';

const TrackInformationCreateSchemaValidator: Joi.ObjectSchema<TrackInformation> =
  Joi.object<TrackInformation>({
    name: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'name',
        ),
      ),
    author: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'author',
        ),
      ),
    genre: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'genre',
        ),
      ),
    externalId: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'externalId',
        ),
      ),
    duration: Joi.number()
      .integer()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.INTEGER]: ValidatorMessages.INTEGER,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'duration',
        ),
      ),
    popularity: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'popularity',
        ),
      ),
    album_id: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'album_id',
        ),
      ),
    album_name: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'album_name',
        ),
      ),
    album_release_date: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'album_release_date',
        ),
      ),
    playlist_name: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'playlist_name',
        ),
      ),
    playlist_id: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'playlist_id',
        ),
      ),
    playlist_genre: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'playlist_genre',
        ),
      ),
    playlist_subgenre: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'playlist_subgenre',
        ),
      ),
    danceability: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'danceability',
        ),
      ),
    energy: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'energy',
        ),
      ),
    key: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'key',
        ),
      ),
    loudness: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'loudness',
        ),
      ),
    mode: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'mode',
        ),
      ),
    speechiness: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'speechiness',
        ),
      ),
    acousticness: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'acousticness',
        ),
      ),
    instrumentalness: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'instrumentalness',
        ),
      ),
    liveness: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'liveness',
        ),
      ),
    valence: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'valence',
        ),
      ),
    tempo: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          'tempo',
        ),
      ),
  });

export default TrackInformationCreateSchemaValidator;
