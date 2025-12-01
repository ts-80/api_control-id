import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdFaceModule } from './idface/idface.module';
import { IdFaceController } from './idface/idface.controller';
import { IdFaceService } from './idface/idface.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [IdFaceModule, AuthModule],
  controllers: [ IdFaceController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
