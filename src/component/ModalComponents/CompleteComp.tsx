import React from "react";

import Vector from "../../assets/items/detailproduct/Vector.svg";

interface CompleteComp {
    closeModal: () => void;
}

const CompleteComp: React.FC<CompleteComp> = ({ closeModal }) => {
    return (
        <div className="modal">
            <button className="modal__close" onClick={closeModal}>
                <img src={Vector} alt="Close" />
            </button>
        </div>

    );
};

export default CompleteComp;