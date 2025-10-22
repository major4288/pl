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
  "Affliate link": string; // Note: The sheet has a typo in the column name
}

export interface ParsedOverview {
  [key: string]: string;
}
