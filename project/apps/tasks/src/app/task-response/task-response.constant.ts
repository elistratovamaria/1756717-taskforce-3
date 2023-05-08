export const enum TaskResponseValidationMessage {
  MessageNotValid = 'Message should be from 50 to 500 symbols',
  EstimationNotValid = 'Estimation should be a number from 1 to 5'
}

export const enum TaskResponseException {
  Forbidden = 'You can make a response only for those executors who have done your task',
  Unauthorized = 'The user is unauthorized',
  NotExisted = 'The task is not existed',
  ResponseExists = 'The response on this task already exists',
  Status = 'Responses could be created only for tasks with done status'
}

export const enum TaskResponseSetting {
  MessageMinLength = 50,
  MessageMaxLength = 500,
  EstimationMinValue = 1,
  EstimationMaxValue = 5,
}
