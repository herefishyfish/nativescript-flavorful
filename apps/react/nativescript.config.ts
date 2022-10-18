import { NativeScriptConfig } from '@nativescript/core';
const {
  PROJECT_NAME,
  RELEASE_ENV
} = process.env;

export default {
	id: `org.nativescript.${PROJECT_NAME}.${RELEASE_ENV}.react`,
  appPath: 'src',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;
