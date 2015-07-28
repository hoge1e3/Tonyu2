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
};

// BGM関数郡 //

T2MediaLib_BGMPlayer.prototype.playBGM = function(idx, loop, offset, loopStart, loopEnd) {
    if (!T2MediaLib.context) return null;
    var bgm = this.playingBGM;
    if (bgm instanceof AudioBufferSourceNode) bgm.stop(0);
    this.playingBGM = T2MediaLib.playSE(idx, this.bgmVolume, this.bgmTempo, offset, loop, loopStart, loopEnd);
    this.playingBGMName = idx;
    this.bgmPause = 0;
    return this.playingBGM;
};
T2MediaLib_BGMPlayer.prototype.stopBGM = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
    bgm.stop(0);
    this.playingBGM = null;
    return bgm;
};
T2MediaLib_BGMPlayer.prototype.pauseBGM = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
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
};
T2MediaLib_BGMPlayer.prototype.resumeBGM = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
    if (this.bgmPause === 1) {
        bgm = this.playBGM(this.playingBGMName, this.bgmPauseLoop, this.bgmPauseTime, this.bgmPauseLoopStart, this.bgmPauseLoopEnd);
        this.bgmPause = 0;
    }
    return bgm;
};
T2MediaLib_BGMPlayer.prototype.setBGMVolume = function(vol) {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
    this.bgmVolume = vol;
    T2MediaLib.setSEVolume(bgm, vol);
};
T2MediaLib_BGMPlayer.prototype.setBGMTempo = function(tempo) {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;

    if (this.bgmPause === 0) {
        bgm.plusTime -= (T2MediaLib.context.currentTime - bgm.playStartTime) * (tempo - this.bgmTempo);
    }
    this.bgmTempo = tempo;
    T2MediaLib.setSERate(bgm, tempo);
};
T2MediaLib_BGMPlayer.prototype.getBGMCurrentTime = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
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
};
T2MediaLib_BGMPlayer.prototype.getBGMLength = function() {
    var bgm = this.playingBGM;
    if (!(bgm instanceof AudioBufferSourceNode)) return null;
    return bgm.buffer.duration;
};



// ライブラリ本体 //

// T2MediaLib //

var T2MediaLib = {
    context : null,

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
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status=== 0 /*@hoge1e3 for node-webkit base64url */) {
                var arrayBuffer = xhr.response;
                if (arrayBuffer instanceof ArrayBuffer) {
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
                            console.log('T2MediaLib: '+error.message);
                        } else {
                            console.log('T2MediaLib: Error decodeAudioData()');
                        }
                        T2MediaLib.seDataAry.data[idx] = -4;
                        if (callbacks && callbacks.err) callbacks.err(idx,T2MediaLib.seDataAry.data[idx]);//@hoge1e3
                    };
                    T2MediaLib.context.decodeAudioData(arrayBuffer, successCallback, errorCallback);
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
    	     ary[i] = (i % lam<lam/2?0.1:-0.1)*(i<lam?2:1) ;
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

        gainNode.gain.value = vol * vol;

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
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.stop(0);
        return sourceObj;
    },
    setSEVolume : function(sourceObj, vol) {
        if (!(sourceObj instanceof AudioBufferSourceNode)) return null;
        sourceObj.gainNode.gain.value = vol * vol;
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

// 旧名。そのうち消す
//T2SoundLib = T2MediaLib;



// テスト
//'http://jsrun.it/assets/c/X/4/S/cX4S7.ogg'
//'http://jsrun.it/assets/5/Z/s/x/5ZsxE.ogg'

//alert((!window.hasOwnProperty('webkitAudioContext'))+" "+(window.webkitAudioContext.prototype.createGain===undefined));

//T2MediaLib.init();


//playSE : function(idx, vol, rate, offset, loop, loopStart, loopEnd) {
//T2MediaLib.loadSE('test','http://jsrun.it/assets/5/Z/s/x/5ZsxE.ogg');
//setTimeout(function(){ bgm1 = T2MediaLib.playSE('test', 1.0, 1.0, 0, true, 0, 0); }, 500);
//setTimeout(function(){ T2MediaLib.stopSE(bgm1); }, 5000);

/*
//playSE : function(idx, vol, rate, offset, loop, loopStart, loopEnd) {
T2MediaLib.loadSE('test','http://jsrun.it/assets/c/X/4/S/cX4S7.ogg');
setTimeout(function(){ bgm1 = T2MediaLib.playSE('test', 1.0, 1.1, 8, true, 12, 19); }, 500);
setTimeout(function(){ bgm1.playbackRate.value = 1.2; }, 5000);
setTimeout(function(){ bgm1.stop(); }, 6000);
setTimeout(function(){ T2MediaLib.playSE('test'); }, 7000);
//setTimeout(function(){ T2MediaLib.stopSE(bgm1); }, 5000);
*/
/*
T2MediaLib.loadAudio('test','http://jsrun.it/assets/c/X/4/S/cX4S7.ogg');
T2MediaLib.loadAudio('test2','http://jsrun.it/assets/q/S/1/C/qS1Ch.ogg');
setTimeout(function(){ T2MediaLib.playAudio('test'); }, 5000);
setTimeout(function(){ T2MediaLib.playAudio('test2'); }, 1000);
setTimeout(function(){ T2MediaLib.playAudio('test', true, 11.5); console.log(T2MediaLib.getAudioCurrentTime()); console.log(T2MediaLib.getAudioLength());}, 1050);
setTimeout(function(){ T2MediaLib.setAudioTempo(1.5); }, 3000);
setTimeout(function(){ T2MediaLib.setAudioVolume(0.5); }, 6000);
setTimeout(function(){ T2MediaLib.setAudioPosition(20); }, 7000);
setTimeout(function(){ T2MediaLib.stopAudio(); }, 10000);
*/


