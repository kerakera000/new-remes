import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page__container">
      <h1 className="legal-page__title">プライバシーポリシー</h1>
      
      <section className="legal-page__section">
        <h2 className="legal-page__section-title">1. 個人情報の収集と利用</h2>
        <p className="legal-page__section-content">
          当サイトでは、サービスの提供、改善、およびお客様の体験向上のために、以下のような個人情報を収集する場合があります：
        </p>
        <ul className="legal-page__list">
          <li className="legal-page__list-item">お名前</li>
          <li className="legal-page__list-item">メールアドレス</li>
          <li className="legal-page__list-item">住所</li>
          <li className="legal-page__list-item">電話番号</li>
          <li className="legal-page__list-item">その他サービス提供に必要な情報</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">2. 個人情報の保護</h2>
        <p className="legal-page__section-content">
          当サイトは、お客様の個人情報を適切に管理し、漏洩、紛失、破壊、改ざん、不正アクセスなどのリスクに対して、合理的な安全対策を講じます。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">3. 個人情報の第三者提供</h2>
        <p className="legal-page__section-content">
          当サイトは、以下の場合を除き、お客様の個人情報を第三者に提供することはありません：
        </p>
        <ul className="legal-page__list">
          <li className="legal-page__list-item">お客様の同意がある場合</li>
          <li className="legal-page__list-item">法令に基づく場合</li>
          <li className="legal-page__list-item">人の生命、身体または財産の保護のために必要がある場合</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">4. プライバシーポリシーの変更</h2>
        <p className="legal-page__section-content">
          当サイトは、必要に応じて本プライバシーポリシーを変更する場合があります。変更があった場合は、当サイト上でお知らせいたします。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">5. お問い合わせ</h2>
        <p className="legal-page__section-content">
          本プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いいたします：
        </p>
        <p className="legal-page__contact">メールアドレス: contact@example.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy; 