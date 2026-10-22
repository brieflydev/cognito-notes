import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

export interface Note {
  id: string;
  ownerId: string;
  ownerEmail: string;
  text: string;
  createdAt: string;
}

@Injectable()
export class NotesService {
  private readonly notes: Note[] = [];

  findByOwner(ownerId: string): Note[] {
    return this.notes.filter((note) => note.ownerId === ownerId);
  }

  findAll(): Note[] {
    return this.notes;
  }

  create(ownerId: string, ownerEmail: string, text: string): Note {
    const note: Note = { id: randomUUID(), ownerId, ownerEmail, text, createdAt: new Date().toISOString() };
    this.notes.push(note);
    return note;
  }
}
