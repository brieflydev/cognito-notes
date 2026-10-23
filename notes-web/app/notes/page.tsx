'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import NotesBoard from '@/components/NotesBoard';

export default function NotesPage() {
  return (
    <Authenticator>
      {({ signOut }) => <NotesBoard onSignOut={signOut} />}
    </Authenticator>
  );
}