import { NativeScriptConfig } from '@nativescript/core';

const {
  PROJECT_NAME,
  RELEASE_ENV
} = process.env;

export default {
	id: `org.nativescript.${PROJECT_NAME}.${RELEASE_ENV}.angular`,
	appResourcesPath: '../../tools/assets/App_Resources',
	android: {
		v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true,
    suppressCallJSMethodExceptions: false
  },
  ios: {
    discardUncaughtJsExceptions: false
  },
	appPath: 'src',
} as NativeScriptConfig;
