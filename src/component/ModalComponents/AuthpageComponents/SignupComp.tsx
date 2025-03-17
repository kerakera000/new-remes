// SignupComp.tsx

import React, { useState } from "react";
import { useGoogleSignIn } from "../../../hooks/auth"; // カスタムフックをインポート
import { signUpWithEmail } from "../../../lib/firebaseAuth"; // Firebaseのサインアップ関数をインポート
import { setEmailInCustomerDoc } from "../../../lib/firebaseService"; // 新しい関数をインポート

import googleicon from "../../../assets/auth/googleicon.svg";
import mailicon from "../../../assets/auth/mail.svg";
import passicon from "../../../assets/auth/pass.svg";
import eyeclose from "../../../assets/auth/eyeclose.png";
import eyeopen from "../../../assets/auth/eyeopen.png";

interface SignupCompProps {
    setComp: (comp: string) => void; // setCompをpropsとして受け取る
    closeModal: () => void;  // モーダルを閉じるための関数を受け取る
    setLocalComp: (comp: string) => void; //新規追加: setLocalComp を受け取る
}

const SignupComp: React.FC<SignupCompProps> = ({ setLocalComp }) => {
    const [email, setEmail] = useState("");
    const [pass, setPassword, ] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // 再入力パスワード
    const [showPassword, setShowPassword] = useState(false); // パスワード表示状態を管理
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 再入力パスワードの表示切り替え
    const [error, setError] = useState<string | null>(null); // エラーメッセージを管理

    const { onGoogleSignIn } = useGoogleSignIn(); // カスタムフックを使用

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

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    // メール・パスワードでのサインアップ処理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (pass !== confirmPassword) {
            setError("パスワードが一致しません");
            return;
        }

        setError(null);

        try {
            const user = await signUpWithEmail(email, pass);

            if (user) {
                console.log("サインアップ成功:", user);
                setLocalComp("SwichSendCheck");

                // 新しいユーザーのメールアドレスをFirestoreに保存
                await setEmailInCustomerDoc(user.uid, email);
            }
        } catch (error) {
            console.error("サインアップエラー:", error);
            setError("アカウントの作成に失敗しました。");
        }
    };

    // パスワード表示切り替え
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 再入力パスワード表示切り替え
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="auth_cont">
            <h2 className="title">新規作成</h2>
            <button
                className="google_button"
                onClick={handleGoogleSignIn} // 関数を使用
            >
                <img src={googleicon} alt="Google" />
                <span>Googleでサインアップ</span>
            </button>
            <p className="text">メールアドレスで新規作成</p>
            <form onSubmit={handleSubmit} className="formbox">
                <div className="input_field">
                    <img src={mailicon} alt="メール" />
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
                    <img src={passicon} alt="パスワード" />
                    <input
                        type={showPassword ? "text" : "password"} // パスワード表示切り替え
                        id="password"
                        name="password"
                        value={pass}
                        onChange={handlePasswordChange}
                        placeholder="パスワードを入力"
                        required
                    />
                    <img
                        src={showPassword ? eyeopen : eyeclose} // アイコンの切り替え
                        alt="パスワード表示切り替え"
                        onClick={togglePasswordVisibility} // アイコンをクリックで切り替え
                        className="eye_icon"
                    />
                </div>
                <div className="input_field">
                    <img src={passicon} alt="パスワード再入力" />
                    <input
                        type={showConfirmPassword ? "text" : "password"} // 再入力パスワード表示切り替え
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="パスワードを再入力"
                        required
                    />
                    <img
                        src={showConfirmPassword ? eyeopen : eyeclose} // アイコンの切り替え
                        alt="パスワード表示切り替え"
                        onClick={toggleConfirmPasswordVisibility} // アイコンをクリックで切り替え
                        className="eye_icon"
                    />
                </div>

                {error && <p className="error_message">{error}</p>}

                <button type="submit" className="submit_button">
                    <span className="text">
                        サインアップ
                    </span>
                </button>
            </form>
        </div>

    );
};

export default SignupComp;

