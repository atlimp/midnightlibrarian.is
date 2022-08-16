import { check, ValidationChain } from 'express-validator';

class Link {

    site!: string;

    link!: string;

    svg!: string;

    active!: boolean;

    public static validation(method: string, propName = ''): ValidationChain[] {
        switch (method) {
            case 'POST':
                return Link.insertValidation(method, propName);
            case 'PUT':
                return Link.updateValidation(method, propName);
        }

        return [];
    }
    
    private static insertValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];

        const props = {
            site: `${propName}site`,
            link: `${propName}link`,
            svg: `${propName}svg`,
            active: `${propName}active`,
        };
    
        validationChain.push(check(props.site).isString().withMessage(`Data type for property ${props.site} is invalid, expected type string`));
        validationChain.push(check(props.link).isURL().withMessage(`Data type for property ${props.link} is invalid, expected type url`));
        validationChain.push(check(props.svg).isString().withMessage(`Data type for property ${props.svg} is invalid, expected type string`));
        validationChain.push(check(props.active).isString().withMessage(`Data type for property ${props.active} is invalid, expected type boolean`));
        
        return validationChain;
    }

    private static updateValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];

        const props = {
            site: `${propName}site`,
            link: `${propName}link`,
            svg: `${propName}svg`,
            active: `${propName}active`,
        };
    
        validationChain.push(check(props.site).isDate().withMessage(`Data type for property ${props.site} is invalid, expected type date`));
        
        return validationChain;
    }
}

export default Link;