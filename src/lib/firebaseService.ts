import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, doc, deleteDoc, updateDoc, getDoc, setDoc, query, where, getDocs } from 'firebase/firestore';
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

interface Product {
    id: string;
    stripe_metadata_categories?: string;
    [key: string]: unknown;
}

interface Price {
    active: boolean;
    unit_amount: number;
}

// 商品の最安値を取得する関数
export const getLowestPrice = async (productId: string): Promise<number | undefined> => {
    try {
        const pricesRef = collection(db, "products", productId, "prices");
        const querySnapshot = await getDocs(pricesRef);
        
        let lowestPrice: number | undefined;
        
        querySnapshot.docs.forEach(doc => {
            const priceData = doc.data() as Price;
            if (priceData.active) {
                const amount = priceData.unit_amount;
                if (!lowestPrice || amount < lowestPrice) {
                    lowestPrice = amount;
                }
            }
        });
        
        return lowestPrice;
    } catch (error) {
        console.error("Error getting lowest price:", error);
        return undefined;
    }
};

// カテゴリーに基づいて商品を取得する関数を修正
export const getProductsByCategory = async (category: string) => {
    try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);
        
        const productsPromises = querySnapshot.docs
            .map(async doc => {
                const productData = doc.data();
                const categories = productData.stripe_metadata_categories?.split(',') || [];
                
                if (categories.includes(category)) {
                    // pricesサブコレクションからactive: trueのデータを取得
                    const pricesRef = collection(db, "products", doc.id, "prices");
                    const pricesQuery = query(pricesRef, where("active", "==", true));
                    const pricesSnapshot = await getDocs(pricesQuery);
                    
                    const prices = pricesSnapshot.docs.map(priceDoc => {
                        const priceData = priceDoc.data();
                        let labels: string[] = [];
                        
                        // metadataの処理を修正
                        if (priceData.metadata) {
                            if (Array.isArray(priceData.metadata)) {
                                labels = priceData.metadata.map((item: { label: string }) => item.label);
                            } else if (typeof priceData.metadata === 'object') {
                                // オブジェクトの場合、labelプロパティを探す
                                const label = priceData.metadata.label;
                                if (label) {
                                    labels = [label];
                                }
                            }
                        }
                        
                        return {
                            id: priceDoc.id,
                            ...priceData,
                            labels: labels
                        };
                    });

                    const lowestPrice = await getLowestPrice(doc.id);
                    return {
                        id: doc.id,
                        ...productData,
                        price: lowestPrice,
                        prices: prices
                    } as Product;
                }
                return null;
            });

        const products = await Promise.all(productsPromises);
        return products.filter((product): product is Product => product !== null);
        
    } catch (error) {
        console.error("Error getting products by category:", error);
        throw error;
    }
};

export const getProductById = async (id: string): Promise<Product> => {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
        throw new Error('Product not found');
    }

    // pricesサブコレクションも取得
    const pricesRef = collection(db, 'products', id, 'prices');
    const pricesSnapshot = await getDocs(pricesRef);

    const prices = pricesSnapshot.docs.map(priceDoc => {
        const priceData = priceDoc.data();
        let labels: string[] = [];
        if (priceData.metadata) {
            if (Array.isArray(priceData.metadata)) {
                labels = priceData.metadata.map((item: { label: string }) => item.label);
            } else if (typeof priceData.metadata === 'object') {
                const label = priceData.metadata.label;
                if (label) {
                    labels = [label];
                }
            }
        }
        return {
            id: priceDoc.id,
            ...priceData,
            labels: labels
        };
    });

    return {
        id: productSnap.id,
        ...productSnap.data(),
        prices: prices
    } as Product;
};
