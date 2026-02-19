export interface User {
  userId: string;
  role: 'admin' | 'collaborateur' | 'client';
  nom: string;
  prenom: string;
  email: string;
  photoURL: string;
  telephone?: string;
  adresse?: string;
  createdAt?: Date;
  active: boolean;
}

export interface Product {
  productId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  stock: number;
  reorderThreshold?: number; 
  salesHistory?: { date: string; quantitySold: number }[];
  category: 'parapharmacie' | 'complements' | 'materiel-medical' | string;
  subcategory?: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost {
  blogId: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  authorId?: string;
  authorName: string;
  publishDate: Date;
  status: 'draft' | 'published';
  coverImage: string;
  createdAt?: Date;
}

export interface AnnuaireEntry {
  entryId: string;
  type: 'fournisseur' | 'partenaire' | 'client';
  nom: string;
  description: string;
  telephone: string;
  email: string;
  adresse: string;
  createdBy?: string;
  createdAt?: Date;
}

export interface Conversation {
  conversationId: string;
  participants: string[]; // array of userIds
  lastMessage: string;
  updatedAt: Date;
  messages: Message[];
}

export interface Message {
  messageId: string;
  senderId: string;
  text: string;
  createdAt: Date;
  read: boolean;
}

export interface Appointment {
  appointmentId: string;
  clientId: string;
  assignedTo: string; // admin or collab userId
  date: Date;
  status: 'pending' | 'confirmed' | 'done';
  meetLink: string;
}

export interface StockMovement {
  movementId: string;
  productId: string;
  type: 'entry' | 'exit';
  quantity: number;
  performedBy: string; // userId
  date: Date;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: any; // Firestore ServerTimestamp
  isRead?: boolean;
}
