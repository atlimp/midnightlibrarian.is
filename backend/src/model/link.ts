import { check, param, ValidationChain } from 'express-validator';
import LinksController from '../controllers/linkscontroller';

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
            case 'DELETE':
                return Link.deleteValidation(method, propName);
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
        validationChain.push(check(props.site).notEmpty().withMessage(`Invalid value for property ${props.site} value cannot be empty`));
        validationChain.push(check(props.site).custom(async (value) => {
            const controller: LinksController = new LinksController();

            const link = await controller.linkExists(value);

            if (link) throw new Error(`Link ${value} already exists`);
        }));
        validationChain.push(check(props.link).isURL().withMessage(`Data type for property ${props.link} is invalid, expected type url`));
        validationChain.push(check(props.svg).isString().withMessage(`Data type for property ${props.svg} is invalid, expected type string`));
        validationChain.push(check(props.active).isBoolean().withMessage(`Data type for property ${props.active} is invalid, expected type boolean`));
        
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
    
        validationChain.push(check(props.site).isString().withMessage(`Data type for property ${props.site} is invalid, expected type string`));
        validationChain.push(check(props.site).notEmpty().withMessage(`Invalid value for property ${props.site} value cannot be empty`));
        validationChain.push(check(props.site).custom(async (value) => {
            const controller: LinksController = new LinksController();

            const link = await controller.linkExists(value);

            if (!link) throw new Error(`Link ${value} does not exist`);
        }));
        validationChain.push(check(props.link).isURL().withMessage(`Data type for property ${props.link} is invalid, expected type url`));
        validationChain.push(check(props.svg).isString().withMessage(`Data type for property ${props.svg} is invalid, expected type string`));
        validationChain.push(check(props.active).isBoolean().withMessage(`Data type for property ${props.active} is invalid, expected type boolean`));        
        return validationChain;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private static deleteValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];
    
        validationChain.push(param('site').custom(async (value) => {
            const controller: LinksController = new LinksController();

            const link = await controller.linkExists(value);

            if (!link) throw new Error(`Link ${value} does not exist`);
        }));

        return validationChain;
    }
}

export default Link;