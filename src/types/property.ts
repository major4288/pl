export interface Property {
  PropertyName: string;
  Location: string;
  Address: string;
  Price: string;
  Type: string;
  Status: string;
  Description: string;
  ImageURL: string;
  Overview: string;
  AffiliateLink: string;
}

export interface ParsedOverview {
  [key: string]: string;
}
