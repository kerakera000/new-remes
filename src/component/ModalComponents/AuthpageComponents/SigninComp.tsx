// SigninComp.tsx

import React, { useState } from "react";
import { useGoogleSignIn } from "../../../hooks/auth";
import { signInAfterEmailVerification } from "../../../lib/firebaseAuth";
import { getDocument } from "../../../lib/firebaseService";

import googleicon from "../../../assets/auth/googleicon.svg";
import mailicon from "../../../assets/auth/mail.svg";
import passicon from "../../../assets/auth/pass.svg";
import eyeclose from "../../../assets/auth/eyeclose.png";
import eyeopen from "../../../assets/auth/eyeopen.png";

interface SigninCompProps {
    setComp: (comp: string) => void; // setCompをpropsとして受け取る
    closeModal: () => void;  // モーダルを閉じるための関数を受け取る
}

const SigninComp: React.FC<SigninCompProps> = ({ setComp, closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // パスワード表示の状態
    const [error, setError] = useState<string | null>(null); // エラーメッセージを管理 

    const { onGoogleSignIn } = useGoogleSignIn();

    // Googleサインイン処理
    const handleGoogleSignIn = () => {
        onGoogleSignIn(setError);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // signInAfterEmailVerificationを使用してサインイン
            const { user, error } = await signInAfterEmailVerification(email, password);

            if (error) {
                setError(error);
                return;
            }

            if (!user) {
                console.error("認証に失敗しました。");
                return;
            }

            const uid = user.uid;

            // Firestoreのcustomersコレクションからユーザーデータを取得
            const data = await getDocument("customers", uid);

            if (data) {
                // Firestoreのデータと入力されたデータを比較
                if (data.email === email) {
                    console.log("サインイン完了");

                    // モーダルを閉じるか、サインイン後のページへ遷移
                    closeModal();
                    window.location.href = '/mypage';
                } else {
                    setError("入力されたメールアドレスまたはパスワードが正しくありません。");
                }
            } else {
                window.location.href = '/mypage';
            }
        } catch (error: any) {
            console.error("サインインエラー:", error);
            setError("サインインに失敗しました。もう一度お試しください。");
        }
    };

    // パスワード表示切り替え
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordCheckClick = () => {
        console.log("パスワードをお忘れですか？ボタンがクリックされました");
        setComp('SwichCheckpass');
    };

    return (
        <div className="auth_cont">
            <h2 className="title">サインイン</h2>
            <button
                className="google_button"
                onClick={handleGoogleSignIn} // 関数を使用
            >
                <img src={googleicon} alt="Google" />
                <span>Googleでサインイン</span>
            </button>
            <p className="text">メールアドレスでサインイン</p>
            <form onSubmit={handleSubmit} className="formbox">
                <div className="input_field">
                    <img src={mailicon} alt="" />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="メールアドレスを入力"
                        required
                    />
                </div>
                <div className="input_field">
                    <img src={passicon} alt="" />
                    <input
                        type={showPassword ? "text" : "password"} // パスワードの表示/非表示を切り替え
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="パスワードを入力"
                        required
                        autoComplete="current-password"
                    />
                    <img
                        src={showPassword ? eyeopen : eyeclose} // アイコン切り替え
                        alt="パスワード表示切り替え"
                        onClick={togglePasswordVisibility} // クリックで表示切り替え
                        className="eye_icon"
                    />
                </div>

                {error && <p className="error_message">{error}</p>}

                <button type="submit" className="submit_button">
                    <span className="text">
                        サインイン
                    </span>
                </button>
            </form>
            <button className="passcheck" onClick={handlePasswordCheckClick}>
                パスワードをお忘れですか？
            </button>
        </div>

    );
};

export default SigninComp;

