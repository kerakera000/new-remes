// PaymentComp

import React from "react";

import Vector from "../../assets/items/detailproduct/Vector.svg";

interface PaymentComp {
    closeModal: () => void;
}

const PaymentComp: React.FC<PaymentComp> = ({ closeModal}) => {
    return (
        <div className="modal">
            <button className="modal__close" onClick={closeModal}>
                <img src={Vector} alt="Close" />
            </button>
        </div>

    );
};

export default PaymentComp;