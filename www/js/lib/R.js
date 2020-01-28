define(function (require,exports,module) {
/*
$(".dropdown-menu a");
$(".dropdown-toggle");
*/
    const root=require("root");
    const ja={
        "file": "ファイル",
        "closeFile": "閉じる",
        "removeFile": "削除",
        "renameProject": "プロジェクト名を変更",
        "removeProject": "このプロジェクト自身を削除",
        "mapEditor": "マップエディタ",
        "searchFiles": "検索",
        "imageList": "画像リスト",
        "soundList": "音声リスト",
        "projectOptions": "プロジェクト オプション",
        "editorConfig": "エディタの設定",
        "openFolder": "フォルダを開く",
        "resetRunDialog": "実行ダイアログをリセット",
        "exportAsHTML": "HTML生成",
        "openHelpInThisWindow": "ヘルプ(この画面)",
        "import": "インポート",
        "tools": "ツール",
        "window":"ウィンドウ",
        "publish": "公開",
        "help": "ヘルプ",
        "openHelpWithNewTab": "ヘルプ(別ウィンドウ)",
        "projects": "プロジェクト一覧",
        "publisedProjects": "公開されているプロジェクト",
        "WebSite": "Webサイト",
        "showEditButton": "「Edit」ボタンを設置する(ブラウザ版で編集可能になります)",
        "editorFontSize": "エディタの文字の大きさ",
        "inputFileName": "ファイル名を入力してください",
        "newFile": "新規作成",
        "renameFile": "名前変更",
        "refactorClassName": "プログラム中のクラス名も変更する",
        "someFilesHaveErrorOnRefactor": "プログラム内にエラーがあります．エラーを修正するか，「プログラム中のクラス名も変更する」のチェックを外してもう一度やり直してください．",
        "namingNotice": "名前は，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．",
        "autoReload": "自動再実行",
        "stop": "停止(F2)",
        "selectMain": "実行するファイルを選択...",
        "createAtLeastOneFile": "ファイルを作成してください",
        "inputNewProjectName": "新しいプロジェクトの名前を入れてください",
        "unknown": "不明",
        "jumpToErrorPosition": "エラー箇所に移動",
        "error": "エラー",
        "showTrace": "トレース表示",
        "generateSingleHTML": "HTML生成",
        "thisIsExecutableInSingleHTML": "このHTMLをcodepenなどのJS共有サイトに張り付けて実行できます．",
        "runnableInIE11": "Internet Explorer 11でも動作させる（一部機能が使えない可能性があります）",
        "globalVariables": "グローバル変数",
        "theseGlobalVariablesAreInitializedOnStart": "実行時に，これらのグローバル変数が指定した値に初期化されます．",
        "variablesShouldBeStringOrJSON": "「値」欄には文字列またはJSON形式で記入してください．",
        "save": "保存",
        "varableName": "グローバル変数名",
        "value": "値",
        "varableNameShouldBeAlphabetOrNumber": "変数名には半角英数字を使ってください",
        "cannotBeParsedAsValue": "解釈できない値です．この値をそのまま文字列として登録したい場合，前後をダブルクォーテーションで囲ってください．\n",
        "ifYouWantContainDoubleQuoteAsTheValue": "ダブルクォーテーション自身を文字列に含める場合は \\\" と書いてください．\n",
        "ifYouWantContainBackslash": "\\自身を文字列に含める場合は \\\\ と書いてください．\n",
        "imageDetails": "画像詳細",
        "singlePicture": "１枚絵",
        "rowsAndColumns": "分割数指定：",
        "chipWidthAndHeight": "1パターンの大きさ指定：",
        "compatibleWithTonyu1": "Tonyu1互換",
        "parse": "解析",
        "chipNo": "パターン番号:",
        "dragImageFilesHere": "ここに画像ファイル(png/gif/jpg)をドラッグ＆ドロップして追加",
        "name": "名前",
        "sizePerChip": "1個の大きさ",
        "add": "追加",
        "ok": "完了",
        "importFromHTML": "HTMLからインポート",
        "overwriteFolder": "フォルダを上書きする",
        "selectOtherFolder": "他のフォルダを選択する",
        "pasteHTMLHere": "ここにHTMLを貼り付けます",
        "inputFolderPathForImport": "インポート先のフォルダを入力してください",
        "startImport": "インポート開始",
        "overwriteTheseFiles": "これらのファイルを上書きする",
        "openTheProjectWithoutOverwrite": "上書きせずプロジェクトを開く",
        "followingFilesWillBeOverwritten": "次のファイルは上書きされます",
        "ovr": "上書",
        "new": "新規",
        "importComplete": "インポート完了",
        "selectMainClass": "実行するクラスを選択",
        "run": "実行",
        "newProject": "新規プロジェクト",
        "newProjectName": "プロジェクト名",
        "parentFolder": "親フォルダ",
        "willCreateAt": "作成先フォルダ：",
        "inputProjectName": "名前を入力してください",
        "folderExists": "このフォルダはすでに存在します",
        "rename": "名前変更",
        "downloadAsZip": "ZIPダウンロード",
        "delete": "削除",
        "deleteProject": "プロジェクトの削除",
        "downloadAsZipBeforeDeletion": "削除前にZIPでダウンロードする",
        "yes": "はい",
        "no": "いいえ",
        "compiler": "コンパイラ",
        "diagMode": "診断モード(速度が落ちますが，プログラムの不具合を見つけやすくします)",
        "disableInfiniteLoopCheck": "無限ループチェックをしない（チェックすると速度が速くなることがあります）",
        "requireFieldDeclaration": "フィールド宣言を明示的に行う(var n; のような宣言が必要になります)",
        "defaultSuperClass": "デフォルトの親クラス",
        "runtimes": "実行",
        "mainClass": "Main クラス",
        "bootClass": "Boot クラス",
        "edit": "編集...",
        "done": "完了",
        "thisFileCannotBeAdded": "このファイルは追加できません：\n",
        "resourceFileExists": "同じ名前のファイルが既に登録されています：\n",
        "image": "画像",
        "sound": "音声",
        "find": "検索",
        "wordToFind": "検索語",
        "showAllProjects": "すべて見る...",
        "thisFolderShouldBeUploadedToWebServer": "このフォルダは、Webサーバにアップロードしないと正常に動作しない可能性があります。\n",
        "seeRuntime": "詳しくは\nhttps://www.tonyu.jp/tonyu2/runtime.html\nを御覧ください。\n",
        "createExecutable": "ランタイム作成",
        "howToOutput": "出力方法",
        "saveExecutableAsZip": "ZIP圧縮したものを保存する",
        "uploadToProjectBoard": "プロジェクトボードにアップロードする",
        "saveExecutableAtFolder": "次のフォルダに出力：",
        "executableOptions": "オプション",
        "RunInIE11": "Internet Explorer 11でも動作させる（一部機能が使えない可能性があります）",
        "attachSourceFiles": "ソースを添付する",
        "ifSourceFilesAreAttached": "ソースを添付すると，アップロードしたファイルを",
        "ItCanBeEditableInProjectBoard": "プロジェクトボード上で直接編集できます．",
        "youCanPublishThisExecutableAsWebApplicationBy": "次のいずれかの方法でWebアプリとして公開することができます。",
        "uploadTheFolderIntoYourWebSite": "フォルダをお手持ちのWebサーバにアップロードする",
        "uploadZippedFileInto": "上のフォルダをZIPで圧縮したものを",
        "projectBoard": "プロジェクトボード",
        "afterProjectBoard": "にアップロードする",
        "executableCreated": "ランタイムを作成しました。",
        "uploadTheExtractedFolderIntoYourWebSite": "解凍したフォルダをお手持ちのWebサーバにアップロードする",
        "uploadTheZipFileInto": "保存したZIPファイルを",
        "uploadHasNotBeenDoneYet": "まだアップロードは完了していません",
        "youHaveToDescribeAboutThisVersion": "新規バージョンページ",
        "toCompleteTheUpload": "に必要事項を記入して，アップロードを完了させてください",
        "infiniteLoopDetected": "無限ループをストップしました。\n",
        "youCanConfigureAboutInfinteLoopDetection": "   プロジェクト オプションで無限ループチェックの有無を設定できます。\n",
        "seeProjectOption": "   [参考]https://edit.tonyu.jp/doc/options.html\n",
        "importingFromZip": "Zipからインポート中です...",
        "importFromZip": "Zipからインポート",
        "confirm": "確認",
        "cancel": "キャンセル",
        "input": "入力",
        "fileExists": "ファイル{1}は存在します",
        "deleteFileConfirm": "{1}を削除しますか？",
        "duplicatedFiles": "{1} ⇒ {2}({3}) と重複\n",
        "cannotUseKernelFiles": "{1}はシステムで利用されているフォルダなので使用できません",
        "upCased": "先頭を大文字({1}) にして作成します．",
        "resouceList": "{1}リスト",
        "dragFileHere": "ここに{1}ファイル({2})をドラッグ＆ドロップして追加",
        "storageUsage": "{1}KB中{2}KB使用中．",
        "unzipping": "{1}を展開中...",
        "doesNotContainTonyu2Project": "{1}にはTonyu2の編集可能なプロジェクトが含まれていません.",
        "checking": "{1}をチェック中...",
        "downloadFromProjectBoard":"プロジェクトボードから{1}をダウンロード....",
        "copying": "{1}から{2}にコピー",
        "runtimeCreatedAt":"ランタイムを作成しました：",
        "uploadFailed":"アップロード失敗: {1}",
        "duplicateGlobalVariable": "変数名'{1}'が重複しています．",
        "invalidGlobalVariableName": "変数名'{1}'はグローバル変数名として使えません．",
        "runClass": "{1}を実行",
        "pluginAddedAndRestart":"必要なプラグイン{1}を追加しました。もう一度実行してください",
        "otherCommandInProgress": "他のコマンド({1})が実行されているのでお待ちください．\n"+
            "しばらくたってもこのメッセージが出る場合，一旦Homeに戻ってください．",
        "deleteProjectConfirm": "{1}内のファイルをすべて削除しますか？削除する場合はDELETE と入力してください．",
        "renamedProjectExists": "{1}はすでに存在します．",
        "at":" 場所：",
        "deleteProjectFromItem":"プロジェクト{1}を削除しますか？"
    };
    /*let buf="";
    for (let k of Object.keys(ja)) {
        buf+=`"${k}" : "${englishify(k)}", //${ja[k]}\n`;
    }
    console.log(buf);*/
    const en={
        "file" : "File", //ファイル
        "closeFile" : "Close File", //閉じる
        "removeFile" : "Remove File", //削除
        "renameProject" : "Rename Project", //プロジェクト名を変更
        "removeProject" : "Remove Project", //このプロジェクト自身を削除
        "mapEditor" : "Map Editor", //マップエディタ
        "searchFiles" : "Search Files", //検索
        "imageList" : "Image List", //画像リスト
        "soundList" : "Sound List", //音声リスト
        "projectOptions" : "Project Options", //プロジェクト オプション
        "editorConfig" : "Editor Config", //エディタの設定
        "openFolder" : "Open Folder", //フォルダを開く
        "resetRunDialog" : "Reset Run Dialog", //実行ダイアログをリセット
        "exportAsHTML" : "Export as HTML", //HTML生成
        "openHelpInThisWindow" : "Open Help in This Window", //ヘルプ(この画面)
        "import" : "Import", //インポート
        "tools" : "Tools", //ツール
        "window" : "Window", //ウィンドウ
        "publish" : "Publish", //公開
        "help" : "Help", //ヘルプ
        "openHelpWithNewTab" : "Open Help with New Tab", //ヘルプ(別ウィンドウ)
        "projects" : "Projects", //プロジェクト一覧
        "publisedProjects" : "Publised Projects", //公開されているプロジェクト
        "WebSite" : " Web Site", //Webサイト
        "showEditButton" : "Show Edit Button", //「Edit」ボタンを設置する(ブラウザ版で編集可能になります)
        "editorFontSize" : "Editor Font Size", //エディタの文字の大きさ
        "inputFileName" : "Input File Name", //ファイル名を入力してください
        "newFile" : "New File", //新規作成
        "renameFile" : "Rename File", //名前変更
        "refactorClassName" : "Refactor Class Name", //プログラム中のクラス名も変更する
        "someFilesHaveErrorOnRefactor" : "Error occured during Refactoring. Correct Erro or uncheck 'Refactor Class Name'.", //プログラム内にエラーがあります．エラーを修正するか，「プログラム中のクラス名も変更する」のチェックを外してもう一度やり直してください．
        "namingNotice" : "Alphabets, Numbers or Underscores can be used as a name.", //名前は，半角英数字とアンダースコア(_)のみが使えます．先頭は英大文字にしてください．
        "autoReload" : "Auto Reload", //自動再実行
        "stop" : "Stop", //停止(F2)
        "selectMain" : "Select Main", //実行するファイルを選択...
        "createAtLeastOneFile" : "Create at Least One File", //ファイルを作成してください
        "inputNewProjectName" : "Input New Project Name", //新しいプロジェクトの名前を入れてください
        "unknown" : "Unknown", //不明
        "jumpToErrorPosition" : "Jump To Error Position", //エラー箇所に移動
        "error" : "Error", //エラー
        "showTrace" : "Show Trace", //トレース表示
        "generateSingleHTML" : "Generate Single HTML", //HTML生成
        "thisIsExecutableInSingleHTML" : "This is Executable in Single HTML, can be pasted to codepen.io", //このHTMLをcodepenなどのJS共有サイトに張り付けて実行できます．
        "runnableInIE11" : "Runnable in IE11", //Internet Explorer 11でも動作させる（一部機能が使えない可能性があります）
        "globalVariables" : "Global Variables", //グローバル変数
        "theseGlobalVariablesAreInitializedOnStart" : "The following Global Variables are Initialized on Startup", //実行時に，これらのグローバル変数が指定した値に初期化されます．
        "variablesShouldBeStringOrJSON" : "Variables Should be String or JSON", //「値」欄には文字列またはJSON形式で記入してください．
        "save" : "Save", //保存
        "varableName" : "Varable Name", //グローバル変数名
        "value" : "Value", //値
        "varableNameShouldBeAlphabetOrNumber" : "Varable Name Should be Alphabet or Number", //変数名には半角英数字を使ってください
        "cannotBeParsedAsValue" : "Cannot be Parsed as a Value. If you meant this is a plain string, surround it with double quotes.", //解釈できない値です．この値をそのまま文字列として登録したい場合，前後をダブルクォーテーションで囲ってください．

        "ifYouWantContainDoubleQuoteAsTheValue" : "If You Want Contain Double Quote as The Value, write as \\\" ", //ダブルクォーテーション自身を文字列に含める場合は \" と書いてください．

        "ifYouWantContainBackslash" : "If You Want Contain Backslash, write as \\\\", //\自身を文字列に含める場合は \\ と書いてください．

        "imageDetails" : "Image Details", //画像詳細
        "singlePicture" : "Single Picture", //１枚絵
        "rowsAndColumns" : "Rows And Columns", //分割数指定：
        "chipWidthAndHeight" : "Chip Width And Height", //1パターンの大きさ指定：
        "compatibleWithTonyu1" : "Compatible With Tonyu1", //Tonyu1互換
        "parse" : "Parse", //解析
        "chipNo" : "Chip No.", //パターン番号:
        "dragImageFilesHere" : "Drag Image Files Here", //ここに画像ファイル(png/gif/jpg)をドラッグ＆ドロップして追加
        "name" : "Name", //名前
        "sizePerChip" : "Size Per Chip", //1個の大きさ
        "add" : "Add", //追加
        "ok" : "Ok", //完了
        "importFromHTML" : "Import From HTML", //HTMLからインポート
        "overwriteFolder" : "Overwrite Folder", //フォルダを上書きする
        "selectOtherFolder" : "Select Other Folder", //他のフォルダを選択する
        "pasteHTMLHere" : "Paste HTML Here", //ここにHTMLを貼り付けます
        "inputFolderPathForImport" : "Input Folder Path For Import", //インポート先のフォルダを入力してください
        "startImport" : "Start Import", //インポート開始
        "overwriteTheseFiles" : "Overwrite These Files", //これらのファイルを上書きする
        "openTheProjectWithoutOverwrite" : "Open The Project Without Overwrite", //上書きせずプロジェクトを開く
        "followingFilesWillBeOverwritten" : "Following Files Will be Overwritten", //次のファイルは上書きされます
        "ovr" : "Ovr", //上書
        "new" : "New", //新規
        "importComplete" : "Import Complete", //インポート完了
        "selectMainClass" : "Select Main Class", //実行するクラスを選択
        "run" : "Run", //実行
        "newProject" : "New Project", //新規プロジェクト
        "newProjectName" : "New Project Name", //プロジェクト名
        "parentFolder" : "Parent Folder", //親フォルダ
        "willCreateAt" : "The project will be created At: ", //作成先フォルダ：
        "inputProjectName" : "Input Project Name", //名前を入力してください
        "folderExists" : "Folder Exists", //このフォルダはすでに存在します
        "rename" : "Rename", //名前変更
        "downloadAsZip" : "Download as Zip", //ZIPダウンロード
        "delete" : "Delete", //削除
        "deleteProject" : "Delete Project", //プロジェクトの削除
        "downloadAsZipBeforeDeletion" : "Download as Zip Before Deletion", //削除前にZIPでダウンロードする
        "yes" : "Yes", //はい
        "no" : "No", //いいえ
        "compiler" : "Compiler", //コンパイラ
        "diagMode" : "Diagnostic Mode", //診断モード(速度が落ちますが，プログラムの不具合を見つけやすくします)
        "disableInfiniteLoopCheck" : "Disable Infinite Loop Check(Sometimes faster)", //無限ループチェックをしない（チェックすると速度が速くなることがあります）
        "requireFieldDeclaration" : "Require Implicit Field Declaration(such as var n; )", //フィールド宣言を明示的に行う(var n; のような宣言が必要になります)
        "defaultSuperClass" : "Default Super Class", //デフォルトの親クラス
        "runtimes" : "Runtimes", //実行
        "mainClass" : "Main Class", //Main クラス
        "bootClass" : "Boot Class", //Boot クラス
        "edit" : "Edit", //編集...
        "done" : "Done", //完了
        "thisFileCannotBeAdded" : "This File cannot be Added", //このファイルは追加できません：
        "resourceFileExists" : "Resource File with the name already Exists", //同じ名前のファイルが既に登録されています：
        "image" : "Image", //画像
        "sound" : "Sound", //音声
        "find" : "Find", //検索
        "wordToFind" : "Word To Find", //検索語
        "showAllProjects" : "Show All Projects", //すべて見る...
        "thisFolderShouldBeUploadedToWebServer" : "This Folder Should be Uploaded To Web Server", //このフォルダは、Webサーバにアップロードしないと正常に動作しない可能性があります。
        "seeRuntime" : "See https://www.tonyu.jp/tonyu2/runtime.html", //詳しくは    https://www.tonyu.jp/tonyu2/runtime.html    を御覧ください。
        "createExecutable" : "Create Executable", //ランタイム作成
        "howToOutput" : "How To Output", //出力方法
        "saveExecutableAsZip" : "Save Executable as Zip", //ZIP圧縮したものを保存する
        "uploadToProjectBoard" : "Upload To Project Board", //プロジェクトボードにアップロードする
        "saveExecutableAtFolder" : "Save Executable at the following Folder:", //次のフォルダに出力：
        "executableOptions" : "Executable Options", //オプション
        "RunInIE11" : " Run in IE11 (Some features cannot be used)", //Internet Explorer 11でも動作させる（一部機能が使えない可能性があります）
        "attachSourceFiles" : "Attach Source Files", //ソースを添付する
        "ifSourceFilesAreAttached" : "If Source Files are Attached, ", //ソースを添付すると，アップロードしたファイルを
        "ItCanBeEditableInProjectBoard" : " It can be Editable in Project Board", //プロジェクトボード上で直接編集できます．
        "youCanPublishThisExecutableAsWebApplicationBy" : "You can Publish This Executable as a Web Application by either ways:", //次のいずれかの方法でWebアプリとして公開することができます。
        "uploadTheFolderIntoYourWebSite" : "Upload The Folder Into Your Web Site", //フォルダをお手持ちのWebサーバにアップロードする
        "uploadZippedFileInto" : "Upload Zipped File Into ", //上のフォルダをZIPで圧縮したものを
        "projectBoard" : "Project Board", //プロジェクトボード
        "afterProjectBoard" : ".", //にアップロードする
        "executableCreated" : "Executable Created", //ランタイムを作成しました。
        "uploadTheExtractedFolderIntoYourWebSite" : "Upload The Extracted Folder Into Your Web Site", //解凍したフォルダをお手持ちのWebサーバにアップロードする
        "uploadTheZipFileInto" : "Upload The Zip File Into", //保存したZIPファイルを
        "uploadHasNotBeenDoneYet" : "Upload Has Not Been Done Yet", //まだアップロードは完了していません
        "youHaveToDescribeAboutThisVersion" : "You Have To Describe About This Version", //新規バージョンページ
        "toCompleteTheUpload" : "To Complete The Upload", //に必要事項を記入して，アップロードを完了させてください
        "infiniteLoopDetected" : "Infinite Loop Detected. Aborted.", //無限ループをストップしました。

        "youCanConfigureAboutInfinteLoopDetection" : "You can Configure About Infinte Loop Detection", //   プロジェクト オプションで無限ループチェックの有無を設定できます。

        "seeProjectOption" : "See Project Option: https://edit.tonyu.jp/doc/options.html", //   [参考]https://edit.tonyu.jp/doc/options.html

        "importingFromZip" : "Importing From Zip", //Zipからインポート中です...
        "importFromZip" : "Import From Zip", //Zipからインポート
        "confirm" : "Confirm", //確認
        "cancel" : "Cancel", //キャンセル
        "input" : "Input", //入力
        "fileExists" : "File {1} already Exists", //ファイル{1}は存在します
        "deleteFileConfirm" : "Delete File {1}?", //{1}を削除しますか？
        "duplicatedFiles" : "Duplicated:{1}=>{2}({3})", //{1} ⇒ {2}({3}) と重複

        "cannotUseKernelFiles" : "Cannot Use name {1}, conflicting with Kernel Files", //{1}はシステムで利用されているフォルダなので使用できません
        "upCased" : "The class name is automatically capitalized: {1}", //先頭を大文字({1}) にして作成します．
        "resouceList" : "{1} List", //{1}リスト
        "dragFileHere" : "Drag {1} File({2}) Here", //ここに{1}ファイル({2})をドラッグ＆ドロップして追加
        "storageUsage" : "Storage Usage: {1}/{2}KB", //{1}KB中{2}KB使用中．
        "unzipping" : "Unzipping {1}", //{1}を展開中...
        "doesNotContainTonyu2Project" : "{1} Does Not Contain Tonyu2 Project", //{1}にはTonyu2の編集可能なプロジェクトが含まれていません.
        "checking" : "Checking {1}", //{1}をチェック中...
        "downloadFromProjectBoard" : "Download {1} From Project Board", //プロジェクトボードから{1}をダウンロード....
        "copying" : "Copying from {1} to {2}", //{1}から{2}にコピー
        "runtimeCreatedAt" : "Executable Created at: ", //ランタイムを作成しました：
        "uploadFailed" : "Upload Failed: {1}", //アップロード失敗: {1}
        "duplicateGlobalVariable" : "Duplicate Global Variable: {1}", //変数名'{1}'が重複しています．
        "invalidGlobalVariableName" : "Invalid Global Variable Name: {1}", //変数名'{1}'はグローバル変数名として使えません．
        "runClass" : "Run {1}", //{1}を実行
        "pluginAddedAndRestart" : "Plugin {1} Added And Restart", //必要なプラグイン{1}を追加しました。もう一度実行してください
        "otherCommandInProgress" : "Other {1} Command in Progress", //他のコマンド({1})が実行されているのでお待ちください．しばらくたってもこのメッセージが出る場合，一旦Homeに戻ってください．
        "deleteProjectConfirm" : "Are you sure to Delete Project {1}? If so, type DELETE", //{1}内のファイルをすべて削除しますか？削除する場合はDELETE と入力してください．
        "renamedProjectExists" : "Renamed Project {1} Exists", //{1}はすでに存在します．
        "at" : "at:", // 場所：
        "deleteProjectFromItem" : "Delete Project {1}?", //プロジェクト{1}を削除しますか？
    };
    let dict=localStorage.locale=="en"? en: ja;
    //const test=x=>`【${x}】`;
    function R(name,...params) {
        let mesg=dict[name];
        if (!mesg) {
            return englishify(name)+(params.length?": "+params.join(","):"");
        }
        return (buildMesg(mesg, ...params));
    }
    function englishify(name) {
        name=name.replace(/([A-Z])/g," $1");
        name=name[0].toUpperCase()+name.substring(1);
        return name;
    }
    function buildMesg() {
        var a=Array.prototype.slice.call(arguments);
        var format=a.shift();
        if (a.length===1 && a[0] instanceof Array) a=a[0];
        var P="vroijvowe0r324";
        format=format.replace(/\{([0-9])\}/g,P+"$1"+P);
        format=format.replace(new RegExp(P+"([0-9])"+P,"g"),function (_,n) {
            return a[parseInt(n)-1]+"";
        });
        return format;
    }
    R.renderMenu=()=>{
        $("[data-r]").each(function () {
            const e=$(this);
            e.text(R(e.attr("data-r")));
        });
    };
    if (typeof $==="function") {
        $(R.renderMenu);
    }
    root.R=R;
    module.exports=R;
});
