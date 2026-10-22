import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';

export const Public = Reflector.createDecorator<boolean>({ transform: () => true });

export const Groups = Reflector.createDecorator<string[]>();

export const Scopes = Reflector.createDecorator<string[]>();

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): CognitoAccessTokenPayload =>
    context.switchToHttp().getRequest().user,
);