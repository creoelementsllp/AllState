/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GroupCompany, CorporateObjective, SectorFocus, AlliancePartner } from './types';

export const SITE_META = {
  title: 'Allstate Group — Service with Integrity Since 1958',
  tagline: 'Service with Integrity',
  description: 'India\'s diversified industrial conglomerate spanning engineering, manufacturing, IT, real estate, and finance since 1958.',
  founded: 1958,
};

export const CONTACT_INFO = {
  address: '901, Maker Chamber V, 9th Floor, Nariman Point, Mumbai 400021',
  phone: '+91 22 6628 8000-99',
  fax: '+91 22 6628 8011',
  email: 'info@allstate.in',
  hours: 'Mon–Fri 09:30 AM – 06:15 PM IST',
  coordinates: { lat: 18.9284, lng: 72.8223 },
};

export const HOME_STATS = [
  { value: 68, suffix: '+', label: 'Years of Excellence', description: 'Since 1958' },
  { value: 9, suffix: '', label: 'Group Companies', description: 'Across industries' },
  { value: 280, suffix: '+', label: 'Projects Completed', description: 'Pan-India delivery' },
  { value: 500, suffix: '+', label: 'Clients Served', description: 'Enterprise partnerships' },
];

export const ALLSTATE_METRICS = [
  { value: '1958', label: 'Legacy Established', description: 'Begun with Gorakhram Haribux, introducing automobile air conditioning to India.' },
  { value: '9', label: 'Group Entities', description: 'Pioneering subsidiaries spanning multiple industrial, engineering, IT, and real estate markets.' },
  { value: 'India', label: 'National Footprint', description: 'Headquartered in Nariman Point, Mumbai with plants in Silvassa, Pune, and Umbergaon.' },
];

export const TIMELINE = [
  {
    year: 1958,
    title: 'Foundation',
    description: 'Gorakhram Haribux established, pioneering automobile air conditioning and refrigerant distribution across India.',
    highlight: 'The Beginning',
  },
  {
    year: 1964,
    title: 'Industrial Refrigeration',
    description: 'Industrial Refrigeration Pvt. Ltd. founded, delivering turnkey cold chain and food processing solutions nationwide.',
    highlight: 'Cold Chain Pioneer',
  },
  {
    year: 1975,
    title: 'Expansion Era',
    description: 'Strategic diversification into manufacturing, engineering, and media — building the foundation of a multi-sector group.',
    highlight: 'Multi-Sector Growth',
  },
  {
    year: 1995,
    title: 'Global Partnerships',
    description: 'Alliances with FUJIFILM, Honeywell, Chemours, and IBEX Leisure — bringing world-class technology to Indian industry.',
    highlight: 'International Alliances',
  },
  {
    year: 2025,
    title: 'Diversified Group',
    description: 'Nine specialized companies operating across engineering, IT, real estate, finance, and media with ISO-certified excellence.',
    highlight: 'Present Day',
  },
];

export const CORPORATE_OBJECTIVES: CorporateObjective[] = [
  {
    id: 'product',
    title: 'Product Excellence',
    description: 'Providing competitive, high-quality industrial goods and services at reasonable prices in every market the group operates in.',
    iconName: 'Package',
  },
  {
    id: 'fairness',
    title: 'Fairness & Honesty',
    description: 'Maintaining a long-standing reputation for absolute transparency, corporate compliance, and fair dealing across every division.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'customers',
    title: 'Customer Focus',
    description: 'Maximum customer satisfaction remains of utmost importance — building decades-long client partnerships based on mutual trust.',
    iconName: 'Users',
  },
  {
    id: 'people',
    title: 'People Development',
    description: 'Continuous growth creates an environment conducive to professional and personal development, nurturing leadership talents.',
    iconName: 'UserCheck',
  },
];

