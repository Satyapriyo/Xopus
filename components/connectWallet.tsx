import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

// omitted for brevity

export const WalletConnect = () => {
  return (
    <Wallet className='text-white'>
      <ConnectWallet className='px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white rounded-xl font-medium dark:text-white transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-500/30 flex items-center space-x-2'>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
      <WalletDropdown>
        <Identity
          className="px-4 pt-3 pb-2"
          hasCopyAddressOnClick
        >
          <Avatar />
          <Name />
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownBasename />
        <WalletDropdownLink
          icon="wallet"
          href="https://keys.coinbase.com"
        >
          Wallet
        </WalletDropdownLink>
        <WalletDropdownFundLink />
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  )

}