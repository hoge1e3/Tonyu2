// forked from makkii_bcr's "T2MediaLib" http://jsdo.it/makkii_bcr/3ioQ
// T2MediaLib_BGMPlayer //

var T2MediaLib_BGMPlayer = function(arg_id) {
    this.id = arg_id;
    this.playingState = "stop";
    this.playingStatePending = null;
    this.playingBGM = null;
    this.playingBGMName = null;
    this.bgmPause = 0;
    this.bgmPauseTime = 0;
    this.bgmPauseCurrentTime = 0;
    this.bgmPauseTempo = 0;
    this.bgmPauseLoop = false;
    this.bgmPauseLoopStart = 0;
    this.bgmPauseLoopEnd = 0;
    this.bgmVolume = 1.0;
    this.bgmTempo = 1.0;
    this.bgmPan = 0.0;
    this.picoAudio = null;//new PicoAudio(T2MediaLib.context);
    this.picoAudioSetDataBGMName = null; // 前回のsetDataした曲を再び使う場合は、setDataを省略して軽量化する
    this.PICO_AUDIO_VOLUME_COEF = 1;//0.2;
};

// BGM関数郡 //

T2MediaLib_BGMPlayer.prototype.playBGM = function(idx, loop, offset, loopStart, loopEnd) {
    if (!T2MediaLib.context) return null;
    this.stopBGM();

    var soundData = T2MediaLib.soundDataAry[idx];
    if (soundData == null) return null;
    if (!soundData.isDecodeComplete()) {
        if (!soundData.isDecoding()) {
            var that = this;
            var callbacks = {};
            callbacks.succ = function() {
                var pending = that.playingStatePending; // 途中で値が変わるため保存
                that._setPlayingState("stop", true);
                if (pending != "stop") {
                    that.playBGM(idx, loop, offset, loopStart, loopEnd);
                }
                if (pending == "pause") {
                    that.pauseBGM();
                }
            };
            callbacks.err = function() {
                that._setPlayingState("stop", true);
            };
            this.playingBGMName = idx;
            this._setPlayingState("decoding", true);
            T2MediaLib.decodeSound(idx, callbacks);
        }
        return this;
    }

    var decodedData = soundData.decodedData;
    if (decodedData instanceof AudioBuffer) {
        // MP3, Ogg, AAC, WAV
        this.playingBGM = T2MediaLib.playSE(idx, this.bgmVolume, this.bgmPan, this.bgmTempo, offset, loop, loopStart, loopEnd);
    } else if (decodedData instanceof Object) {
        // Midi
        if (this.picoAudio == null) {
            this.picoAudio = new PicoAudio(T2MediaLib.context, T2MediaLib.picoAudio); // AudioContextオブジェクトがmax6つまで？なので使いまわす
        }
        if (idx != this.picoAudioSetDataBGMName) {
            this.picoAudio.setData(decodedData);
            this.picoAudioSetDataBGMName = idx;
        } else {
            this.picoAudio.initStatus();
        }
        this.picoAudio.setLoop(loop);
        this.picoAudio.setMasterVolume(this.PICO_AUDIO_VOLUME_COEF * this.bgmVolume * T2MediaLib.bgmMasterVolume * T2MediaLib.masterVolume);
        if (!offset) {
            offset = 0;
        } else {
            var bgmLengthTime = this.picoAudio.getTime(this.picoAudio.getTiming(Number.MAX_SAFE_INTEGER));
            if      (offset > bgmLengthTime) offset = bgmLengthTime;
            else if (offset < 0.0) offset = 0.0;
        }
        this.picoAudio.setStartTime(offset);
        this.picoAudio.play();
        this.playingBGM = this.picoAudio;
    }
    this.playingBGMName = idx;
    this.bgmPause = 0;
    this._setPlayingState("play");
    return this;
};
T2MediaLib_BGMPlayer.prototype.stopBGM = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        this.picoAudio.stop();
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        bgm.stop(0);
    }
    this.playingBGM = null;
    this.playingBGMName = null;
    this._setPlayingState("stop");
    return this;
};
T2MediaLib_BGMPlayer.prototype.pauseBGM = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        if (this.bgmPause === 0) {
            this.bgmPauseTime = this.getBGMCurrentTime();
            this.bgmPauseCurrentTime = bgm.context.currentTime;
            bgm.stop();
            this.bgmPause = 1;
        }
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 0) {
            this.bgmPauseTime = this.getBGMCurrentTime();
            this.bgmPauseLoopStart = T2MediaLib.getSELoopStartTime(bgm);
            this.bgmPauseLoopEnd = T2MediaLib.getSELoopEndTime(bgm);
            this.bgmPauseLoop = T2MediaLib.isSELoop(bgm);
            this.bgmPauseCurrentTime = bgm.context.currentTime;
            this.bgmPauseTempo = this.bgmTempo;
            bgm.stop(0);
            this.bgmPause = 1;
        }
    }
    if (this.playingState != "stop") {
        this._setPlayingState("pause");
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.resumeBGM = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        if (this.bgmPause === 1) {
            bgm.play();
            this.bgmPause = 0;
        }
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            bgm = this.playBGM(this.playingBGMName, this.bgmPauseLoop, this.bgmPauseTime, this.bgmPauseLoopStart, this.bgmPauseLoopEnd);
        }
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.onChangeBGMMasterVolume = function() {
    this.setBGMVolume(this.getBGMVolume());
};
T2MediaLib_BGMPlayer.prototype.getBGMVolume = function() {
    return this.bgmVolume;
};
T2MediaLib_BGMPlayer.prototype.setBGMVolume = function(vol) {
    var bgm = this.playingBGM;
    this.bgmVolume = vol;
    if (bgm instanceof PicoAudio) {
        // Midi
        this.picoAudio.setMasterVolume(this.PICO_AUDIO_VOLUME_COEF * vol * T2MediaLib.bgmMasterVolume * T2MediaLib.masterVolume);
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        bgm.gainNode.gain.value = vol * T2MediaLib.bgmMasterVolume * T2MediaLib.masterVolume;
        //↓seMasterVolumeが音量に乗算されてしまう
        //T2MediaLib.setSEVolume(bgm, vol);
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMTempo = function() {
    return this.bgmTempo;
};
T2MediaLib_BGMPlayer.prototype.setBGMTempo = function(tempo) {
    // MP3, Ogg, AAC, WAV
    var bgm = this.playingBGM;

    if (tempo <= 0) tempo = 1;
    if ((bgm instanceof AudioBufferSourceNode) && this.bgmPause === 0) {
        bgm.plusTime -= (T2MediaLib.context.currentTime - bgm.playStartTime) * (tempo - this.bgmTempo);
    }
    this.bgmTempo = tempo;
    T2MediaLib.setSERate(bgm, tempo);
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMPan = function() {
    return this.bgmPan;
};
T2MediaLib_BGMPlayer.prototype.setBGMPan = function(pan) {
    var bgm = this.playingBGM;
    this.bgmPan = pan;
    if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        T2MediaLib.setSEPan(bgm, pan);
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.isBGMLoop = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        return this.picoAudio.isLoop();
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            return this.bgmPauseLoop;
        } else {
            return T2MediaLib.isSELoop(bgm);
        }
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.setBGMLoop = function(loop) {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        this.picoAudio.setLoop(loop);
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            this.bgmPauseLoop = loop;
        } else {
            T2MediaLib.setSELoop(bgm, loop);
        }
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMLoopStartTime = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        return 0;
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            return this.bgmPauseLoopStart;
        } else {
            return T2MediaLib.getSELoopStartTime(bgm);
        }
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.setBGMLoopStartTime = function(loopStart) {
    var bgm = this.playingBGM;
    if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            this.bgmPauseLoopStart = loopStart;
        } else {
            return T2MediaLib.setSELoopStartTime(bgm, loopStart);
        }
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMLoopEndTime = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        return this.getBGMLength();
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            return this.bgmPauseLoopEnd;
        } else {
            return T2MediaLib.getSELoopEndTime(bgm);
        }
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.setBGMLoopEndTime = function(loopEnd) {
    var bgm = this.playingBGM;
    if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        if (this.bgmPause === 1) {
            this.bgmPauseLoopEnd = loopEnd;
        } else {
            return T2MediaLib.setSELoopEndTime(bgm, loopEnd);
        }
    }
    return this;
};
T2MediaLib_BGMPlayer.prototype.getBGMCurrentTime = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        var time;
        if (this.bgmPause === 0) {
            time = this.picoAudio.getTime(this.picoAudio.getTiming(this.picoAudio.context.currentTime - this.picoAudio.states.startTime));
        } else {
            time = this.bgmPauseTime;
        }
        return time;
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        var time, time2, currenTime, tempo, plusTime, minusTime, mod;

        if (this.bgmPause === 0) {
            currenTime = T2MediaLib.context.currentTime;
            tempo = this.bgmTempo;
        } else {
            currenTime = this.bgmPauseCurrentTime;
            tempo = this.bgmPauseTempo;
        }

        time2 = (currenTime - bgm.playStartTime) * tempo + bgm.plusTime;
        if (bgm.loop) {
            if (bgm.loopEnd - bgm.loopStart > 0) { // ループ範囲正常

                if (time2 < bgm.loopStart) { // ループ範囲前
                    plusTime  = 0;
                    minusTime = 0;
                    mod = bgm.buffer.duration;
                } else { // ループ範囲内
                    plusTime  = bgm.loopStart;
                    minusTime = bgm.loopStart;
                    mod = bgm.loopEnd - bgm.loopStart;
                }
            } else { // ループ範囲マイナス（ループ無効）
                mod = bgm.buffer.duration;
                plusTime = 0;
                minusTime = 0;
            }
        }

        if (bgm.loop) {
            time = ((time2 - minusTime) % mod) + plusTime;
        } else {
            time = time2;
            if (time > bgm.buffer.duration) time = bgm.buffer.duration;
        }
        return time;
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.getBGMLength = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        return this.picoAudio.getTime(this.picoAudio.getTiming(Number.MAX_SAFE_INTEGER));
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, AAC, WAV
        return bgm.buffer.duration;
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.getPlayingBGMName = function() {
    return this.playingBGMName;
};
T2MediaLib_BGMPlayer.prototype.setOnBGMEndListener = function(listener) {
    if (this.picoAudio == null) {
        this.picoAudio.setOnSongEndListener(listener);
    }
};
T2MediaLib_BGMPlayer.prototype.getPlayingState = function() {
    return this.playingState;
};
T2MediaLib_BGMPlayer.prototype._setPlayingState = function(state, force) {
    if (force || this.playingState != "decoding") {
        this.playingState = state;
        this.playingStatePending = null;
    } else {
        this.playingStatePending = state;
    }
};

