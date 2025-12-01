import { Module } from '@nestjs/common';
import { IdFaceController } from './idface.controller';
import { IdFaceService } from './idface.service';

@Module({
  controllers: [IdFaceController],
  providers: [IdFaceService],
  exports: [IdFaceService],
})
export class IdFaceModule {}
