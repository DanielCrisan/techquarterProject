import { ApiResponse, Client, RequestParams } from '@elastic/elasticsearch';
import { LeadRepository } from '../../../api/lead_repository';
import { Lead } from '../../../models';
import { ESAbstractRepository } from '../utils/es_abstract_repository';
import { FactoryRequestLead } from '../utils/request/request_factory_lead';

export class ElasticESLeadRepository extends ESAbstractRepository implements LeadRepository {
  private client: Client;

  constructor(endpoint: string, index: string) {
    super(endpoint, index);
    this.client = new Client({ node: this.endpoint });
  }

  async getByName(name: string): Promise<Lead[]> {
    const requestBody = FactoryRequestLead.searchByNameBody(name);
    const params = this.createSearchParams(requestBody);

    const result = await this.getLeadsFromRequest(params);
    if (!result) {
      throw 'No lead found with the name ' + name + '!';
    }

    return result.filter(lead => lead.StandardizedName == name);
  }

  private createSearchParams(requestBody: any): RequestParams.Search {
    return {
      index: this.index,
      body: requestBody
    };
  }

  private async getLeadsFromRequest(params: RequestParams.Search): Promise<Lead[]> {
    const leads: Lead[] = [];
    const result: ApiResponse = await this.client.search(params);

    if (result.body.hits.hits.length) {
      result.body.hits.hits[0]._source.People.forEach((lead: any) => {
        leads.push(Lead.createLeadFromElastic(lead));
      });
    }

    return leads;
  }
}
