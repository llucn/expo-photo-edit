// Reexport the native module. On web, it will be resolved to ExpoPhotoEditModule.web.ts
// and on native platforms to ExpoPhotoEditModule.ts
export { default } from './ExpoPhotoEditModule';
export { default as ExpoPhotoEditView } from './ExpoPhotoEditView';
export * from  './ExpoPhotoEdit.types';
