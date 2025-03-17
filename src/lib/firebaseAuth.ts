//firebaseの認証関連の関数をまとめるもの

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { app } from "./firebaseConfig";
import { FirebaseError } from "firebase/app";


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//Googleサインイン
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log("Googleサインイン成功:", user);
        return { user, token };
    } catch (error) {
        console.error("Googleサインインエラー:", error);
        throw error;
    }
};

//メールアドレスとパスワードでサインアップ
export const signUpWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // メール確認メールを送信
        await sendEmailVerification(user);

        // サインアップ後、すぐにサインアウト
        await signOut(auth);

        return user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("サインアップに失敗しました");
    }
};

//メールアドレスとパスワードでサインイン
export const signInAfterEmailVerification = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // メール確認済みかどうかをチェック
        if (user.emailVerified) {
            console.log("サインイン成功:", user);
            return { user, error: null };
        } else {
            const confirmResend = window.confirm("メール認証が完了していません。\n確認メールを再送信しますか？");
            
            if (confirmResend) {
                // サインアウトする前に確認メールを送信
                await sendEmailVerification(user);
                // 確認メール送信後にサインアウト
                await signOut(auth);
                return { 
                    user: null, 
                    error: "メール認証が完了していません。\n確認メールを再送信しました。" 
                };
            }
            
            // 再送信しない場合はサインアウト
            await signOut(auth);
            return { 
                user: null, 
                error: "メール認証が完了していません。\nメールボックスを確認してください。" 
            };
        }
    } catch (error: unknown) {
        console.error("サインインエラー:", error);
        let errorMessage = "サインインに失敗しました。もう一度お試しください。";
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = "ユーザーが見つかりません。正しいメールアドレスを入力してください。";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "パスワードが正しくありません。";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "無効なメールアドレスです。正しいメールアドレスを入力してください。";
                    break;
            }
        }
        return { user: null, error: errorMessage };
    }
};

//確認メール再送信
export const resendVerificationEmail = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("ユーザーが認証されていません。");
        }
        await sendEmailVerification(user);
        return { success: true, message: "確認メールを再送信しました。" };
    } catch (error) {
        console.error("確認メール再送信エラー:", error);
        return { success: false, message: "確認メールの再送信に失敗しました。" };
    }
};

//パスワードリセット
export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { 
            success: true, 
            message: "パスワードリセット用のメールを送信しました。" 
        };
    } catch (error) {
        console.error("パスワードリセットエラー:", error);
        let errorMessage = "パスワードリセットメールの送信に失敗しました。";
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = "このメールアドレスのユーザーが見つかりません。";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "無効なメールアドレスです。";
                    break;
            }
        }
        return { 
            success: false, 
            message: errorMessage 
        };
    }
};
