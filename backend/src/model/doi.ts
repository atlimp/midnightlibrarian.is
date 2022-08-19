import { check, ValidationChain } from 'express-validator';

class Doi {

    date!: Date;

    message!: string;

    countdown!: boolean;

    public static validation(method: string, propName = ''): ValidationChain[] {
        switch (method) {
            case 'PUT': 
                return Doi.updateValidation(method, propName);
        }

        return [];
    }
    
    private static updateValidation(method: string, propName = ''): ValidationChain[] {
        const validationChain: ValidationChain[] = [];

        const props = {
            date: `${propName}date`,
            message: `${propName}message`,
            countdown: `${propName}countdown`,
        };
    
        validationChain.push(check(props.date).isISO8601().withMessage(`Data type for property ${props.date} is invalid, expected type datetime`));
        validationChain.push(check(props.message).isString().withMessage(`Data type for property ${props.message} is invalid, expected type string`));
        validationChain.push(check(props.countdown).isBoolean().withMessage(`Data type for property ${props.countdown} is invalid, expected type boolean`));
        
        return validationChain;
    }
}

export default Doi;