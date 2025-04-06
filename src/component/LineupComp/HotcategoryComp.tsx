import React from "react";
import hot1 from '../../assets/hotcate/46.jpg';

const HotcategoryComp: React.FC = () => {
    return (
        <div className="HotcategoryComp">
            <ul className="list">
                <li className="list__item">
                    <img src={hot1} alt="" />
                </li>
                <li className="list__item">
                    <img src={hot1} alt="" />
                </li>
                <li className="list__item">
                    <img src={hot1} alt="" />
                </li>
                <li className="list__item">
                    <img src={hot1} alt="" />
                </li>
                <li className="list__item">
                    <img src={hot1} alt="" />
                </li>
                <li className="list__item">
                    <img src={hot1} alt="" />
                </li>
            </ul>
        </div>
    );
};

export default HotcategoryComp;