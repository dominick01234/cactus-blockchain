import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import cactusFormatter from './cactusFormatter';

export default function catToMojo(cat: string | number | BigNumber): BigNumber {
  return cactusFormatter(cat, Unit.CAT)
    .to(Unit.MOJO)
    .toBigNumber();
}