//モーダルの状態遷移を管理するコンテキスト

import React, { createContext, useContext, useState, ReactNode } from 'react';

import AuthComp from '../component/ModalComponents/AuthpageComp';
import CheckformComp from '../component/ModalComponents/CheckformComp';
import CompleteComp from '../component/ModalComponents/CompleteComp';
import FormComp from '../component/ModalComponents/FormComp';
import PaymentComp from '../component/ModalComponents/PaymentComp';

// モーダルの型を拡張
type ModalType = 'Mreport' | 'MselectDayMentee' | 'Mcancel' | 'MselectDayMentor' |
                'auth' | 'checkform' | 'complete' | 'detail' | 'form' | 'payment' | null;


// モーダルの型
interface ModalContextProps {
    isOpen: boolean;
    openModal: (type: ModalType, data?: any) => void;
    closeModal: () => void;
}

// Contextを作成
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Contextプロバイダー
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    // AuthComp, DetailComp, FormComp, CheckformCompコンポーネントで使用されています
    // モーダルの状態遷移を管理するために必要です
    const [comp, setComp] = useState('default');  // モーダル内の状態管理用
    const [modalData, setModalData] = useState<any>(null);

    const openModal = (type: ModalType, data?: any) => {
        setModalType(type);
        setModalData(data);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalType(null);
        setComp('default');  // モーダルを閉じる時に状態をリセット
    };

    const renderContent = () => {
        switch (modalType) {
            case "auth":
                return <AuthComp closeModal={closeModal} setComp={setComp} comp={comp} />;
            case "checkform":
                return <CheckformComp setComp={setComp} comp={comp} />;
            case "complete":
                return <CompleteComp closeModal={closeModal} />;
            case "form":
                return <FormComp setComp={setComp} comp={comp} productData={modalData?.productData} />;
            case "payment":
                return <PaymentComp closeModal={closeModal} />;
            default:
                return null;
        }
    };

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
            {isOpen && (
                <div className={`modal_back ${isOpen ? 'active' : ''}`}>
                    {renderContent()}
                </div>
            )}
        </ModalContext.Provider>
    );
};

// useContextフックを作成
export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
