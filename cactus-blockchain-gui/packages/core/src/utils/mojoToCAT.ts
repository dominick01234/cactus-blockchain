import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import cactusFormatter from './cactusFormatter';

export default function mojoToCAT(mojo: string | number | BigNumber): BigNumber {
  return cactusFormatter(mojo, Unit.MOJO)
    .to(Unit.CAT)
    .toBigNumber();
}