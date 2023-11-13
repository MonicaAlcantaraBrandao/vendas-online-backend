import { categoryMock } from "../../category/__mocks__/category.mock";
import { UpdateProductDto } from "../dtos/update-product.dto";

export const updateProductMock: UpdateProductDto = {
    categoryId: categoryMock.id,
    image: 'teste2',
    name: 'name mock product2',
    price: 255.00,
}