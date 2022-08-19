import { check, param, ValidationChain } from 'express-validator';
import ReleaseController from '../controllers/releasescontroller';
import ReleaseLink from './releaselink';

class Release {

    id!: number;

    name!: string;

    description!: string;

    type!: string;

    links!: ReleaseLink[];

    image!: string;

    active!: boolean;

    releaseDate!: Date;

    public static validation(method: string, propName = ''): ValidationChain[] {
        switch (method) {
            case 'POST':
                return Release.insertValidation(method, propName);
            case 'PUT':
                return Release.updateValidation(method, propName);
            case 'DELETE':
                return Release.deleteValidation(method, propName);
        }

        return [];    
    }

    private static insertValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];
        
        const props = {
            name: `${propName}name`,
            description: `${propName}description`,
            type: `${propName}type`,
            links: `${propName}links`,
            image: `${propName}image`,
            active: `${propName}active`,
            releaseDate: `${propName}releaseDate`,
        };
        
        validationChain.push(check(props.name).isString().withMessage(`Data type for property ${props.name} is invalid, expected type string`));
        validationChain.push(check(props.description).isString().withMessage(`Data type for property ${props.description} is invalid, expected type string`));
        validationChain.push(check(props.type).isString().withMessage(`Data type for property ${props.type} is invalid, expected type string`));
        validationChain.push(check(props.type).isIn(['single', 'video', 'album']).withMessage(`Property ${props.type} is invalid, expected value 'single', 'video' or 'album'`));
        validationChain.push(check(props.links).isArray().withMessage(`Data type for property ${props.image} is invalid, expected type array`));
        validationChain.push(check(props.image).isURL().withMessage(`Data type for property ${props.image} is invalid, expected type url`));
        validationChain.push(check(props.active).isBoolean().withMessage(`Data type for property ${props.active} is invalid, expected type boolean`));
        validationChain.push(check(props.releaseDate).isISO8601().withMessage(`Data type for property ${props.releaseDate} is invalid, expected type datetime`));
        
        ReleaseLink.validation(method, 'links.*.').forEach(x => validationChain.push(x));
        
        return validationChain;
    }
    
    private static updateValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];
        
        const props = {
            id: `${propName}id`,
            name: `${propName}name`,
            description: `${propName}description`,
            type: `${propName}type`,
            links: `${propName}links`,
            image: `${propName}image`,
            active: `${propName}active`,
            releaseDate: `${propName}releaseDate`,
        };
        
        validationChain.push(check(props.id).exists().withMessage(`Missing required property ${props.id}`));
        validationChain.push(check(props.id).custom(async (value) => {
            const controller: ReleaseController = new ReleaseController();

            const release = await controller.releaseExists(value);

            if (!release) throw new Error(`Release with id ${value} does not exist`);
        }));
        validationChain.push(check(props.name).isString().withMessage(`Data type for property ${props.name} is invalid, expected type string`));
        validationChain.push(check(props.description).isString().withMessage(`Data type for property ${props.description} is invalid, expected type string`));
        validationChain.push(check(props.type).isString().withMessage(`Data type for property ${props.type} is invalid, expected type string`));
        validationChain.push(check(props.type).isIn(['single', 'video', 'album']).withMessage(`Property ${props.type} is invalid, expected value 'single', 'video' or 'album'`));
        validationChain.push(check(props.links).isArray().withMessage(`Data type for property ${props.image} is invalid, expected type array`));
        validationChain.push(check(props.image).isURL().withMessage(`Data type for property ${props.image} is invalid, expected type url`));
        validationChain.push(check(props.active).isBoolean().withMessage(`Data type for property ${props.active} is invalid, expected type boolean`));
        validationChain.push(check(props.releaseDate).isISO8601().withMessage(`Data type for property ${props.releaseDate} is invalid, expected type datetime`));
        
        ReleaseLink.validation(method, 'links.*.').forEach(x => validationChain.push(x));
        
        return validationChain;
    }

    private static deleteValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];

        validationChain.push(param('id').custom(async (value) => {
            const controller: ReleaseController = new ReleaseController();

            const release = await controller.releaseExists(value);

            if (!release) throw new Error(`Release with id ${value} does not exist`);
        }));

        return validationChain;
    }
}

export default Release;