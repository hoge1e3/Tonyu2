// forked from makkii_bcr's "T2MediaLib" http://jsdo.it/makkii_bcr/3ioQ
// T2MediaLib_BGMPlayer //

var T2MediaLib_BGMPlayer = function(arg_id) {
    this.id = arg_id;
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
    this.picoAudio = null;
    this.PICO_AUDIO_VOLUME_COEF = 0.2;
};

// BGM関数郡 //

T2MediaLib_BGMPlayer.prototype.playBGM = function(idx, loop, offset, loopStart, loopEnd) {
    if (!T2MediaLib.context) return null;
    this.stopBGM();

    var audioBuffer = T2MediaLib.seDataAry.data[idx];
    if (audioBuffer instanceof AudioBuffer) {
        // MP3, Ogg, ACC
        this.playingBGM = T2MediaLib.playSE(idx, this.bgmVolume, this.bgmTempo, offset, loop, loopStart, loopEnd);
    } else if (audioBuffer instanceof Object) {
        // Midi
        if (this.picoAudio == null) {
            this.picoAudio = new PicoAudio(T2MediaLib.context); // AudioContextオブジェクトがmax6つまで？なので使いまわす
        }
        this.picoAudio.setData(audioBuffer);
        this.picoAudio.setLoop(loop);
        this.picoAudio.setGlobalVolume(this.PICO_AUDIO_VOLUME_COEF * this.bgmVolume);
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
    return this.playingBGM;
};
T2MediaLib_BGMPlayer.prototype.stopBGM = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        bgm.stop();
        this.playingBGM = null;
        return bgm;
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, ACC
        bgm.stop(0);
        this.playingBGM = null;
        return bgm;
    }
    return null;
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
        return bgm;
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, ACC
        if (this.bgmPause === 0) {
            this.bgmPauseTime = this.getBGMCurrentTime();
            this.bgmPauseLoopStart = bgm.loopStart;
            this.bgmPauseLoopEnd = bgm.loopEnd;
            this.bgmPauseLoop = bgm.loop;
            this.bgmPauseCurrentTime = bgm.context.currentTime;
            this.bgmPauseTempo = T2MediaLib.bgmTempo;
            bgm.stop(0);
            this.bgmPause = 1;
        }
        return bgm;
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.resumeBGM = function() {
    var bgm = this.playingBGM;
    if (bgm instanceof PicoAudio) {
        // Midi
        if (this.bgmPause === 1) {
            bgm.play();
            this.bgmPause = 0;
        }
        return bgm;
    } else if (bgm instanceof AudioBufferSourceNode) {
        // MP3, Ogg, ACC
        if (this.bgmPause === 1) {
            bgm = this.playBGM(this.playingBGMName, this.bgmPauseLoop, this.bgmPauseTime, this.bgmPauseLoopStart, this.bgmPauseLoopEnd);
            this.bgmPause = 0;
        }
        return bgm;
    }
    return null;
};
T2MediaLib_BGMPlayer.prototype.setBGMVolume = function(vol) {
    var bgm = this.playingBGM;
    this.bgmVolume = vol;
    if (this.picoAudio) {
        // Midi
        this.picoAudio.setGlobalVolume(this.PICO_AUDIO_VOLUME_COEF * vol);
    }
    // MP3, Ogg, ACC
    T2MediaLib.setSEVolume(bgm, vol);
};
T2MediaLib_BGMPlayer.prototype.setBGMTempo = function(tempo) {
    // MP3, Ogg, ACC
    var bgm = this.playingBGM;

    if ((bgm instanceof AudioBufferSourceNode) && this.bgmPause === 0) {
        bgm.plusTime -= (T2MediaLib.context.currentTime - bgm.playStartTime) * (tempo - this.bgmTempo);
    }
    this.bgmTempo = tempo;
    T2MediaLib.setSERate(bgm, tempo);
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
        // MP3, Ogg, ACC
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
        // MP3, Ogg, ACC
        return bgm.buffer.duration;
    }
    return null;
};



// ライブラリ本体 //

// T2MediaLib //

