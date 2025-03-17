import React from "react";

const FaqComp: React.FC = () => {
    return (
        <div id="FAQ" className="accordion">
            <h2 className="LineupTitle_jp">よくある質問</h2>
            <span className="LineupTitle_en">
                FAQ
            </span>

            <div className="faq">
                <input type="checkbox" id="faq01" className="toggle" />
                <label className="question" htmlFor="faq01">
                    <span>Q 1</span> ノートPCレンタルサービスとは何ですか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> ノートPCを一定期間レンタルできるサービスです。購入せずに最新のPCを利用できるため、短期間のプロジェクトや業務、イベントなどに最適です。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq02" className="toggle" />
                <label className="question" htmlFor="faq02">
                    <span>Q 2</span> どのようなノートPCをレンタルできますか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> 用途に応じた様々なモデルをご用意しています。ビジネス向けの高性能モデル、クリエイター向けのグラフィック処理が得意なモデル、コンパクトで持ち運びしやすいモデルなどがあります。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq03" className="toggle" />
                <label className="question" htmlFor="faq03">
                    <span>Q 3</span> レンタル期間はどのくらいですか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> 最短1日から、1週間、1か月、長期レンタル（6か月以上）も可能です。ご希望の期間に柔軟に対応いたします。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq04" className="toggle" />
                <label className="question" htmlFor="faq04">
                    <span>Q 4</span> レンタルのメリットは何ですか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> 以下のようなメリットがあります。<br />
                        初期投資不要で最新PCを利用できる<br />
                        必要な期間だけ借りられる<br />
                        メンテナンスや修理の手間がかからない<br />
                        法人契約も可能で複数台のレンタルが簡単
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq05" className="toggle" />
                <label className="question" htmlFor="faq05">
                    <span>Q 5</span> 申し込み方法を教えてください。
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> 当サイトの申し込みフォームから簡単にレンタルできます。必要なPCのスペックや期間を選択し、お支払いを完了すれば、すぐに手続きが開始されます。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq06" className="toggle" />
                <label className="question" htmlFor="faq06">
                    <span>Q 6</span> いつから利用できますか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> ご注文後、最短即日で発送いたします。お急ぎの場合は、ご相談ください。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq07" className="toggle" />
                <label className="question" htmlFor="faq07">
                    <span>Q 7</span> 法人向けのレンタルは可能ですか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> はい、可能です。複数台のレンタル、請求書払い、長期契約などにも対応しております。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq08" className="toggle" />
                <label className="question" htmlFor="faq08">
                    <span>Q 8</span> 配送エリアはどこですか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> 日本全国に対応しています。一部の地域では配送に時間がかかる場合がありますので、事前にご確認ください。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq09" className="toggle" />
                <label className="question" htmlFor="faq09">
                    <span>Q 9</span> 途中でレンタル期間を延長できますか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> はい、可能です。延長希望の場合は、契約終了の前にお問い合わせください。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq10" className="toggle" />
                <label className="question" htmlFor="faq10">
                    <span>Q 10</span> 料金体系はどうなっていますか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> レンタル期間とPCのスペックによって異なります。料金表をご確認ください。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq11" className="toggle" />
                <label className="question" htmlFor="faq11">
                    <span>Q 11</span> 支払い方法は何がありますか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> クレジットカード、銀行振込、法人契約の場合は請求書払いも可能です。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq12" className="toggle" />
                <label className="question" htmlFor="faq12">
                    <span>Q 12</span> 保証や保険はついていますか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> すべてのレンタルPCには標準保証が付いています。追加オプションで事故保証や盗難補償も選択可能です。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq13" className="toggle" />
                <label className="question" htmlFor="faq13">
                    <span>Q 13</span> 返却方法を教えてください。
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> 返却用の専用ボックスと伝票を同封しておりますので、指定の方法で発送してください。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq14" className="toggle" />
                <label className="question" htmlFor="faq14">
                    <span>Q 14</span> 破損や故障した場合はどうなりますか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> 通常の使用範囲内での故障は保証の対象となります。ただし、故意または重大な過失による破損の場合は修理費用が発生することがあります。
                    </div>
                </div>
            </div>

            <div className="faq">
                <input type="checkbox" id="faq15" className="toggle" />
                <label className="question" htmlFor="faq15">
                    <span>Q 15</span> レンタル中にサポートを受けられますか？
                </label>
                <div className="anser">
                    <div>
                        <span>A</span> はい、サポートセンターにて、技術的なトラブルや設定に関するご相談を受け付けています。
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FaqComp;
