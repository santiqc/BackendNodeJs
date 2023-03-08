import { faker } from '@faker-js/faker';
import * as boom from '@hapi/boom';


export class ProductsService {
  public products: any[];
  constructor() {
    this.products = [];
    this.generate();
  }

  public generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  public async create(data:any) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  public find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  public async findOne(id:string) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound("product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("product is block");
    }
    return product;
  }

  public async update(id:string, changes:any) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("product not found");
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  public async delete(id:string) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("product not found");
    }
    this.products.splice(index, 1);
    return { id };
  }
}

