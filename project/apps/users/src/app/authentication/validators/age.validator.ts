import dayjs from 'dayjs';
import { registerDecorator, ValidationOptions } from 'class-validator';

export const MinimumValidAge = (
  property: number,
  validationOptions?: ValidationOptions
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'MinimumValidAge',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: Date) {
          return dayjs().diff(value, 'year') > property;
        },
      },
    });
  };
};
