import { useMemo } from 'react';
import type { Wallet } from '@cactus/api';
import { WalletType } from '@cactus/api';
import BigNumber from 'bignumber.js';
import { mojoToCATLocaleString, mojoToCactusLocaleString, useLocale } from '@cactus/core';

export default function useWalletHumanValue(wallet: Wallet, value?: string | number | BigNumber, unit?: string): string {
  const [locale] = useLocale();
  
  return useMemo(() => {
    if (wallet && value !== undefined) {
      const localisedValue = wallet.type === WalletType.CAT
        ? mojoToCATLocaleString(value, locale)
        : mojoToCactusLocaleString(value, locale);

      return `${localisedValue} ${unit}`;
    }

    return '';
  }, [wallet, value, unit, locale]);
}
