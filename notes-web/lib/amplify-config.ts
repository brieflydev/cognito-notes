import type { ResourcesConfig } from 'aws-amplify';

const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

export const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: { required: true },
      },
      loginWith: {
        email: true,
        oauth: {
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
          scopes: ['openid', 'email', 'phone'],
          redirectSignIn: [appUrl],
          redirectSignOut: [appUrl],
          responseType: 'code',
        },
      },
    },
  },
};