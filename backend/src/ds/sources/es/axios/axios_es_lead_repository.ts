import axios from 'axios';
import { Lead } from '../../../models/lead';
import { ESAbstractRepository } from '../utils/es_abstract_repository';
import { LeadRepository } from '../../../api/lead_repository';
import { FactoryRequestLead } from '../utils/request/request_factory_lead';

export class AxiosESLeadRepository extends ESAbstractRepository implements LeadRepository {
  private URL: string;

  constructor(endpoint: string, index: string) {
    super(endpoint, index);
    this.URL = `${this.endpoint}/${this.index}/${'_search'}`;
  }

  async getByName(name: string): Promise<Lead[]> {
    const requestBody = FactoryRequestLead.searchByNameBody(name);

    const result = await this.getLeadsFromRequest(requestBody);
    if (!result) {
      throw 'No lead found with the name ' + name + '!';
    }

    return result.filter(lead => lead.StandardizedName == name);
  }

  private async getLeadsFromRequest(requestBody: any): Promise<Lead[]> {
    const leads: Lead[] = [];
    const result = await axios.post(this.URL, requestBody);

    if (result.data.hits.hits.length) {
      result.data.hits.hits[0]._source.People.forEach((lead: any) => {
        leads.push(Lead.createLeadFromElastic(lead));
      });
    }

    return leads;
  }
}
