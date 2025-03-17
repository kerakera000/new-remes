import React, { useState } from "react";
import { resetPassword } from "../../../lib/firebaseAuth";

const CheckpassComp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email !== confirmEmail) {
            setError("メールアドレスが一致しません");
            return;
        }
        
        const result = await resetPassword(email);
        if (result.success) {
            setError("");
            alert(result.message);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="checkpass_modal">
            <div className="modal__content">
                <h2 className="modal__title">パスワードリセット</h2>
                <p className="modal__text">
                    ご登録いただいているメールアドレスに、
                    パスワードリセット用のリンクをお送りいたします。
                </p>
                <p className="modal__text">
                    メールが届かない場合は、迷惑メールフォルダをご確認ください。
                </p>
                <form onSubmit={handleSubmit} className="modal__form">
                    <div className="form__group">
                        <label htmlFor="email">メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="confirmEmail">メールアドレス（確認用）</label>
                        <input
                            type="email"
                            id="confirmEmail"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button">
                        送信する
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckpassComp;