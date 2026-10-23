import type { PreSignUpTriggerHandler } from 'aws-lambda';

const allowedDomains = (process.env.ALLOWED_DOMAINS ?? '')
  .split(',')
  .map((domain) => domain.trim().toLowerCase())
  .filter(Boolean);

export const handler: PreSignUpTriggerHandler = async (event) => {
  // Administrators can create any user; the allowlist only applies to self sign-up.
  if (event.triggerSource === 'PreSignUp_AdminCreateUser') {
    return event;
  }

  const email = (event.request.userAttributes.email ?? '').toLowerCase();
  const domain = email.split('@')[1];

  if (!domain || !allowedDomains.includes(domain)) {
    throw new Error(`Sign-up is limited to these email domains: ${allowedDomains.join(', ')}`);
  }

  return event;
};