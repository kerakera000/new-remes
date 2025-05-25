import React from 'react';
import VectorRed from '../../../assets/breadcrumb/Vector-red.svg';
import Vector from '../../../assets/breadcrumb/Vector.svg';

interface BreadcrumbProps {
  currentStep: number;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentStep }) => {
    return (
        <ul className="breadcrumb">
            <li className={`list ${currentStep >= 1 ? 'active' : ''}`}>
                <span className='text'>お客様情報入力</span>
                <img className='act' src={VectorRed} alt="breadcrumb arrow" />
                <img className='normal' src={Vector} alt="breadcrumb arrow" />
            </li>
            <li className={`list ${currentStep >= 2 ? 'active' : ''}`}>
                <span className='text'>ご注文の確認</span>
                <img className='act' src={VectorRed} alt="breadcrumb arrow" />
                <img className='normal' src={Vector} alt="breadcrumb arrow" />
            </li>
            <li className={`list ${currentStep >= 3 ? 'active' : ''}`}>
                <span className='text'>決済</span>
            </li>
            <li className={`list ${currentStep >= 4 ? 'active' : ''}`}>
                <span className='text'>ご注文完了</span>
            </li>
        </ul>
    );
};

export default Breadcrumb;
