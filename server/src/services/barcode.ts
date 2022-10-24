import { TransactionBaseService } from "@medusajs/medusa";
import { ProductVariantRepository } from "@medusajs/medusa/dist/repositories/product-variant";
import { MedusaError } from "medusa-core-utils";
import { EntityManager } from "typeorm";

type InjectedDependencies = {
  manager: EntityManager;
  productVariantRepository: typeof ProductVariantRepository;
};

class BarcodeService extends TransactionBaseService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager | undefined;

  protected readonly productVariantRepository_: typeof ProductVariantRepository;

  constructor({ manager, productVariantRepository }: InjectedDependencies) {
    super(arguments[0]);

    this.manager_ = manager;
    this.productVariantRepository_ = productVariantRepository;
  }

  async retrieveByBarcode(barcode: string) {
    const variantRepo = this.manager_.getCustomRepository(
      this.productVariantRepository_
    );

    const variant = await variantRepo.findOne({
      where: {
        ean: barcode,
      },
      relations: ["product", "product.variants"],
    });

    if (!variant) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `No variant with barcode ${barcode} was found`
      );
    }

    return variant;
  }

  async getInventoryStatus(barcode: string) {
    const variant = await this.retrieveByBarcode(barcode);

    if (!variant.product?.variants?.length) {
      return {
        [variant.id]: variant.inventory_quantity,
      };
    }

    const inventoryStatus = variant.product.variants.reduce((acc, curr) => {
      acc[curr.id] = curr.inventory_quantity;
      return acc;
    }, {});

    return inventoryStatus;
  }
}

export default BarcodeService;
