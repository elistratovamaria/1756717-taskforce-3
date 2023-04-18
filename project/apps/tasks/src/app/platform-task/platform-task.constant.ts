export const enum PlatformTaskValidationMessage {
  TitleNotValid = 'Title should have from 20 to 50 symbols',
  DescriptionNotValid = 'Description should have from 100 to 1024 symbols',
  PriceNotValid = 'Price should be more or equal 0',
  DeadlineNotValid = 'Deadline should be a valid date and cannot be before current date',
  ImageNotValid = 'Image should have .png or .jpg format',
  AddressNotValid = 'Address should have from 10 to 255 symbols',
  CityNotValid = 'The city can be only Moscow, SaintPetersburg or Vladivostok',
  TagsAmountNotValid = 'The amount of tags should be less or equal 5',
  TagsLengthNotValid = 'Tag length should be from 3 to 10 symbols',
}
