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
  StatusNotValid = 'Status should be only new, cancelled, inprogress, done, failed',
}

export const enum TaskSetting {
  TitleMinLength = 20,
  TitleMaxLength = 50,
  DescriptionMinLength = 100,
  DescriptionMaxLength = 1024,
  PriceMinValue = 0,
  AddressMinLength = 10,
  AddressMaxLength = 255,
  TagsMaxAmount = 5,
  TagMinLength = 3,
  TagMaxLength = 10,
}

export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';

export const enum TaskException {
  ChangeStatusRight = 'The user does not have enough right to change status',
  IncorrectChangeStatus = 'The status should be change only from new to inprogress or cancelled and from inprogress to done or failed. Only the executor can change status to failed',
  Unauthorized = 'The user is unauthorized',
  Forbidden = 'The user does not have enough rights for this action',
  NotExisted = 'The task is not existed',
  TaskNotNew = 'The reply can be made only for the task with status NEW',
  NotExecutorReply = 'This executor did not put the reply for this task'
}
