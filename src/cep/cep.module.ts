import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CepService } from '../cep/cep.service';
import { CepController } from '../cep/cep.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [HttpModule],
  providers: [CepService, PrismaService],
  controllers: [CepController],
})
export class CepModule {}
