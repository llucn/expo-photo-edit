import { NativeModule, requireNativeModule } from 'expo';

import { ExpoPhotoEditModuleEvents, ExpoPhotoEditModuleOptions } from './ExpoPhotoEdit.types';

declare class ExpoPhotoEditModule extends NativeModule<ExpoPhotoEditModuleEvents> {
  open(options: ExpoPhotoEditModuleOptions): Promise<string>
}

export default requireNativeModule<ExpoPhotoEditModule>('ExpoPhotoEdit');
