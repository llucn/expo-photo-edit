import { registerWebModule, NativeModule } from 'expo';

import { ExpoPhotoEditModuleEvents } from './ExpoPhotoEdit.types';

class ExpoPhotoEditModule extends NativeModule<ExpoPhotoEditModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoPhotoEditModule);