// T2MediaLib_SoundData //

var T2MediaLib_SoundData = function(idx, url) {
    this.state = "none"; // "none":データなし, "loading":読み込み中, "loaded":読み込み完了, "decoding":デコード中, "decoded":デコード完了, "error":エラー
    this.errorID = null;
    this.url = null;
    this.fileData = null;
    this.decodedData = null;
};
T2MediaLib_SoundData.prototype.onLoad = function(url) {
    this.state = "loading";
    this.url = url;
};
T2MediaLib_SoundData.prototype.onLoadComplete = function(data) {
    this.state = "loaded";
    this.fileData = data;
};
T2MediaLib_SoundData.prototype.onDecode = function() {
    this.state = "decoding";
};
T2MediaLib_SoundData.prototype.onDecodeComplete = function(data) {
    this.state = "decoded";
    this.decodedData = data;
};
T2MediaLib_SoundData.prototype.onError = function(errorID) {
    this.state = "error";
    this.errorID = errorID;
};
T2MediaLib_SoundData.prototype.isLoadComplete = function() {
    switch(this.state) {
        case "loaded":
        case "decoding":
        case "decoded":
            return true;
    }
    return false;
};
T2MediaLib_SoundData.prototype.isDecoding = function() {
    return this.state == "decoding";
};
T2MediaLib_SoundData.prototype.isDecodeComplete = function() {
    return this.state == "decoded";
};
T2MediaLib_SoundData.prototype.getDecodedData = function() {
    return this.decodedData;
};



