import { ResponsePriceCorreiosDto } from "src/correios/dtos/response-price-correios.dto";

interface ReturnDelivery {
    deliveryTime: number;
    deliveryPrice: number;
    typeDelivery: number;
}

export class ReturnPriceDeliveryDto {
    delivery: ReturnDelivery[]

    constructor(priceCorreios: ResponsePriceCorreiosDto[]) {
        this.delivery = priceCorreios.map((priceCorreio) => ({
            deliveryPrice: Number(priceCorreio.CalcPrecoPrazoResult?.Servicos?.cServico[0]?.Valor.replace(',', '.')),
            deliveryTime: Number(priceCorreio.CalcPrecoPrazoResult?.Servicos?.cServico[0]?.PrazoEntrega),
            typeDelivery: priceCorreio.CalcPrecoPrazoResult?.Servicos?.cServico[0]?.Codigo,
        }))

    }
}