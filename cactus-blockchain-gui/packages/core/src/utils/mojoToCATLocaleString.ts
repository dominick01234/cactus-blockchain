import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import cactusFormatter from './cactusFormatter';

export default function mojoToCATLocaleString(mojo: string | number | BigNumber, locale?: string) {
  return cactusFormatter(mojo, Unit.MOJO)
    .to(Unit.CAT)
    .toLocaleString(locale);
}
