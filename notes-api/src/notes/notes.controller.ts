import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import type { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';
import { CurrentUser, Public, Groups } from '../auth/auth.decorators.js';
import { NotesService } from './notes.service.js';

@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Public()
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('me')
  me(@CurrentUser() user: CognitoAccessTokenPayload) {
    return {
      sub: user.sub,
      username: user.username,
      email: user.email,
      groups: user['cognito:groups'] ?? [],
      plan: user.notes_plan,
      scope: user.scope,
    };
  }

  @Get('notes')
  myNotes(@CurrentUser() user: CognitoAccessTokenPayload) {
    return this.notesService.findByOwner(user.sub);
  }

  @Post('notes')
  createNote(@CurrentUser() user: CognitoAccessTokenPayload, @Body() body: { text?: string }) {
    const text = body?.text?.trim();
    if (!text) {
      throw new BadRequestException('text is required');
    }
    return this.notesService.create(user.sub, String(user.email ?? user.username), text);
  }

  @Groups(['admin'])
  @Get('admin/notes')
  allNotes() {
    return this.notesService.findAll();
  }
}