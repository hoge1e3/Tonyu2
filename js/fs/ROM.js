if (false) {
FS.mountROM(
        {"base":"/Tonyu/Kernel/","data":{"":"{\"NObjTest.tonyu\":{\"lastUpdate\":1387528337834},\".desktop\":{\"lastUpdate\":1387528899065},\"NObjTest2.tonyu\":{\"lastUpdate\":1387528338943},\"NoviceActor.tonyu\":{\"lastUpdate\":1387528762133},\"BaseActor.tonyu\":{\"lastUpdate\":1387528896143},\"Actor.tonyu\":{\"lastUpdate\":1387529064959},\"AcTest.tonyu\":{\"lastUpdate\":1387528927721},\"AcTestM.tonyu\":{\"lastUpdate\":1387529000254}}","NObjTest.tonyu":"native console;\nnative alert;\n\n\\move(p) {\n    x+=p.vx;\n    y+=p.vy;\n}\n\nx=100;\ny=100;\nvy=0;vx=0;\nt=new NObjTest2{x:200, y: 50};\nwatchHit(NObjTest, NObjTest2, onH);\nwhile (true) {\n    if (getkey(\"left\")) vx=-2;\n    if (getkey(\"Right\")) vx=2;\n    if (getkey(\"up\")==1) vy=-2;\n    y+=vy;\n    vy+=0.1;\n    move{vx,vy};\n    // console.log(x+\",\"+y);\n    go(x,y);\n    sleep();\n    /*if (crashTo(t)) {\n    t.hide();\n    }*/\n}\n\\onH(a,b) {\n    b.hide();\n    a.vy=5;\n}",".desktop":"{\"runMenuOrd\":[\"AcTestM\",\"NObjTest\",\"NObjTest2\",\"AcTest\",\"NoviceActor\",\"BaseActor\",\"Actor\"]}","NObjTest2.tonyu":"change(10);\ngo(x,y);\n","NoviceActor.tonyu":"extends BaseActor;\nnative Sprites;\nnative Tonyu;\n\n\\sleep(n) {\n    if(!n) n=1;\n    for(n;n>0;n--) update();\n}\n\\initSprite() {\n    if (!_sprite) _sprite=Sprites.add{owner:this};\n}\n\\say(text,size) {\n    if (!size) size=15;\n    initSprite();\n    _sprite.fukidashi={text:text, size:size, c:30};\n}\n\\sprite(x,y,p) {\n    go(x,y,p);\n}\n\\show(x,y,p) {\n    go(x,y,p);\n}\n\\go(x,y,p) {\n    initSprite();\n    _sprite.x=x;\n    _sprite.y=y;\n    if (p!=null) _sprite.p=p;\n    //update();\n}\n\\change(p) {\n    initSprite();\n    _sprite.p=p;\n}\n","BaseActor.tonyu":"extends null;\nnative Sprites;\nnative Tonyu;\nnative Key;\nnative console;\n\n\\new(p) {\n    if (Tonyu.runMode) {\n        var thg=Tonyu.currentProject.currentThreadGroup;\n        if (thg) _th=thg.addObj(this);\n    }\n    if (p) Tonyu.extend(this, p);\n}\n\n\\print(c) {\n    console.log(c);\n}\n\\update() {\n    ifwait {\n        _thread.suspend();\n    }\n}\n\\getkey(k) {\n    return Key.getkey(k);\n}\n\\crashTo(t) {\n    return hitTo(t);\n}\n\\hitTo(t) {\n    if (_sprite && t._sprite) {\n        return _sprite.crashTo(t._sprite);\n    }\n    return false;\n}\n\\watchHit(typeA,typeB,onHit) {\n    Sprites.watchHit(typeA , typeB, \\(a,b) {\n        onHit.apply(this,[a,b]);\n    });\n}\n\\currentThreadGroup() {\n    return Tonyu.currentProject.currentThreadGroup;\n}\n\\die() {\n    if (_th) {\n        _th.kill();\n    }\n    hide();\n    isDead=true;\n}\n\\hide() {\n    Sprites.remove(_sprite);\n    _sprite=null;\n}\n","Actor.tonyu":"extends BaseActor;\nnative Sprites;\nnative Tonyu;\n\n\\new(p) {\n    super(p);\n    if (Tonyu.runMode) initSprite();\n}\n\\initSprite() {\n    if (!_sprite) {\n        _sprite=Sprites.add{owner:this};\n        print(Sprites);\n    }\n}\n\n\\update() {\n    super.update();\n    _sprite.x=x;\n    _sprite.y=y;\n    _sprite.p=p;\n}","AcTest.tonyu":"extends Actor;\n\nwhile (true) {\n    x+=vx;\n    y+=vy;\n    update();\n}","AcTestM.tonyu":"extends Actor;\nnew AcTest{x:10, y:100, vx:5, vy:0, p:0};\nnew AcTest{x:320, y:100, vx:-5, vy:0, p:10};\n\nwatchHit(AcTest,AcTest,\\(a,b) {\n    if (a.x>b.x) {\n        a.vx=5; \n        b.vx=-5;\n    } else {\n        a.vx=-5; \n        b.vx=5;\n    }\n    print(\"Hit!\");\n});"}}
        );
}
if (true) {
FS.mountROM(
        {"base":"/Tonyu/doc/","data":{"":"{\"true.txt\":{\"lastUpdate\":1387348380800},\"inc.txt\":{\"lastUpdate\":1387348291754},\"sleep.txt\":1386741286926,\"firstRun.txt\":1386741286930,\"trouble1.txt\":{\"lastUpdate\":1387351409304},\"sprite.txt\":{\"lastUpdate\":1387188281424},\"variable.txt\":{\"lastUpdate\":1387348126572},\"dec.txt\":{\"lastUpdate\":1387348400893},\"while.txt\":{\"lastUpdate\":1387348372753},\"variable3.txt\":{\"lastUpdate\":1387353522965},\"xy.txt\":{\"lastUpdate\":1387348410534},\"index.txt\":1386741286921,\"variable2.txt\":{\"lastUpdate\":1387348168751},\"newFile.txt\":{\"lastUpdate\":1386764897647},\"say.txt\":{\"lastUpdate\":1387170762417},\"toc.json\":{\"lastUpdate\":1387353516027},\"getkey.txt\":1386741286982,\"key.txt\":{\"lastUpdate\":1387353757390},\"spriteMove.txt\":{\"lastUpdate\":1387347938596},\"projectIndex.txt\":{\"lastUpdate\":1387349338558},\"udlr.txt\":{\"lastUpdate\":1387348423347},\"item.txt\":{\"lastUpdate\":1386775339315},\"new.txt\":{\"lastUpdate\":1387006694525},\"param.txt\":{\"lastUpdate\":1387006597693},\"crash.txt\":{\"lastUpdate\":1387350496398},\"say2.txt\":{\"lastUpdate\":1387348991451},\"left.txt\":{\"lastUpdate\":1387350788674}}","true.txt":"* ずっと繰り返すようにしましょう\n\nさきほどのプログラムでは，[[@cfrag x<=300]]，つまりxが300以下の間は絵が右に動き，xが300をを超えたら止まりました．\n\nゲームなどにおいては，キャラクタは（ゲームオーバーやクリアにならなければ）半永久的に動き続けます．このようにずっと動く処理を書くには，[[@plistref true]]のようにします．\n\n<<code Cat true\nx=50;\nwhile(true) {\n   go(x,100);sleep();\n   x+=10;\n}\n>>\n\n実行すると，猫の画像が途中で止まらずに，そのまま画面外に出ていきます．\n\nもう一度F9を押せば，また同じ動きを見ることができます．\n\nwhile文の条件に書いてある [[@cfrag true]]という条件は，「必ず成り立つ」という意味です．この条件を書いておくと，{  } で囲まれた処理がずっと動き続けます．\n","inc.txt":"* 変数の値を増やしてみましょう\n\nさて，さきほどのプログラムをもう一度みてみましょう，\n\n<<code Cat 50to60\nx=50;\ngo(x,100);sleep();\nx=60;\ngo(x,100);sleep();\n>>\n\n[[@plistref 50to60]]では，[[@cfrag x=50;]]で，xに50覚えさせてから，\n[[@cfrag x=60;]]で，xに60覚えさせています．\n\nここでは，\n「xに60を覚えさせる」代わりに，「（すでに覚えている）50 を10だけ増やす」\nという書き方を紹介します．\n\n<<code Cat 50to60inc\nx=50;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\n>>\n\n[[@cfrag x+=10;]]という書き方が出てきました．これは\n「今覚えているxの値に，10を足す」という意味です．\n\n[[@plistref 50to60inc]]では，\n[[@cfrag x+=10;]]が実行される時点では，\nxは50を覚えていますので，\n[[@cfrag x+=10;]]が実行されると，50に10を足した値である\n60を新しくxに覚えさせます．結果として，\n[[@plistref 50to60inc]]は，\n[[@plistref 50to60]]と同じ結果になります．\n\nこれを利用して，xを100まで増やしながら，絵を動かしてみましょう．\n\n<<code Cat 50to100inc\nx=50;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\n>>","sleep.txt":"[[前へ>say]]\n\n*メッセージを順番に表示させてみましょう\n\nプログラムは上から順番に実行されます．\n\n今度は「こんにちは」に続けて，「さようなら」と表示させてみたいと思います．\n[[@plistref nonsleep]]を入力します．\n\n@@@@nonsleep\ngo(50,100);\nsay(\"こんにちは\");\nsay(\"さようなら\");\n@@@@\n\n実行してみましょう.\n\n[[[[@plistref nonsleep]]の実行結果>sayonara.png]]\n\nあれ！いきなり「さようなら」が表示されました．「こんにちは」は表示されなかったのでしょうか？\n\n実は，コンピュータは確かに[[@plistref nonsleep]]のプログラムを上から順番に\n\n- 猫の絵を表示する\n- 「こんにちは」と表示する\n- 「さようなら」と表示する\n\nと実行したのです．しかし，コンピュータはとても高速に動作しているので\n「こんにちは」と表示してから，人間の目に見えないうちに，すぐに「さようなら」\nと表示してしまっています．\n\nこれでは，「こんにちは」が見えないので，コンピュータに少し待ってもらうように命令を追加しましょう．\n\n@@@@sleep\ngo(50,100);\nsay(\"こんにちは\");\nsleep(30); // 追加\nsay(\"さようなら\");\n@@@@\n\n実行すると，今度は「こんにちは」が表示されてから「さようなら」が表示されました．\n\n[[@plistref sleep]]で追加した sleep という命令は，その名の通りコンピュータにしばらく寝てもらいます．\nつまり，プログラムの実行を少し待ってもらいます．\n後ろに書いた30 は，どれくらい待つかを表す数値で，単位は「フレーム」です．\nフレームについては後ほど詳しく説明しますが，1フレームは30分の1秒(約0.03秒)に相当します．\n\nsleep(30)は30フレーム，つまり1秒ほど実行を待ちます．つまり，このプログラムは，次の順番で実行されます．\n\n- 猫の絵を表示する\n- 「こんにちは」と表示する\n- 30フレーム（1秒ほど）待つ\n- 「さようなら」と表示する\n\n\n[[次へ>spriteMove]]","firstRun.txt":"* プログラムを実行しましょう\n\n実行するには [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押します．\n\n[[@figref firstRunRes.png]]のように，猫の絵が表示されたら成功です．\n\n[[実行結果>firstRunRes.png]]\n\n[[うまくいかないときは>trouble1]]\n\n\n\n\n\n\n\n","trouble1.txt":"プログラムを書き間違えていると，エラーが表示されます．\n\n[[文法エラー>syntaxError.png]]\n\n[[@figref syntaxError.png]]の例では，命令の最後にセミコロン ;  をつけていないためにエラーになっています．\nセミコロンを追加して，再度実行してください．\n\n[[@figref runtimeError.png]]の例では，命令の名前を間違えています．(goo ではなく go ）\n正しい命令になおしてください．\n\n[[命令の名前が違うエラー>runtimeError.png]]\n\nなお，命令の名前は大文字と小文字が区別されます．[[@cfrag go]]の代わりに[[@cfrag Go]]と書くことはできません．\n\n[[戻る>firstRun]]","sprite.txt":"* 値を変えてみましょう\n\nプログラムは，命令を実行します．\nここでは，go という命令を使って，画面に絵を表示させています．\n\n@@@@\ngo(50,100);\n@@@@\n\nここで， 50 や 100 などの数値を別の数値に変えてみましょう\n\n@@@@\ngo(150,100);\n@@@@\n\nもう一度， [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押して実行します．\n\n画面上の位置を決めるには，2つの数値が必要になります．\nそれは，「横の位置」と「縦の位置」です．\n-横の位置は「画面左端から何ピクセル離れているか」をあらわした数値です\n-縦の位置は「画面上端から何ピクセル離れているか」をあらわした数値です\n\n横の位置と縦の位置をまとめてあらわしたものを「座標」といい，\n\n(横の位置,縦の位置)\n\nという形式であらわします．\n\n例えば(50,100) という座標は，次のような位置をあらわします．\n-画面左端から50ピクセル離れた位置\n-画面上端から100ピクセル離れた位置\n\n[[座標>50_100.png]]\n\nいろいろな位置の座標を[[@figref coords.png]]にまとめました．それぞれの数値の違いに注目しましょう．\n\n[[位置と座標>coords.png]]\n\nここで出てきたgo という命令は，go の後ろに書いた座標の位置に，絵を表示します．\n\n命令は，次のような形式で書きます．\n\n<<code\n命令の名前 ( 引数 , 引数 ...);\n>>\n引数（ひきすう）とは，命令を行うときに必要な情報をあらわします．\n\n例えば，[[@cfrag go(100,50);]] は [[@cfrag go]]という名前の命令を，\n100 と 50 という2つの引数（どこに移動するか，という情報）を\n使って行います．\n","variable.txt":"* 画像をもっと長い時間動かしてみましょう\n\nさきほどの実行したプログラム([[@plistref 50_100]]は，\n横の位置を50 から始めて，100まで動かしました．\n\n@@@@\ngo(50,100);sleep();\ngo(60,100);sleep();\ngo(70,100);sleep();\ngo(80,100);sleep();\ngo(90,100);sleep();\ngo(100,100);sleep();\n@@@@\n\n今度はもっと遠くまで動かしてみましょう．\n例えば，横の位置を50から300まで動かしてみるには，[[@figref 50_300.png]] のように，\nsleepを，[[@cfrag go(300,100);]] になるまで書けばよいでしょう\n\n[[300まで動かすプログラム>50_300.png]]\n\n実行してみましょう．さっきよりも長く動きますね．\n\n","dec.txt":"*画像を左方向にも動かしてみましょう\n\n今まで，猫の画像は左から右にしか動いていませんでしたが，右から左にも動かすことが\nできます．\n\n<<code Cat dec\nx=300;\nwhile(true) {\n   go(x,100);sleep();\n   x-=10;\n}\n>>\n\nここに出てきた[[@cfrag x-=10]]は，「xの値を10減らす」という命令です．\n\n","while.txt":"* 繰り返しを使ってプログラムを短くしましょう\n\nさきほどのプログラムをよく見てみましょう．\n\n<<code Cat 50to100inc\nx=50;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\nx+=10;\ngo(x,100);sleep();\n>>\n\n最初の[[@cfrag x=50;]]を除いて，あとはずっと\n\n<<code \ngo(x,100);sleep();\nx+=10;\n>>\nが繰り返されていることがわかります．\n\nこのように，同じことを何度も繰り返すときは，コンピュータに「この部分は繰り返してください」\nと指示することによって，プログラムをもっと短くすることができます．\n\n[[@plistref 50to100inc]] を，[[@plistref firstWhile]]のように書き換えてみましょう．\n\n<<code Cat firstWhile\nx=50;\nwhile (x<=100) {\n  go(x,100);sleep();\n  x+=10;\n}\n>>\n\n実行してみると，先ほど同じように動きます．\n\nここでは，「while文」という書き方を用いています．これは，次のような形式で使います\n\n<<code while文の書式\nwhile([[@arg 条件]]) {\n   [[@arg 動作]]\n}\n>>\n\n- while文は， {  と } で囲まれた[[@arg 動作]]を繰り返し実行します．\n- どのくらいまで繰り返せばよいかを，[[@arg 条件]] に指定します．\n\n[[@plistref firstWhile]]の動作は，次のようになります．\n\n- [[@cfrag x=50;]] 変数xに50を覚えさせる\n- [[@cfrag x<=100]]， つまり変数xの値が100以下の間は，次のことを繰り返す\n-- [[@cfrag go(x,100);]] (x,100)の場所に絵を表示し，\n-- [[@cfrag x+=10;]] xを10増やす\n\nさて，この仕組みを使って，猫の絵を横位置300まで動かしてみましょう．\n\n<<code Cat w300\nx=50;\nwhile (x<=300) {\n  go(x,100);sleep();\n  x+=10;\n}\n>>\n\n[[@plistref firstWhile]]と変わった部分は，while の後ろの [[@cfrag x<=300]]だけです．\nつまり，数値を1個変えるだけで，もっと遠くまで動かせるのです．\n\n以前は，300まで動かすにはたくさんのプログラムを書かなければならなかったのに比べると\nかなり楽になりました．\n","variable3.txt":"*変数の値を変えてみましょう．\n\nさて，変数を使って，猫を右方向に動かしてみたいと思います．\n[[@plistref c5060]]のように変更しましょう\n（動いている様子が見えるように，[[@cfrag sleep();]]も忘れずにつけてください．）\n\n<<code Cat c5060\nx=50;\ngo(x,100);sleep();\nx=60;\ngo(x,100);sleep();\n>>\n\nこのプログラムは，まず，変数xに50を覚えさせてから，[[@cfrag go(x,100);]]を実行しています．\nつまり[[@cfrag go(50,100);]]を実行したのと同じ結果になります．\n\nそして，xに60を覚えさせています．\n\nこのとき，その前にxが覚えていた50はどうなってしまうのでしょうか．\n実は，変数に値を覚えさせると，それまで覚えていた値のことは上書きされてなくなってしまいます．\n\nつまり，最後の行で[[@cfrag go(x,100);]]を実行すると，\n[[@cfrag go(60,100);]]を実行したのと同じ結果になります．\n\n","xy.txt":"*画像を縦や斜めにも動かしてみましょう\n\n今まで，猫の画像は横にしか動きませんでしたが，縦にも動かすことができます．\n\n<<code Cat y\ny=50;\nwhile (true) {\n  y+=10;\n  go(100,y);sleep();\n}\n>>\n\n実行してみると，猫の画像が上から下に移動します．\n\nさらに，横と縦に同時に動かすこともできます\n\n<<code Cat xy\ny=50;\nx=100;\nwhile (true) {\n  y+=10;\n  x+=10;\n  go(x,y);sleep();\n}\n>>\n\n実行してみると，猫の画像が左上から右下に斜めに移動します．\n\n[[@plistref xy]]のように，\n変数は同時に2つ使うこともできます．\n\n変数を区別するために，それぞれの変数には名前が必要になります．ここでは x と y \nという名前の変数を使っています．\n\n名前は，半角英字とアンダースコア(_)が使えます．2文字以上でも構いません．2文字目以降は数字も使うことができます．\n","index.txt":"\n\n* プログラミングを始めましょう\n\n- まず，プロジェクトを作ります．\n-「[[@blink 新規作成>#newPrj]]」ボタンを押しましょう\n- プロジェクトの名前を入力してください\n-- 半角文字で入力します\n-- ここでは  Hello と入力してみましょう\n\n\n","variable2.txt":"* 画像をもっと楽に動かしましょう\n\nしかし，前のプログラムは書くのが大変です．\nそこで，もう少し簡単に書くための工夫を行います．\n\nさきほどのプログラムは，次のように，go の直後の数値が50,60,70,80.... と増えていることがわかります．\n\n@@@@\ngo(50,100);sleep();\ngo(60,100);sleep();\ngo(70,100);sleep();\ngo(80,100);sleep();\n// 以下略\n@@@@\n\n\nここで，「変数」という仕組みを紹介します．\n変数とは，文字通り「変わる数」のことです．\n\n今のプログラムで数値が変わっている部分は，[[@cfrag go(★,100);]]の★で示した部分ですね．\nそこで，「★の部分の数は変わるんですよ」ということをコンピュータに教えてあげます．\n\nもったいないのですが一旦プログラムを全部消して，次のように書いてみましょう．まだ実行はしないでください\n\n@@@@\ngo(x,100);\n@@@@\n\nここで出てきた x が変数です．\n\n「xと書いた部分は，何か数値が入るけど，それは変化することがあるよ」ということを表しています．\n\nところで，「何か数値が入る」と書きましたが，何が入っているのでしょうか？\n何が入っているのかは，最初に変数を使う前に決めないといけません．\n\n次のように[[@cfrag x=50;]]を追加してみましょう．\n\n@@@@firstVar\nx=50;\ngo(x,100);\n@@@@\n\nここで[[@blink 実行>#run]]してみましょう．\n[[@figref firstRunRes.png]]のように猫の絵が(50,100)の位置に表示されます．\n\n[[[[@plistref firstVar]]の実行結果>firstRunRes.png]]\n\n[[@cfrag x=50;]] という命令は，「変数 xに50という値を覚えさせる」という意味です．この状態で\n\n@@@@\ngo(x,100);\n@@@@\nを実行すると\n@@@@\ngo(50,100);\n@@@@\nを実行したのと同じ結果が得られます．\n","newFile.txt":"* 新しくファイルを作りましょう\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ファイル名には，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．\n-- ここでは Cat と入力してみます(後で猫の画像が登場します）\n\n* ファイルを編集しましょう\n\n- [[@blink ファイル一覧>#fileItemList]] から，ファイルを選びます．\n- [[@blink プログラム編集欄>#prog]] に，[[@plistref first]]のようにプログラムを書いてみましょう\n\n<<code Cat first\ngo(50,100);\n>>\n","say.txt":"[[前へ>sprite]]\n\n* メッセージを表示させてみましょう．\n\nプログラムは複数行書くこともできます．go 命令に続けて，次のように書いてみましょう\n\n@@@@\ngo(50,100);\nsay(\"こんにちは!!\");\n@@@@\n\n注意： こんにちは と書かれた部分以外はすべて半角で入力してください．\n\n[[@blink 実行>#run]]すると，猫の上に「こんにちは」というセリフが表示されます．\n\n[[次へ>sleep]]","toc.json":"[\"projectIndex\",\"newFile\",\"firstRun\",\"sprite\",\"spriteMove\",\"variable\",\"variable2\",\"variable3\",\"inc\",\"while\",\"true\",\"dec\",\"xy\",\"key\",\"udlr\",\"item\",\"new\",\"param\",\"say2\",\"crash\",\"left\"]","getkey.txt":"[[projectIndex]]","key.txt":"* キーボードを使って絵を動かしましょう\n\nさきほどのプログラムでは，猫が勝手に外にでていってしまうので\nキーボードを使って好きな方向に動くようにしてみましょう\n\n<<code Cat getkey\nx=50;\ny=100;\nwhile(true) {\n   k=getkey(\"right\");\n   if (k>0) {\n      x+=10;\n   }\n   go(x,y);sleep();\n}\n>>\n\n実行したら，まず，猫のいる画面をクリックしてください．\nそのあと，右矢印キーを押すと，猫が右に動きます．\n\nここでは，新しく2つの命令が出てきました．\n\nまず[[@cfrag getkey]]は，キーが押されているかを判定する命令です．\n[[@cfrag k=getkey(\"right\"); ]]は，右矢印キーが押されているかを判定し，判定結果を変数kに書き込みます．\n-もし右矢印キーが押されていなければ，変数kに0を書き込みます．\n-もし右矢印キーが押されていれば，変数kに0より大きい値を書き込みます（押されている時間が長いほど大きい値になります）．\n\nそして， [[@cfrag if]]という命令も登場しました．これは，次のような形式で使います．\n\n<<code\nif ([[@arg 条件]]) {\n  [[@arg 命令]]\n}\n>>\n\n-[[@arg 条件]]が成り立つ（正しい）ときに，  [[@arg 命令]]を実行します．\n-[[@arg 条件]]が成り立たない（正しくない）ときには，[[@arg 命令]]を実行しません．\n\nここでは，[[@arg 条件]]の部分に[[@cfrag k>0]]，[[@arg 命令]] の部分に[[@cfrag x+=10]] と書いてあります．つまり，\n\n-[[@cfrag k>0]]が成り立つ（正しい）ときに，  [[@cfrag x+=10;]]を実行します．\n-[[@cfrag k>0]]が成り立たない（正しくない）ときには，[[@cfrag x+=10;]]を実行しません．\n\n[[@cfrag k>0]]が成り立つのは，右キーが押されているときです．また，[[@cfrag x+=10;]]は，右に移動する命令ですので，次のように動作します\n\n-右キーが押されているならば，右に動きます．\n-右キーが押されていないならば，右に移動しません．\n\n","spriteMove.txt":"* 画像を動かしてみましょう\n\ngo 命令を使うと，指定した座標で示した位置に画像を動かすことができます．\nこれを利用して，画像を少しずつ違う位置に動かしていき，\n猫が動くアニメーションを作ってみましょう．\n\n<<code Cat now\ngo(50,100);\ngo(60,100);\ngo(70,100);\ngo(80,100);\ngo(90,100);\ngo(100,100);\n>>\n\n実行すると... 猫が動いていないようですね．いきなり(100,100)の\n位置に表示されたようです．\n\n[[[[@plistref now]]の実行結果>noWaitCat.png]]\n\n実は，猫はちゃんと(50,100)の位置から始まって，(60,100)  (70,100) \n(80,100)  (90,100) と少しずつ動きながら\n(100,100)の位置まで移動したのですが，\nコンピュータは，とても素早く命令を実行するため，\n途中の動作が見えなかったのです．\n\nそこで，命令の実行を少しゆっくりに実行してもらいます．\n[[@cfrag sleep]] という命令を使うと，途中で実行を待つことができます．\n\n<<code Cat now2\ngo(50,100);sleep();\ngo(60,100);sleep();\ngo(70,100);sleep();\ngo(80,100);sleep();\ngo(90,100);sleep();\ngo(100,100);sleep();\n>>\n\n今度は，猫が少しずつ動く様子が見えると思います．\n\n\n\n\n\n\n","projectIndex.txt":"\n* 目次\n\n<<toc\n-[[新しくファイルを作りましょう>newFile]]\n-[[プログラムを実行しましょう>firstRun]]\n-[[値を変えてみましょう>sprite]]\n-[[画像を動かしてみましょう>spriteMove]]\n-[[画像をもっと長い時間動かしてみましょう>variable]]\n-[[画像をもっと楽に動かしましょう>variable2]]\n-[[変数の値を変えてみましょう>variable3]]\n-[[変数の値を増やしてみましょう>inc]]\n-[[繰り返しを使ってプログラムを短くしましょう>while]]\n-[[ずっと繰り返すようにしましょう>true]]\n-[[画像を左方向に動かしてみましょう>dec]]\n-[[画像を縦や斜めにも動かしてみましょう>xy]]\n-[[画像をキーボードで動かしましょう>key]]\n-[[画像をキーボードで上下左右に動かしましょう>udlr]]\n-[[アイテムを配置しましょう>item]]\n-[[複数のキャラクタを配置しましょう>new]]\n-[[複数のキャラクタを配置しましょう(2)>param]]\n-[[メッセージを表示しましょう>say2]]\n-[[キャラクタの衝突判定をしましょう>crash]]\n-[[ゲームクリアの判定をしましょう>left]]\n>>\n\n\n\n\n\n\n\n\n","udlr.txt":"* 画像をキーボードで上下左右に動かしましょう\n\nさきほどのキーボードを使って右に動かす仕組みを使って，\n画像を上下左右に動かしましょう\n\n<<code Cat k\nx=50;\ny=100;\nwhile(true) {\n   k=getkey(\"right\");\n   if (k>0) {\n      x+=10;\n   }\n   k=getkey(\"left\");\n   if (k>0) {\n      x-=10;\n   }\n   k=getkey(\"down\");\n   if (k>0) {\n      y+=10;\n   }\n   k=getkey(\"up\");\n   if (k>0) {\n      y-=10;\n   }\n   go(x,y);sleep();\n}\n>>\n","item.txt":"* アイテムを配置しましょう\n\n猫を動かして，リンゴのアイテムを取るゲームを作ってみましょう．\n\nまず，アイテムのためのプログラムを作成します．\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ここでは Apple と入力してみます\n\n<<code Apple\ngo(200,150);\n>>\n\n[[@blink 実行>#run]]メニューから，「Appleを実行」選びましょう．\nすると，今まで通り猫の画像が表示されます．\n\nこれを，リンゴの画像にしてみましょう．\n\n<<code Apple\nchange($pat_fruits);\ngo(200,150);\n>>\n\n[[@cfrag change]]という命令は，画像の絵柄を変える命令です．\n( ) 内に書くのは，絵柄の名前を指定します．[[@cfrag $pat_fruits]] は，\n標準に用意されているリンゴの画像データを指します．\n\n\n\n","new.txt":"*複数のキャラクタを配置しましょう\n\nさて，Appleを実行すると，リンゴが表示されますが，猫は出てこなくなってしまいました．ゲームには，猫とリンゴが同時に出てくる必要があります．\n\nそこで「リンゴと猫を置く」ための別のプログラムを作りましょう．\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ここでは Game と入力してみます\n\nGameに，次のように入力してみましょう．\n\n<<code Game\nnew Cat;\nnew Apple;\n>>\n\n[[@blink 実行>#run]]メニューから，「Gameを実行」選びましょう．\nすると，猫とリンゴが同じ画面に表示されます．\n\nここで出てきた[[@cfrag new]] という命令は，\n新しくキャラクタを作るための命令です．\n\n次のように，[[@arg プログラム名]]を指定します．\n新しく出現したキャラクタは，\n指定された[[@arg プログラム名]]のプログラムを実行します．\n\n<<code\nnew [[@arg プログラム名]];\n>>\n\nなお，今後はしばらく Game を実行していきますので「実行する」と書いてあったら，\n[[@blink 実行>#run]]メニューから，「Gameを実行」選ぶようにしてください．\nF9キーを押すと，前回実行したプログラムと同じプログラムが実行されるので便利です．\n\n","param.txt":"*複数のキャラクタを配置しましょう(2)\n\n猫とリンゴが表示できたので，\n今度はリンゴを2つ置いてみましょう．それには，Gameを次のようにすればよさそうですね．\n\n<<code Game g1\nnew Cat;\nnew Apple;\nnew Apple;\n>>\n\n実行すると... あれ？リンゴは1つしか表示されません．\n\nここで，Appleのプログラムを確認してみましょう．\n\n<<code Apple\nchange($pat_fruits);\ngo(200,150);\n>>\n\nAppleでは，リンゴを(200,150)の位置に移動させる，と書いてあります．\n\n実は，リンゴは2つできているのですが，どちらも(200,150)という\nピッタリ同じ位置に重なっているので\n１つにしか見えないのです．\n\nそれでは，2つのリンゴを違う位置に表示させましょう．\nそれには，リンゴの位置が(200,150)ではなく，リンゴごとに変わるようにすればよいでしょう．つまり，200や150という「数」が「変わる」ようにする... そうです「変数」を使えばよいのです．\n\nそこで，Appleの[[@cfrag 200]]と[[@cfrag 150]] を，それぞれ変数[[@cfrag x]]と[[@cfrag y]]に置き換えてみましょう．\n\n<<code Apple xy1\nchange($pat_fruits);\ngo(x,y);\n>>\n\n実行すると... あれ！今度はリンゴが1つも出てきません．\n\nなぜかというと，[[@plistref xy1]]の状態では，変数 x や y は何も値を覚えていないため，[[@cfrag go(x,y)]]と命令されても，どこに表示していいかわからないからです．\n\nかといって，[[@plistref xy1]]に[[@cfrag x=200]]や[[@cfrag y=150]]などの，変数に値を覚えさせる命令を書くわけにもいきません．なぜなら，xやy の値はリンゴごとに違っていなければならないからです．\n\nそこで，ここでは，Appleではなく，Gameのほうでリンゴに具体的なx や y の値を設定させます． \n\nまず，Gameを次のように書き換えます．まだ実行はしないでください．\n\n<<code Game\nnew Cat;\napple1=new Apple;\napple2=new Apple;\n>>\n\n[[@plistref g1]]と変わったのは，[[@cfrag new Apple]]の前に，\n[[@cfrag apple1=]]と[[@cfrag apple2=]]がついたところです．\n\n[[@cfrag apple1=new Apple;]]は，新しくできたリンゴのキャラクタに「apple1」という名前をつけています．同様に，2つ目のリンゴのキャラクタに「apple2」という名前をつけています．\n\n名前をつけることによって，それらのキャラクタに命令をしたり，キャラクタがもっている変数の値を変更させることができます．\n\n<<code Game a1a2\nnew Cat;\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\n>>\n\n実行すると，今度はちゃんとリンゴが2つ表示されますね．\n\n[[@cfrag apple1.x=200;]] という命令は，その1行上で新しく作ったリンゴのキャラクタ，つまりapple1 がもっている x という変数に 200 を覚えさせています．\n\n今，「キャラクタがもっている変数」という表現をしましたが，変数は名前が同じでも，キャラクタごとに違う値をもたせる（覚えさせる）ことができます．\n例えば，[[@plistref a1a2]]では，apple1 の もっている変数xの値は200ですが，apple2 がもっている変数x は300になっています．\n\n[[キャラクタごとに変数の値は異なる>apple1apple2.png]]\n\n\n\n\n","crash.txt":"*キャラクタの衝突判定をしましょう\n\n次に，猫(Cat)がリンゴ(Apple)にぶつかると，リンゴを取る（リンゴが消える）ようにしてみましょう．\n\n[[@cfrag watchHit]] という命令を使うと，２つのキャラクタがぶつかったときに，\n特定の命令を実行することができます．\n\n[[@plistref addw]]の[[@editadd]]で示した部分を追加してみましょう．\n（まだプログラムは実行しないでください）\n\n<<code Game addw\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\nwatchHit(Cat, Apple, hitCatApple);[[@editadd]]\n>>\n\n[[@cfrag watchHit(Cat, Apple, hitCatApple)]]と書くと，\n猫（[[@cfrag Cat]]）とリンゴ（[[@cfrag Apple]]）がぶつかったときに，\n[[@cfrag hitCatApple]] という命令が実行されるようになります．\n\nところで，[[@cfrag hitCatApple]] ってどんな命令でしょうか？\n実はこの時点ではそんな命令はありません．この命令は自分で作ってあげる必要があります．\nさらに[[@plistref addf]]のように追加してみましょう．\n\n<<code Game addf\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\nwatchHit(Cat, Apple, hitCatApple);\nfunction hitCatApple(cat,apple) {[[@editadd]]\n    apple.hide();[[@editadd]]\n}[[@editadd]]\n>>\n\n実行すると，猫とリンゴが触れたときにリンゴが消えるようになります．\n\n最後に書いた[[@cfrag function]] で始まる部分は，\n自分で新しい命令を作るための書き方です．\nここでは，[[@cfrag hitCatApple]]という名前の命令を作っています．\nその後ろにある[[@cfrag (cat, apple)]] という部分は，この命令を実行するに\nあたって，必要な情報を受け取るためのものです．\nここでは，「どのキャラクタと，どのキャラクタがぶつかったか」という情報を受け取り，\nそれぞれに，[[@cfrag cat]] と [[@cfrag apple]] という名前をつけています．\n\n[[@cfrag cat]] は，もちろん最初に作った猫ですが，\nもうひとつの[[@cfrag apple]] は，そのとき猫に触れていたリンゴです．\nそれは[[@cfrag apple1]] かもしれないし，\n[[@cfrag apple2]] かもしれませんが，とにかく猫が触れていたほうのリンゴに，[[@cfrag apple]]という名前がつけられます．\n\nそして，その[[@cfrag apple]] に， [[@cfrag apple.hide()]] という命令を行っています．これは，そのキャラクタ（ここでは[[@cfrag apple]]）を隠す（画面から見えなくする）命令です．\n\n\n\n\n\n","say2.txt":"* メッセージを表示しましょう．\n\nゲームスタートしたときに，\n猫に[[@figref itadaki.png]]のようなメッセージを表示させてみましょう．\n\n[[メッセージの表示>itadaki.png]]\n\n\nそれにはまず，猫に名前をつける必要があります．\nなんでもかまいませんが，白いので[[@cfrag siro]] と名前をつけましょう．\n\n<<code Game\nsiro=new Cat;\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\n>>\n\nそして，[[@cfrag siro]]にメッセージを表示させます．\nメッセージを表示するには，[[@cfrag say]]という命令を使います．\n\n<<code Game itadaki\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\n>>\n\n\n命令を実行するとき，実行する相手のキャラクタを指定するときは次の形式を使います．\n\n<<code\nキャラクタ名 . 命令名 ( 引数  )\n>>\n\n[[@plistref itadaki]] では，キャラクタ名は [[@cfrag siro]]，\n 命令名は[[@cfrag say]] です．つまり[[@cfrag siro]] に対して，\n[[@cfrag say]]という命令を行わせています．\n\nそして，引数の部分に，表示させるメッセージである[[@cfrag \"いただきまーす\"]] という文字列（文字が並んだもの）を指定しています．文字列は [[@cfrag \"]]で囲む点に注意してください．\n","left.txt":"*ゲームクリアの判定をしましょう\n\nすべてのリンゴを取ったら，猫が「ごちそうさま」といって，\nゲームクリアになるようにしましょう．\n\nそれには，「リンゴがあといくつ残っているか」を数える必要があります．\nそこで，リンゴの残り数を表す[[@cfrag left]]という変数を用意します．\nリンゴは2つあるので，2を覚えさせておきます．\n\n[[@plistref addl]]の[[@editadd]]の部分を追加しましょう．\n\n<<code Game addl\nsiro=new Cat;\nsiro.say(\"いただきまーす\");\napple1=new Apple;\napple1.x=200;\napple1.y=150;\napple2=new Apple;\napple2.x=300;\napple2.y=100;\nwatchHit(Cat, Apple, hitCatApple);\nleft=2;[[@editadd]]\nfunction hitCatApple(cat,apple) {\n    apple.hide();\n}\n>>\n\nさらに，リンゴを取った時に，[[@cfrag left]]の値を減らします．\n\n<<code\n変数名--; \n>>\nと書くと，変数の値を1減らすことができます．\n\n<<code Game(hitCatApple内部のみ) adddec\nfunction hitCatApple(cat,apple) {\n    apple.hide();\n    left--;[[@editadd]]\n}\n>>\n\nさらに，[[@cfrag left]] が0になったときに，猫に「ごちそうさま」というメッセージを表示させます．\n\n<<code Game(hitCatApple内部のみ) addif\nfunction hitCatApple(cat,apple) {\n    apple.hide();\n    left--;\n    if (left<=0) {[[@editadd]]\n        cat.say(\"ごちそうさま\");[[@editadd]]\n    }[[@editadd]]\n}\n>>\n\n"}}
        );
}
