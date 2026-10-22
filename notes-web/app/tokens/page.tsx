'use client';

import { useEffect, useState } from 'react';
import { Button, Flex, Heading, Text } from '@aws-amplify/ui-react';
import { type AuthTokens, fetchAuthSession } from 'aws-amplify/auth';

export default function TokensPage() {
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchAuthSession().then((session) => {
      setTokens(session.tokens ?? null);
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return <Text>Loading...</Text>;
  }
  if (!tokens) {
    return <Text>Sign in first to see your tokens.</Text>;
  }

  const expiresAt = new Date((tokens.accessToken.payload.exp ?? 0) * 1000);

  return (
    <Flex direction="column" gap="1rem">
      <Heading level={2}>ID token claims</Heading>
      <pre>{JSON.stringify(tokens.idToken?.payload, null, 2)}</pre>

      <Heading level={2}>Access token claims</Heading>
      <Text>Expires at {expiresAt.toLocaleTimeString()}</Text>
      <pre>{JSON.stringify(tokens.accessToken.payload, null, 2)}</pre>

      <Flex>
        <Button onClick={() => navigator.clipboard.writeText(tokens.accessToken.toString())}>
          Copy access token
        </Button>
        <Button onClick={() => navigator.clipboard.writeText(tokens.idToken?.toString() ?? '')}>
          Copy ID token
        </Button>
      </Flex>
    </Flex>
  );
}
