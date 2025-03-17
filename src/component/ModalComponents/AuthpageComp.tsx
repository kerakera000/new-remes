// AuthpageComp


import React, { useState, Dispatch, SetStateAction } from "react";

import Vector from "../../assets/items/detailproduct/Vector.svg";
import VectorWhite from "../../assets/items/detailproduct/VectorWhite.svg";
import logoBlack from "../../assets/haeder/logoblack.png";
import logoWhite from "../../assets/haeder/logowhite.svg";

import SigninComp from "./AuthpageComponents/SigninComp";
import SignupComp from "./AuthpageComponents/SignupComp";
import CheckpassComp from "./AuthpageComponents/CheckpassComp";
import SendCheckComp from "./AuthpageComponents/SendCheckComp";

interface AuthCompProps {
    closeModal: () => void;
    setComp: Dispatch<SetStateAction<string>>;
    comp: string;
    stringInput?: string; // 追加: goMypageを受け取る
}

const AuthComp: React.FC<AuthCompProps> = ({ closeModal, setComp, comp }) => {
    const [Comp, setLocalComp] = useState(comp);  // 初期状態をpropsから受け取る

    // 表示するモーダルの制御
    const modalComp = () => {
        switch (Comp) {
            case 'SwichSignup':
                return <SignupComp setComp={setComp} closeModal={closeModal} setLocalComp={setLocalComp} />;
            case 'SwichCheckpass':
                return <CheckpassComp/>;
            case 'SwichSendCheck':
                return <SendCheckComp closeModal={closeModal} setLocalComp={setLocalComp} />;
            default:
                return <SigninComp setComp={setLocalComp} closeModal={closeModal} />;
        }
    };

    // ボタンを押すと `Comp` の状態を切り替える機能
    const toggleComp = () => {
        setLocalComp((prevComp) => (prevComp === 'default' ? 'SwichSignup' : 'default'));
    };

    return (
        <div className="modalauth">
            <button
                className={`modalauth__close ${Comp === 'SwichSignup' ? 'active' : ''}`}
                onClick={closeModal}
            >
                <img
                    className={`spclose ${(Comp === 'SwichSignup' || Comp === 'SwichCheckpass' || Comp === 'SwichSendCheck') ? 'active' : ''}`}
                    src={Vector}
                    alt="Close"
                />
                <img className={`spclosenone ${Comp === 'default' ? 'active' : ''}`} src={VectorWhite} alt="Close" />
            </button>

            <img className={`img ${Comp === 'default' ? 'active' : ''}`} src={logoBlack} alt="Remes" />
            <img className={`img ${Comp === 'SwichSignup' ? 'active' : ''}`} src={logoWhite} alt="Remes" />

            <div className="flexbox">
                <div className={`formcontent ${Comp === 'SwichSignup' ? 'active' : ''} ${(Comp === 'SwichCheckpass' || Comp === 'SwichSendCheck') ? 'check' : ''}`}>
                    {modalComp()}
                </div>

                {(Comp === 'SwichSignup' || Comp === 'default') && (
                    <div className={`switchbox ${Comp === 'SwichSignup' ? 'active' : (Comp === 'default' ? 'noactive' : '')}`}>
                        <div className={`switchbox__content first ${Comp === 'default' ? 'active' : ''}`}>
                            <h2 className="title">Remes Signup</h2>
                            <p className="text">
                                新規登録して
                                <br />
                                レンタルを開始
                            </p>
                        </div>

                        <div className={`switchbox__content secon ${Comp === 'SwichSignup' ? 'active' : ''}`}>
                            <h2 className="title">Remes Signin</h2>
                            <p className="text">
                                サインインして
                                <br />
                                最新ラインナップをチェック！
                            </p>
                        </div>

                        <button
                            className={`submit_button ${Comp === 'SwichSignup' ? 'active' : 'noactive'}`}
                            onClick={toggleComp}
                        >
                            {Comp === 'SwichSignup' ? 'サインイン' : '新規作成'}
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};

export default AuthComp;
