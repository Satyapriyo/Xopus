"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


import TransactionComponents from "./transactionComponent";

interface WalletConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnected: () => void; // required
}
export function WalletConnectModal({
    isOpen,
    onClose,
}: WalletConnectModalProps) {

   
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <TransactionComponents  />
                    </DialogTitle>

                </DialogHeader>
                <DialogDescription>
                    Connect your wallet to continue with the chat and make payments.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}