if (true) {
FS.mountROM(
        {"base":"/Tonyu/Kernel/","data":{"":"{\"NigariObj.tonyu\":{\"lastUpdate\":1385628140004},\"NObjTest.tonyu\":{\"lastUpdate\":1385628484197}}","NigariObj.tonyu":"extends null;\nnative Sprites;\nnative Tonyu;\nnative Key;\n\n\\new() {\n    var thg=Tonyu.currentProject.currentThreadGroup;\n    if (thg) thg.addObj(this);\n}\n\n\\update() {\n    ifwait {\n        _thread.suspend();\n    }\n}\n\\sleep(n) {\n    if(!n) n=1;\n    for(n;n>0;n--) update();\n}\n\\say(text,size) {\n    if (!size) size=15;\n    if (!_sprite) _sprite=Sprites.add();\n    _sprite.fukidashi={text:text, size:size, c:30};\n}\n\\sprite(x,y,p) {\n    go(x,y,p);\n}\n\\show(x,y,p) {\n    go(x,y,p);\n}\n\\go(x,y,p) {\n    if (!_sprite) _sprite=Sprites.add();\n    _sprite.x=x;\n    _sprite.y=y;\n    _sprite.p=p;\n    update();\n}\n\\getkey(k) {\n    return Key.getkey(k);\n} \n","NObjTest.tonyu":"native console;\nnative alert;\n\nx=100;\ny=100;\nvy=0;\nwhile (true) {\n    if (getkey(\"left\")) x-=10;\n    if (getkey(\"Right\")) x+=10;\n    if (getkey(\"up\")==1) vy=-10;\n    y+=vy;\n    vy++;\n    go(x,y);\n}"}}
        );
}
if (true) {
FS.mountROM(
        {"base":"/Tonyu/doc/","data":{"":"{\"inc.txt\":1385605826000,\"sleep.txt\":1385545457000,\"firstRun.txt\":1385547472292,\"sprite.txt\":{\"lastUpdate\":1385959506448},\"trouble1.txt\":{\"lastUpdate\":1385899308791},\"variable.txt\":1385553782631,\"while.txt\":{\"lastUpdate\":1385980623808},\"variable3.txt\":1385554165458,\"xy.txt\":{\"lastUpdate\":1385898044503},\"index.txt\":1383980059496,\"newFile.txt\":1385605795000,\"variable2.txt\":1385553581145,\"say.txt\":{\"lastUpdate\":1385898010032},\"spriteMove.txt\":1385547527129,\"projectIndex.txt\":1385628634000,\"key.txt\":{\"lastUpdate\":1385980601417},\"true.txt\":{\"lastUpdate\":1385981036921}}","inc.txt":"[[前へ>variable3]]\n\n* 変数の値を増やしてみましょう\n\nさて，さきほどのプログラムをもう一度みてみましょう，\n\n<<code Test 50to60\nx=50;\ngo(x,100);\nx=60;\ngo(x,100);\n>>\n\n[[@plistref 50to60]]では，[[@cfrag x=50;]]で，xに50覚えさせてから，\n[[@cfrag x=60;]]で，xに60覚えさせています．\n\nここでは，\n「xに60を覚えさせる」代わりに，「（すでに覚えている）50 を10だけ増やす」\nという書き方を紹介します．\n\n<<code Test 50to60inc\nx=50;\ngo(x,100);\nx+=10;\ngo(x,100);\n>>\n\n[[@cfrag x+=10;]]という書き方が出てきました．これは\n「今覚えているxの値に，10を足す」という意味です．\n\n[[@plistref 50to60inc]]では，\n[[@cfrag x+=10;]]が実行される時点では，\nxは50を覚えていますので，\n[[@cfrag x+=10;]]が実行されると，50に10を足した値である\n60を新しくxに覚えさせます．結果として，\n[[@plistref 50to60inc]]は，\n[[@plistref 50to60]]と同じ結果になります．\n\nこれを利用して，xを100まで増やしながら，絵を動かしてみましょう．\n\n<<code Test 50to100inc\nx=50;\ngo(x,100);\nx+=10;\ngo(x,100);\nx+=10;\ngo(x,100);\nx+=10;\ngo(x,100);\nx+=10;\ngo(x,100);\nx+=10;\ngo(x,100);\n>>\n\n[[次へ>while]]\n","sleep.txt":"[[前へ>say]]\n\n*メッセージを順番に表示させてみましょう\n\nプログラムは上から順番に実行されます．\n\n今度は「こんにちは」に続けて，「さようなら」と表示させてみたいと思います．\n[[@plistref nonsleep]]を入力します．\n\n@@@@nonsleep\ngo(50,100);\nsay(\"こんにちは\");\nsay(\"さようなら\");\n@@@@\n\n実行してみましょう.\n\n[[[[@plistref nonsleep]]の実行結果>sayonara.png]]\n\nあれ！いきなり「さようなら」が表示されました．「こんにちは」は表示されなかったのでしょうか？\n\n実は，コンピュータは確かに[[@plistref nonsleep]]のプログラムを上から順番に\n\n- 猫の絵を表示する\n- 「こんにちは」と表示する\n- 「さようなら」と表示する\n\nと実行したのです．しかし，コンピュータはとても高速に動作しているので\n「こんにちは」と表示してから，人間の目に見えないうちに，すぐに「さようなら」\nと表示してしまっています．\n\nこれでは，「こんにちは」が見えないので，コンピュータに少し待ってもらうように命令を追加しましょう．\n\n@@@@sleep\ngo(50,100);\nsay(\"こんにちは\");\nsleep(30); // 追加\nsay(\"さようなら\");\n@@@@\n\n実行すると，今度は「こんにちは」が表示されてから「さようなら」が表示されました．\n\n[[@plistref sleep]]で追加した sleep という命令は，その名の通りコンピュータにしばらく寝てもらいます．\nつまり，プログラムの実行を少し待ってもらいます．\n後ろに書いた30 は，どれくらい待つかを表す数値で，単位は「フレーム」です．\nフレームについては後ほど詳しく説明しますが，1フレームは30分の1秒(約0.03秒)に相当します．\n\nsleep(30)は30フレーム，つまり1秒ほど実行を待ちます．つまり，このプログラムは，次の順番で実行されます．\n\n- 猫の絵を表示する\n- 「こんにちは」と表示する\n- 30フレーム（1秒ほど）待つ\n- 「さようなら」と表示する\n\n\n[[次へ>spriteMove]]\n","firstRun.txt":"[[前へ>newFile]]\n\n* プログラムを実行しましょう\n\n実行するには [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押します．\n\n[[@figref firstRunRes.png]]のように，猫の絵が表示されたら成功です．\n\n[[実行結果>firstRunRes.png]]\n\n[[うまくいかないときは>trouble1]]\n\n[[次へ>sprite]]\n\n\n\n\n\n\n\n\n","sprite.txt":"[[前へ>firstRun]]\n\n\n* 値を変えてみましょう\n\nプログラムは，命令を実行します．\nここでは，go という命令を使って，画面に絵を表示させています．\n\n@@@@\ngo(50,100);\n@@@@\n\nここで， 50 や 100 などの数値を別の数値に変えてみましょう\n\n@@@@\ngo(150,100);\n@@@@\n\nもう一度， [[@blink 実行>#run]] メニューをクリックするか，F9 キーを押して実行します．\n\n画面上の位置を決めるには，2つの数値が必要になります．\nそれは，「横の位置」と「縦の位置」です．\n-横の位置は「画面左端から何ピクセル離れているか」をあらわした数値です\n-縦の位置は「画面上端から何ピクセル離れているか」をあらわした数値です\n\n横の位置と縦の位置をまとめてあらわしたものを「座標」といい，\n\n(横の位置,縦の位置)\n\nという形式であらわします．\n\n例えば(50,100) という座標は，次のような位置をあらわします．\n-画面左端から50ピクセル離れた位置\n-画面上端から100ピクセル離れた位置\n\n[[座標>50_100.png]]\n\nいろいろな位置の座標を[[@figref coords.png]]にまとめました．それぞれの数値の違いに注目しましょう．\n\n[[位置と座標>coords.png]]\n\nここで出てきたgo という命令は，go の後ろに書いた座標の位置に，絵を表示します．\n\n[[次へ>spriteMove]]\n","trouble1.txt":"プログラムを書き間違えていると，エラーが表示されます．\n\n[[文法エラー>syntaxError.png]]\n\n[[@figref syntaxError.png]]の例では，命令の最後にセミコロン ;  をつけていないためにエラーになっています．\nセミコロンを追加して，再度実行してください．\n\n[[@figref runtimeError.png]]の例では，命令の名前を間違えています．(sprit ではなく sprite ）\n正しい命令になおしてください．\n\n[[命令の名前が違うエラー>runtimeError.png]]\n\n[[戻る>firstRun]]\n","variable.txt":"[[前へ>spriteMove]]\n\n* 画像をもっと長い時間動かしてみましょう\n\nさきほどの実行したプログラム([[@plistref 50_100]]は，\n横の位置を50 から始めて，100まで動かしました．\n\n@@@@\ngo(50,100);\ngo(60,100);\ngo(70,100);\ngo(80,100);\ngo(90,100);\ngo(100,100);\n@@@@\n\n今度はもっと遠くまで動かしてみましょう．\n例えば，横の位置を50から300まで動かしてみるには，[[@figref 50_300.png]] のように，\nsleepを，[[@cfrag go(300,100);]] になるまで書けばよいでしょう\n\n[[300まで動かすプログラム>50_300.png]]\n\n実行してみましょう．さっきよりも長く動きますね．\n\n[[次へ>variable2]]\n","while.txt":"[[前へ>inc]]\n\n* 繰り返しを使ってプログラムを短くしましょう\n\nさきほどのプログラムをよく見てみましょう．\n\n<<code Test 50to100inc\nx=50;\ngo(x,100);\nx+=10;\ngo(x,100);\nx+=10;\ngo(x,100);\nx+=10;\ngo(x,100);\nx+=10;\ngo(x,100);\nx+=10;\ngo(x,100);\n>>\n\n最初の[[@cfrag x=50;]]を除いて，あとはずっと\n\n<<code\nx+=10;\ngo(x,100);\n>>\nが繰り返されていることがわかります．\n\nこのように，同じことを何度も繰り返すときは，コンピュータに「この部分は繰り返してください」\nと指示することによって，プログラムをもっと短くすることができます．\n\n[[@plistref 50to100inc]] を，[[@plistref firstWhile]]のように書き換えてみましょう．\n\n<<code Test firstWhile\nx=50;\nwhile (x<=100) {\n  go(x,100);\n  x+=10;\n}\n>>\n\n実行してみると，先ほど同じように動きます．\n\nここでは，「while文」という書き方を用いています．これは，次のような形式で使います\n\n<<code while文の書式\nwhile([[@arg 条件]]) {\n   [[@arg 動作]]\n}\n>>\n\n- while文は， {  と } で囲まれた[[@arg 動作]]を繰り返し実行します．\n- どのくらいまで繰り返せばよいかを，[[@arg 条件]] に指定します．\n\n[[@plistref firstWhile]]の動作は，次のようになります．\n\n- [[@cfrag x=50;]] 変数xに50を覚えさせる\n- [[@cfrag x<=100]]， つまり変数xの値が100以下の間は，次のことを繰り返す\n-- [[@cfrag go(x,100);]] (x,100)の場所に絵を表示し，\n-- [[@cfrag x+=10;]] xを10増やす\n\nさて，この仕組みを使って，猫の絵を横位置300まで動かしてみましょう．\n\n<<code Test w300\nx=50;\nwhile (x<=300) {\n  go(x,100);\n  x+=10;\n}\n>>\n\n[[@plistref firstWhile]]と変わった部分は，while の後ろの [[@cfrag x<=300]]だけです．\nつまり，数値を1個変えるだけで，もっと遠くまで動かせるのです．\n\n以前は，300まで動かすにはたくさんのプログラムを書かなければならなかったのに比べると\nかなり楽になりました．\n\n[[次へ>true]]\n","variable3.txt":"[[前へ>variable2]]\n\n*変数の値を変えてみましょう．\n\nさて，このプログラムを使って，猫を右方向に動かしてみたいと思います．\n\n@@@@\nx=50;\ngo(x,100);\nx=60;\ngo(x,100);\n@@@@\n\nこのプログラムは，まず，変数xに50を覚えさせてから，[[@cfrag go(x,100);]]を実行しています．\nつまり[[@cfrag go(50,100);]]を実行したのと同じ結果になります．\n\nそして，xに60を覚えさせています．\n\nこのとき，その前にxが覚えていた50はどうなってしまうのでしょうか．\n実は，変数に値を覚えさせると，それまで覚えていた値のことは上書きされてなくなってしまいます．\n\nつまり，最後の行で[[@cfrag go(x,100);]]を実行すると，\n[[@cfrag go(60,100);]]を実行したのと同じ結果になります．\n\n[[次へ>inc]]","xy.txt":"\n変数は2つ以上作れます．\n\n変数を区別するために，それぞれの変数には名前が必要になります．ここでは x という名前の\n変数を使っています．\n\n名前は，半角英字とアンダースコア(_)が使えます．2文字以上でも構いません．2文字目以降は数字も使うことができます．\n\n\n","index.txt":"\n\n* プログラミングを始めましょう\n\n- まず，プロジェクトを作ります．\n-「[[@blink 新規作成>#newPrj]]」ボタンを押しましょう\n- プロジェクトの名前を入力してください\n-- 半角文字で入力します\n-- ここでは  Hello と入力してみましょう\n\n\n\n","newFile.txt":"[[目次へ>projectIndex]]\n\n* 新しくファイルを作りましょう\n\n- メニューの「[[@blink ファイル>#fileMenu]]」→「[[@blink 新規>#newFile]]」を選びます\n- ファイル名を入力します\n-- ファイル名には，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．\n-- ここでは Test と入力してみます\n\n* ファイルを編集しましょう\n\n- [[@blink ファイル一覧>#fileItemList]] から，ファイルを選びます．\n- [[@blink プログラム編集欄>#prog]] に，[[@plistref first]]のようにプログラムを書いてみましょう\n\n<<code Test first\ngo(50,100);\n>>\n\n[[次へ>firstRun]]","variable2.txt":"[[前へ>variable]]\n\n* 画像をもっと楽に動かしましょう\n\nしかし，前のプログラムは書くのが大変です．\nそこで，もう少し簡単に書くための工夫を行います．\n\nさきほどのプログラムは，次のように，go の直後の数値が50,60,70,80.... と増えていることがわかります．\n\n@@@@\ngo(50,100);\ngo(60,100);\ngo(70,100);\ngo(80,100);\n// 以下略\n@@@@\n\n\nここで，「変数」という仕組みを紹介します．\n変数とは，文字通り「変わる数」のことです．\n\n今のプログラムで数値が変わっている部分は，[[@cfrag go(★,100);]]の★で示した部分ですね．\nそこで，「★の部分の数は変わるんですよ」ということをコンピュータに教えてあげます．\n\nもったいないのですが一旦プログラムを全部消して，次のように書いてみましょう．まだ実行はしないでください\n\n@@@@\ngo(x,100);\n@@@@\n\nここで出てきた x が変数です．\n\n「xと書いた部分は，何か数値が入るけど，それは変化することがあるよ」ということを表しています．\n\nところで，「何か数値が入る」と書きましたが，何が入っているのでしょうか？\n何が入っているのかは，最初に変数を使う前に決めないといけません．\n\n次のように[[@cfrag x=50;]]を追加してみましょう．\n\n@@@@firstVar\nx=50;\ngo(x,100);\n@@@@\n\nここで[[@blink 実行>#run]]してみましょう．\n[[@figref firstRunRes.png]]のように猫の絵が(50,100)の位置に表示されます．\n\n[[[[@plistref firstVar]]の実行結果>firstRunRes.png]]\n\n[[@cfrag x=50;]] という命令は，「変数 xに50という値を覚えさせる」という意味です．この状態で\n\n@@@@\ngo(x,100);\n@@@@\nを実行すると\n@@@@\ngo(50,100);\n@@@@\nを実行したのと同じ結果が得られます．\n\n[[次へ>variable3]]","say.txt":"[[前へ>sprite]]\n\n* メッセージを表示させてみましょう．\n\nプログラムは複数行書くこともできます．go 命令に続けて，次のように書いてみましょう\n\n@@@@\ngo(50,100);\nsay(\"こんにちは!!\");\n@@@@\n\n注意： こんにちは と書かれた部分以外はすべて半角で入力してください．\n\n[[@blink 実行>#run]]すると，猫の上に「こんにちは」というセリフが表示されます．\n\n[[次へ>sleep]]","spriteMove.txt":"[[前へ>sprite]]\n\n\n* 画像を動かしてみましょう\n\ngo 命令を使うと，指定した座標で示した位置に画像を動かすことができます．\n\n@@@@\ngo(50,100);\ngo(60,100);\ngo(70,100);\ngo(80,100);\ngo(90,100);\ngo(100,100);\n@@@@\n\n実行すると，猫が少しずつ動く様子が見えると思います．\n\n[[次へ>variable]]\n\n\n\n\n\n\n\n\n","projectIndex.txt":"\n* 目次\n\n-[[新しくファイルを作りましょう>newFile]]\n-[[プログラムを実行しましょう>firstRun]]\n--[[うまくいかないときは>trouble1]]\n-[[値を変えてみましょう>sprite]]\n-[[画像を動かしてみましょう>spriteMove]]\n-[[画像をもっと長い時間動かしてみましょう>variable]]\n-[[画像をもっと楽に動かしましょう>variable2]]\n-[[変数の値を変えてみましょう>variable3]]\n-[[変数の値を増やしてみましょう>inc]]\n-[[繰り返しを使ってプログラムを短くしましょう>while]]\n-[[ずっと繰り返すようにしましょう>true]]\n-[[画像をキーボードで動かしましょう>getkey]]\n\n[[始める>newFile]]\n\n\n\n\n\n\n\n\n","key.txt":"[[前へ>true]]\n\n* キーボードを使って絵を動かしましょう\n\n繰り返し","true.txt":"[[前へ>while]]\n\n* ずっと繰り返すようにしましょう\n\nさきほどのプログラムでは，[[@cfrag x<=300]]，つまりxが300以下の間は絵が右に動き，xが300をを超えたら止まりました．\n\nゲームなどにおいては，キャラクタは（ゲームオーバーやクリアにならなければ）半永久的に動き続けます．このようにずっと動く処理を書くには，[[@plistref true]]のようにします．\n\n<<code Test true\nx=50;\nwhile(true) {\n   go(x,100);\n   x+=10;\n}\n>>\n\n実行すると，猫の画像が途中で止まらずに，そのまま画面外に出ていきます．\n\nwhile文の条件に書いてある [[@cfrag true]]という条件は，「必ず成り立つ」という意味です．この条件を書いておくと，{  } で囲まれた処理がずっと動き続けます．\n\n[[次へ>key]]\n\n"}}
        );
}
