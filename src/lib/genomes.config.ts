// Foundy · Genome Registry v1.0
// 8 creative design genomes. Each is a design DNA — not a template.
// Agent reads this to score briefs and pick the right genome.

export interface GenomeConfig {
  id: string
  name: string
  tagline: string
  personality: string[]
  primaryColor: string
  accentColor: string
  textColor: string
  fontDisplay: string
  fontBody: string
  bestFor: string[]
  notFor: string[]
  spacingDensity: 'open' | 'balanced' | 'dense'
  layoutStyle: 'grid' | 'editorial' | 'centred' | 'asymmetric'
  scoreWeights: {
    professionalism: number
    creativity: number
    dataDensity: number
    warmth: number
  }
}

export const GENOMES: GenomeConfig[] = [
  {
    id: 'G01',
    name: 'Monument',
    tagline: 'Serif gravitas',
    personality: ['Authoritative', 'Timeless', 'Refined'],
    primaryColor: '#2C3E50',
    accentColor: '#4A6741',
    textColor: '#F5F4F0',
    fontDisplay: 'Merriweather',
    fontBody: 'Source Serif 4',
    bestFor: ['Law firms', 'Financial advisors', 'Consultants', 'Accountants'],
    notFor: ['Tech startups', 'Youth brands', 'Creative studios'],
    spacingDensity: 'open',
    layoutStyle: 'editorial',
    scoreWeights: { professionalism: 9, creativity: 3, dataDensity: 5, warmth: 3 },
  },
  {
    id: 'G02',
    name: 'Signal',
    tagline: 'Technical precision',
    personality: ['Structured', 'Data-led', 'Sharp'],
    primaryColor: '#0F172A',
    accentColor: '#3B82F6',
    textColor: '#E2E8F0',
    fontDisplay: 'Space Mono',
    fontBody: 'Inter',
    bestFor: ['SaaS companies', 'Engineers', 'Data firms', 'Cybersecurity'],
    notFor: ['Lifestyle brands', 'Wellness coaches', 'Creative agencies'],
    spacingDensity: 'dense',
    layoutStyle: 'grid',
    scoreWeights: { professionalism: 8, creativity: 5, dataDensity: 9, warmth: 2 },
  },
  {
    id: 'G03',
    name: 'Current',
    tagline: 'Warm editorial',
    personality: ['Approachable', 'Confident', 'Human'],
    primaryColor: '#1C1917',
    accentColor: '#D97706',
    textColor: '#FEF3C7',
    fontDisplay: 'DM Serif Display',
    fontBody: 'DM Sans',
    bestFor: ['Executive coaches', 'Advisors', 'Fractional CMOs', 'Mentors'],
    notFor: ['Law firms', 'Accountants', 'Data companies'],
    spacingDensity: 'balanced',
    layoutStyle: 'editorial',
    scoreWeights: { professionalism: 6, creativity: 7, dataDensity: 4, warmth: 9 },
  },
  {
    id: 'G04',
    name: 'Archive',
    tagline: 'Heritage refined',
    personality: ['Established', 'Trustworthy', 'Considered'],
    primaryColor: '#1A2E22',
    accentColor: '#4A7C59',
    textColor: '#F0FDF4',
    fontDisplay: 'Playfair Display',
    fontBody: 'Lora',
    bestFor: ['Heritage brands', 'Family businesses', 'Estate agents', 'Solicitors'],
    notFor: ['Startups', 'Tech companies', 'Young founder brands'],
    spacingDensity: 'open',
    layoutStyle: 'editorial',
    scoreWeights: { professionalism: 8, creativity: 4, dataDensity: 3, warmth: 7 },
  },
  {
    id: 'G05',
    name: 'Form',
    tagline: 'Modernist stark',
    personality: ['Confident', 'Minimal', 'Precise'],
    primaryColor: '#F8F8F8',
    accentColor: '#111111',
    textColor: '#111111',
    fontDisplay: 'Outfit',
    fontBody: 'Outfit',
    bestFor: ['Architects', 'Product studios', 'Industrial designers', 'Interior designers'],
    notFor: ['Traditional firms', 'Warm personal brands', 'Family businesses'],
    spacingDensity: 'open',
    layoutStyle: 'asymmetric',
    scoreWeights: { professionalism: 7, creativity: 9, dataDensity: 4, warmth: 2 },
  },
  {
    id: 'G06',
    name: 'Field',
    tagline: 'Organic warmth',
    personality: ['Grounded', 'Natural', 'Authentic'],
    primaryColor: '#2D1F14',
    accentColor: '#8B7355',
    textColor: '#FDF8F0',
    fontDisplay: 'Instrument Serif',
    fontBody: 'Nunito',
    bestFor: ['Wellness practitioners', 'Nutritionists', 'Sustainability firms', 'Farmers'],
    notFor: ['Finance', 'Law', 'Tech', 'Data companies'],
    spacingDensity: 'balanced',
    layoutStyle: 'centred',
    scoreWeights: { professionalism: 5, creativity: 6, dataDensity: 2, warmth: 10 },
  },
  {
    id: 'G07',
    name: 'Tempo',
    tagline: 'Bold kinetic',
    personality: ['High-energy', 'Direct', 'Striking'],
    primaryColor: '#000000',
    accentColor: '#FF3B30',
    textColor: '#FFFFFF',
    fontDisplay: 'Bebas Neue',
    fontBody: 'Barlow Condensed',
    bestFor: ['Sports coaches', 'Event companies', 'Entertainment', 'Personal trainers'],
    notFor: ['Legal', 'Finance', 'Healthcare', 'Corporate consultants'],
    spacingDensity: 'dense',
    layoutStyle: 'asymmetric',
    scoreWeights: { professionalism: 4, creativity: 10, dataDensity: 3, warmth: 5 },
  },
  {
    id: 'G08',
    name: 'Zero',
    tagline: 'Systematic minimal',
    personality: ['Precise', 'Analytical', 'Calm'],
    primaryColor: '#0D0D0D',
    accentColor: '#22C55E',
    textColor: '#E5E7EB',
    fontDisplay: 'JetBrains Mono',
    fontBody: 'JetBrains Mono',
    bestFor: ['Research firms', 'Academia', 'Data scientists', 'Quantitative analysts'],
    notFor: ['Creative studios', 'Personal brands', 'Lifestyle businesses'],
    spacingDensity: 'balanced',
    layoutStyle: 'grid',
    scoreWeights: { professionalism: 7, creativity: 6, dataDensity: 10, warmth: 1 },
  },
]

export function getGenomeById(id: string): GenomeConfig | undefined {
  return GENOMES.find(g => g.id === id)
}

export const GENOME_IDS = GENOMES.map(g => g.id)
