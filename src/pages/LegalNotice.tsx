import React from 'react';

const LegalNotice: React.FC = () => {
  return (
    <div className="legal-page__container">
      <h1 className="legal-page__title">特定商取引法に基づく表記</h1>
      
      <section className="legal-page__section">
        <h2 className="legal-page__section-title">販売業者</h2>
        <p className="legal-page__section-content">
          株式会社サンプル
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">代表者</h2>
        <p className="legal-page__section-content">
          代表取締役 山田太郎
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">所在地</h2>
        <p className="legal-page__section-content">
          〒100-0001<br />
          東京都千代田区千代田1-1-1
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">電話番号</h2>
        <p className="legal-page__section-content">
          03-1234-5678
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">メールアドレス</h2>
        <p className="legal-page__section-content">
          contact@example.com
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">販売価格</h2>
        <p className="legal-page__section-content">
          商品ごとに表示された価格（税込）
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">代金の支払方法</h2>
        <p className="legal-page__section-content">
          クレジットカード決済、銀行振込、コンビニ決済
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">商品の引渡時期</h2>
        <p className="legal-page__section-content">
          ご注文から3営業日以内に発送いたします。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">返品・交換について</h2>
        <p className="legal-page__section-content">
          商品到着後7日以内に限り、未使用・未開封の商品に限り返品・交換を受け付けます。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">事業者番号</h2>
        <p className="legal-page__section-content">
          1234567890123
        </p>
      </section>
    </div>
  );
};

export default LegalNotice; 