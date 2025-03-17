// FormComp.tsx

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import BreadcrumbComponent from "./BreadcrumbComponents/breadcrumb";
import { UpdateShippingInformation } from "../../lib/firebaseService";
import { useModal } from "../../context/ModalContext";
import { validateFormData } from "../../validators/FormCompValidation";

import arrow1 from "../../assets/modalcomp/arrow1.svg";
import arrow2 from "../../assets/modalcomp/arrow2.svg";
import item from "../../assets/items/detailproduct/item.svg";

interface FormCompProps {
    setComp: Dispatch<SetStateAction<string>>;
    comp: string;
}

// 追加: インターフェースの定義
interface FormErrors {
    [key: string]: string;
}

const FormComp: React.FC<FormCompProps> = () => {
    const { openModal } = useModal();
    const [formData, setFormData] = useState({
        // 配送先情報
        lastName: "",
        firstName: "",
        lastNameKana: "",
        firstNameKana: "",
        zipCode: "",
        prefecture: "",
        city: "",
        building: "",
        phoneNumber: "",
        email: "",
        emailConfirm: "",
    });

    // any を FormErrors に置き換え
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const db = getFirestore();
                const docRef = doc(db, "customers", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        lastName: data.lastname || "",
                        firstName: data.firstname || "",
                        lastNameKana: data.lastnamekana || "",
                        firstNameKana: data.firstnamekana || "",
                        zipCode: data.postcode || "",
                        prefecture: data.prefectures || "",
                        city: data.municipalities || "",
                        building: data.BuildingNameRoomNumber || "",
                        phoneNumber: data.phone || "",
                        email: data.email || "",
                        emailConfirm: data.email || "", // 確認用のメールアドレスも同じ値をセット
                    });
                } else {
                    console.error("ユーザーデータが存在しません。");
                }
            }
        };

        fetchUserData();
    }, []);

    // フォームのバリデーション
    const validateForm = () => {
        const newErrors = validateFormData(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // フォームの送信処理
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const customerData = {
                lastname: formData.lastName,
                firstname: formData.firstName,
                lastnamekana: formData.lastNameKana,
                firstnamekana: formData.firstNameKana,
                postcode: formData.zipCode,
                prefectures: formData.prefecture,
                municipalities: formData.city,
                BuildingNameRoomNumber: formData.building,
                phone: formData.phoneNumber
            };

            try {
                await UpdateShippingInformation(user.uid, customerData);
                openModal('checkform');
            } catch (error) {
                console.error("データの保存中にエラーが発生しました:", error);
                alert("データの保存中にエラーが発生しました");
            }
        } else {
            alert("ユーザーがログインしていません");
        }
    };

    // 入力ハンドラ
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // 数値入力が必要なフィールドで文字が入力された場合の処理
        if (
            (name === "zipCode" || name === "phoneNumber" || name === "cardNumber" || name === "securityCode") &&
            isNaN(Number(value))
        ) {
            setErrors((prevErrors: FormErrors) => ({ ...prevErrors, [name]: "数値を入力してください" }));
        } else {
            setErrors((prevErrors: FormErrors) => ({ ...prevErrors, [name]: "" }));
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // 戻るボタン
    const handleBackButtonClick = () => {
        openModal('detail');
    };

    return (
        <div className="modalform">
            {/* <button className="modalform__close" onClick={closeModal}>
                <img src={Vector} alt="Close" />
            </button> */}
            {/* パンくずリスト */}
            <BreadcrumbComponent currentStep={1} />

            <div className="flexbox">
                <div className="formbox">
                    {/* 配送先情報 */}
                    <div className="shipping_info">
                        <h2 className="shipping_title">配送先情報</h2>
                        <form className="shipping_form" onSubmit={submitForm}>
                            <div className="form_group twobox">
                                <div className="inputbox">
                                    <p className="title">
                                        姓
                                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                                    </p>
                                    <span className="help"></span>
                                    <input
                                        type="text"
                                        placeholder="山田"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="inputbox">
                                    <p className="title">
                                        名
                                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                                    </p>
                                    <span className="help"></span>
                                    <input
                                        type="text"
                                        placeholder="太郎"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form_group twobox">
                                <div className="inputbox">
                                    <p className="title">
                                        姓カタカナ
                                        {errors.lastNameKana && <span className="error">{errors.lastNameKana}</span>}
                                    </p>
                                    <span className="help"></span>
                                    <input
                                        type="text"
                                        placeholder="ヤマダ"
                                        name="lastNameKana"
                                        value={formData.lastNameKana}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="inputbox">
                                    <p className="title">
                                        名カタカナ
                                        {errors.firstNameKana && <span className="error">{errors.firstNameKana}</span>}
                                    </p>
                                    <span className="help"></span>
                                    <input
                                        type="text"
                                        placeholder="タロウ"
                                        name="firstNameKana"
                                        value={formData.firstNameKana}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form_group twobox">
                                <div className="inputbox">
                                    <p className="title">
                                        郵便番号
                                        {errors.zipCode && <span className="error">{errors.zipCode}</span>}
                                    </p>
                                    <span className="help">ハイフンは入力しないでください</span>
                                    <input
                                        type="text"
                                        placeholder="0001234"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="inputbox">
                                    <p className="title">
                                        都道府県
                                        {errors.prefecture && <span className="error">{errors.prefecture}</span>}
                                    </p>
                                    <span className="help"></span>
                                    <input
                                        type="text"
                                        placeholder="都道府県"
                                        name="prefecture"
                                        value={formData.prefecture}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form_group">
                                <div className="inputbox">
                                    <p className="title">
                                        市区町村
                                        <span className="error">{errors.city}</span>
                                    </p>
                                    <span className="help"></span>
                                    <input
                                        type="text"
                                        placeholder="市区町村"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form_group">
                                <div className="inputbox">
                                    <p className="title">
                                        建物名、部屋番号など
                                        <span className="error">{errors.building}</span>
                                    </p>
                                    <span className="help"></span>
                                    <input
                                        type="text"
                                        placeholder="建物名、部屋番号など"
                                        name="building"
                                        value={formData.building}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form_group">
                                <div className="inputbox">
                                    <p className="title">
                                        電話番号
                                        <span className="error">{errors.phoneNumber}</span>
                                    </p>
                                    <span className="help">ハイフンは入力しないでください</span>
                                    <input
                                        type="text"
                                        placeholder="電話番号"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form_group">
                                <div className="inputbox">
                                    <p className="title">
                                        メールアドレス
                                        <span className="error">{errors.email}</span>
                                    </p>
                                    <span className="help"></span>
                                    <input
                                        type="email"
                                        placeholder="メールアドレス"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form_group">
                                <div className="inputbox">
                                    <p className="title">
                                        メールアドレス(確認用)
                                        <span className="error">{errors.emailConfirm}</span>
                                    </p>
                                    <span className="help"></span>
                                    <input
                                        type="email"
                                        placeholder="メールアドレス(確認用)"
                                        name="emailConfirm"
                                        value={formData.emailConfirm}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* FAQセクション */}
                <div className="accordion-modal">
                    <div className="order_item">
                        <h2 className="order_item__title">ご注文商品</h2>
                        <div className="order_item__content">
                            <img className="img" src={item} alt="" />
                            <div className="textbox">
                                <p className="textbox__name">ROG Ally (2023) RC71L RC71L-Z1512</p>
                                <p className="textbox__contract_period">契約期間:1年</p>
                                <p className="textbox__price">￥14,500
                                    <span className="tax">(税込み)/月</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="faq_background">
                        <div className="faq">
                            <input type="checkbox" id="faq01" className="toggle" />
                            <label className="question" htmlFor="faq01">質問01</label>
                            <div className="anser">
                                <div>質問01のA</div>
                            </div>
                        </div>
                        <div className="faq">
                            <input type="checkbox" id="faq02" className="toggle" />
                            <label className="question" htmlFor="faq02">質問02</label>
                            <div className="anser">
                                <div>質問02のA</div>
                            </div>
                        </div>
                        <div className="faq">
                            <input type="checkbox" id="faq03" className="toggle" />
                            <label className="question" htmlFor="faq03">質問03</label>
                            <div className="anser">
                                <div>質問03のA</div>
                            </div>
                        </div>
                        <div className="faq last">
                            <input type="checkbox" id="faq04" className="toggle" />
                            <label className="question" htmlFor="faq04">質問04</label>
                            <div className="anser">
                                <div>質問04のA</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="submitbuttons">
                <button
                    className="btn1"
                    onClick={handleBackButtonClick} // 戻るボタンでアラートを表示
                >
                    <img className="btn1__img" src={arrow2} alt="戻る" />
                    <span className="btn1__text">戻る</span>
                </button>
                <button className="btn2" onClick={submitForm}>
                    <span className="btn2__text">確認する</span>
                    <img className="btn2__img" src={arrow1} alt="注文する" />
                </button>
            </div>
        </div>

    );
};

export default FormComp;