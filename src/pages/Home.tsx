import React from "react";

import HomeKvComp from "../component/HomeComp/KvComp";
import HomeAboutComp from "../component/HomeComp/AboutComp";
import HomeLineupComp from "../component/HomeComp/LineupComp";
import HomeCustomerComp from "../component/HomeComp/CustomerComp";
import HomeFaqComp from "../component/HomeComp/FaqComp";

const Home: React.FC = () => {
    return (
        <div className="main_content">
            {/* <!-- トップ --> */}
            <HomeKvComp />

            {/* <!-- サービス内容・ご利用の流れ --> */}
            <HomeAboutComp />

            {/* <!-- 商品紹介 --> */}
            <HomeLineupComp />

            {/* <!-- お客様の声 --> */}
            <HomeCustomerComp />

            {/* <!-- よくある質問 --> */}
            <HomeFaqComp />
        </div>
    );
};

export default Home;