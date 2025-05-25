import { loadStripe } from '@stripe/stripe-js';
import { getFirestore, collection, addDoc, onSnapshot, DocumentReference } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// デバッグ用：環境変数の確認
console.log('Stripe Publishable Key:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CreateCheckoutSessionParams {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}

export const createCheckoutSession = async ({ priceId, successUrl, cancelUrl }: CreateCheckoutSessionParams) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('ユーザーがログインしていません');
        }

        const db = getFirestore();
        const checkoutSessionRef = collection(db, 'customers', user.uid, 'checkout_sessions');
        
        const docRef = await addDoc(checkoutSessionRef, {
            price: priceId,
            success_url: successUrl,
            cancel_url: cancelUrl,
            mode: 'subscription',
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            customer_email: user.email,
            metadata: {
                userId: user.uid
            }
        }) as DocumentReference;

        // FirestoreのトリガーがStripeのチェックアウトセッションを作成し、
        // ドキュメントにsessionIdを追加するのを待ちます
        return new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(docRef, async (snap) => {
                const { sessionId } = snap.data() || {};
                if (sessionId) {
                    unsubscribe();
                    try {
                        const stripe = await stripePromise;
                        if (stripe) {
                            const { error } = await stripe.redirectToCheckout({ sessionId });
                            if (error) {
                                reject(error);
                            } else {
                                resolve(true);
                            }
                        } else {
                            reject(new Error('Stripeの初期化に失敗しました'));
                        }
                    } catch (error) {
                        reject(error);
                    }
                }
            }, (error) => {
                unsubscribe();
                reject(error);
            });
        });

    } catch (error) {
        console.error('チェックアウトセッションの作成中にエラーが発生しました:', error);
        throw error;
    }
}; 