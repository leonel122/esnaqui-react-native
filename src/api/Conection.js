import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
// import feathersRest from "@feathersjs/rest-client";
import {
  ACCESS_TOKEN,
  HOST,
  PROTOCOL_HTTP,
  STORAGE,
  TIMEOUT,
} from '../../constants';

const socket = io(`${PROTOCOL_HTTP}://${HOST}`, {
  transports: ['websocket'],
  forceNew: true,
});

const client = feathers();

// client.configure(feathersRest(`${PROTOCOL_HTTP}://${HOST}`).fetch(fetch));
client.configure(socketio(socket));
client.configure(
  authentication({
    path: '/authentication',
    entity: 'user',
    service: 'users',
    timeout: TIMEOUT,
    cookie: ACCESS_TOKEN,
    storageKey: ACCESS_TOKEN,
    storage: STORAGE,
  }),
);

export const sock = socket;
export const Client = client;
