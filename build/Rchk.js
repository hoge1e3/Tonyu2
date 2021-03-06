const FS=require("./FS");
const js=FS.get(process.cwd()).rel("../www/js/");

const dict=theDict();
const exclude={"R.js":1,"TonyuRuntime.js":1,
"ErrorPos.js":1,
"ImageResEditor.js":1,"KernelDiffDialog.js":1,"noviceEditor.js":1,
"importFromJsdoit.js":1,"importFromTonyu1.js":1,"exportToExe.js":1,
"wiki.js":1,"wikiExporter.js":1,"DiffDialog.js":1,"noviceSelProject.js":1,
"auth.js":1,"syncProjects.js":1,"forkBlobs.js":1};

js.recursive(f=>{
	if (f.ext()!==".js" && f.ext()!==".html") return;
	if (f.path().match(/\bgen\b/)) return;
	if (f.path().match(/\bace-noconflict\b/)) return;
	if (f.name().match(/_concat/)) return;
	if (f.name().match(/\.min\./)) return;
	if (exclude[f.name()]) return;
	let ln=1,reqed=false;
	for (let line of f.lines()) scanLine(line);
	function scanLine(line){
		let show=false;
		if (line.match(/"R"/)) {
			reqed=true;
			show=true;
	   	}
		line.replace(/\bR\s*\(\s*["']([^"']+)["']/g,(_,name)=> {
			show=true;
			if (!reqed) {
				console.error("Not reqed",f.path());
			}
			if (!dict[name]) {
				console.error("Unreged ",name);
			}
			console.log(dict[name]);
			return _;
		});
		if (show) {
			console.log(`${f.name()}:${ln} ${line}`);
		}
		ln++;
	}
});
function ismb(str) {
    for (let i=0;i<str.length;i++) {
        if (str.charCodeAt(i)>=128)return true;
    }
    return false;
}
function theDict() {
	return {
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
        "imageList": "画像リスト",
        "dragImageFilesHere": "ここに画像ファイル(png/gif/jpg)をドラッグ＆ドロップして追加",
        "name": "名前",
        "sizePerChip": "1個の大きさ",
        "add": "追加",
        "ok": "完了",
        "importFromHTML": "HTMLからインポート",
        "pasteHTMLHere": "ここにHTMLを貼り付けます",
        "inputFolderPathForImport": "インポート先のフォルダを入力してください",
        "startImport": "インポート開始",
        "ovr": "上書",
        "new": "新規",
        "importComplete": "インポート完了",
        "selectMainClass": "実行するクラスを選択",
        "run": "実行",
        "renameProject": "プロジェクト名の変更",
        "newProject": "新規プロジェクト",
        "newProjectName": "プロジェクト名",
        "parentFolder": "親フォルダ",
        "willCreateAt": "作成先フォルダ：",
        "inputProjectName": "名前を入力してください",
        "folderExists": "このフォルダはすでに存在します",
        "rename": "名前変更",
        "downloadAsZip": "ZIPダウンロード",
        "openFolder": "フォルダを開く",
        "delete": "削除",
        "deleteProject": "プロジェクトの削除",
        "downloadAsZipBeforeDeletion": "削除前にZIPでダウンロードする",
        "yes": "はい",
        "no": "いいえ",
        "projectOptions": "プロジェクト オプション",
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
}
