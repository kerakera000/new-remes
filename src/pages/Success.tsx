import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const Success: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSubscriptionStatus = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (!user) {
                    navigate('/login');
                    return;
                }

                const db = getFirestore();
                const subscriptionsRef = collection(db, 'customers', user.uid, 'subscriptions');
                const q = query(subscriptionsRef, where('status', '==', 'active'));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    // アクティブなサブスクリプションが見つからない場合
                    navigate('/mypage');
                    return;
                }

                // サブスクリプションが存在する場合はマイページに遷移
                setTimeout(() => {
                    navigate('/mypage');
                }, 3000);

            } catch (error) {
                console.error('サブスクリプション状態の確認中にエラーが発生しました:', error);
                navigate('/mypage');
            }
        };

        checkSubscriptionStatus();
    }, [navigate]);

    return (
        <div className="success-page">
            <div className="success-content">
                <h1>ご購入ありがとうございます！</h1>
                <p>決済が完了しました。</p>
                <p>マイページに移動します...</p>
            </div>
        </div>
    );
};

export default Success; 