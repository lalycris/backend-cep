import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CepService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async findCep(cep: string) {
    const response = await firstValueFrom(this.httpService
      .get(`https://viacep.com.br/ws/${cep}/json/`));

    const data = response.data;
    await this.prisma.cep.create({
      data: {
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      },
    });

    return data;
  }

  async getHistory() {
    return this.prisma.cep.findMany();
  }
}

