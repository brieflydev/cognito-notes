'use client';

import { useEffect, useState } from 'react';
import { Button, Flex, Heading, Text } from '@aws-amplify/ui-react';
import { fetchAuthSession, signInWithRedirect, signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const { tokens } = await fetchAuthSession();
      setEmail(tokens?.idToken ? String(tokens.idToken.payload.email) : null);
      setLoading(false);
    };

    loadSession();
    return Hub.listen('auth', ({ payload }) => {
      if (['signedIn', 'signedOut', 'signInWithRedirect'].includes(payload.event)) {
        loadSession();
      }
    });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex direction="column" gap="1rem">
      <Heading level={2}>Notes</Heading>
      {email ? (
        <>
          <Text>Signed in as {email}</Text>
          <Flex>
            <Button onClick={() => signOut()}>Sign out</Button>
          </Flex>
        </>
      ) : (
        <>
          <Text>You are not signed in.</Text>
          <Flex>
            <Button variation="primary" onClick={() => signInWithRedirect()}>
              Sign in with managed login
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
}