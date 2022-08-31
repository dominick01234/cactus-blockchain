import React, { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { useCurrencyCode, mojoToCactusLocaleString, CardSimple, useLocale } from '@cactus/core';
import { useGetFarmedAmountQuery } from '@cactus/api-react';

export default function FarmCardTotalCactusFarmed() {
  const currencyCode = useCurrencyCode();
  const [locale] = useLocale();
  const { data, isLoading, error } = useGetFarmedAmountQuery();

  const farmedAmount = data?.farmedAmount;

  const totalCactusFarmed = useMemo(() => {
    if (farmedAmount !== undefined) {
      return (
        <>
          {mojoToCactusLocaleString(farmedAmount, locale)}
          &nbsp;
          {currencyCode}
        </>
      );
    }
  }, [farmedAmount, locale, currencyCode]);

  return (
    <CardSimple
      title={<Trans>Total Cactus Farmed</Trans>}
      value={totalCactusFarmed}
      loading={isLoading}
      error={error}
    />
  );
}
