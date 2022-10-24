import { ProductVariantRepository } from "@medusajs/medusa/dist/repositories/product-variant";
import { MedusaError } from "medusa-core-utils";
import { BaseService } from "medusa-interfaces";
import { EntityManager } from "typeorm";
import { BarcodeType } from "../types/pos";

type InjectedDependencies = {
  manager: EntityManager;
  productVariantRepository: typeof ProductVariantRepository;
};

class PosProductVariantService extends BaseService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager | undefined;

  protected readonly productVariantRepository_: typeof ProductVariantRepository;

  constructor({ manager, productVariantRepository }: InjectedDependencies) {
    super(arguments[0]);

    this.manager_ = manager;
    this.productVariantRepository_ = productVariantRepository;
  }

  async retrieveByBarcode(barcode: string, type: BarcodeType) {
    const variantRepo = this.manager_.getCustomRepository(
      this.productVariantRepository_
    );

    const variant = await variantRepo.findOne({
      where: {
        ean: barcode,
      },
    });

    if (!variant) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `No variant with barcode ${barcode} was found`
      );
    }

    return variant;
  }
}

export default PosProductVariantService;
