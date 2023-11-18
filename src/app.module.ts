import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobProviderModule } from './jobProvider/jobProvider.module';
import { JobProvider } from './entities/jobProvider.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './entities/admin.entities';
import { CompanyInfo } from './entities/companyInfo.entities';
import { JobSeeker } from './entities/jobSeeker.entities';

@Module({
  imports: [AdminModule, JobProviderModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'admin',//Change to your database name
      entities: [Admin, JobProvider, CompanyInfo, JobSeeker],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
