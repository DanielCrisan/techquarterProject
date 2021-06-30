import { Lead } from './lead';

export class Residence {
  LocationID?: string;
  StandardizedAddress?: string;
  City?: string;
  ZipCode?: number;
  State?: string;
  Latitude?: number;
  Longitude?: number;
  People?: Lead[];
  Income?: number;
  HomeBuildYear?: string;
  HomeValue?: number;
  LandSquareFootage?: number;
  EffectiveHomeSize?: number;

  static createResidenceFromElastic(obj: any): Residence {
    const residence: Residence = new Residence();

    residence.LocationID = obj.LocationID;
    residence.StandardizedAddress = obj.StandardizedAddress;
    residence.City = obj.City;
    residence.ZipCode = parseInt(obj.ZipCode);
    residence.State = obj.State;
    residence.Latitude = parseFloat(obj.Latitude);
    residence.Longitude = parseFloat(obj.Longitude);
    residence.People = obj.People;
    residence.Income = obj.Income;
    residence.HomeBuildYear = obj.HomeBuildYear;
    residence.HomeValue = parseFloat(obj.HomeValue);
    residence.LandSquareFootage = parseFloat(obj.LandSquareFootage);
    residence.EffectiveHomeSize = parseFloat(obj.EffectiveHomeSize);

    return residence;
  }
}
