import type { PreTokenGenerationV2TriggerHandler } from 'aws-lambda';

export const handler: PreTokenGenerationV2TriggerHandler = async (event) => {
  const groups = event.request.groupConfiguration.groupsToOverride ?? [];

  event.response = {
    claimsAndScopeOverrideDetails: {
      accessTokenGeneration: {
        claimsToAddOrOverride: {
          email: event.request.userAttributes.email,
          notes_plan: groups.includes('admin') ? 'unlimited' : 'standard',
        },
      },
    },
  };

  return event;
};
