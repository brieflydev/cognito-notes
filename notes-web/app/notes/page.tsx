'use client';

import { Authenticator, Button, Flex, Heading, Text } from '@aws-amplify/ui-react';

export default function NotesPage() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Flex direction="column" gap="1rem">
          <Heading level={2}>My notes</Heading>
          <Text>Signed in as {user?.signInDetails?.loginId ?? user?.username}</Text>
          <Flex>
            <Button onClick={signOut}>Sign out</Button>
          </Flex>
        </Flex>
      )}
    </Authenticator>
  );
}