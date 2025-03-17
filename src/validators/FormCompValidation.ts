interface FormErrors {
    [key: string]: string;
}

interface FormData {
    lastName: string;
    firstName: string;
    lastNameKana: string;
    firstNameKana: string;
    zipCode: string;
    prefecture: string;
    city: string;
    building: string;
    phoneNumber: string;
    email: string;
    emailConfirm: string;
}

export const validateFormData = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.lastName) errors.lastName = "入力してください";
    if (!formData.firstName) errors.firstName = "入力してください";
    if (!formData.lastNameKana) errors.lastNameKana = "入力してください";
    if (!formData.firstNameKana) errors.firstNameKana = "入力してください";
    if (!formData.zipCode || isNaN(Number(formData.zipCode))) errors.zipCode = "入力してください";
    if (!formData.prefecture) errors.prefecture = "入力してください";
    if (!formData.city) errors.city = "入力してください";
    if (!formData.building) errors.building = "入力してください";
    if (!formData.phoneNumber || isNaN(Number(formData.phoneNumber))) errors.phoneNumber = "入力してください";
    if (!formData.email) errors.email = "入力してください";
    if (!formData.emailConfirm) errors.emailConfirm = "入力してください";

    // メールアドレス確認のバリデーション
    if (formData.email !== formData.emailConfirm) {
        errors.emailConfirm = "メールアドレスが一致しません";
    }

    // 電話番号のバリデーション
    const phoneNumberPattern = /^(0[0-9]{9,10})$/;  // 固定電話（10桁）または携帯電話（11桁）
    const hasFullWidth = /[０-９]/.test(formData.phoneNumber);  // 全角数字のチェック

    if (formData.phoneNumber) {
        if (hasFullWidth) {
            errors.phoneNumber = "半角数字で入力してください";
        } else if (!phoneNumberPattern.test(formData.phoneNumber)) {
            errors.phoneNumber = "正しい電話番号の形式で入力してください";
        }
    }

    // 郵便番号のバリデーション
    const zipCodePattern = /^[0-9]{7}$/;  // 7桁の半角数字
    const hasFullWidthZip = /[０-９－]/.test(formData.zipCode);  // 全角数字とハイフンのチェック
    const hasHyphen = /[-－]/.test(formData.zipCode);  // 半角または全角ハイフンのチェック

    if (formData.zipCode) {
        if (hasHyphen) {
            errors.zipCode = "ハイフンは入力しないでください";
        } else if (hasFullWidthZip) {
            errors.zipCode = "半角数字で入力してください";
        } else if (!zipCodePattern.test(formData.zipCode)) {
            errors.zipCode = "郵便番号は7桁の数字で入力してください";
        }
    }

    // 漢字名のバリデーション
    const kanjiAndKanaPattern = /^[一-龯々ヶァ-ヶー]+$/;
    if (formData.lastName && !kanjiAndKanaPattern.test(formData.lastName)) {
        errors.lastName = "漢字またはカタカナで入力してください";
    }
    if (formData.firstName && !kanjiAndKanaPattern.test(formData.firstName)) {
        errors.firstName = "漢字またはカタカナで入力してください";
    }

    // カナのバリデーション
    const kanaPattern = /^[ァ-ヶー]+$/;
    if (formData.lastNameKana && !kanaPattern.test(formData.lastNameKana)) {
        errors.lastNameKana = "全角カタカナで入力してください";
    }
    if (formData.firstNameKana && !kanaPattern.test(formData.firstNameKana)) {
        errors.firstNameKana = "全角カタカナで入力してください";
    }

    return errors;
};
