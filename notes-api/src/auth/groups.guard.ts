import { type CanActivate, type ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';
import { Groups } from './auth.decorators.js';

@Injectable()
export class GroupsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredGroups = this.reflector.getAllAndOverride(Groups, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredGroups?.length) {
      return true;
    }

    const user: CognitoAccessTokenPayload = context.switchToHttp().getRequest().user;
    const userGroups = user['cognito:groups'] ?? [];
    if (!requiredGroups.some((group) => userGroups.includes(group))) {
      throw new ForbiddenException(`Requires one of these groups: ${requiredGroups.join(', ')}`);
    }
    return true;
  }
}