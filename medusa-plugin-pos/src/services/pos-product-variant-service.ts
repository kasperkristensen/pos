import { TransactionBaseService } from "@medusajs/medusa";
import { ProductVariantRepository } from "@medusajs/medusa/dist/repositories/product-variant";
import { MedusaError } from "medusa-core-utils";
import { EntityManager } from "typeorm";
import { BarcodeType } from "../types/pos";

class POSProductVariantService extends TransactionBaseService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager | undefined;

  protected readonly productVariantRepository_: typeof ProductVariantRepository;

  constructor({ manager, productVariantRepository }) {
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
  }
}

export default POSProductVariantService;
