import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CognitoAuthGuard } from './auth/cognito-auth.guard.js';
import { GroupsGuard } from './auth/groups.guard.js';
import { ScopesGuard } from './auth/scopes.guard.js';
import { NotesController } from './notes/notes.controller.js';
import { NotesService } from './notes/notes.service.js';
import { ReportsController } from './reports/reports.controller.js';

@Module({
  controllers: [NotesController, ReportsController],
  providers: [
    NotesService,
    { provide: APP_GUARD, useClass: CognitoAuthGuard },
    { provide: APP_GUARD, useClass: GroupsGuard },
    { provide: APP_GUARD, useClass: ScopesGuard },
  ],
})
export class AppModule {}