export const formatStageCreateData = <T>(
  obj: T,
  formType: 'fast' | 'official',
): T => {
  if (obj === null || obj === undefined) return undefined as unknown as T;

  if (Array.isArray(obj)) {
    return obj
      .map((item) => formatStageCreateData(item, formType))
      .filter((item) => item !== undefined && item !== '') as unknown as T;
  }

  if (typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      let cleanedValue = formatStageCreateData(value, formType);

      if (
        formType === 'fast' &&
        key === 'game' &&
        Array.isArray(cleanedValue) &&
        cleanedValue.length > 0
      ) {
        cleanedValue = cleanedValue[0];
      }

      if (cleanedValue !== undefined && cleanedValue !== '') {
        (acc as Record<string, unknown>)[key] = cleanedValue;
      }
      return acc;
    }, {} as T);
  }

  return obj;
};
