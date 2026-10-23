import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import type { PostConfirmationTriggerHandler } from 'aws-lambda';

const cognito = new CognitoIdentityProviderClient({});
const defaultGroup = process.env.DEFAULT_GROUP ?? 'user';

export const handler: PostConfirmationTriggerHandler = async (event) => {
  // This trigger also runs after a forgotten-password reset; only act on new sign-ups.
  if (event.triggerSource !== 'PostConfirmation_ConfirmSignUp') {
    return event;
  }

  await cognito.send(
    new AdminAddUserToGroupCommand({
      UserPoolId: event.userPoolId,
      Username: event.userName,
      GroupName: defaultGroup,
    }),
  );

  console.log(`Added ${event.userName} to group ${defaultGroup}`);
  return event;
};
