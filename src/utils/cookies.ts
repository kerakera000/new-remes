// utils/cookies.ts

// クッキーを取得する関数
export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {

        const [key, value] = cookie.split("=");
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
};

// クッキーをセットする関数
export const setCookie = (name: string, value: string, minutes?: number): void => {
    let expires = "";
    if (minutes) {
        const date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000)); // 分単位で設定
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
};

// クッキーを削除する関数
export const deleteCookie = (name: string): void => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
};

