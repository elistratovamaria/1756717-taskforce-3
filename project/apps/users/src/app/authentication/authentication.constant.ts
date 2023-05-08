export const enum AuthException {
  Exists = 'User with this email exists',
  IsAuthorized = 'User is authorized',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  NotExecutor = 'Only executor can subscribe'
}

export const enum AuthUserValidationMessage {
  NameNotValid = 'User name should have from 3 to 50 symbols',
  EmailNotValid = 'The email is not valid',
  CityNotValid = 'The city can be only Moscow, SaintPetersburg or Vladivostok',
  PasswordNotValid = 'The password should be from 6 to 12 symbols',
  UserRoleNotValid = 'The user can be only customer or executor',
  DateBirthNotValid = 'The date of birth is not valid',
  DateBirthMinor = 'User should be older than 18',
  InfoNotValid = 'Info should be less than 300 symbols',
  SpecialtiesAmount = 'There should be less than 5 specialities',
  SpecialtiesUnique = 'All specialities should be unique',
}

export const enum UserSetting {
  NameMinLength = 3,
  NameMaxLength = 50,
  PasswordMinLength = 6,
  PasswordMaxLength = 12,
  InfoMaxLength = 300,
  MinimumAge = 18,
  SpecialtiesMaxAmount = 5
}
