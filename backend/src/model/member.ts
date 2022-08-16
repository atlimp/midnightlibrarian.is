import { check, ValidationChain } from 'express-validator';

class Member {

    id!: number;

    name!: string;

    role!: string;

    description!: string;

    image!: string;

    public static validation(method: string, propName = ''): ValidationChain[] {
        switch (method) {
            case 'POST':
                return Member.insertValidation(method, propName);
            case 'PUT':
                return Member.updateValidation(method, propName);
        }

        return [];
    }

    private static insertValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];

        const props = {
            id: `${propName}id`,
            name: `${propName}name`,
            role: `${propName}role`,
            description: `${propName}description`,
            image: `${propName}image`,
        };
    
        validationChain.push(check(props.id).exists().withMessage(`Missing required property ${props.id}`));
        validationChain.push(check(props.name).isString().withMessage(`Data type for property ${props.name} is invalid, expected type string`));
        validationChain.push(check(props.role).isString().withMessage(`Data type for property ${props.role} is invalid, expected type string`));
        validationChain.push(check(props.description).isString().withMessage(`Data type for property ${props.description} is invalid, expected type string`));
        validationChain.push(check(props.image).isString().withMessage(`Data type for property ${props.image} is invalid, expected type url`));
        
        return validationChain;
    }

    private static updateValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];

        const props = {
            name: `${propName}name`,
            role: `${propName}role`,
            description: `${propName}description`,
            image: `${propName}image`,
        };
    
        validationChain.push(check(props.name).isString().withMessage(`Data type for property ${props.name} is invalid, expected type string`));
        validationChain.push(check(props.role).isString().withMessage(`Data type for property ${props.role} is invalid, expected type string`));
        validationChain.push(check(props.description).isString().withMessage(`Data type for property ${props.description} is invalid, expected type string`));
        validationChain.push(check(props.image).isString().withMessage(`Data type for property ${props.image} is invalid, expected type url`));
        
        return validationChain;
    }
}

export default Member;