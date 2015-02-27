(function () {
  var rom={
    base: '/Tonyu/SampleROM/',
    data: {
      '': '{"10_MultiTouch/":{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499962000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499960342},"res.json":{"lastUpdate":1424499962378},"Touch.tonyu":{"lastUpdate":1412697666000}},"11_Resize/":{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499952000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499950223},"res.json":{"lastUpdate":1424499952266}},"12_Sound/":{".desktop":{"lastUpdate":1425004349219},"images/":{"icon_thumbnail.png":{"lastUpdate":1425006025000}},"Main.tonyu":{"lastUpdate":1425004349203},"MMLTest.tonyu":{"lastUpdate":1425004300853},"options.json":{"lastUpdate":1425006022983},"res.json":{"lastUpdate":1425006025013}},"13_DX/":{".desktop":{"lastUpdate":1412697666000},"DX.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424496830000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424496828360},"res.json":{"lastUpdate":1424496830416}},"14_File/":{".desktop":{"lastUpdate":1412697666000},"files/":{"save.json":{"lastUpdate":1412697666000}},"images/":{"icon_thumbnail.png":{"lastUpdate":1418560247000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1421821648235},"res.json":{"lastUpdate":1418560247000}},"15_Box2D/":{".desktop":{"lastUpdate":1424914245000},"Ball.tonyu":{"lastUpdate":1425020534000},"Block.tonyu":{"lastUpdate":1425020536000},"images/":{"aoi.png":{"lastUpdate":1425019308000},"icon_thumbnail.png":{"lastUpdate":1425020516000}},"Main.tonyu":{"lastUpdate":1425020461000},"options.json":{"lastUpdate":1425020514000},"res.json":{"lastUpdate":1425020516000}},"1_Animation/":{".desktop":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500074000}},"options.json":{"lastUpdate":1424500071401},"res.json":{"lastUpdate":1424500074096}},"2_MultipleObj/":{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500055000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500053785},"res.json":{"lastUpdate":1424500055823}},"3_NewParam/":{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500047000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500045123},"res.json":{"lastUpdate":1424500047165}},"4_getkey/":{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500037000}},"options.json":{"lastUpdate":1424500035583},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500037615}},"5_Chase/":{".desktop":{"lastUpdate":1412697666000},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500026000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500024423},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500026489}},"6_Shot/":{".desktop":{"lastUpdate":1412697666000},"Bullet.tonyu":{"lastUpdate":1424137052043},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500012000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500010312},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500012360}},"7_Text/":{".desktop":{"lastUpdate":1412697666000},"Bullet.tonyu":{"lastUpdate":1421821648455},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499998000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499996424},"Player.tonyu":{"lastUpdate":1418128263000},"res.json":{"lastUpdate":1424499998482},"Status.tonyu":{"lastUpdate":1412697666000}},"8_Patterns/":{".desktop":{"lastUpdate":1412697666000},"Ball.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499984000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499982309},"res.json":{"lastUpdate":1424499984350}},"9_Mouse/":{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499971000}},"MouseChaser.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499969681},"res.json":{"lastUpdate":1424499971712}}}',
      '10_MultiTouch/': '{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499962000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499960342},"res.json":{"lastUpdate":1424499962378},"Touch.tonyu":{"lastUpdate":1412697666000}}',
      '10_MultiTouch/.desktop': '{"runMenuOrd":["Main","Touch"]}',
      '10_MultiTouch/Main.tonyu': 
        'new Touch{index:0}; //0番目のタッチ位置を表示するオブジェクト\n'+
        'new Touch{index:1}; //1番目のタッチ位置を表示するオブジェクト\n'+
        '\n'
      ,
      '10_MultiTouch/Touch.tonyu': 
        'size=30;\n'+
        'while (true) {\n'+
        '    // $touchesに，タッチされた場所の座標をあらわすオブジェクト{x,y}\n'+
        '    // の配列が入ります．\n'+
        '    var t=$touches[index];\n'+
        '    if (t.touched) {//index番目の指がタッチされていれば\n'+
        '        x=t.x;\n'+
        '        y=t.y;\n'+
        '        text="touch #"+index;\n'+
        '    } else{\n'+
        '        text="Not touched";\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '10_MultiTouch/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499962000}}',
      '10_MultiTouch/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEYklEQVR4Xu2ceWjTZxzGn9STDS2obT2GTg1YbKkK3vNgiraJxbNqoR6gTuc9VmQeWEHRCSJbrZsKG0i9qlaLUFuNeJ+1rlSpdzanrVttwdV5dhjrL68m1AsSYeRRnt8/geTN+3vy+eR5f/99bc2G59ZAFw0Bm4TQuDBBJITLh4SQ+ZAQCWEjQJZHzxAJISNAFkcNkRAyAmRx1BAJISNAFkcNkRAyAmRx1BAJISNAFkcNkZD/l0DHNo1w6eb9oG7yzaj2+HHX7298Z1DXSHybZIdj/inz2d/ZDrRIyg9q72AXf3QNub3Tgfp1w9AyKQ+3tjtwsKgC41acw8HVfTAw9QT+sj5vOToff26NR+W9anSbfgRLJkZjxrB2sKe4cP/xU8OwMmeIn2XEiL3YkNoFQ3s1l5Bg/2Gd7eEodt/z/5udPaJQeOUfZKV19wspuHwXI9IK/Fuv/joWqetLkLuiFxIXnjbvr53TCbPWnMf3U2Kw4JeLakiwInzrXxcS3y0SRdeqXhFy1hI0fPEZNKgXhpjPG6NfXFNzZNUWcisrAU7rqGoV0RD7Cysk5H2FfNqwDm5Yx1GrMfkotY6so8WVGLus0BxZEeEN0Cy8vjmybm5LQGVVNbpOPwzfM6S2kD3LeiL7+G1scpX6o+gZ8r5WPuDvfXQP9Q/YhYkuIWQGJURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcmoY0/qQu/n30YrxeINeqabGYt6HkjaXJAz5D1qEyJH9pvR4uQ/qsOCz69RIevBzdF8jeoVxDI+TOLieiRuUFzOKPLfFol7L/lfUJ3aPw89zOmJlejEaW4JVfxZo17s2DYR/nCnjvUC6kEGKzAeXZTjPprWxHAlLXlWCSow2e/OcxMxCH9GyOvWfKUbHbaYZWHkvvC48HyMhxY2FKNLxDKn2Xa9UXWLLxMk5fvOufu5g2IRpLM6+EknPA96YQ4k3rbUj8dydxtfQBHld7zFRQ77BKr5BES0iuJSRjdhxmZ1wwP87XkBNr+qPPnKPmvXJrjzphlt2X17NnNaZ1voGWAVMJ4UIqIfbxLlzPHIwfst3oHdMERe4qqwk1mJrYFq2T9xlpE1f+hp/mdoLNqpX3OKotxDtv8eETD65mDkKHCQeQs7QH8gruYPnkjogcGfhxGEIfmigXSvhvuzdNQ9jAhCqPhISK/DvuKyESQkaALI4aIiFkBMjiqCESQkaALI4aIiFkBMjiqCESQkaALI4aIiFkBMjiqCESQkaALI4aIiFkBMjiqCESQkaALI4aIiFkBMjiqCESQkaALI4aQibkOZXc8HAHcyHiAAAAAElFTkSuQmCC',
      '10_MultiTouch/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '10_MultiTouch/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '11_Resize/': '{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499952000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499950223},"res.json":{"lastUpdate":1424499952266}}',
      '11_Resize/.desktop': '{"runMenuOrd":["Main","Bounce"]}',
      '11_Resize/Bounce.tonyu': 
        'x=rnd($screenWidth);\n'+
        'y=rnd($screenHeight);\n'+
        'vx=spd();\n'+
        'vy=spd();\n'+
        'while (true) {\n'+
        '    x+=vx;\n'+
        '    y+=vy;\n'+
        '    if (x<0) {\n'+
        '        x=0;\n'+
        '        vx=spd();\n'+
        '    }\n'+
        '    if (y<0) {\n'+
        '        y=0;\n'+
        '        vy=spd();\n'+
        '    }\n'+
        '    if (x>$screenWidth) {\n'+
        '        x=$screenWidth;\n'+
        '        vx=-spd();\n'+
        '    }\n'+
        '    if (y>$screenHeight) {\n'+
        '        y=$screenHeight;\n'+
        '        vy=-spd();\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '\\spd() {\n'+
        '    return rnd()*10;\n'+
        '}'
      ,
      '11_Resize/Main.tonyu': 
        'for (i=0; i<20 ;i++) {\n'+
        '    new Bounce();\n'+
        '}\n'+
        'text="↑ Portrait   → Landscape";\n'+
        'size=20;\n'+
        'while (true) {\n'+
        '    x=$screenWidth/2;\n'+
        '    y=$screenHeight/2;\n'+
        '    if (getkey("right")==1) {\n'+
        '        // ゲーム画面のサイズを変更（横長）\n'+
        '        $Screen.resize(400,300);\n'+
        '    }\n'+
        '    if (getkey("up")==1) {\n'+
        '        // ゲーム画面のサイズを変更（縦長）\n'+
        '        $Screen.resize(300,400);\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '11_Resize/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499952000}}',
      '11_Resize/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '11_Resize/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '11_Resize/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '12_Sound/': '{".desktop":{"lastUpdate":1425004349219},"images/":{"icon_thumbnail.png":{"lastUpdate":1425006025000}},"Main.tonyu":{"lastUpdate":1425004349203},"MMLTest.tonyu":{"lastUpdate":1425004300853},"options.json":{"lastUpdate":1425006022983},"res.json":{"lastUpdate":1425006025013}}',
      '12_Sound/.desktop': '{"runMenuOrd":["Main","MMLTest","SETest"]}',
      '12_Sound/MMLTest.tonyu': 
        'x=200; y=150;\n'+
        'size=40;\n'+
        'while (true) {\n'+
        '    text="oo";\n'+
        '    play("l8cde4",">l8c4ge");\n'+
        '    text="^^";\n'+
        '    play("l8edc4",">l8e4dc");\n'+
        '}'
      ,
      '12_Sound/Main.tonyu': 
        'm=new MMLTest;\n'+
        '\n'+
        'text="Space:SE  S:Stop";\n'+
        'x=200; y=200;\n'+
        'while (true) {\n'+
        '    if (getkey(32)==1) {\n'+
        '        playSE("l16<ceg");\n'+
        '    }\n'+
        '    if (getkey("s")==1) {\n'+
        '        m.die();\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '12_Sound/images/': '{"icon_thumbnail.png":{"lastUpdate":1425006025000}}',
      '12_Sound/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADcElEQVR4Xu2XS0hUYQCFz9VJE6FEelhohpKg2JAFMoEMPS0LKjLMoCwKTKlFoFELRYwkKERrIYXRRiQpkizJwkLRMIVE3UQPLEnTsECCMnzMTNOFonazuDrnwnE3cOf3+7+Pw8wYS/Y1+6A/GgOGgtC0MEEUhKuHgpD1UBAFYTNAxqPPEAUhM0CGo4UoCJkBMhwtREHIDJDhaCEKQmaADEcLURAyA2Q4WoiCkBkgw9FCFITMABmOFqIgZAbIcLQQBSEzQIajhSgImQEyHC1EQcgMkOFoIQpCZoAMRwtREDIDZDhaiIKQGSDD0UIUJHADYQ4DpXnJaO4aQ8/rCfONrpRo7HbF4FL9G0xOeQI/zCZP0i4kfEEI3tZlIj73MWqL0/Bu+DtCQg0krIhEfmUfhm7vQNKRVkzPem2iOjBM2iAVx1Nws2UIH8YmzZuM3s0y5a8+9MR8nZEajZ3pMSi59Sqwm9rkKdog2e6ViFsagep7g4hcGIqXN7ZgesaD9flt8Hh9OHtwDYbHf6KhbcQmqgPDpA3yG/+TfxVhjhD4fD4s2//IvNF44y4YhoGpGS9ic1oCu6WNnqIOYiOPlqEqiGUqrTlIQazxaNkpCmKZSmsOClqQnppN2FvyArVFaYgId5gf3J8nprA8KhwFVX24UrAWD/0/CAv3JOBAeQ/O5Sbh9LWBv7e+fDIV9U+HMTD4DeXHktHYOYoTWfG40z6CsqPJiPV/Q2vv/4rC6n5rTM3TKUEL8qBiI7LLunH/ggutvV/gTFwEZ8JibCt+jrzMVahpeo9Zjw8d1W5sLepE1Snnf0E6r7rhPtPhDwk8q8ww37cuMQqHt8ehrvUjGkrT/b9hfiDrfNc8qbTm3wQtyB/8posu/1K6rbnNP6f0Xt+MDQVtlp871wcGPchcX9Bu5ysIWTEFURAyA2Q4WoiCkBkgw9FCFITMABmOFqIgZAbIcLQQBSEzQIajhSgImQEyHC1EQcgMkOFoIQpCZoAMRwtREDIDZDhaiIKQGSDD0UIUhMwAGY4WoiBkBshwtBAFITNAhqOFKAiZATIcLURByAyQ4WghCkJmgAxHC1EQMgNkOFqIgpAZIMPRQhSEzAAZjhaiIGQGyHC0EAUhM0CGo4UoCJkBMhwtREHIDJDhaCEKQmaADEcLURAyA2Q4WghZkF8K8Gxwhl4g+QAAAABJRU5ErkJggg==',
      '12_Sound/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false,"plugins":{"timbre":1}}',
      '12_Sound/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '13_DX/': '{".desktop":{"lastUpdate":1412697666000},"DX.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424496830000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424496828360},"res.json":{"lastUpdate":1424496830416}}',
      '13_DX/.desktop': '{"runMenuOrd":["Main","DX"]}',
      '13_DX/DX.tonyu': 
        '\n'+
        'while (true) {\n'+
        '    rotate++;\n'+
        '    update();\n'+
        '}'
      ,
      '13_DX/Main.tonyu': 
        '// scaleX: 拡大率\n'+
        '// scaleY: 縦の拡大率（省略するとscaleXと同じ値)\n'+
        '// alpha: 透過度\n'+
        '// rotate: 回転角度\n'+
        'new DX{x:150, y:200, p:2, scaleX:2};\n'+
        'new DX{x:50, y:200, p:5, scaleX:2, scaleY:1};\n'+
        'new DX{x:200, y:150, p:3, alpha:128,rotate:90};\n'+
        '\n'+
        '\n'
      ,
      '13_DX/images/': '{"icon_thumbnail.png":{"lastUpdate":1424496830000}}',
      '13_DX/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '13_DX/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '13_DX/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '14_File/': '{".desktop":{"lastUpdate":1412697666000},"files/":{"save.json":{"lastUpdate":1412697666000}},"images/":{"icon_thumbnail.png":{"lastUpdate":1418560247000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1421821648235},"res.json":{"lastUpdate":1418560247000}}',
      '14_File/.desktop': '{"runMenuOrd":["Main"]}',
      '14_File/Main.tonyu': 
        'saveDataFile=file("save.json");\n'+
        'saveData=saveDataFile.obj();\n'+
        'if (!saveData) saveData={count:0};\n'+
        'saveData.count++;\n'+
        'saveDataFile.obj(saveData);\n'+
        'x=200;y=20;size=20;\n'+
        'text="count="+saveData.count+" F9:inc SPACE:reset";\n'+
        'while (true) {\n'+
        '    if (getkey("space")==1) {\n'+
        '        saveDataFile.rm();\n'+
        '        text="Reset ! press F9";\n'+
        '    }\n'+
        '    update();    \n'+
        '}\n'+
        '\n'+
        '\n'+
        '\n'
      ,
      '14_File/files/': '{"save.json":{"lastUpdate":1412697666000}}',
      '14_File/files/save.json': '{"count":1}',
      '14_File/images/': '{"icon_thumbnail.png":{"lastUpdate":1418560247000}}',
      '14_File/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADdElEQVR4Xu2VXWjNcRyHvyfHy9Tm7bC8nJoLio5WI0mIJnJBy9VwIbuxK3eLC7uaQkrKDRcmF2alJJTIIkoSRZ3IS1nNS1hqUwiF/6lzOnah6bNPnbbnf7NO+32ec/7P8z9bKtN05VdwVYyBFEEqpkXhgxCksnoQpMJ6EGTMBjmzb2nsPPSwdP+95zZG3bZrhdcXO1ZEU/u90u9ydTWR7x38b1c1k9Mx+OVnide6eX6cuPxq2JxNy2vj6v33wz7vODgi/0M6di2K9tNPIzNlQvQPfI/tjdno6ukriHn0ciCOnn8Rx/fU/xWk/OZvH1sTB7uelWSUB6n+I3lv88LY3/kkjuzORdvJfKTHpeJUW0OBl4ROrmLsDctmxfUHH0qukvdJrkR0dmZV9H38Wni9ZeXsuHT3XczNTIo3/d+iYcHUqJ02cXQESYQd7n4e06vHx6fPP2Lr6jlx4c7byHc2Rq6lJ5In919Bhn5Dhj55B1oWF4IUfxb55eeKgZMzyZWcX1ufiVuP+0vHyoPsWJ+Nszf6onndvOi++TpWLZkR1VXp0RHE8dUdq8wR+ZM1VuU57psgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x5QgDqsCkyCCPMeUIA6rApMggjzHlCAOqwKTIII8x/Q3F3pYcAf1P3QAAAAASUVORK5CYII=',
      '14_File/options.json': '{"compiler":{"defaultSuperClass":"Actor"},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false}',
      '14_File/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '15_Box2D/': '{".desktop":{"lastUpdate":1424914245000},"Ball.tonyu":{"lastUpdate":1425020534000},"Block.tonyu":{"lastUpdate":1425020536000},"images/":{"aoi.png":{"lastUpdate":1425019308000},"icon_thumbnail.png":{"lastUpdate":1425020516000}},"Main.tonyu":{"lastUpdate":1425020461000},"options.json":{"lastUpdate":1425020514000},"res.json":{"lastUpdate":1425020516000}}',
      '15_Box2D/.desktop': '{"runMenuOrd":["Main","B2Body"]}',
      '15_Box2D/Ball.tonyu': 
        'extends T2Body;\n'+
        '\n'+
        'while(y<450) {\n'+
        '    // 物理オブジェクトにぶつかっていれば\n'+
        '    if (c=contactTo()) {\n'+
        '        // スペースキーを押したときに上に瞬間的な力を加える\n'+
        '        if (getkey("space")==1) applyImpulse(0,-3);\n'+
        '    }\n'+
        '    // 左右キーを押したときにゆっくりと力を加える\n'+
        '    if (getkey("left")) applyForce(-2,0);\n'+
        '    if (getkey("right")) applyForce(2,0);\n'+
        '    update();\n'+
        '}\n'+
        'die();'
      ,
      '15_Box2D/Block.tonyu': 
        'extends T2Body;\n'+
        'while(!screenOut()) {\n'+
        '    update();   \n'+
        '}\n'+
        'die();'
      ,
      '15_Box2D/Main.tonyu': 
        '// 物理エンジンの利用\n'+
        '// T2Body クラスまたはT2Bodyクラスを継承したオブジェクトを置く\n'+
        '\n'+
        'print("Use ← → and Space");\n'+
        '// プレイヤー（ボール)  shape: 丸い形状の物体\n'+
        'new Ball{x:100,y:50,shape:"circle",p:12};\n'+
        '// 床  isStatic:true  動かない物体\n'+
        'new T2Body{x:230,y:400,p:$pat_floor+0,\n'+
        'scaleX:10,scaleY:1,isStatic:true};\n'+
        '\n'+
        'while (true) {\n'+
        '    new Block{x:rnd()*400,y:0,p:$pat_floor,\n'+
        '    scaleX:3,scaleY:1,rotation:rnd(360)};\n'+
        '    updateEx(60);\n'+
        '}\n'
      ,
      '15_Box2D/images/': '{"aoi.png":{"lastUpdate":1425019308000},"icon_thumbnail.png":{"lastUpdate":1425020516000}}',
      '15_Box2D/images/aoi.png': 'data:image/png;base64,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',
      '15_Box2D/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '15_Box2D/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false,"plugins":{"box2d":1}}',
      '15_Box2D/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"},{"pwidth":32,"pheight":32,"name":"$pat_floor","url":"ls:images/aoi.png"}],"sounds":[]}',
      '1_Animation/': '{".desktop":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500074000}},"options.json":{"lastUpdate":1424500071401},"res.json":{"lastUpdate":1424500074096}}',
      '1_Animation/.desktop': '{"runMenuOrd":["GoRight"]}',
      '1_Animation/GoRight.tonyu': 
        '// メニューの実行 → GoRightを実行を選んでください\n'+
        '\n'+
        '//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\n'+
        '//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\n'+
        '// xとyに値を設定すると、その場所にスプライトを表示します\n'+
        'x=100;\n'+
        'y=50;\n'+
        '// $screenWidth ： 画面幅をあらわします。\n'+
        'while (x<$screenWidth) { \n'+
        '    x++;\n'+
        '    // 1フレームの動作が終わったら update(); を呼び出してください。\n'+
        '    update();\n'+
        '}\n'+
        '//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。'
      ,
      '1_Animation/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500074000}}',
      '1_Animation/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAACWklEQVR4Xu2XvU4UYRhGn2+NBaVxG7wCEwuNrQU1naFA7e1MbGzpKIw/wQITC6GgArc03oE1ib0JYKBa2BXchSwDu6uxoaCfOcWZG3hPzpknkyntx9+m8cEYKAbBtPgPYhBWD4PAehjEIDQDMB6/IQa5bmBhbjZLL+7k4eI2TE/9OI0v5GfnUfLvT2h0c5Ru6ebo/DRPnvbrNwG52GiQ9U7Jg3I/45RcTIfpl5PsVXt5tv0y7ZU1iKJ6MRoN8nVzNr0b/eyXg1SDKq8O3iWTccZnl2m//VSvCci1RoNsbM5kmEH2W928//U5RzlOq2rlYnCe228+QhTVi9FokOXOYSZlkl7p5cPul/wZnWQ6nmZyVrmQet+Dq2v35g9z9/mPbO18z7D/O7derzaFgrjb6EIQBmAQBjEIzAAMx4UYBGYAhuNCDAIzAMNxIQaBGYDhuBCDwAzAcFyIQWAGYDguxCAwAzAcF2IQmAEYjgsxCMwADMeFGARmAIbjQgwCMwDDcSEGgRmA4bgQg8AMwHBciEFgBmA4LsQgMAMwHBdiEJgBGI4LMQjMAAzHhRgEZgCG40IMAjMAw3EhBoEZgOG4EIPADMBwXIhBYAZgOC7EIDADMBwXYhCYARiOCzEIzAAMx4UYBGYAhuNCDAIzAMNxIQaBGYDhuBCDwAzAcFyIQWAGYDguxCAwAzAcF2IQmAEYjgsxCMwADMeFGARmAIbjQgwCMwDDcSEGgRmA4bgQg8AMwHBciEFgBmA4LsQgMAMwHBdiEJgBGI4LMQjMAAzHhRgEZgCG40JgQf4CBVklcPg7vVEAAAAASUVORK5CYII=',
      '1_Animation/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"GoRight","bootClass":"kernel.Boot"},"kernelEditable":true}',
      '1_Animation/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '2_MultipleObj/': '{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500055000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500053785},"res.json":{"lastUpdate":1424500055823}}',
      '2_MultipleObj/.desktop': '{"runMenuOrd":["Main","Bounce","GoRight"]}',
      '2_MultipleObj/Bounce.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        'x=100;\n'+
        'y=250;\n'+
        '// pに値を設定すると，キャラクタパターンを変更します．\n'+
        '// 今のところ，キャラクタパターンは次のもので固定されています．\n'+
        '// images/base.png   images/Sample.png\n'+
        'p=8;\n'+
        'vy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\n'+
        '// $ がついている変数はグローバル変数です。\n'+
        'while (x<$screenWidth) {\n'+
        '    x+=2;\n'+
        '    y+=vy;\n'+
        '    vy+=1;\n'+
        '    // $screenHeight ： 画面幅をあらわします。\n'+
        '    if (y>$screenHeight) {\n'+
        '        y=$screenHeight;\n'+
        '        vy=-vy;\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '2_MultipleObj/GoRight.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '//[!=Tonyu1] と書かれた行は、Tonyu1との違いを説明しています。\n'+
        '//[!=Tonyu1] extends は省略可能です。省略するとActorというクラスを継承します。\n'+
        '// xとyに値を設定すると、その場所にスプライトを表示します\n'+
        'x=100;\n'+
        'y=50;\n'+
        '// $screenWidth ： 画面幅をあらわします。\n'+
        'while (x<$screenWidth) { \n'+
        '    x++;\n'+
        '    // 1フレームの動作が終わったら update(); を呼び出してください。\n'+
        '    update();\n'+
        '}\n'+
        '//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。'
      ,
      '2_MultipleObj/Main.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '\n'+
        '// new クラス名  でオブジェクトを出現させます。\n'+
        'new Bounce;\n'+
        'new GoRight;\n'+
        '\n'+
        '// [!=Tonyu1]new の後ろの() は省略可能です\n'+
        '// [!=Tonyu1]appear は不要です\n'+
        '// [!=Tonyu1] オブジェクトを画面上で設計する機能は未実装です。'
      ,
      '2_MultipleObj/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500055000}}',
      '2_MultipleObj/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAADMklEQVR4Xu2cPWgTYQCG37s0SEUwIXGoq9AqKjUdiuDgKDpJBbU6OOimFIoIHTLp4E9FBxUHdXCqRuwgIjg7lkIL4qLR2hSH/DY/jeld7s5TEAe3K9y9B2/2y/fc8+TlyHJG9uRbD/rQGDAUhKbFHxAF4eqhIGQ9FERB2AyQ8egZoiD/G5g4OoT85d0YO71Ipid8nMgX8rlwBPD/CfWSPZSNMqqbGzhzth6+CZITIw3yrGDgkDEKBwZsr4O60cSKtYLJxSlk7z0lURQuRqRB3swNoZaoo2SswWpbuLo2C7gOnG4f2TuPwzVBclqkQZ7PDaKDNkpmGXe/P0EV6zAtE3Z7E5nbD0kUhYsRaZAbhQpcw0XNqOH+t5do9ZrwHA9u19JCwv0d/Dtt//EK9l5awouvH9CpN5C++SAqFIpzI10IhQEyCAVREDIDZDhaiIKQGSDD0UIUhMwAGY4WoiBkBshwtBAFITNAhqOFKAiZATIcLURByAyQ4WghCkJmgAxHC1EQMgNkOFqIgpAZIMPRQhSEzAAZjhaiIGQGyHC0EAUhM0CGo4UoCJkBMhwtREHIDJDhaCEKQmaADEcLURAyA2Q4WoiCkBkgw9FCFITMABmOFqIgZAbIcLQQBSEzQIajhSgImQEyHC1EQcgMkOFoIQpCZoAMRwtREDIDZDixXEjp9QlYfRtVB/57TJM4du4dmdbgOLEKMnPtME7lUtiecOCaJpobfhD/rabNvonzF98Ht0B0ZayC5KfHcXAkhVrXwb7MAH76UcZvLcMYsJFZrhBpDY4SqyAz02PIDafR8Lah2LKRn1+F7dpI9nvYufQjuAWiK2MV5MrUOIb3pLDuPzsqfQPXXxVhei7cXgfpj2UircFRYhXk921OXMhh10gWbdfEo/lPfhAHiVYHO4qt4BaIroxdkL/uDkyOYmFhFYNfGkQ6t44S2yBbv3XOb1AQsi4KoiBkBshwtBAFITNAhqOFKAiZATIcLURByAyQ4WghCkJmgAxHC1EQMgNkOFqIgpAZIMPRQhSEzAAZjhaiIGQGyHC0EAUhM0CGo4UoCJkBMhwtREHIDJDhaCEKQmaADOcXCoxwcLHqOIQAAAAASUVORK5CYII=',
      '2_MultipleObj/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '2_MultipleObj/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '3_NewParam/': '{".desktop":{"lastUpdate":1412697666000},"Bounce.tonyu":{"lastUpdate":1412697666000},"GoRight.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500047000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500045123},"res.json":{"lastUpdate":1424500047165}}',
      '3_NewParam/.desktop': '{"runMenuOrd":["Main","Bounce","GoRight"]}',
      '3_NewParam/Bounce.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '// xとy の値はここで設定せず、Mainから受け取ります\n'+
        '//x=100;\n'+
        '//y=250;\n'+
        'vy=0; // $がつかない変数は、インスタンス変数（フィールド）として扱います。\n'+
        '// $ がついている変数はグローバル変数です。\n'+
        'while (x<$screenWidth) {\n'+
        '    x+=2;\n'+
        '    y+=vy;\n'+
        '    vy+=1;\n'+
        '    // $screenHeight ： 画面幅をあらわします。\n'+
        '    if (y>$screenHeight) {\n'+
        '        y=$screenHeight;\n'+
        '        vy=-vy;\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '3_NewParam/GoRight.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '// xとy の値はここで設定せず、Mainから受け取ります\n'+
        '//x=100;\n'+
        '//y=50;\n'+
        '// $screenWidth ： 画面幅をあらわします。\n'+
        'while (x<$screenWidth) { \n'+
        '    x++;\n'+
        '    // 1フレームの動作が終わったら update(); を呼び出してください。\n'+
        '    update();\n'+
        '}\n'+
        '//[!=Tonyu1]処理の最後に到達してもスプライトは消えません。'
      ,
      '3_NewParam/Main.tonyu': 
        '// 実行 → Main を実行を選んでください。\n'+
        '\n'+
        '// new クラス名{パラメタ} で、指定したフィールドの値をもつ\n'+
        '// オブジェクトを出現させます。\n'+
        'new Bounce{x:100, y:220,p:12};\n'+
        'new Bounce{x:200, y:120,p:15};\n'+
        'new GoRight{x:50, y:80,p:4};\n'+
        '\n'+
        '// [!=Tonyu1] 従来通り，x,y,pを渡して初期化する方法も使えますが，\n'+
        '// 上の方法が推奨されます\n'+
        '//   new Bounce(100,220,12);'
      ,
      '3_NewParam/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500047000}}',
      '3_NewParam/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEXUlEQVR4Xu2cTWhUZxSG33tvMkmIpooxiT+bIlhCVCJIsSSUQje6SWuhbkUKggu1VdSFEkPpQoRuXBQ3ltKNC0nbpLpzU6EU6yJgCCpETRxMdPKjmSQ3M+P98RsXXRrhnEzO0HeWyZz3e+/z5EyGkDte85c3UvBhhoBHIWZcvC1CIbZ8UIgxHxRCIdYIGOvD3yEUYoyAsTrcEAoxRsBYHW4IhRgjYKwON4RCjBEwVmfFNiT32+d4nZ+DNzuLzScfG7tsu3XUhUxe3go0tSH1fQSFBST5EOnMNLzFRWy6zL/0L/ejoC7keW8d0oUS4o0tqKkNEE3lMPJdD4pRjJ6tA8v1+d9/X11ItrfBbUYBwewEorXNGO/7GouFGFFag/1tv5sG3r/zYyy9TPF6wsfh5M6qdFUXMnF0EZ5fAtzLFJZiPPrlDOJSgjD2sX/z4Kpc5Psc+u/BbjRtA14Np8gPeVgYifHVun/eZ1T1OepCyu0mvxhGPJ9HnfulPnTzJyTua/tab6gW1wy71f4J2j7zUd+xhPydNcjdLmF+JMFCtoDD7fc0j1o2a0WElE/1keLF7j/Rfncvpmtali2ymk/4Y0MXNnYA9esDzGeB4liEcDTG1MQcjux4UNFqKyakolchPKw/7MIHmwKkDQnSMMXSc7cduRJmiuM4/pF76a3gg0Ic7P5nuxFlMggCwL0ZRBSGyIcvMdZ0H5e2rK2gDv6Tw3+wrzz8ELF7JxglMbz6aeQan+KH1nUVlVE+jBtSceTvPpBCKMQYAWN1uCEUYoyAsTrcEAoxRsBYHW4IhRgjYKwON4RCjBEwVocbQiHGCBirww2hEGMEjNXhhlCIMQLG6nBDKMQYAWN1uCEUYoyAsTrcEAoxRsBYHW4IhRgjYKwON4RCjBEwVocbQiHGCBirww2hEDmBJz+PoQh3IymyiKJH6DzyjTzUSELVbcjDq6NIvB53w5y70zcZRDG9h6Qwis5jvUaQympUlZBfT/+FPR3NKJU+RcYrwK+97WQMIyqNY9fxCzISRqarSsjVMwPo3l6H2tpmxFGEgjeFJM26Dyp4is4TF40gldWoKiEHuobQd+hvZIIGJ8SDH+QRF2fw7EWIfd//KCNhZLqqhJSZ3b10DvVr3GemxDXu/vcCHk+mGH/SiG+v9RlBKqtRdULKl3v91HknI8Lcqwxy0404P3BWRsHQdFUKMcRPvQqFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/6NIWoI5UFUoiMn/o0hagjlQVSiIyf+jSFqCOVBVKIjJ/69Buu98xwFIgeowAAAABJRU5ErkJggg==',
      '3_NewParam/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '3_NewParam/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '4_getkey/': '{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500037000}},"options.json":{"lastUpdate":1424500035583},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500037615}}',
      '4_getkey/.desktop': '{"runMenuOrd":["Player"]}',
      '4_getkey/Player.tonyu': 
        'x=200;\n'+
        'y=200;\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n'+
        '    if (getkey("up")) y-=8;\n'+
        '    if (getkey("down")) y+=8;\n'+
        '    if (getkey("left")) x-=8;\n'+
        '    if (getkey("right")) x+=8;\n'+
        '    update();\n'+
        '}'
      ,
      '4_getkey/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500037000}}',
      '4_getkey/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAACxElEQVR4Xu2cvWqTARiF36/agnEQwaEg6tDV2clREEXF0RvwEtQLEKTq0AsQJ0ExLehQnBRcXBxcxKGDLroo6Y+iaWo0n8ELEA70lOPHk2Q8PTk8T99kS3Pk8mpbPGIINAiJcfF3CEKyfCAkzAdCEJJGIGwP3yEICSMQNocLQUgYgbA5XAhCwgiEzeFCEBJGIGwOF4KQMAJhc7gQhIQRCJvDhSAkjEDYHC4EIWEEwuZwIQgJIxA2hwtBSBiBsDlcCELCCITN4UIQEkYgbA4XgpAwAmFzuBCEhBEIm8OFICSMQNgcLgQhYQTC5nAhCAkjEDaHC0FIGIGwOVwIQsIIhM3hQhASRiBsTqcv5M61hbp+930Y8n/P6ZyQkwu9erJ4qqod11YzrI1963Xv0ZdaWR79F2I6J2S1P18n2qM1ma36/utbrU9+1PbsZl28/bh6ry/FS+mckKfL8zVoB7VTwzo+c6xOv7tSzc9Jzb08W71XFxCy1wQe9g/VZrNRHyef6saHpekvgk1fw9819+LcVMj5vZ4jv1/nLmSx/7VG7XZt7f9cN9ceVDt9jnfGdeD5makQPrLk/5Dd+IOrK29qfWZQ998+q3bU1uGlW9WMDu5Gtb2jcxdiJ2Z+A4SYAav1CFGJmfMIMQNW6xGiEjPnEWIGrNYjRCVmziPEDFitR4hKzJxHiBmwWo8QlZg5jxAzYLUeISoxcx4hZsBqPUJUYuY8QsyA1XqEqMTMeYSYAav1CFGJmfMIMQNW6xGiEjPnEWIGrNYjRCVmziPEDFitR4hKzJxHiBmwWo8QlZg5jxAzYLUeISoxcx4hZsBqPUJUYuY8QsyA1XqEqMTMeYSYAav1CFGJmfMIMQNW6xGiEjPnEWIGrNYjRCVmziPEDFitR4hKzJxHiBmwWo8QlZg5jxAzYLUeISoxcx4hZsBqPUJUYub8H65hIXD/RcmmAAAAAElFTkSuQmCC',
      '4_getkey/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Player","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '4_getkey/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '5_Chase/': '{".desktop":{"lastUpdate":1412697666000},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500026000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500024423},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500026489}}',
      '5_Chase/.desktop': '{"runMenuOrd":["Main","Player","Chaser"]}',
      '5_Chase/Chaser.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\n'+
        'while (true) {\n'+
        '    if (x<$player.x) x+=2;\n'+
        '    if (x>$player.x) x-=2;\n'+
        '    if (y<$player.y) y+=2;\n'+
        '    if (y>$player.y) y-=2;\n'+
        '    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n'+
        '    if (crashTo($player)) {\n'+
        '        // die メソッドは，オブジェクトを消滅させます．\n'+
        '        // そのオブジェクトの処理も停止させます．\n'+
        '        $player.die();\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '5_Chase/Main.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n'+
        '$player=new Player;\n'+
        'new Chaser{x:20,y:20,p:5};\n'+
        'new Chaser{x:300,y:250,p:5};'
      ,
      '5_Chase/Player.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        'x=200;\n'+
        'y=200;\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n'+
        '    if (getkey("up")) y-=8;\n'+
        '    if (getkey("down")) y+=8;\n'+
        '    if (getkey("left")) x-=8;\n'+
        '    if (getkey("right")) x+=8;\n'+
        '    update();\n'+
        '}'
      ,
      '5_Chase/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500026000}}',
      '5_Chase/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAERElEQVR4Xu2cXYgVZRzGn3dWWxI3tt0NEQyKINELQUKx1QtBo4Jil4K67YMgSmxFLLroJkTLqz4IZYvCIpI90ZUgS0uQQl/0QZkVrq12dF3dPZ4P9xzn7JkzM80JpCDIeeG8h2fyOdfv+5/n/f3mYS7OMGZg+HAM/WgIGAmhcfFXEAnh8iEhZD4kRELYCJDl0TNEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHGcNeWfnGtx7x3Lc+sw42ZG547RdyMPrluO1kTUwJkZYMggLHroKITa8exQztTo3DYJ0bRfyy1Nb0bMK6IZBvQH4RYNozuDw0FfYNVwhODJ3hLYLOfX8FsSFRMY5D3PHi5gZLSAwEcphDSNDl7hpEKRru5CTT2xBwzeIpw1Ovz+D2vE6Ii9AqVnFNgm5pvK2C/npnq2IYw8oLUJ+NI/LM/NoNgNUUMf24eI1A13vC9oupAX09u6l+PCmQRTGz+Ps9EU8++Dc9c459fmdCEl9dS38FwEJIbspJERCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJCQdgfvXL0Pr3S4zHePINyU8eei7dBszvoquISuX9eDoi4OI+rsQesnXB/M+/Cs3oDv5j/6h3Jf49mIp48j/Oz6dkFX9PTjy6GAiw2DxigiNKwblz6v4YcckXtlUxO8DTQnpJIHVAz2YeGwjqoUYfj7CiZEphK23IEMfuzfN4ZSEdFIHsLJ3KT657254NQ8L5z1MvjyFIA5QD+vYu3EWkxLSWSGtq02s34z+oBt+JcbU67+hiRBVE2DbA7OdD9PhK9I9Q/55/vdu3ID5Q1PYPvT/F3H13NRCOnxzUlxOQig0/B1CQiSEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQySEjABZHDVEQsgIkMVRQyQkPYHNa/tw8KW1qDTLKHYV8fjOPE6fCdMPyOBK2oYcy61Gb7gEWAzMRz6qYSn5wFANE4XP8PbTd2UQdbrItEJyuYHkk05l3IYViJIXgd668AEOXhhDFITo2zea7nQZXEUr5OPcLah6l/FHM48T5XPYf+kjLAoXEPtN9O7Zn0HU6SLTCnkjtwA/WkApeXZ8Wv4C47PfwwSN5I3GBm7edyDd6TK4ilZIi+VzYz+jYir4ev5XHDvzI5IvBaJv75sZxJw+MrWQq8e489UxnHzhkfSnyvDKTAjJMF/r6BJijcztBglxy9d6uoRYI3O7QULc8rWeLiHWyNxukBC3fK2nS4g1MrcbJMQtX+vpEmKNzO0GCXHL13q6hFgjc7tBQtzytZ4uIdbI3G6QELd8radLiDUytxskxC1f6+l/AkBO1XD8v5/zAAAAAElFTkSuQmCC',
      '5_Chase/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '5_Chase/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '6_Shot/': '{".desktop":{"lastUpdate":1412697666000},"Bullet.tonyu":{"lastUpdate":1424137052043},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424500012000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424500010312},"Player.tonyu":{"lastUpdate":1412697666000},"res.json":{"lastUpdate":1424500012360}}',
      '6_Shot/.desktop': '{"runMenuOrd":["Main","Player","Chaser","Bullet"]}',
      '6_Shot/Bullet.tonyu': 
        'while (y>0) {\n'+
        '    y-=8;\n'+
        '    // c=crashTo(クラス名) は，そのクラスのオブジェクトのどれかと\n'+
        '    // 衝突しているかを判定します．\n'+
        '    // [!=Tonyu1] 従来のcrashToではクラス名は指定できませんでした\n'+
        '    c=crashTo(Chaser);\n'+
        '    // どのCheseオブジェクトとも衝突していない \n'+
        '    //      -> c==undefined\n'+
        '    // 1つ以上のChaseオブジェクトと衝突している \n'+
        '    //      -> c==衝突しているChaseオブジェクトのうちどれか1つ\n'+
        '    if (c) {\n'+
        '        c.die();\n'+
        '        die();\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '// [!=Tonyu1] 処理の最後で消滅させたいときはdie(); を書きます．\n'+
        'die();\n'+
        '\n'+
        '/* 衝突しているすべてのオブジェクトに対して処理を行うには，\n'+
        '次の書き方もあります.\n'+
        '\n'+
        'for (var c in allCrash(Chaser)) {\n'+
        '    c.die();\n'+
        '    die();\n'+
        '}\n'+
        '*/\n'+
        '\n'+
        '\n'+
        '/*\n'+
        '[!=Tonyu1] 従来の衝突判定の書き方は，準備中です．\n'+
        'for (t in $chars) {\n'+
        '    if (t is Chaser && crashTo(t)) {\n'+
        '        \n'+
        '    }\n'+
        '}\n'+
        '\n'+
        '*/'
      ,
      '6_Shot/Chaser.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\n'+
        'while (true) {\n'+
        '    if (x<$player.x) x+=2;\n'+
        '    if (x>$player.x) x-=2;\n'+
        '    if (y<$player.y) y+=2;\n'+
        '    if (y>$player.y) y-=2;\n'+
        '    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n'+
        '    if (crashTo($player)) {\n'+
        '        // die メソッドは，オブジェクトを消滅させます．\n'+
        '        // そのオブジェクトの処理も停止させます．\n'+
        '        $player.die();\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '6_Shot/Main.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n'+
        '$player=new Player;\n'+
        'new Chaser{x:20,y:20,p:5};\n'+
        'new Chaser{x:300,y:250,p:5};'
      ,
      '6_Shot/Player.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        'x=200;\n'+
        'y=200;\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n'+
        '    if (getkey("up")) y-=8;\n'+
        '    if (getkey("down")) y+=8;\n'+
        '    if (getkey("left")) x-=8;\n'+
        '    if (getkey("right")) x+=8;\n'+
        '    // ==1で判定すると，押した瞬間だけ弾を撃たせることができます\n'+
        '    // (押しっぱなしでは撃てないようにする)\n'+
        '    if (getkey("space")==1) {\n'+
        '        // {x,y} は {x:x, y:y} と同じ．（自分のいる位置から弾を撃つ）\n'+
        '        new Bullet{x,y};\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '6_Shot/images/': '{"icon_thumbnail.png":{"lastUpdate":1424500012000}}',
      '6_Shot/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEXUlEQVR4Xu2ZXYhUZRzGn/OxGwSW2kqI1VImpCFkdRHaRRdLdWGwBFl0YVAEBQolBILZRWWmCKL2tZZ7Vdp+IBTSx0bWhVEUISpkSaXppLi786E7e+bMzPnorOBtsO/47j5nePZc7cX/fZ/z+51nDvOO09V7KIX+aAg4EkLj4koQCeHyISFkPiREQtgIkOXRO0RCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxVFDJISMAFkcNURCyAiQxcllQwqf9iCZ8OAVgUUbvyZD2lqcXAn5+/WH4HV3wu/w4Y3FCKsJnHIHgksRln440hoJkulcCTnzwsMIGynm3JUiqXuIasAXK4+igQgvry6RIG0tRq6EnN/wKBq1FMHZGB0LfPzy+Ck0O1KUoypeemysNRIk07kScmJtD/yai2bJg3NjjJPPnkE9jlD1anhx9QUSpK3FyJWQNQtvwabblyGcdLJ3h49T7x5HHMf4bEkFB+8OWiNBMp0rIVeZXe/4ONz1CHaMfIfhFe0h4uq95VIIycNsJYaEWMFqvmjuhPw+/ADuX/szqkFiftfEk7kRsnfTUvTctwBh9p3jUlLGeFJE38clHPo8IsY7/Wi5EPLeYII73MW42Z2HetRA4FzG5XQS2/75AD++8sT075p4IhdCBobmIysGRjsv4s60Gw/+8TSazTqSoI6u7XuJ8U4/Wi6E9A92wnVcjKdF/ItzeO3cR3CCGGktwry39kz/roknciFky2AZcBNUkyrOZ9fOP/dn/3pAJmWuhMzW45XimYM/oRIXse9EduTeALrebq92TJHNRUNm6xGYjX0lZDao/8+eEiIhZATI4qghEjKzBA6/fy+e2/IbThfCmd3YcLe2bcj6J2/FhjWLEToNlOMKStm1u38MI1/GhqhmZqwthewZaGKFfw/mONchzI5YQi9AJa3ih8qv2P78bTND1nCXthRyYGgu3MjFmDeKJW43Xr2wG9+Uv0c8WcdN27jPvtpSSP9QJ7zUQ9EpZWdfBWw+23flmCUNsrOvrdzf7ttSyNaBCuAD1XgChbSQnX0dgDt11WLc8KaEGH6amo/1DTtwYxdH/CPZu6OEfce+gpP9wJgdGGP+GxJiTtZwsnfdJJavmkDoT2AU49h1cv/UsV12XJ/qI8uQ6TUZW/7UX1jUexyfHP02e5m/c03WtL1IW75DbEOzub6E2KRrsLaEGECzOSIhNukarC0hBtBsjkiITboGa0uIATSbIxJik67B2hJiAM3miITYpGuwtoQYQLM5IiE26RqsLSEG0GyOSIhNugZr/wfkW99w+x+EqgAAAABJRU5ErkJggg==',
      '6_Shot/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '6_Shot/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '7_Text/': '{".desktop":{"lastUpdate":1412697666000},"Bullet.tonyu":{"lastUpdate":1421821648455},"Chaser.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499998000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499996424},"Player.tonyu":{"lastUpdate":1418128263000},"res.json":{"lastUpdate":1424499998482},"Status.tonyu":{"lastUpdate":1412697666000}}',
      '7_Text/.desktop': '{"runMenuOrd":["Main","Player","Chaser","Bullet","Status"]}',
      '7_Text/Bullet.tonyu': 
        'while (y>0) {\n'+
        '    y-=8;\n'+
        '    // c=crashTo(クラス名) は，そのクラスのオブジェクトのどれかと\n'+
        '    // 衝突しているかを判定します．\n'+
        '    // [!=Tonyu1] 従来のcrashToではクラス名は指定できませんでした\n'+
        '    c=crashTo(Chaser);\n'+
        '    // どのCheseオブジェクトとも衝突していない \n'+
        '    //      -> c==undefined\n'+
        '    // 1つ以上のChaseオブジェクトと衝突している \n'+
        '    //      -> c==衝突しているChaseオブジェクトのうちどれか1つ\n'+
        '    if (c) {\n'+
        '        c.die();\n'+
        '        die();\n'+
        '        $score+=10;\n'+
        '    }\n'+
        '    update();\n'+
        '}\n'+
        '// [!=Tonyu1] 処理の最後で消滅させたいときはdie(); を書きます．\n'+
        'die();\n'+
        '\n'+
        '/* 衝突しているすべてのオブジェクトに対して処理を行うには，\n'+
        '次の書き方もあります.\n'+
        '\n'+
        'for (var c in allCrash(Chaser)) {\n'+
        '  c.die();\n'+
        '  die();\n'+
        '}\n'+
        '*/\n'+
        '\n'+
        '\n'+
        '/*\n'+
        '[!=Tonyu1] 従来の衝突判定の書き方は，準備中です．\n'+
        'for (t in $chars) {\n'+
        '  if (t is Chaser && crashTo(t)) {\n'+
        '     \n'+
        '  }\n'+
        '}\n'+
        '\n'+
        '*/'
      ,
      '7_Text/Chaser.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $player は，Mainで初期化されているグローバル変数です（Mainを参照）\n'+
        'while (true) {\n'+
        '    if (x<$player.x) x+=2;\n'+
        '    if (x>$player.x) x-=2;\n'+
        '    if (y<$player.y) y+=2;\n'+
        '    if (y>$player.y) y-=2;\n'+
        '    // crashToは，指定されたオブジェクトと衝突しているかどうかを判定します．\n'+
        '    if (crashTo($player)) {\n'+
        '        // die メソッドは，オブジェクトを消滅させます．\n'+
        '        // そのオブジェクトの処理も停止させます．\n'+
        '        $player.die();\n'+
        '        \n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '7_Text/Main.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        '// $ で始まる変数はグローバル変数です．他のクラスからも参照できます．\n'+
        '$score=0;\n'+
        '$player=new Player;\n'+
        'new Chaser{x:20,y:20,p:5};\n'+
        'new Chaser{x:300,y:250,p:5};\n'+
        'new Status;\n'
      ,
      '7_Text/Player.tonyu': 
        '// 実行 → Mainを実行\n'+
        '\n'+
        'x=200;\n'+
        'y=200;\n'+
        'while (true) { // [!=Tonyu1] 無限ループはwhile(1)よりwhile(true)が推奨されます\n'+
        '    // getkey(キーの名前) で，キーの押した状態が取得できます．\n'+
        '    // 0: 押されていない  1：押されたばかり  2以上：押しっぱなし\n'+
        '    // [!=Tonyu1] 引数には従来通り数値も使えますが，文字列が推奨されます\n'+
        '    if (getkey("up")) y-=8;\n'+
        '    if (getkey("down")) y+=8;\n'+
        '    if (getkey("left")) x-=8;\n'+
        '    if (getkey("right")) x+=8;\n'+
        '    // ==1で判定すると，押した瞬間だけ弾を撃たせることができます\n'+
        '    // (押しっぱなしでは撃てないようにする)\n'+
        '    if (getkey("space")==1) {\n'+
        '        // {x,y} は {x:x, y:y} と同じ．（自分のいる位置から弾を撃つ）\n'+
        '        new Bullet{x,y};\n'+
        '    }\n'+
        '    update();\n'+
        '}'
      ,
      '7_Text/Status.tonyu': 
        '// 変数textに値を設定すると，テキストを表示するオブジェクトになります．\n'+
        'text="Score:";\n'+
        'fillStyle="white";\n'+
        'size=40;\n'+
        'align="center";\n'+
        'x=$screenWidth/2;\n'+
        'y=$screenHeight/2;\n'+
        'while (!$player.isDead()) {\n'+
        '    text="Score:"+$score;\n'+
        '    update();\n'+
        '}\n'+
        'text="Game Over";\n'
      ,
      '7_Text/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499998000}}',
      '7_Text/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '7_Text/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '7_Text/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '8_Patterns/': '{".desktop":{"lastUpdate":1412697666000},"Ball.tonyu":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499984000}},"Main.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499982309},"res.json":{"lastUpdate":1424499984350}}',
      '8_Patterns/.desktop': '{"runMenuOrd":["Main","Ball"]}',
      '8_Patterns/Ball.tonyu': 
        '// 実行-> Main を実行\n'+
        'while (y<$screenHeight) {\n'+
        '    y+=3;\n'+
        '    update();\n'+
        '}\n'+
        'die();\n'
      ,
      '8_Patterns/Main.tonyu': 
        '// 実行-> Main を実行\n'+
        '/* ウィンドウ → 画像リストから オブジェクトに用いるキャラクタパターン\n'+
        '     を追加できます．\n'+
        '   画像はpngまたはgifを指定してください．\n'+
        '   \n'+
        '  「パターン解析方法」は次の中から選びます\n'+
        '    Tonyu1フォーマット ： Tonyu1で利用されている画像をそのまま使う場合は\n'+
        '                           こちらを選びます．※\n'+
        '    固定サイズ：   画像内を決められた大きさ（例えば32x32）で区切って\n'+
        '                   描かれた画像の場合，こちらを選びます．\n'+
        '  「URL」欄には，URLを書くか，ローカルファイルをドラッグ＆ドロップします\n'+
        '    ※： URL欄に他ドメインの画像ファイルを指定する場合，「Tonyu1フォーマット」\n'+
        '         は使えません．\n'+
        '         \n'+
        '    これらの画像は，変数pに値を代入することで使えます．\n'+
        '    例えば， $pat_chr という名前の画像ファイルの中の，\n'+
        '    4番目のキャラクタパターン（一番最初は0番目とする）を指定するには\n'+
        '    p=$pat_chr + 4; \n'+
        '    とします．\n'+
        '*/\n'+
        't=0;\n'+
        'while(true) {\n'+
        '    if (t%5==0) {\n'+
        '        // 新しく作るBall オブジェクトの変数pに，\n'+
        '        // $pat_balls の0 - 15番目のキャラクタパターンをランダムに設定\n'+
        '        new Ball{x:rnd($screenWidth),y:0, p:$pat_balls+rnd(16)};\n'+
        '    }\n'+
        '    t++;\n'+
        '    update();\n'+
        '}'
      ,
      '8_Patterns/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499984000}}',
      '8_Patterns/images/icon_thumbnail.png': 'data:image/png;base64,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',
      '8_Patterns/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '8_Patterns/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_balls","url":"data:image/png;base64,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"},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}',
      '9_Mouse/': '{".desktop":{"lastUpdate":1412697666000},"images/":{"icon_thumbnail.png":{"lastUpdate":1424499971000}},"MouseChaser.tonyu":{"lastUpdate":1412697666000},"options.json":{"lastUpdate":1424499969681},"res.json":{"lastUpdate":1424499971712}}',
      '9_Mouse/.desktop': '{"runMenuOrd":["MouseChaser"]}',
      '9_Mouse/MouseChaser.tonyu': 
        'while(true) {\n'+
        '    x=$mouseX;\n'+
        '    y=$mouseY;\n'+
        '    update();\n'+
        '}'
      ,
      '9_Mouse/images/': '{"icon_thumbnail.png":{"lastUpdate":1424499971000}}',
      '9_Mouse/images/icon_thumbnail.png': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAC5UlEQVR4Xu2VvW/MARzGn2vaoTkiXhaxGEwGTAwi5T9gMkhEYuulJiGRWIzasFlsRjEYjBKTwSYd2CrpgouL1ssp7sWFxfz0nt73ks/d/Dy/5z6f+941Dpx/NhSvMgQaCCnj4u8QhNTygZBiPhCCkGoEiu3hPwQhxQgUm8OFIKQYgWJzuBCEFCNQbA4XgpBiBIrN4UIQUoxAsTlcCEKKESg2hwtBSDECxeZwIQgpRqDYHC4EIcUIFJvDhSCkGIFic7gQhIyHwKPbJ3T62G51tKlXax+0dLM9nuIJt0zdhSycm9Xy0lE1B/MaDvv6oq429Emf9V1XLm/o94+5CSPd3uOnTsiZhVkttpr6NdzS4ZlD6s5s6db6ip63X2r/vRXp5/z2iEw4PZVCrrX2qNPoaH30vvHuvtQbaNAdaN/yXYTs9Bfq5Nm+Li329LXxTW191J21h1JfGnZ72ouQndbx73kXrrd18NT70X/Hph68fTK6EGlu9biaT69OZtAYnzp1P1n/f/YjF9/o9fCFdj1ujRHJZKumWshk0WWejpAMV7sVITa6TBAhGa52K0JsdJkgQjJc7VaE2OgyQYRkuNqtCLHRZYIIyXC1WxFio8sEEZLharcixEaXCSIkw9VuRYiNLhNESIar3YoQG10miJAMV7sVITa6TBAhGa52K0JsdJkgQjJc7VaE2OgyQYRkuNqtCLHRZYIIyXC1WxFio8sEEZLharcixEaXCSIkw9VuRYiNLhNESIar3YoQG10miJAMV7sVITa6TBAhGa52K0JsdJkgQjJc7VaE2OgyQYRkuNqtCLHRZYIIyXC1WxFio8sEEZLharcixEaXCSIkw9VuRYiNLhNESIar3YoQG10miJAMV7sVITa6TBAhGa52K0JsdJkgQjJc7VaE2OgyQYRkuNqtCLHRZYIIyXC1WxFio8sEEZLharcixEaXCSIkw9VuRYiNLhNESIar3YoQG10miJAMV7v1D679IXCl8CcSAAAAAElFTkSuQmCC',
      '9_Mouse/options.json': '{"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"MouseChaser","bootClass":"kernel.Boot"},"kernelEditable":false}',
      '9_Mouse/res.json': '{"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"ls:images/icon_thumbnail.png"}],"sounds":[]}'
    }
  };
  if (WebSite.devMode || WebSite.disableROM['ROM_s.js'] || WebSite.isNW) {
    rom.base='/ROM'+rom.base;
  } else {
    FS.mountROM(rom);
  }
})();