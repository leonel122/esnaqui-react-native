import {from, Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import lodash from 'lodash';
import {Client as feathersClient} from './Conection';
import {TIMEOUT} from '../../constants';

export default class ServiceMain {
  static event = new Subject();

  static TYPE_CREATED = 'CREATED';
  static TYPE_UPDATED = 'UPDATED';
  static TYPE_PATCHED = 'UPDATED';
  static TYPE_REMOVED = 'DELETED';

  constructor(serviceName, watch = false) {
    this.serviceName = serviceName.trim();
    this.service = feathersClient.service(this.serviceName);
    this.service.timeout = TIMEOUT;

    const listeningHandler = (type) => (data, context) =>
      ServiceMain.event.next({
        type,
        serviceName,
        data,
        context,
      });

    if (typeof watch === 'boolean' && watch) {
      this.service.on('created', listeningHandler(ServiceMain.TYPE_CREATED));
      this.service.on('updated', listeningHandler(ServiceMain.TYPE_UPDATED));
      this.service.on('patched', listeningHandler(ServiceMain.TYPE_PATCHED));
      this.service.on('removed', listeningHandler(ServiceMain.TYPE_REMOVED));
    } else if (typeof watch === 'object') {
      if (watch.created)
        this.service.on('created', listeningHandler(ServiceMain.TYPE_CREATED));
      if (watch.updated)
        this.service.on('updated', listeningHandler(ServiceMain.TYPE_UPDATED));
      if (watch.patched)
        this.service.on('patched', listeningHandler(ServiceMain.TYPE_PATCHED));
      if (watch.removed)
        this.service.on('removed', listeningHandler(ServiceMain.TYPE_REMOVED));
    }
  }

  static getEvent(serviceName, type) {
    return ServiceMain.event.pipe(
      filter((it) => it.serviceName === serviceName && it.type === type),
    );
  }

  static getEventByService(serviceName) {
    return ServiceMain.event.pipe(
      filter((it) => it.serviceName === serviceName),
    );
  }

  static getEventByType(type) {
    return ServiceMain.event.pipe(filter((it) => it.type === type));
  }

  raw(method, ...rest) {
    // noinspection JSCheckFunctionSignatures
    return from(this.service[method](...rest));
  }

  getEvent(
    type = [
      ServiceMain.TYPE_CREATED,
      ServiceMain.TYPE_UPDATED,
      ServiceMain.TYPE_PATCHED,
      ServiceMain.TYPE_REMOVED,
    ],
  ) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    return ServiceMain.event.pipe(
      filter(
        (it) => type.includes(it.type) && it.serviceName === this.serviceName,
      ),
      map((it) => ({type: it.type, data: it.data})),
    );
  }

  get(id, query) {
    return this.raw('get', id, query);
  }

  find(query = {}) {
    const hooks = (data) => {
      let added = {};

      if (data.skip >= data.limit)
        added.back = () =>
          this.find(
            lodash.merge(query, {
              query: {
                $limit: data.limit,
                $skip: data.skip - data.limit,
              },
            }),
          );
      if (data.skip + data.limit < data.total)
        added.next = () =>
          this.find(
            lodash.merge(query, {
              query: {
                $limit: data.limit,
                $skip: data.skip + data.limit,
              },
            }),
          );
      return added;
    };

    return this.raw('find', query).pipe(
      map((it) => {
        if (query.paginate === false) return it;
        else return {...it, ...hooks(it)};
      }),
    );
  }

  findAll(query = {}) {
    delete query.paginate;

    return new Observable((subscriber) => {
      let loopRecursive = (find) =>
        find.subscribe(({data, next}) => {
          subscriber.next(data);
          if (next) loopRecursive(next());
          else subscriber.complete();
        });

      loopRecursive(this.find(query));
    });
  }

  create(data, query) {
    return this.raw('create', data, query);
  }

  update(id, data, query) {
    return this.raw('update', id, data, query);
  }

  patch(id, data, query) {
    return this.raw('patch', id, data, query);
  }

  remove(id, query) {
    return this.raw('remove', id, query);
  }
}
