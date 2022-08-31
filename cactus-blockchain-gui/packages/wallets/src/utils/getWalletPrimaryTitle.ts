import { WalletType } from '@cactus/api';
import type { Wallet } from '@cactus/api';

export default function getWalletPrimaryTitle(wallet: Wallet): string {
  switch (wallet.type) {
    case WalletType.STANDARD_WALLET:
      return 'Cactus';
    default:
      return wallet.meta?.name ?? wallet.name;
  }
}
