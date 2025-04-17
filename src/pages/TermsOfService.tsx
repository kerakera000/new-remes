import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="legal-page__container">
      <h1 className="legal-page__title">利用規約</h1>
      
      <section className="legal-page__section">
        <h2 className="legal-page__section-title">1. はじめに</h2>
        <p className="legal-page__section-content">
          本利用規約（以下「本規約」）は、当サイトの利用条件を定めるものです。本サイトを利用するすべてのユーザーは、本規約に同意したものとみなされます。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">2. サービスの利用</h2>
        <p className="legal-page__section-content">
          ユーザーは、本規約に従って本サービスを利用することができます。ただし、以下の行為は禁止します：
        </p>
        <ul className="legal-page__list">
          <li className="legal-page__list-item">法令または公序良俗に違反する行為</li>
          <li className="legal-page__list-item">犯罪行為に関連する行為</li>
          <li className="legal-page__list-item">他のユーザーに迷惑をかける行為</li>
          <li className="legal-page__list-item">本サービスの運営を妨害する行為</li>
          <li className="legal-page__list-item">その他、当サイトが不適切と判断する行為</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">3. アカウント管理</h2>
        <p className="legal-page__section-content">
          ユーザーは、自己の責任において、アカウント情報を管理するものとします。アカウント情報の管理不十分、使用上の過誤、第三者の使用等によって生じた損害について、当サイトは一切の責任を負いません。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">4. 知的財産権</h2>
        <p className="legal-page__section-content">
          本サービスに関する著作権、商標権、その他の知的財産権は、当サイトまたは正当な権利を有する第三者に帰属します。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">5. 免責事項</h2>
        <p className="legal-page__section-content">
          当サイトは、本サービスの利用によって生じた損害について、一切の責任を負いません。また、本サービスの提供の中断、停止、終了、利用不能、または変更によって生じた損害についても、同様とします。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">6. 規約の変更</h2>
        <p className="legal-page__section-content">
          当サイトは、必要に応じて本規約を変更することがあります。変更があった場合は、当サイト上でお知らせいたします。
        </p>
      </section>

      <section className="legal-page__section">
        <h2 className="legal-page__section-title">7. お問い合わせ</h2>
        <p className="legal-page__section-content">
          本規約に関するお問い合わせは、以下の連絡先までお願いいたします：
        </p>
        <p className="legal-page__contact">メールアドレス: contact@example.com</p>
      </section>
    </div>
  );
};

export default TermsOfService; 