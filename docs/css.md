## CSS

### レイヤー

スタイルは3つのレイヤーがあります。

| 名前          | 説明                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| Design Tokens | デザイントークンを管理します。Figma との連携を検討中です。<br/>詳細は[Desing Tokens](#design-tokens)を参照のこと。 |
| Base Styles   | reset.css や全体に適用する base スタイルを指定します。                                                             |
| Parts Styles  | Components や Block のスタイルです。                                                                               |

### CSS設計

CSS設計が必要になるのは Parts Styles です。<br/>
svelteやastroのコンポーネントにスタイルを書く場合、デフォルトでコンポーネントごとにスコープが閉じます。
そのため、コンポーネントごとに成立していれば自由に書いても良いのですが、それでは管理が難しいため、ルールを決めて記述することとします。

#### 基本ルール

<blockquote>
  <ul>
    <li>独自のルール「BBEM（Block x 2, Element, Modifier）」を採用します。</li>
  </ul>
</blockquote>

#### 2 words block

<blockquote>
  <ul>
    <li>Blockは必ず2単語で構成し、1つ目の単語で分類します。（.two-words）</li>
    <li>NG: .theree-words-block</li>
  </ul>
</blockquote>

#### 1 deep element

<blockquote>
  <ul>
    <li>Blockの下にElementを設定できますが、1階層だけです。（.two-words_element）</li>
    <li>もし2階層以上使用したい場合は、別のBlockの作成を検討します。</li>
    <li>NG: .top-words_element_element</li>
  </ul>
</blockquote>

#### CamelCase as 1 word

<blockquote>
  <ul>
    <li>BlockやElementをCamelCaseで記述した場合、1単語として扱えます。（.two-words_oneElement）</li>
    <li>ただし、多用すると可読性が下がるため、最低限に留めることとします。</li>
  </ul>
</blockquote>

#### Modify

<blockquote>
  <ul>
    <li>Modifyはケバブケース（.-kebab-case）で記述します。（.two-words.-modify）</li>
    <li>BlockやElementに付与して使用し、modifyのみでの使用は禁止します。</li>
    <li>NG: &lt;div class="-modify"&gt;...&lt;/div&gt;</li>
  </ul>
</blockquote>

#### Other

<blockquote>
  <ul>
    <li>
      ユーティリティクラスは基本的に使用しません。ただ、プロジェクトの要件に合わせ、導入を検討することも可能とします。
    </li>
    <li>CSSクラスではなく、data属性を使用することも可能です。多用には注意してください。</li>
  </ul>
</blockquote>
