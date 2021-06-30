import bodybuilder from 'bodybuilder';

export abstract class ESAbstractRepository {
  endpoint: string;
  index: string;
  bodybuilder;

  constructor(endpoint: string, index: string) {
    this.endpoint = endpoint;
    this.index = index;
    this.bodybuilder = bodybuilder;
  }
}
