import React, { useEffect, useState } from 'react';

import scroll1 from '../../../assets/scroll/scroll1.svg'; // 画像をインポート
import scroll2 from '../../../assets/scroll/scroll2.svg';
import scroll3 from '../../../assets/scroll/scroll3.svg';

const ScrollComp: React.FC = () => {
    // 画像リストの初期状態
    const [images, setImages] = useState([
        { src: scroll1, alt: 'scroll1' },
        { src: scroll2, alt: 'scroll2' },
        { src: scroll3, alt: 'scroll3' },
    ]);

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // 画像をスクロールする関数
        const scrollImages = () => {
        if (currentStep === 0) {
            setImages([
            { src: scroll1, alt: 'scroll1' },
            { src: scroll2, alt: 'scroll2' },
            { src: scroll3, alt: 'scroll3' },
            ]);
            setCurrentStep(1);
        } else if (currentStep === 1) {
            setImages([
            { src: scroll3, alt: 'scroll3' },
            { src: scroll1, alt: 'scroll1' },
            { src: scroll2, alt: 'scroll2' },
            ]);
            setCurrentStep(2);
        } else {
            setImages([
            { src: scroll2, alt: 'scroll2' },
            { src: scroll3, alt: 'scroll3' },
            { src: scroll1, alt: 'scroll1' },
            ]);
            setCurrentStep(0);
        }
        };

        // 500msごとにスクロール処理を行う
        const intervalId = setInterval(() => {
        scrollImages();
        }, 500);

        // コンポーネントがアンマウントされる前にインターバルをクリア
        return () => {
        clearInterval(intervalId);
        };
    }, [currentStep]);

    return (
        <div className="scroll_box"> {/* クラス名の `-` を `_` に変換 */}
    {images.map((image, index) => (
        <img key={index} src={image.src} alt={image.alt} />
    ))}
</div>

    );
};

export default ScrollComp;