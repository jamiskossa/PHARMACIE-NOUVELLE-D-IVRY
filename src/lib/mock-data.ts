import type { Product, BlogPost, User, AnnuaireEntry, StockMovement } from '@/types';

export const mockUsers: User[] = [
  {
    userId: 'admin01',
    role: 'admin',
    nom: 'Chen',
    prenom: 'Alix',
    email: 'admin@ivrypharma.com',
    photoURL: 'https://picsum.photos/seed/admin/100/100',
    active: true,
  },
  {
    userId: 'collab01',
    role: 'collaborateur',
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'j.dupont@ivrypharma.com',
    photoURL: 'https://picsum.photos/seed/collab/100/100',
    active: true,
  },
  {
    userId: 'client01',
    role: 'client',
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@email.com',
    photoURL: 'https://picsum.photos/seed/client/100/100',
    active: true,
  },
];

export const mockProducts: Product[] = [
  {
    productId: 'prod001',
    name: 'Crème Hydratante Bio',
    slug: 'creme-hydratante-bio',
    description: "Une crème riche pour une hydratation profonde, à base d'ingrédients naturels et biologiques. Idéale pour les peaux sèches et sensibles.",
    shortDescription: 'Crème riche pour hydratation profonde.',
    price: 24.99,
    stock: 75,
    reorderThreshold: 20,
    salesHistory: [
        { date: '2023-11-01', quantitySold: 5 },
        { date: '2023-11-02', quantitySold: 3 },
    ],
    category: 'parapharmacie',
    images: ['https://picsum.photos/seed/pharma1/400/400'],
    isActive: true,
  },
  {
    productId: 'prod002',
    name: 'Vitamines C + Zinc',
    slug: 'vitamines-c-zinc',
    description: 'Complément alimentaire pour renforcer le système immunitaire. Contient 1000mg de Vitamine C et 15mg de Zinc par comprimé.',
    shortDescription: 'Renforce le système immunitaire.',
    price: 15.50,
    stock: 120,
    reorderThreshold: 50,
     salesHistory: [
        { date: '2023-11-01', quantitySold: 10 },
        { date: '2023-11-03', quantitySold: 12 },
    ],
    category: 'complements',
    images: ['https://picsum.photos/seed/supp1/400/400'],
    isActive: true,
  },
  {
    productId: 'prod003',
    name: 'Thermomètre Digital',
    slug: 'thermometre-digital',
    description: 'Thermomètre digital à lecture rapide et précise. Embout flexible pour plus de confort. Mémorise la dernière mesure.',
    shortDescription: 'Lecture rapide et précise.',
    price: 9.90,
    stock: 18,
    reorderThreshold: 25,
     salesHistory: [
        { date: '2023-10-28', quantitySold: 8 },
        { date: '2023-11-02', quantitySold: 6 },
    ],
    category: 'materiel-medical',
    images: ['https://picsum.photos/seed/equip1/400/400'],
    isActive: true,
  },
   {
    productId: 'prod004',
    name: 'Solution Micellaire',
    slug: 'solution-micellaire',
    description: 'Nettoie et démaquille en douceur le visage et les yeux. Adaptée à tous les types de peaux, même les plus sensibles.',
    shortDescription: 'Nettoie et démaquille en douceur.',
    price: 12.75,
    stock: 50,
    reorderThreshold: 20,
     salesHistory: [
        { date: '2023-11-01', quantitySold: 7 },
    ],
    category: 'parapharmacie',
    images: ['https://picsum.photos/seed/pharma2/400/400'],
    isActive: true,
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    blogId: 'blog001',
    title: '5 conseils pour une peau éclatante cet hiver',
    slug: '5-conseils-peau-eclatante-hiver',
    content: "L'hiver peut être rude pour votre peau. Découvrez nos 5 conseils essentiels pour la garder hydratée et éclatante...",
    authorName: 'Dr. Alix Chen',
    publishDate: new Date('2023-11-20T10:00:00Z'),
    status: 'published',
    coverImage: 'https://picsum.photos/seed/blog1/800/600',
  },
  {
    blogId: 'blog002',
    title: 'Comment booster son immunité naturellement ?',
    slug: 'booster-immunite-naturellement',
    content: "Avec l'arrivée des saisons froides, renforcer son système immunitaire est crucial. Voici des méthodes naturelles et efficaces...",
    authorName: 'Jean Dupont',
    publishDate: new Date('2023-10-15T14:30:00Z'),
    status: 'published',
    coverImage: 'https://picsum.photos/seed/blog2/800/600',
  }
];

export const mockAnnuaire: AnnuaireEntry[] = [
    {
        entryId: 'fourn001',
        type: 'fournisseur',
        nom: 'BioSanté Distribution',
        description: 'Fournisseur principal de produits parapharmaceutiques biologiques.',
        telephone: '01 23 45 67 89',
        email: 'contact@biosante-dist.com',
        adresse: '123 Rue de la Nature, 75011 Paris'
    },
    {
        entryId: 'part001',
        type: 'partenaire',
        nom: 'Cabinet Médical Ivry Centre',
        description: 'Partenariat pour les consultations et le suivi des patients.',
        telephone: '01 98 76 54 32',
        email: 'secretariat@cabinet-ivry.fr',
        adresse: '1 Place de la Mairie, 94200 Ivry-sur-Seine'
    }
];

export const mockStockMovements: StockMovement[] = [
    {
        movementId: 'mov001',
        productId: 'prod003',
        type: 'entry',
        quantity: 50,
        performedBy: 'admin01',
        date: new Date('2023-11-01T09:00:00Z')
    },
    {
        movementId: 'mov002',
        productId: 'prod001',
        type: 'exit',
        quantity: 2,
        performedBy: 'collab01',
        date: new Date('2023-11-03T15:20:00Z')
    }
]
