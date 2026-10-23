'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { Button, Card, Flex, Heading, Text, TextField } from '@aws-amplify/ui-react';
import { apiFetch } from '@/lib/api';

interface Note {
  id: string;
  ownerEmail: string;
  text: string;
  createdAt: string;
}

interface Me {
  email?: string;
  groups: string[];
  plan?: string;
}

export default function NotesBoard({ onSignOut }: { onSignOut?: () => void }) {
  const [me, setMe] = useState<Me | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [allNotes, setAllNotes] = useState<Note[] | null>(null);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setMe(await apiFetch<Me>('/me'));
        setNotes(await apiFetch<Note[]>('/notes'));
      } catch (err) {
        setError((err as Error).message);
      }
    };
    load();
  }, []);

  async function addNote(event: FormEvent) {
    event.preventDefault();
    setError(null);
    try {
      const note = await apiFetch<Note>('/notes', { method: 'POST', body: JSON.stringify({ text }) });
      setNotes((current) => [...current, note]);
      setText('');
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function loadAllNotes() {
    setError(null);
    try {
      setAllNotes(await apiFetch<Note[]>('/admin/notes'));
    } catch (err) {
      setAllNotes(null);
      setError((err as Error).message);
    }
  }

  return (
    <Flex direction="column" gap="1rem">
      <Heading level={2}>My notes</Heading>
      {me && (
        <Text>
          Signed in as {me.email} | groups: {me.groups.join(', ') || 'none'} | plan: {me.plan ?? 'n/a'}
        </Text>
      )}

      <form onSubmit={addNote}>
        <Flex alignItems="flex-end">
          <TextField label="New note" value={text} onChange={(e) => setText(e.target.value)} />
          <Button type="submit" variation="primary">
            Add note
          </Button>
        </Flex>
      </form>

      {notes.map((note) => (
        <Card key={note.id} variation="outlined">
          {note.text}
        </Card>
      ))}

      <Flex>
        <Button onClick={loadAllNotes}>Load all notes (admin only)</Button>
        <Button onClick={onSignOut}>Sign out</Button>
      </Flex>

      {error && <Text color="red">{error}</Text>}

      {allNotes && (
        <>
          <Heading level={3}>All notes</Heading>
          {allNotes.map((note) => (
            <Card key={note.id} variation="outlined">
              {note.text} <Text as="span" color="gray">by {note.ownerEmail}</Text>
            </Card>
          ))}
        </>
      )}
    </Flex>
  );
}