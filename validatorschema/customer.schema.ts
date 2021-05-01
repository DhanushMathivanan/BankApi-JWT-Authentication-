import * as  joi from 'joi';

export class CustomerSchema {
    public CreateCustomerSchema() {
        return joi.object({
            CustomerName: joi.string().required(),
            CustomerInitial: joi.string().required(),
            WithInBank: joi.boolean().required(),
            Amount: joi.number().required(),
            Password: joi.string().required()
        });
    }

    public GetCustomerSchema() {
        return joi.array().items(
            joi.object({
                CustomerName: joi.string().required(),
                CustomerInitial: joi.string().required(),
                WithInBank: joi.any().required(),
                CustomerID: joi.number().required(),
                CreatedOn: joi.date().required()
            })
        ).required();
    }
}
