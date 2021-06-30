import { Connection, createConnection, getConnectionManager } from 'typeorm';

export function getConnection(): Promise<Connection> {
  return getConnectionManager().has('default') ? Promise.resolve(getConnectionManager().get('default')) : createConnection('default');
}


