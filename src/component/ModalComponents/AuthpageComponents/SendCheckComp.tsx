import React from "react";


interface SendCheckCompProps {
    closeModal: () => void;
    setLocalComp: (comp: string) => void;
}

const SendCheckComp: React.FC<SendCheckCompProps> = ({setLocalComp }) => {
    return (
        <div className="SendCheckComp">
            <div className="SendCheckComp__textbox">
                <h2 className="title">本登録のご案内を送りました</h2>
                <h3 className="subtitle">まだ会員登録は完了していません</h3>
                <p className="text">24時間以内にメール「メールアドレスの認証を完了させてください」に記載のURLをクリックし認証を行ってください。</p>
                <div className="note">
                    <p className="note__text">
                        URLの有効期限は24時間です。
                        期限内にアクセスできなかった場合は、再度会員登録画面よりやり直していただく必要がございますのでご了承ください。
                    </p>
                </div>
                <div className="note">
                    <p className="note__text">
                        URLは有効期限内にクリックすることで認証が完了します。以降はTOPページよりログインを行ってください。
                    </p>
                </div>

                <h3 className="subtitle">メールを確認できない場合</h3>
                <p className="text">
                    誤って迷惑メールに振り分けられている可能性があります。念の為ご確認ください。
                    ドメイン設定にて「remes.com」を受信できるようご設定をお願いします。
                </p>
            </div>

            <div className="buttonbox">
                <button 
                    className="button"
                    onClick={() => setLocalComp('default')}
                >
                    サインインに戻る
                </button>
            </div>
        </div>

    );
};

export default SendCheckComp;