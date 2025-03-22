export const formatStageCreateData = <T>(obj: T): T => {
  if (obj === null || obj === undefined) return undefined as unknown as T;

  if (Array.isArray(obj)) {
    return obj
      .map((item) => formatStageCreateData(item))
      .filter((item) => item !== undefined && item !== '') as unknown as T;
  }

  if (typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = formatStageCreateData(value);
      if (cleanedValue !== undefined && cleanedValue !== '') {
        (acc as Record<string, unknown>)[key] = cleanedValue;
      }
      return acc;
    }, {} as T);
  }

  return obj;
};
