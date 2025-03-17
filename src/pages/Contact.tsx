import React, { useState } from "react";

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        animal: "",
        message: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // フォームの送信処理を追加
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} action="your-server-side-script.php" method="POST" className="Contactform">
            <div className="form_row">
                <div className="form_label">
                    <label htmlFor="name">お名前</label>
                    <span>必須</span>
                </div>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="例) 山田 太朗"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form_row">
                <div className="form_label">
                    <label htmlFor="email">メールアドレス:</label>
                    <span>必須</span>
                </div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="例) abcd@xyz.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form_row">
                <div className="form_label">
                    <label htmlFor="pet_select">ペットの種類</label>
                </div>
                <select className="select" name="animal" id="pet_select" value={formData.animal} onChange={handleInputChange}>
                    <option value="">--選択してください--</option>
                    <option value="dog">犬</option>
                    <option value="cat">猫</option>
                    <option value="mouse">ハムスター</option>
                    <option value="bird">鳥</option>
                    <option value="fish">魚</option>
                </select>
            </div>
            <div className="form_row">
                <div className="form_label">
                    <label htmlFor="message">お問い合わせ内容</label>
                    <span>必須</span>
                </div>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="お問い合わせ内容をこちらにご記入ください"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>
            <div className="form_row">
                <div className="form_label"></div>
                <button type="submit" className="submit_button">送信</button>
            </div>
        </form>

    );
};

export default ContactForm;