var T2MediaLib = {
    context : null,
    picoAudio : null,

    seDataAry : {
        data : []
    },

    bgmPlayerMax : 16,
    bgmPlayerAry : [],
    playingBGM : null,
    playingBGMName : null,
    bgmPause : 0,
    bgmPauseTime : 0,
    bgmPauseCurrentTime : 0,
    bgmPauseTempo : 0,
    bgmPauseLoop : false,
    bgmPauseLoopStart : 0,
    bgmPauseLoopEnd : 0,
    bgmVolume : 1.0,
    bgmTempo : 1.0,

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
        }
    },

    // CLEAR系関数 //
    allClearData : function() {
        var dataAry = T2MediaLib.seDataAry.data;
        for (var data in dataAry) {
            delete dataAry[data];
        }
    },
    clearData : function(idx) {
        var dataAry = T2MediaLib.seDataAry.data;
        delete dataAry[idx];
    },


    // SEメソッド郡 //
    loadSEFromArray: function (idx, array) {
        var ctx=T2MediaLib.context;
        var myArrayBuffer = ctx.createBuffer(
            1, array.length, ctx.sampleRate);
        var nowBuffering = myArrayBuffer.getChannelData(0);
        for (var i = 0; i < array.length ; i++) {
             nowBuffering[i] = array[i];
        }
        //var source = ctx.createBufferSource();
        // set the buffer in the AudioBufferSourceNode
        //source.buffer = myArrayBuffer;
        T2MediaLib.seDataAry.data[idx]=myArrayBuffer;//source;
    },
    loadSE : function(idx, url, callbacks) { //@hoge1e3
        if (!T2MediaLib.context || T2MediaLib.disabled) {
            T2MediaLib.seDataAry.data[idx] = -1;
            return null;
        }
        if (typeof WebSite=="object" && WebSite.mp3Disabled) {
            url=url.replace(/\.(mp3|mp4|m4a)$/,".ogg");
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status=== 0 /*@hoge1e3 for node-webkit base64url */) {
                var arrayBuffer = xhr.response;
                if (arrayBuffer instanceof ArrayBuffer) {
                    // xhr.responseURL が実装されていないブラウザがあるので使わない
                    var url = xhr.t2MediaLib_requestURL;
                    if (url.match(/\.(midi?)$/)) {
                        // Midi
                        // PicoAudio.jsにデコードしてもらう
                        if (T2MediaLib.picoAudio == null) {
                            T2MediaLib.picoAudio = new PicoAudio(T2MediaLib.context);
                        }
                        var smf = new Uint8Array(arrayBuffer);
                        var data = T2MediaLib.picoAudio.parseSMF(smf);
                        console.log(data);
                        T2MediaLib.seDataAry.data[idx] = data;
                        if (callbacks && callbacks.succ) callbacks.succ(idx);
                    } else {
                        // MP3, Ogg, ACC
                        var successCallback = function(audioBuffer) {
                            /*
                            window.alert('Success : ' +
                                         'sampleRate:' + audioBuffer.sampleRate + '\n' +
                                         'length:' + audioBuffer.length + '\n' +
                                         'duration:' + audioBuffer.duration + '\n' +
                                         'numberOfChannels:' + audioBuffer.numberOfChannels + '\n');
                            */
                            T2MediaLib.seDataAry.data[idx] = audioBuffer;
                            if (callbacks && callbacks.succ) callbacks.succ(idx);//@hoge1e3
                        };
                        var errorCallback = function(error) {
                            if (error instanceof Error) {
                                console.log('T2MediaLib: '+error.message,url);
                            } else {
                                console.log('T2MediaLib: Error decodeAudioData()',url);
                            }
                            T2MediaLib.seDataAry.data[idx] = -4;
                            if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.seDataAry.data[idx]);//@hoge1e3
                        };
                        T2MediaLib.context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
                    }
                } else {
                    T2MediaLib.seDataAry.data[idx] = -3;
                    if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.seDataAry.data[idx]);//@hoge1e3
                }
            } else {
                T2MediaLib.seDataAry.data[idx] = -2;
                if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.seDataAry.data[idx]);//@hoge1e3
            }
        };
        xhr.onerror=function (e) {//@hoge1e3
            if (callbacks && callbacks.err) callbacks.err(idx,e+"");
        };
        T2MediaLib.seDataAry.data[idx] = null;
        if (url.match(/^data:/) && Util && Util.Base64_To_ArrayBuffer) {//@hoge1e3
            xhr={onload:xhr.onload};
            xhr.t2MediaLib_requestURL = url;
            xhr.response=Util.Base64_To_ArrayBuffer( url.replace(/^data:audio\/[a-zA-Z0-9]+;base64,/i,""));
            xhr.status=200;
            xhr.onload();
        } else {
            xhr.t2MediaLib_requestURL = url;
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';  // XMLHttpRequest Level 2
            xhr.send(null);
        }
        //setTimeout(T2MediaLib.activate.bind(T2MediaLib),0);
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
    playSE : function(idx, vol, rate, offset, loop, loopStart, loopEnd) {
        if (!T2MediaLib.context) return null;
        var audioBuffer = T2MediaLib.seDataAry.data[idx];
        if (!(audioBuffer instanceof AudioBuffer)) return null;

        // 引数チェック
        if (vol === null) {
            vol = 1;
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

        source.buffer = audioBuffer;

        source.loop               = loop;
        source.loopStart          = loopStart;
        source.loopEnd            = loopEnd;//audioBuffer.duration;
        source.playbackRate.value = rate;

        // 通常ノード接続
        //source.connect(T2MediaLib.context.destination);

        // 音量変更できるようノード接続
        source.connect(gainNode);
        gainNode.connect(T2MediaLib.context.destination);

        // ループ開始位置修正
        var offset_adj;
        if (loop && loopEnd - loopStart > 0 && offset > loopEnd) {
            offset_adj = loopEnd;
        } else {
            offset_adj = offset;
        }

        // 変数追加
        source.gainNode = gainNode;
        source.playStartTime = T2MediaLib.context.currentTime;
        source.playOffset = offset_adj;
        source.plusTime = offset_adj;

        // 再生
        source.start = source.start || source.noteOn;
        source.stop  = source.stop  || source.noteOff;

        gainNode.gain.value = vol;

        if (offset) {
            if (loop) source.start(0, offset, 86400);
            else      source.start(0, offset);
        } else {
            source.start(0);
        }

        source.onended = function(event) {
            //console.log('"on' + event.type + '" event handler !!');
            //source.stop(0);

            delete source.gainNode;
            //delete source.playStartTime;
            //delete source.playOffset;
            //delete source.plusTime;

            source.onended = null;
        };
        //console.log(source);
        return source;
    },
    stopSE : function(sourceObj) {
        if ((sourceObj instanceof PicoAudio)) {
            // Midi
            T2MediaLib.picoAudio.stop();
            return T2MediaLib.picoAudio;
        }
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.stop(0);
        return sourceObj;
    },
    setSEVolume : function(sourceObj, vol) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.gainNode.gain.value = vol;
    },
    setSERate : function(sourceObj, rate) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.playbackRate.value = rate;
    },
    getSEData : function(idx) {
        return T2MediaLib.seDataAry.data[idx];
    },


    // BGMメソッド郡 //

    loadBGM : function(idx, url, callbacks) {
        return T2MediaLib.loadSE(idx, url, callbacks);
    },
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
    setBGMVolume : function(id, vol) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMVolume(vol);
    },
    setBGMTempo : function(id, tempo) {
        if (id < 0 || T2MediaLib.bgmPlayerMax <= id) return null;
        var bgmPlayer = T2MediaLib.bgmPlayerAry[id];
        if (!(bgmPlayer instanceof T2MediaLib_BGMPlayer)) return null;
        return bgmPlayer.setBGMTempo(tempo);
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
    getBGMData : function(idx) {
        return T2MediaLib.getSEData(idx);
    },
    getBGMPlayerMax : function() {
        return T2MediaLib.bgmPlayerMax;
    },
    allStopBGM : function() {
        for (var i=0; i<T2MediaLib.bgmPlayerMax; i++) {
            T2MediaLib.stopBGM(i);
        }
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
