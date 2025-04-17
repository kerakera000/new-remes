//認証関連の関数をまとめるもの

import { useAlert } from "../context/AlertContext";
import { signInWithGoogle } from "../lib/firebaseAuth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useNextPageCookie, useNextPageMypageCookie } from "./useCookieHandler";

export const useGoogleSignIn = () => {
    const { showAlert } = useAlert();
    const handleNextPageCookie = useNextPageCookie();
    const handleNextPageMypageCookie = useNextPageMypageCookie();

    const onGoogleSignIn = async (setError: (message: string) => void) => {
        const db = getFirestore();

        try {
            const { user } = await signInWithGoogle();
            
            if (user) {
                const userDocRef = doc(db, "customers", user.uid);
                const userDoc = await getDoc(userDocRef);

                // Firestore にユーザーが存在しない場合は新規作成
                if (!userDoc.exists()) {
                    await setDoc(userDocRef, {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        createdAt: new Date(),
                    });
                } else {
                    // 既存ユーザーの場合は最終ログイン時間を更新
                    await setDoc(userDocRef, { lastLogin: new Date() }, { merge: true });
                }
                handleNextPageCookie();
                handleNextPageMypageCookie();
                return;
            }
        } catch (error) {
            console.error("Google認証エラー:", error);
            setError("Googleでのサインインに失敗しました。");
            showAlert("Googleでのサインインに失敗しました。", "error");
        }
    };

    return { onGoogleSignIn };
};