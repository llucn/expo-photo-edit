import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoPhotoEditViewProps } from './ExpoPhotoEdit.types';

const NativeView: React.ComponentType<ExpoPhotoEditViewProps> =
  requireNativeView('ExpoPhotoEdit');

export default function ExpoPhotoEditView(props: ExpoPhotoEditViewProps) {
  return <NativeView {...props} />;
}
