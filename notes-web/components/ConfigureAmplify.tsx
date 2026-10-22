'use client';

import { Amplify } from 'aws-amplify';
import 'aws-amplify/auth/enable-oauth-listener';
import { amplifyConfig } from '@/lib/amplify-config';

Amplify.configure(amplifyConfig);

export default function ConfigureAmplify() {
  return null;
}