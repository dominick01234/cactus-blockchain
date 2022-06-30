import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import cactusFormatter from './cactusFormatter';

export default function cactusToMojo(cactus: string | number | BigNumber): BigNumber {
  return cactusFormatter(cactus, Unit.CACTUS)
    .to(Unit.MOJO)
    .toBigNumber();
}