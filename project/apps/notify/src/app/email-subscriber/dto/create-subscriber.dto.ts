import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailSubscriberValidationMessage } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailSubscriberValidationMessage.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: EmailSubscriberValidationMessage.NameIsEmpty })
  public name: string;

  @IsNotEmpty({ message: EmailSubscriberValidationMessage.UserIdIsEmpty })
  public userId: string;
}
