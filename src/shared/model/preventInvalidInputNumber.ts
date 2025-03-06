import { ChangeEvent } from 'react';

export const preventInvalidInputNumber = (
  event: ChangeEvent<HTMLInputElement>,
) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
};
