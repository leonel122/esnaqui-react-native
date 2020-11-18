import AsyncStorage from '@react-native-community/async-storage';

export const isLocalhost = false;

export const TIMEOUT = 60000;

export const HOST = isLocalhost ? 'localhost:3030' : 'api.esnaqui.com';
export const PROTOCOL_WS = isLocalhost ? 'ws' : 'wss';
export const PROTOCOL_HTTP = isLocalhost ? 'http' : 'https';

export const S3_HOST = 'https://conet-static.s3.amazonaws.com';

export const ACCESS_TOKEN = 'feathers-jwt';
export const STORAGE = AsyncStorage;
