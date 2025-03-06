import { NativeModule, requireNativeModule } from 'expo';

import { ExpoPhotoEditModuleEvents } from './ExpoPhotoEdit.types';

declare class ExpoPhotoEditModule extends NativeModule<ExpoPhotoEditModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoPhotoEditModule>('ExpoPhotoEdit');
