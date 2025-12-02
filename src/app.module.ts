import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdFaceModule } from './idface/idface.module';
import { IdFaceController } from './idface/idface.controller';
import { IdFaceService } from './idface/idface.service';
import { ControlIdService } from './auth/controlid.service';
import { ControlIdController } from './auth/controlid.controller';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [IdFaceModule, AuthModule, HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    })],
  controllers: [ IdFaceController, ControlIdController],
  providers: [AppService, ControlIdService],
})
export class AppModule {}
