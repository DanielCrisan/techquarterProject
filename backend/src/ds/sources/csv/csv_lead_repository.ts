import { LeadRepository } from '../../api/lead_repository';
import { Lead } from '../../models';
import fs, { ReadStream } from 'fs';
import parse from 'csv-parse';

export class CsvLeadRepository implements LeadRepository {
  private path: string;
  private file: ReadStream;

  constructor(path: string) {
    this.path = path;
    this.file = fs.createReadStream(this.path);
  }

  async getByName(name: string): Promise<Lead[]> {
    return new Promise<Lead[]>((resolve, reject) => {
      const leads: Lead[] = [];
      const parser = parse({ columns: true }, (err: any, records: any[]) => {
        records.forEach((item: Lead) => {
          if (item.StandardizedName === name) {
            leads.push(Lead.createLeadFromElastic(item));
          }
        });
      });

      this.file.pipe(parser).on('end', () => {
        if (leads.length) {
          resolve(leads);
        }
        reject('No lead found with the name ' + name + '!');
      });
    });
  }
}
