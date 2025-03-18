import { requireNativeModule } from 'expo';

export type Options = {
  path: String;
  stickers: Array<String>;
};

export type ErrorCode =
  | 'USER_CANCELLED'
  | 'IMAGE_LOAD_FAILED'
  | 'ACTIVITY_DOES_NOT_EXIST'
  | 'FAILED_TO_SAVE_IMAGE'
  | 'DONT_FIND_IMAGE'
  | 'ERROR_UNKNOW';

type PhotoEditorType = {
  open(option: Options): Promise<String>;
};

const PhotoEditor = requireNativeModule('ExpoPhotoEdit');

export default PhotoEditor as PhotoEditorType;
