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
        if (NextPageCookie === "form") {
            showAlert("Googleでのサインインに成功しました。", "success");
            openModal('form');
            Cookies.remove('nextpage');
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
                Cookies.remove('nextpage');
                window.location.href = '/mypage';
            }
        }
    };
};
