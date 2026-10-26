import { type CanActivate, type ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';
import { Scopes } from './auth.decorators.js';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.getAllAndOverride(Scopes, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredScopes?.length) {
      return true;
    }

    const token: CognitoAccessTokenPayload = context.switchToHttp().getRequest().user;
    const grantedScopes = (token.scope ?? '').split(' ');
    if (!requiredScopes.every((scope) => grantedScopes.includes(scope))) {
      throw new ForbiddenException(`Requires scopes: ${requiredScopes.join(' ')}`);
    }
    return true;
  }
}