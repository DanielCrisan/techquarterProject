import GeoPoint from 'geopoint';
import { ResidenceRepository } from '../../api/residence_repository';
import { Residence } from '../../models';
import fs, { ReadStream } from 'fs';
import parse from 'csv-parse';

export class CsvResidenceRepository implements ResidenceRepository {
  private path: string;
  private file: ReadStream;

  constructor(path: string) {
    this.path = path;
    this.file = fs.createReadStream(this.path);
  }

  async getByAddress(address: string, state: string, zip: number): Promise<Residence> {
    return new Promise<Residence>(async (resolve, reject) => {
      let residence: Residence;
      const parser = parse({ columns: true }, (err: any, records: any[]) => {
        records.forEach((item: any) => {
          if (item.StandardizedAddress === address && item.ZipCode === zip && item.State === state) {
            item.People = item.People.split(', ');
            residence = Residence.createResidenceFromElastic(item);
          }
        });
      });

      this.file.pipe(parser).on('end', () => {
        if (residence) {
          resolve(residence);
        }
        reject('Address not found!');
      });
    });
  }

  getByRadius(geoPoint: GeoPoint, distanceInKm: number): Promise<Residence[]> {
    throw new Error('Method not implemented.');
  }

  getByPolygon(geoPoints: GeoPoint[]): Promise<Residence[]> {
    throw new Error('Method not implemented.');
  }

  getKNN(geoPoint: GeoPoint, nrOfNeighbours: number): Promise<Residence[]> {
    throw new Error('Method not implemented.');
  }
}
