import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, doc, deleteDoc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';

// Firestoreのインスタンスを初期化
const db = getFirestore(app);

// ドキュメントを追加する関数
export const addDocument = async (collectionName: string, data: object) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

// ドキュメントを削除する関数
export const deleteDocument = async (collectionName: string, docId: string) => {
    try {
        await deleteDoc(doc(db, collectionName, docId));
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error;
    }
};

// ドキュメントを更新する関数
export const updateDocument = async (collectionName: string, docId: string, data: object) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, data);
        console.log("Document successfully updated!");
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
};

// ドキュメントを取得または作成する関数
export const setDocument = async (collectionName: string, docId: string, data: object) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await setDoc(docRef, data, { merge: true });
        console.log("Document successfully set!");
    } catch (error) {
        console.error("Error setting document: ", error);
        throw error;
    }
};

// ドキュメントを取得する関数
export const getDocument = async (collectionName: string, docId: string) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document: ", error);
        throw error;
    }
};

// 追加: インターフェースの定義
interface ShippingInformation {
    [key: string]: string | undefined;  // インデックスシグネチャを追加
    lastname?: string;
    firstname?: string;
    lastnamekana?: string;
    firstnamekana?: string;
    postcode?: string;
    prefectures?: string;
    municipalities?: string;
    BuildingNameRoomNumber?: string;
    phone?: string;
    email?: string;
}

// any を ShippingInformation に置き換え
export const UpdateShippingInformation = async (userId: string, customerData: ShippingInformation) => {
    const docRef = doc(db, "customers", userId);

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, customerData);
            console.log("データが正常に保存されました:", customerData);
        } else {
            await setDoc(docRef, customerData);
            console.log("新しいドキュメントが作成されました:", customerData);
        }
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
};


// サインアップ時ユーザーのメールアドレスを追加する関数
export const setEmailInCustomerDoc = async (userId: string, email: string) => {
    const docRef = doc(db, "customers", userId);
    await setDoc(docRef, { email }, { merge: true });
    console.log("メールアドレスが正常に更新されました:", email);
    return true;
};
