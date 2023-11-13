import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dtos/create-product.dto";

export const createProductMock: CreateProductDto = {
    categoryId: categoryMock.id,
    image: 'teste',
    name: 'name mock product',
    price: 25.00,
}