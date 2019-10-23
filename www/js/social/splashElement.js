define(function (require,exports,module) {//---
return `<div id='splash' style='position:relative; height: 100%;'>
    <!--ここに，ロード中に表示する内容を記述できます。-->
    <!--You can write here what you want to show while loading. -->
    <div class='progress'>
        <!-- ここにロード中の進捗が表示されます．表示したくない場合はこのdiv要素を削除してください。 -->
        <!-- This shows progress. If you don't want to show, remove this element. -->
    </div>
    <div class='unsupported' style="display:none;">
        <!-- ここに非対応ブラウザ向けメッセージが表示されます．表示したくない場合はこのdiv要素を削除してください。 -->
        <!-- This shows message for unsupported browsers. If you don't want to show, remove this element. -->
        <p>お使いのブラウザではこのプログラムは動作しません．他のブラウザをお試しください．</p>
        <p>The program does not run in this browser. Try another browser.</p>
    </div>
</div>
<!--
Open this site when editing this game:
https://edit.tonyu.jp/index.html?importFromHTML=1
-->`;
});//---of define
