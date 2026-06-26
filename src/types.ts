/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GroupCompany {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  vertical: 'Engineering' | 'Manufacturing' | 'IT' | 'Real Estate' | 'Finance' | 'Media' | 'Services' | 'Refrigeration';
  websiteUrl?: string;
  establishedYear?: number;
}

export interface CorporateObjective {
  id: string;
  title: string;
  description: string;
  iconName: string; // references lucide icons
}

export interface SectorFocus {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AlliancePartner {
  id: string;
  name: string;
  logoText: string;
  logoColor: string; // Tailwind class
  description: string;
}

export interface ContactInquiry {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  companyName: string;
  website: string;
  message: string;
}
