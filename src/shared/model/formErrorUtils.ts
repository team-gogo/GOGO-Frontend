import { FieldErrors } from 'react-hook-form';

/**
 * Extracts error messages from FieldErrors.
 * @param errors - The FieldErrors object from react-hook-form.
 * @returns A list of error messages.
 */
export const extractErrorMessages = (errors: FieldErrors): string[] => {
  const messages: string[] = [];

  const traverseErrors = (errorObj: FieldErrors) => {
    Object.values(errorObj).forEach((error) => {
      if (error && typeof error === 'object' && 'message' in error) {
        messages.push(error.message as string);
      } else if (error && typeof error === 'object') {
        traverseErrors(error as FieldErrors);
      }
    });
  };

  traverseErrors(errors);
  return messages;
};

/**
 * Handles form submission errors by extracting and displaying the first error message.
 * @param errors - The FieldErrors object from react-hook-form.
 * @param showError - Callback to display the error message (e.g., toast).
 */
export const handleFormErrors = (
  errors: FieldErrors,
  showError: (message: string) => void,
) => {
  const errorMessages = extractErrorMessages(errors);
  if (errorMessages.length > 0) {
    showError(errorMessages[0]);
  }
};
