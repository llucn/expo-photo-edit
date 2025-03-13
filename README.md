# Expo Photo Editor (EPE)

🌄 Image editor using native modules for iOS and Android. Inherit from 2 available libraries, [ZLImageEditor](https://github.com/longitachi/ZLImageEditor) (iOS) and [PhotoEditor](https://github.com/burhanrashid52/PhotoEditor) (Android)

Fork from [NitrogenZLab/react-native-photo-editor](https://github.com/NitrogenZLab/react-native-photo-editor/)

## Feature 🙈

###  Both
- Draw (Support custom line color).
- Adding/Editing **Text** with option to change its Color.
- Adding **Images/Stickers**
- Pinch to Scale and Rotate views.

### iOS
- Apply Filter Effect on image using [LUT Color](#custom-filtersios) (Custom filter is simpler than android)
- Crop image.
### Android
- Drawing on image with option to change its Brush's Color, Size, Opacity, Erasing and basic shapes.
- Apply Filter Effect on image using [MediaEffect](https://developer.android.com/reference/android/media/effect/EffectFactory). But in the future will change to LUT color.

## Requirements

* Swift 5.1+ (Xcode12.4+)
* iOS 12+

## Installation

```sh
npx expo install expo-photo-editor
```

## Usage

```js
import PhotoEditor from "expo-photo-editor";

// ...

const result = await PhotoEditor.open(Options);
```
## Options

| Property |  Type  | Default value | Platform | Description      |
| -------- | :----: | :-----------: | :------: | :--------------- |
| path      | string |   required    |   both   | Local/remote image path |
| [stickers](#stickers-)      | Array<String> |   []    |   both   | An array of paths containing sticker images |

## Stickers 🤌

You need to pass an array of image urls to the sticker parameter in [options](#options)
[Example](https://github.com/baronha/react-native-photo-editor/blob/dev/example/src/assets/data/stickers.json):
```
[
  "https://cdn-icons-png.flaticon.com/512/5272/5272912.png",
  "https://cdn-icons-png.flaticon.com/512/5272/5272913.png",
  "https://cdn-icons-png.flaticon.com/512/5272/5272916.png",
  ...
]
```

## License

MIT