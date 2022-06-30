import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import cactusFormatter from './cactusFormatter';

export default function mojoToCactusLocaleString(mojo: string | number | BigNumber, locale?: string) {
  return cactusFormatter(mojo, Unit.MOJO)
    .to(Unit.CACTUS)
    .toLocaleString(locale);
}
