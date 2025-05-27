import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAlert } from "../../context/AlertContext";

import vector from "../../assets/account/Vector.svg";
import signout from "../../assets/account/signout.svg";
import Vectorwhite from "../../assets/haeder/Vectorwhite.svg";
import Vectorred from "../../assets/haeder/Vectorred.svg";

const AccountComp: React.FC = () => {
    const [hasPassword, setHasPassword] = useState(false); // パスワードの有無を管理
    const [email, setEmail] = useState<string | null>(null);
    const [lastname, setLastname] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [postcode, setPostcode] = useState<string>("");
    const [prefectures, setPrefectures] = useState<string>("");
    const [municipalities, setMunicipalities] = useState<string>("");
    const [buildingNameRoomNumber, setBuildingNameRoomNumber] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const fetchUserData = async () => {
                const db = getFirestore();
                const docRef = doc(db, "customers", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setEmail(data.email || "");
                    setLastname(data.lastname || "");
                    setFirstname(data.firstname || "");
                    setPostcode(data.postcode || "");
                    setPrefectures(data.prefectures || "");
                    setMunicipalities(data.municipalities || "");
                    setBuildingNameRoomNumber(data.BuildingNameRoomNumber || "");
                    setPhone(data.phone || "");

                    // パスワードフィールドの存在を確認
                    console.log("pass" , data.pass)
                    if (data.pass) {
                        setPassword(data.pass);
                        setHasPassword(true);
                    }
                }
            };

            fetchUserData();
        }
    }, []);

     // 状態変更を監視してコンソールに出力
    useEffect(() => {
        console.log("Password set in state:", password);
    }, [password]);

    useEffect(() => {
        console.log("hasPassword set to:", hasPassword);
    }, [hasPassword]);

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log("サインアウトしました");
                // lastLoginTimeクッキーを削除
                document.cookie = "lastLoginTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                showAlert("サインアウトしました", "success");
                navigate('/');
            })
            .catch((error) => {
                console.error("サインアウトに失敗しました:", error);
                showAlert("サインアウトに失敗しました", "error");
            });
    };

    const handleSave = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const db = getFirestore();
            const docRef = doc(db, "customers", user.uid);

            // 更新するデータオブジェクトを準備（空でないフィールドのみ追加）
            const updatedData: { [key: string]: string } = {};
            if (lastname) updatedData.lastname = lastname;
            if (firstname) updatedData.firstname = firstname;
            if (postcode) updatedData.postcode = postcode;
            if (prefectures) updatedData.prefectures = prefectures;
            if (municipalities) updatedData.municipalities = municipalities;
            if (buildingNameRoomNumber) updatedData.BuildingNameRoomNumber = buildingNameRoomNumber;
            if (phone) updatedData.phone = phone;

            try {
                // 空でないフィールドのみを更新
                await updateDoc(docRef, updatedData);
                console.log("データを保存しました");
                showAlert("変更が保存されました", "success");
            } catch (error) {
                console.error("データの保存に失敗しました:", error);
                showAlert("データの保存に失敗しました", "error");
            }
        }
    };

    const handleChangePassword = async () => {
        const confirmation = window.confirm("パスワード変更後サインアウトされます。よろしいでしょうか？");
        if (!confirmation) {
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        if (user && newPassword) {
            try {
                const credential = EmailAuthProvider.credential(user.email || "", password);
                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, newPassword);
                console.log("パスワードを更新しました");

                const db = getFirestore();
                const docRef = doc(db, "customers", user.uid);
                await updateDoc(docRef, { pass: newPassword });

                setPassword(newPassword);
                setNewPassword("");
                showAlert("パスワードが更新されました", "success");

                // パスワード変更後にサインアウト
                await signOut(auth);
                showAlert("サインアウトされました。再度ログインしてください。", "info");
            } catch {
                showAlert("パスワードの更新に失敗しました", "error");
            }
        } else {
            showAlert("新しいパスワードを入力してください", "error");
        }
    };



    return (
        <div className="AccountComp">
            <div className="AccountComp__sizebox">
                <div className="AccountComp__content">
                    <h2 className="title">お名前</h2>
                    <div className="content name">
                        <div className="inputbox twobox">
                            <p className="text">姓</p>
                            <input className="input" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </div>

                        <div className="inputbox twobox">
                            <p className="text">名</p>
                            <input className="input" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="AccountComp__content">
                    <h2 className="title">住所</h2>
                    <div className="content">
                        <div className="inputflex">
                            <div className="inputbox twobox">
                                <p className="text">〒</p>
                                <input className="input" type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
                            </div>

                            <div className="inputbox twobox">
                                <p className="text">都道府県</p>
                                <input className="input" type="text" value={prefectures} onChange={(e) => setPrefectures(e.target.value)} />
                            </div>
                        </div>
                        <div className="inputbox maxbox">
                            <p className="text">市区町村</p>
                            <input className="input" type="text" value={municipalities} onChange={(e) => setMunicipalities(e.target.value)} />
                        </div>
                    </div>

                    <div className="content">
                        <div className="inputbox maxbox">
                            <p className="text">建物名、部屋番号</p>
                            <input className="input" type="text" value={buildingNameRoomNumber} onChange={(e) => setBuildingNameRoomNumber(e.target.value)} />
                        </div>
                    </div>
                </div>

                {hasPassword && (
                    <div className="AccountComp__content">
                        <h2 className="title">パスワード</h2>
                        <div className="content">
                            <div className="inputbox twobox">
                                <p className="text">現在のパスワード</p>
                                <p className="input">{password}</p>
                            </div>
                            <div className="inputbox twobox">
                                <p className="text">新しいパスワード</p>
                                <input
                                    className="input"
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="changepass" onClick={handleChangePassword}>
                            パスワードを変更する
                        </button>
                    </div>
                )}

                <div className="AccountComp__content">
                    <h2 className="title">連絡先</h2>
                    <div className="content">
                        <div className="inputbox twobox">
                            <p className="text">電話番号</p>
                            <input className="input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="inputbox twobox">
                            <p className="text">メールアドレス</p>
                            <p className="input">{email || "メールアドレスを取得中..."}</p>
                        </div>
                    </div>
                </div>

                <button className="signout" onClick={handleSignOut}>
                    <img className="img" src={signout} alt="" />
                    <p className="text">サインアウトする</p>
                </button>

                <div className="save">
                    <button className="submit" onClick={handleSave}>
                        商品一覧を見る
                        <img className="white" src={Vectorwhite} alt=">" />
                        <img className="red" src={Vectorred} alt=">" />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default AccountComp;
