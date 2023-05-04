export const enum TaskResponseValidationMessage {
  MessageNotValid = 'Message should be from 50 to 500 symbols',
  EstimationNotValid = 'Estimation should be a number from 1 to 5'
}

export const enum TaskResponseSetting {
  MessageMinLength = 50,
  MessageMaxLength = 500,
  EstimationMinValue = 1,
  EstimationMaxValue = 5,
}
