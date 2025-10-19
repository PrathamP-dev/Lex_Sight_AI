'use server';

import { getSession } from '@/lib/auth';
import { getDocumentsByUserId, createDocument as dbCreateDocument, deleteDocumentById, getDocumentById as dbGetDocumentById } from '@/lib/db';

export type Document = {
  id: string;
  name: string;
  type: 'contract' | 'report' | 'proposal';
  content: string;
  created_at: string;
};

type NewDocument = {
  name: string;
  content: string;
  type: 'contract' | 'report' | 'proposal';
};

export async function getDocuments(): Promise<Document[]> {
  const session = await getSession();
  
  if (!session?.user?.id) {
    return [];
  }

  const docs = await getDocumentsByUserId(session.user.id);
  
  return docs
    .map(doc => ({
      id: doc.id,
      name: doc.name,
      type: doc.type as 'contract' | 'report' | 'proposal',
      content: doc.content,
      created_at: doc.created_at.toISOString(),
    }))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function addDocument(doc: NewDocument): Promise<string> {
  const session = await getSession();
  
  if (!session?.user?.id) {
    throw new Error('You must be logged in to add documents');
  }

  const newDocument = await dbCreateDocument({
    user_id: session.user.id,
    name: doc.name,
    content: doc.content,
    type: doc.type,
  });

  return newDocument.id;
}

export async function deleteDocument(id: string): Promise<void> {
  const session = await getSession();
  
  if (!session?.user?.id) {
    throw new Error('You must be logged in to delete documents');
  }

  const doc = await dbGetDocumentById(id);
  
  if (!doc || doc.user_id !== session.user.id) {
    throw new Error('Document not found or you do not have permission to delete it');
  }

  await deleteDocumentById(id);
}
