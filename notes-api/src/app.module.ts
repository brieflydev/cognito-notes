import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CognitoAuthGuard } from './auth/cognito-auth.guard.js';
import { NotesController } from './notes/notes.controller.js';
import { NotesService } from './notes/notes.service.js';

@Module({
  controllers: [NotesController],
  providers: [NotesService, { provide: APP_GUARD, useClass: CognitoAuthGuard }],
})
export class AppModule {}
