export const SALT_ROUNDS = 10;

export const enum PlatformUserValidationMessage {
  NameNotValid = 'User name should have from 3 to 50 symbols',
  CityNotValid = 'The city can be only Moscow, SaintPetersburg or Vladivostok',
  PasswordNotValid = 'The password should be from 6 to 12 symbols',
  DateBirthNotValid = 'The date of birth is not valid',
  DateBirthMinor = 'User should be older than 18',
  InfoNotValid = 'Info should be less than 300 symbols',
  SpecialityLength = 'There should be less than 5 specialities',
  SpecialityUnique = 'All specialities should be unique',
}

