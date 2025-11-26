import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Produto1",
    price: 100
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
}

describe("Unit Test create product usecase", () => {

    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });
    it("should thrown an error when product name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should thrown an error when product price is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        input.name = "Produto1";
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});