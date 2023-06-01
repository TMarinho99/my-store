import { Request, Response } from "express";
import { CreateProductsUseCase } from "./createProductsUseCase";

export class CreateProductsController {
  async handle(request: Request, response: Response) {
    const {
      name,
      description,
      sellPrice,
      purchasePrice,
      quantity,
      categoryId,
      storeId,
    } = request.body;

    const createProductUseCase = new CreateProductsUseCase();
    const result = await createProductUseCase.execute({
      name,
      description,
      sellPrice,
      purchasePrice,
      quantity,
      categoryId,
      storeId,
    });

    return response.json(result);
  }
}
