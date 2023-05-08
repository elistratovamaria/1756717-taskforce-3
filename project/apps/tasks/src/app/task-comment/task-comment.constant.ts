export const enum TaskCommentValidationMessage {
  MessageNotValid = 'Message should be from 10 to 300 symbols'
}

export const enum TaskCommentSetting {
  MessageMinLength = 10,
  MessageMaxLength = 300,
}

export const DEFAULT_COMMENT_COUNT_LIMIT = 50;

export const enum TaskCommentException {
  Unauthorized = 'The user is unauthorized',
  Forbidden = 'The user does not have enough rights for this action',
}
