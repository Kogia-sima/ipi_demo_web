<div align="center">

<img src="public/logo.png" alt="IPI Demo Logo" width="140" />

<h1>間接プロンプトインジェクション体験デモ</h1>

<p>
  <strong>AIに潜む新しいセキュリティリスクを、実際に体験して学べる教育用Webサイト</strong>
</p>

<img src="public/screenshot.png" alt="アプリケーション画面" width="85%" />

<br />

<p>
  <a href="https://ipi-demo-web.vercel.app/">
    <img src="https://img.shields.io/badge/🔗_Live_Demo-Visit_Site-4F46E5?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/Kogia-sima/ipi_demo_web">
    <img src="https://img.shields.io/badge/GitHub-Source-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel" />
</p>

</div>

<br />

---

## 🤔 このサイトは何か？

最近、ChatGPT や Gemini といった生成 AI、そして自動で作業を進めてくれる「AI エージェント」が広く使われるようになってきました。

便利な一方で、**「間接プロンプトインジェクション」** と呼ばれる新しい攻撃手法が問題になっています。
これは、AI に読み込ませる Web サイトやデータの中にこっそり悪意ある命令を仕込み、AI をだまして個人情報や機密情報を盗み出す手口です。

ただ、この危険性は文章で説明されてもイメージしにくく、「自分には関係ない話」と感じてしまいがちです。

そこで本サイトでは、**実際に AI が攻撃されている様子をシミュレーション映像として体験**できるようにしました。
AI の内部で何が起きているか、情報がどこへ送られているかが目で見て分かるので、エンジニアでない方にも危険性を実感していただけます。

<br />

## 🎬 体験できる3つのシナリオ

それぞれ **約 30 秒** で完結します。好きな順番で何度でも体験できます。

<table>
  <thead>
    <tr>
      <th align="left">シナリオ</th>
      <th align="left">学べること</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>Web サイトの要約をお願いしたら…</strong><br/>
        「次の Web サイトを要約して」と AI に頼んだだけなのに、Google Drive のアクセス権限とパスワードが盗まれてしまう様子を再現します。
      </td>
      <td>悪意ある <strong>Web サイトの中に隠された命令</strong> が AI を動かしてしまう仕組み</td>
    </tr>
    <tr>
      <td>
        <strong>天気予報を聞いただけなのに…</strong><br/>
        「明日の天気を教えて」と AI に頼んだら、現在位置や行動履歴が外部に送られてしまう様子を再現します。
      </td>
      <td>AI が利用する <strong>外部サービス（MCP サーバー）に潜む罠</strong></td>
    </tr>
    <tr>
      <td>
        <strong>会議資料の作成を頼んだら…</strong><br/>
        「今日の会議資料を作成して」と AI に頼んだら、会社の機密ファイルが流出してしまう様子を再現します。
      </td>
      <td>AI に追加機能を与える <strong>「スキル」に仕込まれた悪意ある命令</strong></td>
    </tr>
  </tbody>
</table>

<br />

## ✨ 主な特徴

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🖥️ AI チャットのリアルな再現</h3>
      本物の AI チャットサービスのような画面で、自然に体験を進められます。
    </td>
    <td width="50%" valign="top">
      <h3>🔍 AI の内部動作が見える</h3>
      画面右側には、AI が裏側で何をしているかを示す「疑似ログ」がリアルタイムで流れます。攻撃が発生した瞬間は赤色で強調されるので、危険な箇所がひと目で分かります。
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🗺️ 世界地図で情報の流出経路を可視化</h3>
      あなたの情報がどこの国へ送信されているのか、世界地図上のアニメーションで確認できます。
    </td>
    <td width="50%" valign="top">
      <h3>📘 シナリオごとに分かりやすい解説</h3>
      体験のあとには、「なぜ攻撃が成立したのか」「どうすれば防げるのか」を、専門用語を使わずにイラスト付きで解説します。
    </td>
  </tr>
</table>

<br />

## 🛡️ 学べる対策

各シナリオの解説では、一般の方でもすぐに実践できる具体的な対策をご紹介しています。たとえば…

- ✅ 信頼できない Web サイトを AI に要約させない
- ✅ AI に不必要な権限（クラウドストレージへのアクセス権など）を与えない
- ✅ AI の出力結果を必ず自分の目で確認する
- ✅ AI に追加機能（スキル・拡張機能）を入れるときは提供元を確認する
- ✅ 不要になった拡張機能はこまめに削除する

<br />

## 🌐 動作環境

| 項目 | 内容 |
| :--- | :--- |
| **対応ブラウザ** | Chrome / Edge / Safari / Firefox |
| **推奨デバイス** | PC（スマートフォン・タブレットでも利用可能） |
| **対応言語** | 日本語のみ（将来的に多言語対応予定） |

<br />

## ⚠️ 免責事項

> - 本サイトは、間接プロンプトインジェクションという攻撃手法を分かりやすく学んでいただくための **教育目的のシミュレーション** です。
> - 実際の AI による応答や、実際の情報流出は一切発生しません。
> - 登場する企業名・サービス名は説明のための仮の名称であり、実在する企業・サービスとは関係ありません。
> - 本サイトの情報を悪用する行為を固く禁じます。

<br />

## 🔗 関連リンク

- 🌐 **公開サイト**: <https://ipi-demo-web.vercel.app/>
- 💻 **ソースコード**: <https://github.com/Kogia-sima/ipi_demo_web>

<br />

<div align="center">
  <sub>Built with ❤️ using Next.js, TypeScript & Tailwind CSS</sub>
</div>
