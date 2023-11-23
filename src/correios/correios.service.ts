import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { CityService } from '../city/city.service';
import { CityEntity } from '../city/entities/city.entity';
import { ReturnCepExternalDto } from './dtos/return-cep-external.dto';
import { ReturnCepDto } from './dtos/return-cep.dto';
import { SizeProductDto } from './dtos/size-product.dto';
import { ResponsePriceCorreiosDto } from './dtos/response-price-correios.dto';
import { CdFormatEnum } from './enums/cd-format.enum';
import { Client } from 'nestjs-soap';


@Injectable()
export class CorreiosService {
  URL_CORREIOS = process.env.URL_CEP_CORREIOS;
  CEP_COMPANY = process.env.CEP_COMPANY;
  constructor(
    @Inject('SOAP_CORREIOS') private readonly soapClient: Client,
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAddressByCep(cep: string): Promise<ReturnCepDto> {
    const returnCep: ReturnCepExternalDto = await this.httpService.axiosRef
      .get<ReturnCepExternalDto>(this.URL_CORREIOS.replace('{cep}', cep))
      .then((result) => {
        if (result.data.erro === 'true') {
          throw new NotFoundException('CEP not found');
        }
        return result.data;
      })
      .catch((error: AxiosError) => {
        throw new BadRequestException(
          `Error in connection request ${error.message}`,
        );
      });

    const city: CityEntity | undefined = await this.cityService
      .findCityByName(returnCep.localidade, returnCep.uf)
      .catch(() => undefined);

    return new ReturnCepDto(returnCep, city?.id, city?.state?.id);
  }

  async priceDelivery(
    cdService: string,
    cep: string,
    sizeProduct: SizeProductDto,
  ): Promise<ResponsePriceCorreiosDto> {
    return new Promise((resolve) => {
      this.soapClient.CalcPrecoPrazo(
        {
            nCdEmpresa:'',
            sDsSenha: '',
            nCdServico: cdService,
            sCepOrigem: this.CEP_COMPANY,
            sCepDestino: cep,
            nVlPeso: sizeProduct.weight,
            nCdFormato: CdFormatEnum.BOX,
            nVlComprimento: sizeProduct.length,
            nVlAltura: sizeProduct.height,
            nVlLargura: sizeProduct.width,
            nVlDiametro: sizeProduct.diameter,
            sCdMaoPropria: 'N',
            nVlValorDeclarado: sizeProduct.productValue < 25 ? 0 : sizeProduct.productValue,
            sCdAvisoRecebimento: 'N'
        },
        (_, res: ResponsePriceCorreiosDto) => {
          if (res) {
            resolve(res);
          } else {
            throw new BadRequestException('Error SOAP');
          }
        },
      );
    });
  }
}