export const GROUP_COMPANIES: GroupCompany[] = [
  {
    id: 'gorakhram',
    name: 'Gorakhram Haribux',
    description: 'Pioneers of Pan-India Refrigerant Gas Distribution.',
    longDescription: 'The foundational bedrock of the Allstate Group. Gorakhram Haribux introduced premium refrigeration systems and eco-safe refrigerant gas bottling, serving thousands of distribution networks across India.',
    vertical: 'Services',
    websiteUrl: 'https://www.gorakhram.com',
    establishedYear: 1958,
    imageUrl:'https://www.allrefrigerants.com/assets/img/product-categories/bulk-gas-cylinders-640.webp',

  },
  {
    id: 'indref',
    name: 'Industrial Refrigeration Pvt. Ltd.',
    description: 'Turnkey Industrial Refrigeration & Cold Chain Solutions.',
    longDescription: 'Engineering giants delivering advanced commercial cold chains, modified atmosphere refrigeration warehouses, and food processing chilling plants.',
    vertical: 'Refrigeration',
    websiteUrl: 'https://www.irl.co.in/',
    establishedYear: 1964,
    imageUrl:'https://i.pinimg.com/736x/9a/3c/18/9a3c1805d0f1d88526d9b7916ffa0905.jpg',
  },
  {
    id: 'abcolor',
    name: 'A.B. Color Pvt. Ltd.',
    description: 'Conversion of Photographic Paper & Graphic Art Film.',
    longDescription: 'A pioneer in graphic arts media processing, specializing in precision conversion, coating, and packaging of phototypesetting film and photographic paper.',
    vertical: 'Manufacturing',
    websiteUrl: 'https://www.abc.co.in/',
    establishedYear: 1974,
    imageUrl:'https://plain-apac-prod-public.komododecks.com/202606/25/rWhWpJGEeUIBwO1Hk05c/image.png',
  },
  {
    id: 'inco',
    name: 'Inco Mechel Pvt. Ltd.',
    description: 'Capital Goods for Leisure Sports & Floating Jetties.',
    longDescription: 'Exclusive partner of elite sports and recreation equipment. Specializes in municipal watersports facilities and modular floating jetties.',
    vertical: 'Engineering',
    websiteUrl: 'https://www.inco.in/',
    establishedYear: 1978,
    imageUrl:'https://plain-apac-prod-public.komododecks.com/202606/25/arIg1DO9B5U9tszzIBKv/image.png',
  },
  {
    id: 'gendata',
    name: 'General Data Pvt. Ltd.',
    description: 'IT Services, Custom Software Development & Enterprise Analytics.',
    longDescription: 'Full-suite developer of cutting-edge web applications, enterprise information management systems, and intelligent robotic process automation.',
    vertical: 'IT',
    websiteUrl: 'https://www.gdata.in/',
    establishedYear: 1984,
    imageUrl:'https://plain-apac-prod-public.komododecks.com/202606/25/IXFKAJtNalRV16u2pAb4/image.png',
  },
  {
    id: 'comserve',
    name: 'Allstate Comserve Pvt. Ltd.',
    description: 'Real Estate Consultancy, Brokerage & Infrastructure Planning.',
    longDescription: 'Providing elite real estate counsel, bespoke property acquisition advisory, and industrial land leasing in metropolitan Indian hubs.',
    vertical: 'Real Estate',
    websiteUrl: 'https://allestate.co.in/',
    establishedYear: 1989,
    imageUrl:'https://plain-apac-prod-public.komododecks.com/202606/25/Vm7hPD3GjdhmWJz0MIZo/image.png',
  },
  {
    id: 'finance',
    name: 'Allstate Finance & Leasing',
    description: 'Corporate Debt Syndication, Real Estate Finance & Angel Investments.',
    longDescription: 'Providing smart liquidity solutions, commercial bridge financing, and early-stage capital advisory to high-potential enterprises.',
    vertical: 'Finance',
    websiteUrl: 'https://allestate.co.in/',
    establishedYear: 1991,
    imageUrl:'https://plain-apac-prod-public.komododecks.com/202606/25/4lIe15dTBWBsZpO3HEKO/image.png',
  },
  {
    id: 'trafo',
    name: 'Trafo Power Pvt. Ltd.',
    description: 'Manufacturing High-Capacity Power & Distribution Transformers.',
    longDescription: 'Engineering heavy-duty structural transformers and smart power distribution modules for industrial sectors and metropolitan networks.',
    vertical: 'Manufacturing',
    websiteUrl: 'https://www.trafo.in/',
    establishedYear: 1993,
    imageUrl:'https://i.pinimg.com/736x/8c/89/29/8c8929287476621413478770d2d2f514.jpg',
  },
  {
    id: 'shivhari',
    name: 'Shiv Hari Media Pvt. Ltd.',
    description: 'Film, Television, & High-Impact Digital Content Production.',
    longDescription: 'Expressing the creative side of Allstate Group through cinematic productions, corporate brand films, and advertising content.',
    vertical: 'Media',
    websiteUrl: 'https://shivhari.com/',
    establishedYear: 2002,
    imageUrl:'https://plain-apac-prod-public.komododecks.com/202606/25/IVU1lhKe7e7W7jRMBg4P/image.png',
  },
];

