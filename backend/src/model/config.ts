import Doi from './doi';
import { check, ValidationChain } from 'express-validator';

class Config {

    doi!: Doi;

    motd!: string;

    showAdditionalContent!: boolean;

    public static validation(method: string): ValidationChain[] {
        switch (method) {
            case 'PUT':
                return Config.updateValidation(method);
        }

        return [];
    }

    private static updateValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];

        const props = {
            motd: `${propName}motd`,
            showAdditionalContent: `${propName}showAdditionalContent`,
        };

        Doi.validation(method, 'doi.').forEach(x => {
            validationChain.push(x); 
        });

        validationChain.push(check(props.motd).isString().withMessage(`Data type for property ${props.motd} is invalid, expected type string`));
        validationChain.push(check(props.showAdditionalContent).isBoolean().withMessage(`Data type for property ${props.showAdditionalContent} is invalid, expected type boolean`));


        return validationChain;
    }
}

export default Config;