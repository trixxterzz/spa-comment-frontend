import { useCallback } from "react";

export const useYupResolver = (validationSchema) =>
    useCallback(
      async (data) => {
        try {
          const values = await validationSchema.validate(data, {
            abortEarly: false,
          });
  
          return {
            values,
            errors: {},
          };
        } catch (errors) {
          console.dir(errors);
  
          return {
            values: {},
            errors: errors?.inner?.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path]: {
                  type: currentError.type ?? 'validation',
                  message: currentError.message,
                },
              }),
              {}
            ) || {},
          };
        }
      },
      [ validationSchema ]
);