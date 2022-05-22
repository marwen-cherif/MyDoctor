import { createContext, useContext } from 'react';

const createGenericContext = <T>() => {
  const genericContext = createContext<T | undefined>(undefined);

  const useGenericContext = () => {
    const contextIsDefined = useContext(genericContext);

    if (!contextIsDefined) {
      throw new Error('useGenericContext must be used within a Provider');
    }

    return contextIsDefined;
  };

  return [useGenericContext, genericContext.Provider] as const;
};

export default createGenericContext;
