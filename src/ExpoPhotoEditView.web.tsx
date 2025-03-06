import * as React from 'react';

import { ExpoPhotoEditViewProps } from './ExpoPhotoEdit.types';

export default function ExpoPhotoEditView(props: ExpoPhotoEditViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
