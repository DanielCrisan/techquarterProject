import { Lead } from '../models/lead';

export interface LeadRepository {
  getByName(name: string): Promise<Lead[]>;
}