// ライブラリ本体 //

// T2MediaLib //

var T2MediaLib = {
    context : null,
    picoAudio : null,

    soundDataAry : [], // T2MediaLib_SoundData

    bgmPlayerMax : 16,
    bgmPlayerAry : [], // T2MediaLib_BGMPlayer

    masterVolume : 1.0,
    seMasterVolume : 1.0,
    bgmMasterVolume : 1.0,

    playingAudio : null,
    audioVolume : 1.0,
    audioTempo : 1.0,
    audioDataAry : {
        data : []
    },

    // 初期化 //
    init : function() {
        if (this.inited) return;
        this.inited=true;
        if (this.disabled) return;
        if (window.AudioContext) {
            T2MediaLib.context = new AudioContext();
        } else if (window.webkitAudioContext) {
            T2MediaLib.context = new webkitAudioContext();
        } else {
            T2MediaLib.context = null;
            console.log('Your browser does not support yet Web Audio API');
        }

        // Web Audio API 起動成功
        if (T2MediaLib.context) {
            // BGMPlayer初期化 (16個生成)
            for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
                T2MediaLib.bgmPlayerAry[i] = new T2MediaLib_BGMPlayer(i);
            }
            // MIDIデコード用PicoAudio生成
            T2MediaLib.picoAudio = new PicoAudio(T2MediaLib.context);
        }
    },

    // CLEAR系関数 //
    allClearData : function() {
        var dataAry = T2MediaLib.soundDataAry;
        for (var data in dataAry) {
            delete dataAry[data];
        }
    },
    clearData : function(idx) {
        var dataAry = T2MediaLib.soundDataAry;
        delete dataAry[idx];
    },

    // SE&BGMの音量 //
    getMasterVolume : function() {
        return T2MediaLib.masterVolume;
    },
    setMasterVolume : function(vol) {
        T2MediaLib.masterVolume = vol;
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            var bgmPlayer = T2MediaLib.bgmPlayerAry[i];
            if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) continue;
            bgmPlayer.onChangeBGMMasterVolume();
        }
    },

    // 配列データからサウンドを作成・登録
    loadSoundFromArray : function (idx, array1, array2) {
        T2MediaLib.soundDataAry[idx] = new T2MediaLib_SoundData();

        var ctx = T2MediaLib.context;
        var numOfChannels = array1 != null && array2 != null ? 2 : 1;
        var audioBuffer = ctx.createBuffer(numOfChannels, array.length, ctx.sampleRate);
        var buffer1 = audioBuffer.getChannelData(0);
        var buffer2 = array2 != null ? audioBuffer.getChannelData(1) : null;
        for (var i = 0; i < array.length ; i++) {
             buffer1[i] = array1[i];
        }
        if (buffer2) {
            for (var i = 0; i < array.length ; i++) {
                 buffer2[i] = array2[i];
            }
        }
        T2MediaLib.soundDataAry[idx].onDecodeComplete(audioBuffer);
    },
    // サウンドの受信・デコード・登録
    loadSound : function(idx, url, callbacks) { //@hoge1e3
        T2MediaLib.soundDataAry[idx] = new T2MediaLib_SoundData();

        if (!T2MediaLib.context || T2MediaLib.disabled) {
            T2MediaLib.soundDataAry[idx].onError("FUNC_DISABLED_ERROR");
            return null;
        }
        if (typeof WebSite=="object" && WebSite.mp3Disabled) {
            url=url.replace(/\.(mp3|mp4|m4a)$/,".ogg");
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 0 /*@hoge1e3 for node-webkit base64url */) {
                var arrayBuffer = xhr.response;
                if (arrayBuffer instanceof ArrayBuffer) {
                    T2MediaLib.soundDataAry[idx].onLoadComplete(arrayBuffer);
                    if (callbacks && callbacks.succ) callbacks.succ(idx);
                } else {
                    T2MediaLib.soundDataAry[idx].onError("XHR_RESPONSE_ERROR");
                    if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.soundDataAry[idx]);//@hoge1e3
                }
            } else {
                T2MediaLib.soundDataAry[idx].onError("XHR_STATUS_ERROR");
                if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.soundDataAry[idx]);//@hoge1e3
            }
        };
        xhr.onerror=function (e) {//@hoge1e3
            T2MediaLib.soundDataAry[idx].onError("XHR_ERROR");
            if (callbacks && callbacks.err) callbacks.err(idx,e+"");
        };

        T2MediaLib.soundDataAry[idx].onLoad(url);
        if (url.match(/^data:/) && Util && Util.Base64_To_ArrayBuffer) {//@hoge1e3
            xhr={onload:xhr.onload};
            xhr.response=Util.Base64_To_ArrayBuffer( url.replace(/^data:audio\/[a-zA-Z0-9]+;base64,/i,""));
            xhr.status=200;
            xhr.onload();
        } else {
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';  // XMLHttpRequest Level 2
            xhr.send(null);
        }
        //setTimeout(T2MediaLib.activate.bind(T2MediaLib),0);
    },
    decodeSound: function(idx, callbacks) {
        var soundData = T2MediaLib.soundDataAry[idx];
        if (soundData == null) return;

        var arrayBuffer = soundData.fileData;
        soundData.onDecode();
        if (soundData.url.match(/\.(midi?)$/) || soundData.url.match(/^data:audio\/mid/)) {
            // Midi
            // PicoAudio.jsにデコードしてもらう
            if (T2MediaLib.picoAudio == null) {
                T2MediaLib.picoAudio = new PicoAudio(T2MediaLib.context);
            }
            var smf = new Uint8Array(arrayBuffer);
            var data = T2MediaLib.picoAudio.parseSMF(smf);
            T2MediaLib.soundDataAry[idx].onDecodeComplete(data);
            if (callbacks && callbacks.succ) callbacks.succ(idx);
        } else {
            // MP3, Ogg, AAC, WAV
            var successCallback = function(audioBuffer) {
                T2MediaLib.soundDataAry[idx].onDecodeComplete(audioBuffer);
                if (callbacks && callbacks.succ) callbacks.succ(idx);//@hoge1e3
            };
            var errorCallback = function(error) {
                if (error instanceof Error) {
                    console.log('T2MediaLib: '+error.message, soundData.url);//@hoge1e3
                } else {
                    console.log('T2MediaLib: Error decodeAudioData()', soundData.url);//@hoge1e3
                }
                T2MediaLib.soundDataAry[idx].onError("DECODE_ERROR");
                if (callbacks && callbacks.err) callbacks.err(idx, T2MediaLib.soundDataAry[idx]);//@hoge1e3
            };
            T2MediaLib.context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
        }
    },
    activate: function () {
      // create empty buffer
        this.init();
        if (this.isActivated) return;
        this.isActivated=true;
        var myContext=T2MediaLib.context;
        var buffer = myContext.createBuffer(1, Math.floor(myContext.sampleRate/32), myContext.sampleRate);
        var ary = buffer.getChannelData(0);
        var lam = Math.floor(myContext.sampleRate/860);
        for (var i = 0; i < ary.length; i++) {
             //ary[i] = (i % lam<lam/2?0.1:-0.1)*(i<lam?2:1) ;
             ary[i] = 0; // 無音化
        }
        //console.log(ary);
        var source = myContext.createBufferSource();
        source.buffer = buffer;
        // connect to output (your speakers)
        source.connect(myContext.destination);
        // play the file
        if (source.noteOn) source.noteOn(0);
        else if (source.start) source.start(0);
    },
    getSoundData : function(idx) {
        var soundDataObj = T2MediaLib.soundDataAry[idx];
        if (soundDataObj) {
            return soundDataObj.getDecodedData();
        } else {
            return null;
        }
    },

    // SEメソッド郡 //

    playSE : function(idx, vol, pan, rate, offset, loop, loopStart, loopEnd) {
        if (!T2MediaLib.context) return null;
        var soundData = T2MediaLib.soundDataAry[idx];
        if (soundData == null) return null;
        if (!soundData.isDecodeComplete()) {
            var callbacks = {};
            callbacks.succ = function() {
                T2MediaLib.playSE(idx, vol, pan, rate, offset, loop, loopStart, loopEnd);
            };
            callbacks.err = function() {
            };
            T2MediaLib.decodeSound(idx, callbacks);
            return null;
        }

        var audioBuffer = soundData.decodedData;
        if (!(audioBuffer instanceof AudioBuffer)) return null;

        // 引数チェック
        if (vol == null) {
            vol = 1.0;
        }
        if (pan == null) {
            pan = 0.0;
        }
        if (!rate) rate = 1.0;
        if (!offset) {
            offset = 0;
        } else {
            if      (offset > audioBuffer.duration) offset = audioBuffer.duration;
            else if (offset < 0.0) offset = 0.0;
        }
        if (!loop) loop = false;
        if (!loopStart) {
            loopStart = 0.0;
        } else {
            if      (loopStart < 0.0) loopStart = 0.0;
            else if (loopStart > audioBuffer.duration) loopStart = audioBuffer.duration;
        }
        if (!loopEnd) {
            loopEnd = audioBuffer.duration;
        } else {
            if      (loopEnd < 0.0) loopEnd = 0.0;
            else if (loopEnd > audioBuffer.duration) loopEnd = audioBuffer.duration;
        }

        var source = T2MediaLib.context.createBufferSource();
        T2MediaLib.context.createGain = T2MediaLib.context.createGain || T2MediaLib.context.createGainNode;
        var gainNode = T2MediaLib.context.createGain();
        var panNode = T2MediaLib.context.createPanner();

        source.buffer = audioBuffer;
        source.loop = loop;
        source.loopStart = loopStart;
        source.loopEnd = loopEnd;//audioBuffer.duration;
        source.playbackRate.value = rate;

        // 音量＆パン設定
        source.connect(gainNode);
        gainNode.connect(panNode);
        panNode.connect(T2MediaLib.context.destination);
        panNode.panningModel = "equalpower";
        if      (pan < -1.0) pan = -1.0;
        else if (pan >  1.0) pan =  1.0;
        var panAngle = pan * 90;
        var panX = Math.sin(panAngle * (Math.PI / 180));
        var panZ = -Math.cos(panAngle * (Math.PI / 180));
        if (pan === -1.0 || pan === 1.0) panZ = 0; // 6.123233995736766e-17となるので0にしておく
        if (panNode.positionX) {
            panNode.positionX.value = panX;
            panNode.positionY.value = 0;
            panNode.positionZ.value = panZ;
        } else {
            panNode.setPosition(panX, 0, panZ);
        }
        // 左右どちらかにパンがよると、音量が大きくなるので半減する
        //gainNode.gain.value = vol / (1 + Math.abs(pan));
        // ↑パンはそいうものらしいので、音量はそのままにする
        gainNode.gain.value = vol * T2MediaLib.seMasterVolume * T2MediaLib.masterVolume;

        // ループ開始位置修正
        var offset_adj;
        if (loop && loopEnd - loopStart > 0 && offset > loopEnd) {
            offset_adj = loopEnd;
        } else {
            offset_adj = offset;
        }

        // 変数追加
        source.gainNode = gainNode;
        source.volumeValue = vol;
        source.panNode = panNode;
        source.panValue = pan;
        source.playStartTime = T2MediaLib.context.currentTime;
        source.playOffset = offset_adj;
        source.plusTime = offset_adj;

        // 再生
        source.start = source.start || source.noteOn;
        source.stop  = source.stop  || source.noteOff;

        if (offset) {
            if (loop) source.start(0, offset, 86400);
            else      source.start(0, offset);
        } else {
            source.start(0);
        }

        source.onended = function(event) {
            source.disconnect();
            source.onended = null;
            delete source.gainNode;
            delete source.panNode;
        };

        return source;
    },
    stopSE : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.stop(0);
        return sourceObj;
    },
    getSEMasterVolume : function() {
        return T2MediaLib.seMasterVolume;
    },
    setSEMasterVolume : function(vol) {
        T2MediaLib.seMasterVolume = vol;
    },
    getSEVolume : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return source.volumeValue;
    },
    setSEVolume : function(sourceObj, vol) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.gainNode.gain.value = vol * T2MediaLib.seMasterVolume * T2MediaLib.masterVolume;
        source.volumeValue = vol;
        return sourceObj;
    },
    getSERate : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.playbackRate.value;
    },
    setSERate : function(sourceObj, rate) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.playbackRate.value = rate;
    },
    getSEPan : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.panValue;
    },
    setSEPan : function(sourceObj, pan) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        var panNode = sourceObj.panNode;
        if      (pan < -1.0) pan = -1.0;
        else if (pan >  1.0) pan =  1.0;
        var panAngle = pan * 90;
        var panX = Math.sin(panAngle * (Math.PI / 180));
        var panZ = Math.cos(panAngle * (Math.PI / 180));
        if (pan === -1.0 || pan === 1.0) panZ = 0; // 6.123233995736766e-17となるので0にしておく
        if (panNode.positionX) {
            panNode.positionX.value = panX;
            panNode.positionY.value = 0;
            panNode.positionZ.value = panZ;
        } else {
            panNode.setPosition(panX, 0, panZ);
        }
        sourceObj.panValue = pan;
    },
    isSELoop : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loop;
    },
    setSELoop : function(sourceObj, loop) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loop = loop;
    },
    getSELoopStartTime : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loopStart;
    },
    setSELoopStartTime : function(sourceObj, loopStart) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loopStart = loopStart;
    },
    getSELoopEndTime : function(sourceObj) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        return sourceObj.loopEnd;
    },
    setSELoopEndTime : function(sourceObj, loopEnd) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.loopEnd = loopEnd;
    },

    // BGMメソッド郡 //

    playBGM : function(id, idx, loop, offset, loopStart, loopEnd) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.playBGM(idx, loop, offset, loopStart, loopEnd);
    },
    stopBGM : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.stopBGM();
    },
    pauseBGM : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.pauseBGM();
    },
    resumeBGM : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.resumeBGM();
    },
    getBGMMasterVolume : function() {
        return T2MediaLib.bgmMasterVolume;
    },
    setBGMMasterVolume : function(vol) {
        T2MediaLib.bgmMasterVolume = vol;
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            var bgmPlayer = T2MediaLib.bgmPlayerAry[i];
            if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) continue;
            bgmPlayer.onChangeBGMMasterVolume();
        }
    },
    getBGMVolume : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMVolume();
    },
    setBGMVolume : function(id, vol) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMVolume(vol);
    },
    getBGMTempo : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMTempo();
    },
    setBGMTempo : function(id, tempo) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMTempo(tempo);
    },
    getBGMPan : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMPan();
    },
    setBGMPan : function(id, pan) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMPan(pan);
    },
    isBGMLoop : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.isBGMLoop();
    },
    setBGMLoop : function(id, loop) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMLoop(loop);
    },
    getBGMLoopStartTime : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMLoopStartTime();
    },
    setBGMLoopStartTime : function(id, loopStart) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMLoopStartTime(loopStart);
    },
    getBGMLoopEndTime : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMLoopEndTime();
    },
    setBGMLoopEndTime : function(id, loopEnd) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMLoopEndTime(loopEnd);
    },
    getBGMCurrentTime : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMCurrentTime();
    },
    getBGMLength : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getBGMLength();
    },
    getPlayingBGMName : function(id) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.getPlayingBGMName();
    },
    setOnBGMEndListener : function(id, listener) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setOnBGMEndListener(listener);
    },
    getBGMPlayerMax : function() {
        return T2MediaLib.bgmPlayerMax;
    },
    allStopBGM : function() {
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            T2MediaLib.stopBGM(i);
        }
    },
    allResetBGM : function() {
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            T2MediaLib.stopBGM(i);
            T2MediaLib.setBGMVolume(i, 1.0);
            T2MediaLib.setBGMTempo(i, 1.0);
            T2MediaLib.setBGMPan(i, 0.0);
        }
        T2MediaLib.setMasterVolume(1.0);
        T2MediaLib.setSEMasterVolume(1.0);
        T2MediaLib.setBGMMasterVolume(1.0);
    },

    // Audioメソッド郡 //

    loadAudio : function(idx, url) {
        var audio = new Audio(url);
        audio.play();

        T2MediaLib.audioDataAry.data[idx] = null;

        audio.addEventListener('loadstart', function() {
            if (!T2MediaLib.context) return null;
            var source = T2MediaLib.context.createMediaElementSource(audio);
            source.connect(T2MediaLib.context.destination);
        }, false);

        audio.addEventListener('canplay', function() {
            T2MediaLib.audioDataAry.data[idx] = audio;
        }, false);

        audio.load();

    },
    playAudio : function(idx, loop, startTime) {
        var audio = T2MediaLib.audioDataAry.data[idx];
        if (!audio) return null;
        if (!startTime) startTime = 0;

        if (T2MediaLib.playingAudio instanceof Audio) {
            T2MediaLib.playingAudio.pause();
            T2MediaLib.playingAudio.currentTime = 0;
        }
        T2MediaLib.playingAudio = audio;
        audio.loop = loop;
        audio.volume = T2MediaLib.audioVolume;
        audio.currentTime = startTime;
        audio.play();
        return audio;
    },
    stopAudio : function() {
        var audio = T2MediaLib.playingAudio;
        if (!(audio instanceof Audio)) return null;
        audio.pause();
        audio.currentTime = 0;
        T2MediaLib.playingAudio = null;
        return audio;
    },
    pauseAudio : function() {
        var audio = T2MediaLib.playingAudio;
        if (!audio) return null;
        audio.pause();
        return audio;
    },
    resumeAudio : function() {
        var audio = T2MediaLib.playingAudio;
        if (!audio) return null;
        audio.play();
        return audio;
    },
    setAudioVolume : function(vol) {
        T2MediaLib.audioVolume = vol;
        if (T2MediaLib.playingAudio instanceof Audio) {
            T2MediaLib.playingAudio.volume = vol;
        }
    },
    setAudioTempo : function(tempo) {
        T2MediaLib.audioTempo = tempo;
        if (T2MediaLib.playingAudio instanceof Audio) {
            T2MediaLib.playingAudio.playbackRate = tempo;
        }
    },
    setAudioPosition : function(time) {
        if (T2MediaLib.playingAudio instanceof Audio) {
            T2MediaLib.playingAudio.currentTime = time;
        }
    },
    getAudioData : function(idx) {
        return T2MediaLib.audioDataAry.data[idx];
    },
    getAudioCurrentTime : function() {
        if (!(T2MediaLib.playingAudio instanceof Audio)) return null;
        return T2MediaLib.playingAudio.currentTime;
    },
    getAudioLength : function() {
        if (!(T2MediaLib.playingAudio instanceof Audio)) return null;
        return T2MediaLib.playingAudio.duration;
    }
};
