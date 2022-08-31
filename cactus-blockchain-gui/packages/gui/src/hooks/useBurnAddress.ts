import { useMemo } from 'react';
import { toBech32m } from '@cactus/api';
import { useCurrencyCode } from '@cactus/core';

export default function useBurnAddress(): string | undefined {
  const feeUnit = useCurrencyCode();

  const retireAddress = useMemo(() => {
    if (!feeUnit) {
      return;
    }

    return toBech32m(
      '000000000000000000000000000000000000000000000000000000000000dead',
      feeUnit,
    );
  }, [feeUnit]);

  return retireAddress;
}
