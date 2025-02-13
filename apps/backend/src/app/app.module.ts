import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { AchievementModule } from '../achievement/achievement.module';
import { PathsModule } from '../paths/paths.module';
import { AnalyzeModule } from '../analyze/analyze.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    AchievementModule,
    PathsModule,
    AnalyzeModule,
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
