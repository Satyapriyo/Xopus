import { useCallback } from 'react';
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import {
    Transaction,
    TransactionButton,
    TransactionSponsor,
    TransactionStatus,
    TransactionStatusAction,
    TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { calls } from '@/calls';


export default function TransactionComponents() {
    const { address } = useAccount();

    const handleOnStatus = useCallback((status: LifecycleStatus) => {
        console.log('LifecycleStatus', status);

        // Debug paymaster status
        if (status.statusName === 'error') {
            console.error('Transaction error:', status.statusData);
        }

        if (status.statusName === 'success') {
            console.log('Transaction successful:', status.statusData);
           
        }
    }, []);


    return address ? (
        <Transaction
            calls={calls}
            onStatus={handleOnStatus}
            isSponsored={true}
        >
            <TransactionButton />
            <TransactionSponsor />
            <TransactionStatus>
                <TransactionStatusLabel />
                <TransactionStatusAction />
            </TransactionStatus>
        </Transaction>
    ) : (
        <Wallet>
            <ConnectWallet>
                <Avatar className='h-6 w-6' />
                <Name />
            </ConnectWallet>
        </Wallet>
    );
};