export const SECTOR_FOCUS_AREAS: SectorFocus[] = [
  {
    id: 'sports',
    title: 'Leisure Sports & Watersports',
    description: 'Supplying top-tier capital equipment, custom sports system designs, and maintenance support for municipal parks and luxury resort jetties.',
    iconName: 'Compass',
  },
  {
    id: 'software',
    title: 'Software Development & IT',
    description: 'Delivering end-to-end bespoke software engineering, enterprise cloud infrastructures, and digital transformation for global enterprises.',
    iconName: 'CodeXml',
  },
  {
    id: 'document',
    title: 'Document Management',
    description: 'Premium document scanning systems, digitizing services, and high-security file storage for hospitals, banks, and government archives.',
    iconName: 'ServerCrash',
  },
  {
    id: 'refrigeration',
    title: 'Refrigeration & Food Processing',
    description: 'Leading heavy engineering products, high-efficiency cooling chillers, and temperature control networks for food supply chains.',
    iconName: 'Snowflake',
  },
  {
    id: 'gases',
    title: 'Refrigerant Gases',
    description: 'Safe bottling and distributing of certified industrial fluids and eco-compatible fluorocarbons for automotive and residential cooling.',
    iconName: 'Container',
  },
  {
    id: 'transformers',
    title: 'Electrical Transformers',
    description: 'Robust power transformers engineered with superior copper cores to provide absolute electrical resilience to power grids.',
    iconName: 'Zap',
  },
];

export const ALLIANCE_PARTNERS: AlliancePartner[] = [
  {
    id: 'fuji',
    name: 'FUJIFILM Corporation',
    logoText: 'FUJIFILM',
    logoColor: 'text-emerald-500',
    description: 'Long-standing partnership for high-fidelity graphic art, photography media conversion, and medical imaging technology.',
  },
  {
    id: 'honeywell',
    name: 'Honeywell International',
    logoText: 'Honeywell',
    logoColor: 'text-red-500',
    description: 'Strategic alliance for environmental systems, precise climate control sensors, and high-efficiency automation components.',
  },
  {
    id: 'chemours',
    name: 'The Chemours Company',
    logoText: 'Chemours',
    logoColor: 'text-cyan-500',
    description: 'Collaborator for cutting-edge industrial fluoroproducts, eco-balanced chemistry, and high-purity refrigerant fluids.',
  },
  {
    id: 'ibex',
    name: 'IBEX Leisure Systems',
    logoText: 'IBEX',
    logoColor: 'text-slate-300',
    description: 'Joint development partner for luxury sporting fields, watersport architectures, and premium recreational materials.',
  },
];

export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'companies', label: 'Companies', href: '#companies' },
  { id: 'sectors', label: 'Sectors', href: '#sectors' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const VERTICAL_COLORS: Record<string, string> = {
  Engineering: 'from-blue-500 to-cyan-400',
  Manufacturing: 'from-indigo-500 to-purple-400',
  IT: 'from-sky-500 to-blue-400',
  'Real Estate': 'from-emerald-500 to-teal-400',
  Finance: 'from-amber-500 to-orange-400',
  Media: 'from-pink-500 to-rose-400',
  Services: 'from-violet-500 to-purple-400',
  Refrigeration: 'from-cyan-500 to-blue-400',
};
