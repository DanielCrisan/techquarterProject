export class Lead {
  IndividualID?: string;
  StandardizedName?: string;
  Gender?: string;
  Age?: number;
  CellPhone?: string;
  Email?: string;
  ReligionName?: string;
  OccupationName?: string;

  static createLeadFromElastic(obj: any): Lead {
    const lead: Lead = new Lead();

    lead.IndividualID = obj.IndividualID;
    lead.StandardizedName = obj.StandardizedName;
    lead.Gender = obj.Gender;
    lead.Age = parseInt(obj.Age);
    lead.CellPhone = obj.CellPhone;
    lead.Email = obj.Email;
    lead.ReligionName = obj.ReligionName;
    lead.OccupationName = obj.OccupationName;

    return lead;
  }
}
