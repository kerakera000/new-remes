import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { UpdateShippingInformation } from "../lib/firebaseService";
import { validateFormData } from "../validators/FormCompValidation";
import BreadcrumbComponent from "../component/ModalComponents/BreadcrumbComponents/breadcrumb";

import arrow1 from "../assets/modalcomp/arrow1.svg";
import arrow2 from "../assets/modalcomp/arrow2.svg";
import item from "../assets/items/detailproduct/item.svg";

interface ProductData {
    id: string;
    name: string;
    price: {
        id: string;
        labels: string[];
        unit_amount: number;
    };
    images: string[];
}

interface FormErrors {
    [key: string]: string;
}

const Form: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const productData = location.state?.productData as ProductData;

    const [formData, setFormData] = useState({
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
                        emailConfirm: data.email || "",
                    });
                } else {
                    console.error("ユーザーデータが存在しません。");
                }
            }
        };

        fetchUserData();

        console.log('Form.tsx - 受け取った商品データ:', productData);
    }, []);

    const validateForm = () => {
        const newErrors = validateFormData(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log('Form.tsx - 送信時の商品データ:', productData);

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
                navigate('/check', { state: { productData } });
            } catch (error) {
                console.error("データの保存中にエラーが発生しました:", error);
                alert("データの保存中にエラーが発生しました");
            }
        } else {
            alert("ユーザーがログインしていません");
            navigate('/login');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (
            (name === "zipCode" || name === "phoneNumber") &&
            isNaN(Number(value))
        ) {
            setErrors((prevErrors: FormErrors) => ({ ...prevErrors, [name]: "数値を入力してください" }));
        } else {
            setErrors((prevErrors: FormErrors) => ({ ...prevErrors, [name]: "" }));
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="page-form">

            <BreadcrumbComponent currentStep={1} />
            <div className="flexbox">
                <div className="formbox">
                    <div className="shipping_info">
                        <h2 className="shipping_title">配送先情報入力</h2>
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
                                        {errors.city && <span className="error">{errors.city}</span>}
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
                                        {errors.building && <span className="error">{errors.building}</span>}
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
                                        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
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
                                        {errors.email && <span className="error">{errors.email}</span>}
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
                                        {errors.emailConfirm && <span className="error">{errors.emailConfirm}</span>}
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

                <div className="accordion-modal">
                    <div className="order_item">
                        <h2 className="order_item__title">ご注文商品</h2>
                        <div className="order_item__content">
                            <img className="img" src={productData?.images[0] || item} alt="" />
                            <div className="textbox">
                                <p className="textbox__name">{productData?.name}</p>
                                <p className="textbox__contract_period">契約期間: {productData?.price.labels[0]}</p>
                                <p className="textbox__price">￥{productData?.price.unit_amount.toLocaleString()}
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
                <Link
                    to={`/detail/${productData?.id}`}
                    state={{ productData }}
                    className="btn1"
                >
                    <img className="btn1__img" src={arrow2} alt="戻る" />
                    <span className="btn1__text">戻る</span>
                </Link>
                <button className="btn2" onClick={submitForm}>
                    <span className="btn2__text">確認する</span>
                    <img className="btn2__img" src={arrow1} alt="注文する" />
                </button>
            </div>
        </div>
    );
};

export default Form;