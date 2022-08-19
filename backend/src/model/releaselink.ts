import { check, ValidationChain } from 'express-validator';

class ReleaseLink {

    site!: string;

    link!: string;

    public static validation(method: string, propName = ''): ValidationChain[] {
        switch (method) {
            case 'POST':
                return ReleaseLink.insertValidation(method, propName);
            case 'PUT':
                return ReleaseLink.updateValidation(method, propName);
        }

        return [];
    }

    private static insertValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];

        const props = {
            site: `${propName}site`,
            link: `${propName}link`,
        };
    
        validationChain.push(check(props.site).isString().withMessage(`Data type for property ${props.site} is invalid, expected type string`));
        validationChain.push(check(props.link).isURL().withMessage(`Data type for property ${props.link} is invalid, expected type url`));
        
        return validationChain;
    }

    private static updateValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];

        const props = {
            site: `${propName}site`,
            link: `${propName}link`,
        };
    
        validationChain.push(check(props.site).isString().withMessage(`Data type for property ${props.site} is invalid, expected type string`));
        validationChain.push(check(props.link).isURL().withMessage(`Data type for property ${props.link} is invalid, expected type url`));
        
        return validationChain;
    }
}

export default ReleaseLink;