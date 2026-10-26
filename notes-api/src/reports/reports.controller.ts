import { Controller, Get } from '@nestjs/common';
import type { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';
import { CurrentUser, Scopes } from '../auth/auth.decorators.js';
import { NotesService } from '../notes/notes.service.js';

@Controller('reports')
export class ReportsController {
  constructor(private readonly notesService: NotesService) {}

  @Scopes(['notes-api/reports.read'])
  @Get('summary')
  summary(@CurrentUser() caller: CognitoAccessTokenPayload) {
    const notes = this.notesService.findAll();
    return {
      requestedBy: caller.client_id,
      totalNotes: notes.length,
      authors: new Set(notes.map((note) => note.ownerId)).size,
    };
  }
}