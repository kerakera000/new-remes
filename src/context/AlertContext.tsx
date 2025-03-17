//アラートの表示を管理するコンテキスト

import React, { createContext, useContext, useState, ReactNode } from 'react';


// アラートの種類
type AlertType = 'success' | 'error' | 'info';

// モーダルの型
interface AlertContextProps {
    alertMessage: string | null;
    alertType: AlertType | null;
    showAlert: (message: string, type: AlertType) => void;
    hideAlert: () => void;
}

// Contextを作成
const AlertContext = createContext<AlertContextProps | undefined>(undefined);

// Contextプロバイダー
export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<AlertType | null>(null);
    const [isFading, setIsFading] = useState(false); // フェードアウト状態を管理

    const showAlert = (message: string, type: AlertType) => {
        setAlertMessage(message);
        setAlertType(type);
        setIsFading(false);

        // 1.5秒後にフェードアウト開始
        setTimeout(() => {
            setIsFading(true);
        }, 1500);

        // 2秒後に完全に非表示に
        setTimeout(() => {
            hideAlert();
        }, 2000);
    };

    const hideAlert = () => {
        setAlertMessage(null);
        setAlertType(null);
        setIsFading(false);
    };

    return (
        <AlertContext.Provider value={{ alertMessage, alertType, showAlert, hideAlert }}>
            {children}
            {alertMessage && (
                <div
                    className={`alert-container ${isFading ? 'hide' : ''} ${
                        alertType ? `alert-${alertType}` : ''
                    }`}
                >
                    <div className="alert-box" onClick={hideAlert}>
                        <p>{alertMessage}</p>
                        <button className="alert-close-button">
                            ×
                        </button>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
};

// useContextフックを作成
export const useAlert = (): AlertContextProps => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
