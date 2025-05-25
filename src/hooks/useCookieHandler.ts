//最初のロード時cookieを使用した機能をまとめるもの

import Cookies from 'js-cookie';
import { useAlert } from "../context/AlertContext";
import { useModal } from "../context/ModalContext";
import { useAuth } from '../context/AuthContext';

export const useNextPageCookie = () => {
    const { showAlert } = useAlert();
    const { openModal } = useModal();

    return () => {
        const NextPageCookie = Cookies.get('nextpage');
        const productData = Cookies.get('productData');
        
        if (NextPageCookie === "form") {
            showAlert("Googleでのサインインに成功しました。", "success");
            Cookies.set('authlog', 'true', { expires: 1/1440 });
            
            if (productData) {
                openModal('form', { productData: JSON.parse(productData) });
            } else {
                openModal('form');
            }
            
            Cookies.remove('nextpage');
            Cookies.remove('productData');
        }
    };
};

export const useNextPageMypageCookie = () => {
    const { showAlert } = useAlert();
    const { user } = useAuth();

    return () => {
        const NextPageMypageCookie = Cookies.get('nextpage');
        if (NextPageMypageCookie === "mypage") {
            if (!user) {
                showAlert("Googleでのサインインに成功しました。", "success");
                Cookies.set('authlog', 'true', { expires: 1/1440 });
                console.log('authlog cookie set:', Cookies.get('authlog'));
                Cookies.remove('nextpage');
                window.location.href = '/mypage';
            }
        }
    };
};
