import bodybuilder from 'bodybuilder';

export class FactoryRequestLead {
  static searchByNameBody(name: string) {
    return bodybuilder().query('match_phrase', 'StandardizedName', name).build();
  }
}
