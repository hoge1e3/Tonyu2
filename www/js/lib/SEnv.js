define("SEnv", ["Klass", "assert"], function(Klass, assert) {
    //--- Also in M2Parser
    var Ses = 10,
        Chs = 10,
        Regs = Chs * 3,
        WvElC = 32,
        EnvElC = 32,
        WvC = 96,
        wdataSize = 48000,  // should be dividable by 120
        //   99=r 100=vol 101=ps (x*128)  255=end
        MRest = 99,
        MVol = 100,
        Mps = 101,
        MSelWav = 102,
        MTempo = 103,
        MJmp = 104,
        MSlur = 105,
        MPor = 106,
        MSelEnv = 107,
        MWait = 108,
        MCom = 109,
        MDet = 110,
        MWOut = 111,
        MWEnd = 112,
        MWrtWav = 113,
        MWrtEnv = 114,
        MLfo = 115,
        MSync = 116,
        MPCMReg = 117,
        MLfoD = 118,
        MBaseVol = 119,
        MLabel = 120,

        Mend = 255,

        //sync=0:非同期、1:同期、2:ワンショット 3:鋸波形
        LASync = 0,
        LSync = 1,
        LOneShot = 2,
        LSaw = 3,

        Envs = 16,
        PCMWavs = 16, // 96-111
        FadeMax = 256,

        div = function(x, y) {
            return Math.trunc(chkn(x,"x") / chkn(y,"y") );
        },
        chkn = function (x,mesg) {
            if (x!==x) throw new Error(mesg+": Not a number!");
            if (typeof x!=="number") {console.error(x);throw new Error(mesg+": Not a not a number but not a number!");}
            return x;
        },
        abs = Math.abs.bind(Math),
        ShortInt = function(b) {
            return b >= 128 ? b - 256 : b;
        },
        StrPas=function (ary,idx) {
            var a=[];
            for (var i=idx;ary[i];i++) {
                a.push(ary[i]);
            }
            return a;
        },
        array2Int= function (ary,idx) {
            var r=ary[idx];
            r+=ary[idx+1]*0x100;
            r+=ary[idx+2]*0x10000;
            r+=ary[idx+3]*0x1000000;
            if (r>=0x80000000) r-=0x100000000;
            return r;
        },
        Integer = Number,
        sinMax_s = 5,
        sinMax = 65536 >> sinMax_s, //2048,
        /*SPS = 44100,
        SPS96 = 22080,
        SPS_60 = div(44100, 60),*/
        DivClock = 111860.78125,
        Loops = 163840,
//---------End include
        m2t = [0xd5d, 0xc9c, 0xbe7, 0xb3c, 0xa9b, 0xa02, 0x973, 0x8eb, 0x86b, 0x7f2, 0x780, 0x714,
            0x6af, 0x64e, 0x5f4, 0x59e, 0x54e, 0x501, 0x4ba, 0x476, 0x436, 0x3f9, 0x3c0, 0x38a,
            0x357, 0x327, 0x2fa, 0x2cf, 0x2a7, 0x281, 0x25d, 0x23b, 0x21b, 0x1fd, 0x1e0, 0x1c5,
            0x1ac, 0x194, 0x17d, 0x168, 0x153, 0x140, 0x12e, 0x11d, 0x10d, 0xfe, 0xf0, 0xe3,
            0xd6, 0xca, 0xbe, 0xb4, 0xaa, 0xa0, 0x97, 0x8f, 0x87, 0x7f, 0x78, 0x71,
            0x6b, 0x65, 0x5f, 0x5a, 0x55, 0x50, 0x4c, 0x47, 0x43, 0x40, 0x3c, 0x39,
            0x35, 0x32, 0x30, 0x2d, 0x2a, 0x28, 0x26, 0x24, 0x22, 0x20, 0x1e, 0x1c,
            0x1b, 0x19, 0x18, 0x16, 0x15, 0x14, 0x13, 0x12, 0x11, 0x10, 0xf, 0xe
        ],
        Trunc = Math.trunc.bind(),
        stEmpty = -1,
        stFreq = 1,
        stVol = 2,
        stWave = 3,
        sndElemCount = 64,
        //type
        /*TSoundElem = Klass.define({
            $fields: {
                time: Integer,
                typ: Integer,
                val: Integer
            }
        }),*/
        nil = null,
        False = false,
        True = true,
        //TPlayState = (psPlay,psStop,psWait,psPause);
        psPlay = "psPlay",
        psStop = "psStop",
        psWait = "psWait",
        psPause = "psPause",
        m2tInt=[], //:array[0..95] of Integer;
        sinT = [], //:array [0..sinMAX-1] of ShortInt;
        TTL, //:Integer;
        cnt; //:Integer;// debug
    var defs;
    var TEnveloper = Klass.define(defs={ //class (TSoundGenerator)
        $this: "t",
        $fields: {
            //BSize: Integer,
            Pos: Integer,
            PrevPos: Integer,
            RPos: Integer,
            //WriteAd: Integer,
            SccCount: Array, // [0..Chs-1] of Integer;
            Steps: Array, // [0..Chs-1] of integer;
            SccWave: Array, // [0..Chs-1] of PChar;
            WaveDat: Array, // [0..WvC-1,0..WvElC-1] of Byte;
            //RefreshRate: Number, //longint,//;
            //RRPlus: Integer,
            //PosPlus: Integer, //;
            wdata2: Array,//array[0..wdataSize-1] of SmallInt;

            BeginPlay: Boolean,
            SeqTime: Integer,
            SeqTime120: Integer,

            WavOutMode: Boolean,
            //WavPlaying: Boolean,
            /*{$ifdef ForM2}
            WavOutObj:TWaveSaver,
            {$endif}*/
            EShape: Array, // [0..Chs-1] of PChar,
            EVol: Array,
            EBaseVol: Array,
            ESpeed: Array,
            ECount: Array, // [0..Chs-1] of Word,
            Oct: Array, // [0..Chs-1] of Byte,
            MCount: Array, // [0..Chs-1] of Integer,
            MPoint: Array, // [0..Chs-1] of PChar,
            MPointC: Array, // [0..Chs-1] of Integer,
            Resting: Array, // [0..Chs-1] of Boolean,
            PlayState: Array, // [0..Chs-1] of TPlayState,
            Slur: Array,
            Sync: Array, // [0..Chs-1] of Boolean,
            Detune: Array, // [0..Chs-1] of Integer,
            PorStart: Array,
            PorEnd: Array,
            PorLen: Array, // [0..Chs-1] of Integer,
            LfoV: Array,
            LfoA: Array,
            LfoC: Array,
            LfoD: Array,
            LfoDC: Array,
            LfoSync: Array, // [0..Chs-1] of Integer,
            //sync=0:非同期、1:同期、2:ワンショット 3:鋸波形
            Fading: Integer,

            CurWav: Array, // [0..Chs-1] of Integer,
            L2WL: Array, // [0..Chs-1] of Integer,
            // log 2 WaveLength
            PCMW: Array, // [0..PCMWavs-1] of TWavLoader,

            Delay: Integer,

            Tempo: Integer,
            ComStr: String,
            WFilename: String,

            EnvDat: Array, // [0..Envs-1,0..EnvElC-1] of Byte,

            WriteMaxLen: Integer,
            soundMode: Array // [0..chs-1] of Boolean,
        },
        load:function (t,d) {
            var ver=readLong(d);
            var chs=readByte(d);
            t.MPoint=chdatas=[];
            for (var i=0;i<chs;i++) {
                var chdata=[];
                chdatas.push(chdata);
                var len=readLong(d);
                //console.log(len);
                //if(len>999999) throw new Error("LONG");
                for (var j=0;j<len;j++) {
                    chdata.push(readByte(d));
                }
            }
            function readByte(a) {
                if (a.length==0) throw new Error("Out of data");
                return a.shift();
            }
            function readLong(a) {
                if (a.length<4) throw new Error("Out of data");
                var r=a.shift(),e=1;
                e<<=8;
                r+=a.shift()*e;
                e<<=8;
                r+=a.shift()*e;
                e<<=8;
                r+=a.shift()*e;
                return r;
            }
        },
        loadWDT: function (t,url) {
            if (!url) {
                return requirejs(["Tones.wdt"],function (u) {
                    t.loadWDT(u);
                });
            }
            var oReq = new XMLHttpRequest();
            oReq.open("GET", url, true);
            oReq.responseType = "arraybuffer";
            oReq.onload = function (oEvent) {
                var arrayBuffer = oReq.response;
                if (arrayBuffer) {
                    var b = new Uint8Array(arrayBuffer);
                    console.log("Loading wdt",b.length);
                    //WaveDat
                    var idx=0;
                    for (var i = 0; i < 96; i++) {//WvC
                        for (var j=0;j<32;j++) {
                            t.WaveDat[i][j]=b[idx++];
                        }
                    }
                    //EnvDat
                    for (var i=0 ;i<16;i++) {//Envs
                        for (var j=0;j<32;j++) {
                            t.EnvDat[i][j]=b[idx++];
                        }
                    }
                    console.log("Loading wdt done");
                }
            };
            oReq.send(null);
        },
        getPlayPos: function () {
            var ti=this.context.currentTime- this. playStartTime;
            var tiSamples=Math.floor(ti*this.sampleRate);
            return tiSamples % wdataSize;
        },
        setSound: function(t, ch /*:Integer;*/ , typ /*:Integer;*/ , val /*:Integer*/ ) {
            t.soundMode[ch] = True;
            switch (typ) {
                case stFreq:
                    t.Steps[ch] = val;
                    break;
                case stVol:
                    t.EVol[ch] = val;
                    break;
            }
        },
        // all interger
        /*setSoundTime: function(t, ch, typ, val, time) {
            var e; //:^TSoundElem;
            t.soundMode[ch] = True; // TODO: ほんとはまずい(t が遠い未来のばあい）
            e = t.sndElems[ch][t.nextPokeElemIdx[ch]];
            e.time = time;
            e.typ = typ;
            e.val = val;
            t.nextPokeElemIdx[ch] = (t.nextPokeElemIdx[ch] + 1) % sndElemCount;
        },*/
        InitSin: function(t) {
            var i; //:Integer;
            for (i = 0; i < sinMax; i++) {
                sinT[i] = Math.trunc(Math.sin(3.1415926 * 2 * i / sinMax) * 127);
            }
        },
        InitEnv: function(t) {
            var i, j; //:Integer;
            t.EnvDat=[];
            for (i = 0; i < Envs; i++) {
                t.EnvDat[i]=[];
                for (j = 0; j < EnvElC; j++) {
                    t.EnvDat[i][j] = Math.floor((EnvElC - 1 - j) / 2);
                }
            }
        },
        ConvM2T: function(t) {
            var i; //:Integer;
            m2tInt=[];
            for (i = 0; i < 96; i++) {
                m2tInt[i] = Math.trunc(DivClock * 65536 / m2t[i] * 65536 / t.sampleRate);
            }
        },
        InitWave: function(t) {
            var i, j;
            t.WaveDat=[];
            for (i = 0; i < WvC; i++) {
                t.WaveDat[i]=[];
                for (j = 0; j < WvElC / 2; j++) {
                    t.WaveDat[i][j] = 103;
                    t.WaveDat[i][j + div(WvElC, 2)] = 153;
                }
            }
        },

        $: function(t,context,options) {
            var i, j; //:Integer;
            options=options||{};
            t.useScriptProcessor=options.useScriptProcessor;
            t.useFast=options.useFast;
            t.resolution=options.resolution||120;
            t.context=context;
            t.sampleRate = t.context.sampleRate;
            //t.initNode({});
            //t.WavPlaying=false;
            // inherited Create (Handle);
            t.Delay = 2000;
            t.Pos = t.PrevPos = t.RPos = /*t.WriteAd =*/ t.SeqTime =
            t.SeqTime120 = 0;
            t.BeginPlay=false;
            t.InitWave();
            t.InitEnv();
            t.InitSin();
            t.ConvM2T();
            t.wdata2=[];
            t.PCMW=[];
            t.L2WL=[];
            t.Sync=[];
            t.ECount=[];
            t.MCount=[];
            for (i = 0; i < PCMWavs; i++) {
                t.PCMW[i] = nil;
            }
            t.Steps = [];
            t.SccWave = [];
            t.SccCount = [];
            t.EShape = []; //=t.EnvDat[0];
            t.EVol = [];
            t.EBaseVol = [];
            t.MPoint = [];
            t.MPointC = [];
            t.ESpeed = [];
            t.PlayState = [];
            t.Detune = [];
            t.LfoV = [];
            t.LfoD = [];
            t.LfoDC = [];
            t.PorStart=[];
            t.PorEnd=[];
            t.PorLen=[];
            //t.nextPokeElemIdx = [];
            //t.nextPeekElemIdx = [];
            t.soundMode = [];
            t.CurWav=[];
            t.Oct=[];
            t.Resting=[];
            t.Slur=[];
            t.Sync=[];
            t.LfoV=[];t.LfoA=[];t.LfoC=[];t.LfoD=[];t.LfoDC=[];t.LfoSync=[];
            for (i = 0; i < Chs; i++) {
                t.LfoV[i]=0;t.LfoA[i]=0;t.LfoC[i]=0;t.LfoD[i]=0;t.LfoDC[i]=0;t.LfoSync[i]=0;
                t.Slur[i]=t.Sync[i]=0;
                t.PorStart[i]=t.PorEnd[i]=t.PorLen[i]=0;
                t.ECount[i]=0;
                t.MCount[i]=0;
                t.Resting[i]=0;
                t.Steps[i] = 0;
                t.SccWave[i] = t.WaveDat[0];
                t.SccCount[i] = 0;
                t.EShape[i] = t.EnvDat[0];
                t.EVol[i] = 0;
                t.EBaseVol[i] = 128;
                t.MPoint[i] = nil;
                t.MPointC[i] = 0;
                t.ESpeed[i] = 5;
                t.PlayState[i] = psStop;
                t.Detune[i] = 0;
                t.LfoV[i] = 0;
                t.SelWav(i, 0);
                t.LfoD[i] = 0;
                t.LfoDC[i] = 0;
                t.Oct[i] = 4;
                //t.nextPokeElemIdx[i] = 0;
                //t.nextPeekElemIdx[i] = 0;
                t.soundMode[i] = False;
            }
            /*for i=0 to Ses-1 ) {
                 SeLen[i]=0;
             end;*/
            t.Fading = FadeMax;
            t.timeLag = 2000;

            t.WriteMaxLen = 20000;
            t.WavOutMode = False;
            t.label2Time=[];
            t.PC2Time=[];// only ch:0
            t.WFilename = '';
            /* {$ifdef ForM2}
            t.WavOutObj=nil;
             {$endif}*/
            t.Tempo = 120;
            t.ComStr = '';
            t.performance={writtenSamples:0, elapsedTime:0};
            t.loadWDT();
        },
        /*initNode: function (t,options) {
            var channel=1;
            options=options||{};
            for (var i in options) this[i]=options[i];
            if (typeof (webkitAudioContext) !== "undefined") {
                this.context = new webkitAudioContext();
            } else if (typeof (AudioContext) !== "undefined") {
                this.context = new AudioContext();
            }
            this.sampleRate = this.context.sampleRate;
            this.buf = this.context.createBuffer(channel, wdataSize, this.sampleRate);
        },*/
        getBuffer: function (t) {
            var channel=1;
            if (this.buf) return this.buf;
            this.buf = this.context.createBuffer(channel, wdataSize, this.sampleRate);
            return this.buf;
        },
        playNode: function (t) {
            if (this.isSrcPlaying) return;
            var source = this.context.createBufferSource();
            // AudioBufferSourceNodeにバッファを設定する
            source.buffer = this.getBuffer();
            // AudioBufferSourceNodeを出力先に接続すると音声が聞こえるようになる
            if (typeof source.noteOn=="function") {
                source.noteOn(0);
                //source.connect(this.node);
            }
            source.connect(this.context.destination);
            // 音源の再生を始める
            source.start();
            source.loop = true;
            source.playStartTime = this.playStartTime = this.context.currentTime;
            this.bufSrc=source;
            this.isSrcPlaying = true;
        },
        startRefreshLoop: function (t) {
            if (t.refreshTimer!=null) return;
            var grid=t.resolution;
            var data=t.getBuffer().getChannelData(0);
            var WriteAd=0;
            for (var i=0;i<wdataSize;i+=grid) {
                t.refreshPSG(data,i,grid);
            }
            function refresh() {
                if (!t.isSrcPlaying) return;
                var cnt=0;
                var playPosZone=Math.floor(t.getPlayPos()/grid);
                while (true) {
                    if (cnt++>wdataSize/grid) throw new Error("Mugen "+playPosZone);
                    var writeAdZone=Math.floor(WriteAd/grid);
                    if (playPosZone===writeAdZone) break;
                    t.refreshPSG(data,WriteAd,grid);
                    WriteAd=(WriteAd+grid)%wdataSize;
                }
            }
            t.refreshTimer=setInterval(refresh,16);
        },
        stopRefreshLoop: function (t) {
            if (t.refreshTimer==null) return;
            clearInterval(t.refreshTimer);
            delete t.refreshTimer;
        },
        stopNode : function (t) {
            if (!this.isSrcPlaying) return;
            this.bufSrc.stop();
            this.isSrcPlaying = false;
        },
        //PutEnv (c,t,v,sp:Word;s:PChar);
        /*PutEnv: function(t, c, time, v, sp, s) {
            t.Sound[c * 2] = time & 255;
            t.Sound[c * 2 + 1] = div(time, 256);
            t.EVol[c] = v;
            t.ESpeed[c] = sp;
            t.ECount[c] = 0;
            t.EShape[c] = s;
        },*/
        //procedure TEnveloper.Play1Sound (c,n:Word;iss:Boolean);
        Play1Sound: function(t, c, n, iss) {
            var TP; //:Integer;
            if (t.soundMode[c]) return; // ) return;
            if (n == MRest) {
                t.Resting[c] = True;
                return;
            }
            if ((c < 0) || (c >= Chs) || (n < 0) || (n > 95)) return; // ) return;
            t.Resting[c] = False;
            if (!iss) {
                t.ECount[c] = 0;
                if (t.Sync[c]) t.SccCount[c] = 0;
                if (t.LfoSync[c] != LASync) t.LfoC[c] = 0;
            }
            if (t.CurWav[c] < WvC) {
                t.Steps[c] = m2tInt[n] + t.Detune[c] * div(m2tInt[n], 2048);
                // m2tInt*(1+Detune/xx)    (1+256/xx )^12 =2  1+256/xx=1.05946
                //    256/xx=0.05946   xx=256/0.05946  = 4096?
            } else {
                if (t.L2WL[c] >= 2) {
                    //Steps[c]:=($40000000 shr (L2WL[c]-2)) div (m2tInt[36] div 65536) * (m2tInt[n] div 65536);
                    t.Steps[c] = div(0x40000000 >>> (t.L2WL[c] - 2), div(m2tInt[36], 65536)) * div(m2tInt[n], 65536);
                }
            }
            t.PorLen[c] = -1;
        },
        //    procedure TEnveloper.Play1Por (c,f,t:Word;iss:Boolean);
        Play1Por: function (t,c,from,to,iss) {
             var TP=0//:Intege;
             if ((c<0)  ||  (c>=Chs)  ||  (to<0)  ||  (to>95) ||
                (from<0)  ||  (from>95) ) return;
             t.Resting[c]=False;

             //TP=m2t[f];
             t.PorStart[c]=m2tInt[from]+t.Detune[c]*div(m2tInt[from] , 2048);//Trunc (DivClock/TP*65536/t.sampleRate)+Detune[c];
             //TP=m2t[to];
             t.PorEnd[c]=m2tInt[to]+t.Detune[c]*div(m2tInt[to] , 2048);//Trunc (DivClock/TP*65536/t.sampleRate)+Detune[c];
             if  (!iss) t.ECount[c]=0;

        },
        //procedure TEnveloper.PlayMML (c:Word;s:PChar);
        /*PlayMML: function(t, c, s) { // s array of compiled mml (bytearray)
            if ((c < 0) || (c >= Chs)) return; // ) return;
            t.MPoint[c] = s;
            t.MPointC[c] = 0;
            t.PlayState[c] = psPlay;
            t.MCount[c] = t.SeqTime;
            //t.LoopCount = Loops + 1;
        },*/
        //procedure TEnveloper.StopMML (c:Integer);
        StopMML: function(t, c) {
            if ((c < 0) || (c >= Chs)) return; // ) return;
            //MPoint[c]=nil;
            t.WaitMML(c);
            t.PlayState[c] = psStop;
            t.MCount[c] = t.SeqTime + 1;
        },
        allWaiting: function (t) {
            for(var i=0;i<Chs;i++) {
                if (t.PlayState[i] == psPlay) {
                    return false;
                }
            }
            return true;
        },
        handleAllState: function (t) {
            var allWait=true,allStop=true;
            for(var i=0;i<Chs;i++) {
                switch (t.PlayState[i]) {
                case psPlay:
                    allWait=false;
                case psWait:
                    allStop=false;
                    break;
                }
            }
            //          alw     als
            // P        F       F
            // W        T       F
            // S        T       T
            // P,W      F       F
            // W,S      T       F
            // S,P      F       F
            // P,W,S    F       F
            if (allWait && !allStop) {
                for(var i=0;i<Chs;i++) {
                    t.RestartMML(i);
                }
            }
            return allStop;
        },
        allStopped: function (t) {
            for(var i=0;i<Chs;i++) {
                if (t.PlayState[i] != psStop) {
                    return false;
                }
            }
            return true;
        },
        //procedure TEnveloper.RestartMML (c:Integer);
        RestartMML: function(t, c) {
            if ((c < 0) || (c >= Chs)) return;
            if (t.PlayState[c] == psWait) {
                t.PlayState[c] = psPlay;
                t.MCount[c] = t.SeqTime + 1;
            }
        },
        restartIfAllWaiting: function (t) {
            if (t.allWaiting()) {
                for(var i=0;i<Chs;i++) {
                    t.RestartMML(i);
                }
            }
        },
        //procedure TEnveloper.WaitMML (c:Integer);
        WaitMML: function(t, c) {
            var i; //:Integer;
            if ((c < 0) || (c >= Chs)) return;
            //MPoint[c]=nil;
            t.PlayState[c] = psWait;
            t.MCount[c] = t.SeqTime + 1;
        },
        //procedure TEnveloper.Start;
        Start: function(t) {
            t.Stop();
            t.Rewind();
            t.BeginPlay = True;
            t.startRefreshLoop();
            t.playNode();
        },
        Rewind: function (t) {
            var ch; //:Integer;
            t.SeqTime=0;
            for (ch = 0; ch < Chs; ch++) {
                t.soundMode[ch] = False;
                t.MPointC[ch] = 0;
                t.PlayState[ch] = psPlay;
                t.MCount[ch] = t.SeqTime;
            }
        },
        Stop: function (t) {
            if (!t.BeginPlay) return;
            t.stopNode();
            t.stopRefreshLoop();
        },
        wavOut: function (t) {
            t.Stop();
            t.Rewind();
            var buf=[];
            var grid=t.resolution;
            for (var i=0;i<grid;i++) buf.push(0);
            var allbuf=[];
            t.writtenSamples=0;
            t.WavOutMode=true;
            t.label2Time=[];
            t.loopStart=null;
            t.PC2Time=[];// only ch:0
            var sec=-1;
            var efficiency=t.wavOutSpeed||10;
            return new Promise(function (succ) {
                setTimeout(refresh,0);
                function refresh() {
                    var ti=new Date().getTime()+efficiency;
                    while (new Date().getTime()<=ti) {
                        for (var i=0;i<grid;i++) allbuf.push(0);
                        t.refreshPSG(allbuf,allbuf.length-grid,grid);
                        t.writtenSamples+=grid;
                        var ss=Math.floor(t.writtenSamples/t.sampleRate);
                        if (ss>sec) {
                            //console.log("Written ",ss,"sec");
                            sec=ss;
                        }
                        //allbuf=allbuf.concat(buf.slice());
                        if (t.allStopped()) {
                            t.WavOutMode=false;
                            succ(allbuf);
                            return;
                        }
                    }
                    setTimeout(refresh,0);
                }
            });
        },
        toAudioBuffer: function (t) {
            return t.wavOut().then(function (arysrc) {
                var buffer = t.context.createBuffer(1, arysrc.length, t.sampleRate);
                var ary = buffer.getChannelData(0);
                for (var i = 0; i < ary.length; i++) {
                     ary[i] = arysrc[i];
                }
                var res={decodedData: buffer};
                if (t.loopStart) res.loopStart=t.loopStart[0]/t.loopStart[1];
                return res;
            });
        },
        //procedure TEnveloper.SelWav (ch,n:Integer);
        SelWav: function(t, ch, n) {
            t.CurWav[ch] = n;
            if (n < WvC) {
                t.SccWave[ch] = t.WaveDat[n];
                t.L2WL[ch] = 5;
                t.Sync[ch] = False;
            } else {
                if (t.PCMW[n - WvC] != nil) {
                    t.SccWave[ch] = t.PCMW[n - WvC].Start;
                    t.L2WL[ch] = t.PCMW[n - WvC].Log2Len;
                    t.Sync[ch] = True;
                }
            }
        },
        RegPCM: function (t,fn, n) {
            console.log("[STUB]regpcm",fn.map(function (e) {return String.fromCharCode(e);}),n);
        },
        /*
        procedure TEnveloper.RegPCM (fn:string;n:Integer);
        var i:Integer;
            wl,wl2:TWavLoader;
        {
             if ( ! FileExists(fn) ) {
                fn=ExtractFilePath (ParamStr(0))+'\\'+fn;
                if ( ! FileExists(fn) ) return;
             }
             for ( i=0 to Chs-1 )
                 if ( CurWav[i]==n ) SelWav(i,0);
             wl=TWavLoader.Create (fn);IncGar;
             if ( ! wl.isError ) {
                if ( PCMW[n-WvC]!=nil ) {
                   PCMW[n-WvC].Free; DecGar;
                }
                wl2=TWavLoader.Clone (TObject(wl));  IncGar;
                PCMW[n-WvC]=wl2;
             }
             wl.Free;   DecGar;

        }
        */
        refreshPSG: function(t,data,WriteAd,length) {
            var i, ch, WaveMod, WriteBytes, wdtmp, inext, mid, w1, w2, //:integer;
                TP = [],
                vCenter = [], //:array [0..Chs-1] of Integer;
                //Steps:array [0..Chs-1] of Integer;
                Lambda, NewLambda, //:Real;
                res, //:MMRESULT;
                WriteTwice, LfoInc, //:Boolean;
                WriteMax, //:integer;
                nowt, //:longint;
                // AllVCenter:Integer;
                Wf=0, Wt=0, WMid=0, WRes=0, WSum=0, v=0, NoiseP=0, Tmporc=0, //:Integer;
                LParam, HParam, WParam, //:Byte;
                JmpSafe, EnvFlag, //:Integer;
                se; //:^TSoundElem;

            EnvFlag = 0;
            LfoInc = True;
            cnt++; //inc(cnt);

            var mcountK=t.sampleRate / 22050;
            var tempoK=44100 / t.sampleRate ;
            //var alstp=false;
            var startTime=new Date().getTime();
            //var startSamples=bufferState.writtenSamples;
            //console.log(bufferState.WriteAd, WriteMax);
            if (t.allStopped()) {
                for (var i=WriteAd; i<=WriteAd+length; i++) {
                    data[i]=0;
                }
                return;
            }
            var vv=[],SeqTime=t.SeqTime,lpchk=0;
            for (ch = 0; ch < Chs; ch++) {
                if (t.MPoint[ch][t.MPointC[ch]] == nil) t.StopMML(ch);
                if (t.PlayState[ch] != psPlay) continue;
                if (t.PorLen[ch] > 0) {
                    Tmporc = t.MCount[ch] - SeqTime;
                    t.Steps[ch] = (
                        div(t.PorStart[ch], t.PorLen[ch]) * Tmporc +
                        div(t.PorEnd[ch], t.PorLen[ch] * (t.PorLen[ch] - Tmporc))
                    );
                }
                if ((t.soundMode[ch]))
                    v = t.EVol[ch];
                else if ((t.Resting[ch]))
                    v = 0;
                else
                    v = t.EShape[ch][t.ECount[ch] >>> 11] * t.EVol[ch] * t.EBaseVol[ch]; // 16bit
                if (t.Fading < FadeMax) {
                    v = v * div(t.Fading, FadeMax); // 16bit
                }
                vv[ch]=v;
                if (t.ECount[ch] + t.ESpeed[ch]*(length/2) < 65536 ) t.ECount[ch] += t.ESpeed[ch]*(length/2);

                //####MMLProc (ch);
                JmpSafe = 0;
                //dec (MCount[ch]);

                //if (ch==0) console.log("ch",ch,"Code",t.MCount[ch],t.SeqTime);

                while (t.MCount[ch] <= SeqTime) {
                    //if (lpchk++>1000) throw new Error("Mugen2");
                    //MCount[ch]=0;
                    var pc = t.MPointC[ch];
                    if (ch==0) t.PC2Time[pc]=t.writtenSamples;
                    LParam = t.MPoint[ch][pc + 1];
                    HParam = t.MPoint[ch][pc + 2];
                    var code = t.MPoint[ch][pc];
                    //console.log("ch",ch,"Code",code)
                    if (code >= 0 && code < 96 || code === MRest) {
                        //console.log(ch, t.MCount[ch], SeqTime,(LParam + HParam * 256) * 2);
                        t.Play1Sound(ch, code, t.Slur[ch]);
                        if (!t.Slur[ch]) t.LfoDC[ch] = t.LfoD[ch];
                        t.Slur[ch] = False;
                        //MCount[ch]=SPS div LParam;
                        t.MCount[ch] +=
                            (LParam + HParam * 256) * 2;
                        // SPS=22050の場合 *2 を *1 に。
                        // SPS=x の場合   * (x/22050)
                        t.MPointC[ch] += 3;
                    } else switch (code) {
                        case MPor:{
                             t.Play1Por (ch,
                               LParam,
                               HParam,
                               t.Slur[ch]
                             );
                             t.Slur[ch]=False;
                             t.MCount[ch]+=
                             ( t.MPoint[ch][pc + 3]+t.MPoint[ch][pc + 4]*256 )*2;
                            // SPS=22050の場合 *2 を *1 に。
                             t.PorLen[ch]=t.MCount[ch]-SeqTime;
                             t.MPointC[ch]+=5;
                        }break;
                        case MTempo:
                            {
                                t.Tempo = LParam + HParam * 256;
                                t.MPointC[ch] += 3;
                            }
                            break;
                        case MVol:
                            {
                                t.EVol[ch] = LParam;
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MBaseVol:
                            {
                                t.EBaseVol[ch] = LParam;
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case Mps:
                            {
                                t.ESpeed[ch] = LParam;
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MSelWav:
                            {
                                //SccWave[ch]=@t.WaveDat[LParam,0];
                                t.SelWav(ch, LParam);
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MWrtWav:
                            {
                                t.MPointC[ch] += 34; // MWrtWav wavno data*32
                                for (i = 0; i < 32; i++) {
                                    t.WaveDat[LParam][i] = t.MPoint[ch][pc + 2 + i];
                                }
                            }
                            break;
                        case MSelEnv:
                            {
                                t.EShape[ch] = t.EnvDat[LParam];
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MWrtEnv:
                            { // MWrtEnv envno data*32
                                t.MPointC[ch] += 34;
                                for (i = 0; i < 32; i++) {
                                    wdtmp = t.MPoint[ch][pc + 2 + i];
                                    if (wdtmp > 15) wdtmp = 15;
                                    t.EnvDat[LParam][i] = wdtmp;
                                }
                            }
                            break;
                        case MJmp:
                            {
                                if (t.WavOutMode) {
                                    if (ch==0) {
                                        var dstLabelPos=t.MPointC[ch] + array2Int(t.MPoint[ch], pc+1);
                                        //var dstLabelNum=t.MPoint[ch][dstLabelPos+1];
                                        var dstTime=t.PC2Time[dstLabelPos];// t.label2Time[dstLabelNum-0];
                                        if (typeof dstTime=="number" && dstTime<t.writtenSamples) {
                                            t.loopStart=[dstTime, t.sampleRate];
                                            console.log("@jump", "ofs=",t.loopStart );
                                        }
                                    }
                                    t.MPointC[ch] += 5;
                                } else {
                                    /*console.log("old mpointc ",t.MPointC[ch],LParam,HParam,t.MPoint[ch][pc + 3],t.MPoint[ch][pc + 4],LParam << 0 +
                                    HParam << 8 +
                                    t.MPoint[ch][pc + 3] << 16 +
                                    t.MPoint[ch][pc + 4] << 24);*/
                                    t.MPointC[ch] += array2Int(t.MPoint[ch], pc+1);
                                    /*LParam << 0 +
                                    HParam << 8 +
                                    t.MPoint[ch][pc + 3] << 16 +
                                    t.MPoint[ch][pc + 4] << 24;*/
                                    //console.log("new mpointc ",t.MPointC[ch]);
                                }
                                JmpSafe++;
                                if (JmpSafe > 1) {
                                    console.log("Jumpsafe!");
                                    t.StopMML(ch);
                                    t.MCount[ch] = SeqTime + 1;
                                }
                            }
                            break;
                        case MLabel:
                            if (t.WavOutMode && ch==0) {
                                t.label2Time[LParam]=[t.writtenSamples,t.sampleRate];
                                console.log("@label", LParam , t.MPointC[ch] , t.writtenSamples+"/"+t.sampleRate );
                            }
                            t.MPointC[ch]+=2;
                            break;
                        case MSlur:
                            {
                                t.Slur[ch] = True;
                                t.MPointC[ch] += 1;
                            }
                            break;
                        case MWait:
                            {
                                t.WaitMML(ch);
                                t.MPointC[ch] += 1;
                            }
                            break;
                        case MCom:
                            {
                                t.ComStr = StrPas(t.MPoint[ch], pc + 1);
                                t.MPointC[ch] += t.ComStr.length + 2; // opcode str \0
                                //inc (MPoint[ch],length(comstr)+2);
                            }
                            break;
                        case MWOut:
                            {
                                t.WFilename = StrPas(t.MPoint[ch], pc + 1);
                                t.MPointC[ch] += t.WFilename.length + 2; // opcode str \0
                                //inc (MPoint[ch],length(WFilename)+2);
                            }
                            break;
                        case MWEnd:
                            {
                                t.MPointC[ch] += 1;
                            }
                            break;
                        case MDet:
                            {
                                t.Detune[ch] = ShortInt(LParam);
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MLfo:
                            {
                                t.LfoSync[ch] = (LParam);
                                t.LfoV[ch] = (HParam) * 65536;
                                t.LfoA[ch] = (t.MPoint[ch][pc + 3]);
                                t.LfoD[ch] = 0;
                                t.MPointC[ch] += 4;
                            }
                            break;
                        case MLfoD:
                            {
                                t.LfoD[ch] = LParam * t.sampleRate;
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MSync:
                            {
                                t.Sync[ch] = (LParam == 1);
                                t.MPointC[ch] += 2;
                            }
                            break;
                        case MPCMReg:{
                            var fn=StrPas(t.MPoint[ch], pc+1);
                            t.RegPCM (fn,t.MPoint[ch][pc+1+fn.length+1]);
                            t.MPointC[ch]+=fn.length +3;
                        }break;
                        case Mend:
                            t.StopMML(ch); //MPoint[ch]=nil;
                            break;
                        default:
                            throw new Error("Invalid opcode" + code); //ShowMessage ('???'+IntToSTr(Byte(MPoint[ch]^)));
                            t.StopMML(ch);
                            t.MPointC[ch] += 1;
                    }
                }
                // End Of MMLProc
            }
            t.handleAllState();
            t.SeqTime+= Math.floor( t.Tempo * (length/120) * tempoK );
            for (var ad=WriteAd; ad<WriteAd+length; ad++) {
                data[ad]=0;
            }
            for (ch = 0; ch < Chs; ch++) {
                if (t.PlayState[ch] != psPlay) continue;
                for (var ad=WriteAd; ad<WriteAd+length; ad++) {
                    //if (lpchk++>100000) throw new Error("Mugen3 "+WriteAd+"  "+length);

                    LfoInc = !LfoInc;
                    //EnvFlag++;
                    //if (EnvFlag > 1) EnvFlag = 0;

                    WSum = data[ad];
                    v=vv[ch];
                    if (v > 0) {
                        i = chkn(t.SccCount[ch] >>> (32 - t.L2WL[ch]));
                        //inext=(i+1) & ((1 << L2WL[ch])-1);

                        //mid=(SccCount[ch] >> (24-L2WL[ch])) & 255;

                        // *****000 00000000 00000000 00000000
                        //                      ***** 00000000

                        w1 = chkn(t.SccWave[ch][i]);
                        chkn(v);
                        //w2=Byte((SccWave[ch]+inext)^) ;

                        /*WSum += ((
                            div((w1 * v), (16 * 128))
                        ) - div(v, 16))/32768;*/
                        WSum += (
                            (w1 * v)/ 0x4000000
                        ) - (v / 0x80000);


                        if (!t.Sync[ch]) {
                            (t.SccCount[ch] += t.Steps[ch]);
                        } else {
                            if ((t.SccCount[ch] < -t.Steps[ch] * 2) || (t.SccCount[ch] >= 0))(t.SccCount[ch] += t.Steps[ch]);
                        }
                        if ((t.LfoV[ch] != 0)) {
                            if ((t.LfoDC[ch] > 0)) {
                                (t.LfoDC[ch] -= t.Tempo);
                            } else {
                                (t.SccCount[ch] +=
                                    sinT[t.LfoC[ch] >>> (16 + sinMax_s)] *
                                    div(t.Steps[ch], 512) *
                                    div(t.LfoA[ch], 256)
                                );
                                if (LfoInc) t.LfoC[ch] += t.LfoV[ch];
                            }

                        }
                    }

                    if (WSum > 1) WSum = 1; //16bit
                    if (WSum < -1) WSum = -1; //16bit
                    data[ad]=WSum;
                    if (ch==0) t.WaveDat[95][NoiseP & 31] = Math.floor(Math.random() * 78 + 90);
                    NoiseP++;
                }//of for (var i=WriteAd; i<=WriteAd+length; i++
                //bufferState.writtenSamples+=length;


            }// of ch loop
            t.performance.elapsedTime+=new Date().getTime()-startTime;
            t.performance.writtenSamples+=length;
            t.performance.writeRate=t.performance.writtenSamples/(t.performance.elapsedTime/1000*t.sampleRate);
            //WTime=GetTickCount-WTime;
            //BufferUnderRun= getPlayPos - LastWriteStartPos;

            //--------------|---------------------------
            //             playpos  LS            LE
            //                       +-------------+

        }// of refreshPSG
    }); // of Klass.define
    var undefs={};
    for(var k in defs) {
        var fldreg=/\bt\s*\.\s*([a-zA-Z0-9]+)\b/g;
        if (typeof defs[k]==="function") {
            var src=defs[k]+"";
            var r=src.replace(fldreg, function (_,name) {
                //console.log(name);
                if (!defs.$fields[name]) {
                    if (undefs[name]==null) undefs[name]=1;
                    //console.error("Undefined ",name);
                }
            });
            undefs[k]=0;
        }
    }
    console.log(undefs);
    return TEnveloper;
}); // of requirejs.define

/*
procedure TEnveloper.PlayKeyBd (n,WaveSel:Integer);
var i,ch,WaveMod,WriteBytes,wdtmp:integer;
    TP,vCenter:array [0..Chs-1] of Integer;
    Lambda,NewLambda:Real;
    res:MMRESULT;
    WriteMax:integer;
    nowt:longint;
    AllVCenter:Integer;
    Wf,Wt,WMid,WRes,WSum,v,NoiseP:Integer;
    LParam,WParam:Byte;
    JmpSafe:Integer;
{
     Start;
     ch=Chs-1;
     Play1Sound (ch,n,False);
     EVol[ch]=127;
     SccWave[ch]=@WaveDat[WaveSel,0];

     mmt.wType=TIME_SAMPLES;
     WaveOutGetPosition (hwo, @mmt, SizeOf(MMTIME));

     Pos=mmt.Sample mod Bsize;
     WriteAd=(Pos+Delay) mod BSize;
     WriteMax=(Pos+BSize-1) mod BSize;

     while ( WriteAd!=WriteMax ) {
           WSum=0;//wdata2[WriteAd];
           v=(( Byte(( EShape[ch]+(ECount[ch] >> 11) )^) )*EVol[ch]*EBaseVol[ch]);
           if ( v>0 ) {
                  i=SccCount[ch] >> 27;
                  inc (WSum,(
                            ( Byte((SccWave[ch]+i)^)*v ) div (16*128)
                         )-v div 16
                  );
                  inc (SccCount[ch],Steps[ch]);
           }
           if ( ECount[ch]+ESpeed[ch]<65536 ) inc (ECount[ch],ESpeed[ch]);


           //WSum=(PrevWSum+WSum) div 2;

           WRes=WSum+wdata2[WriteAd];

           if ( WRes>32767 ) WRes=32767;     //16bit
           if ( WRes<-32768 ) WRes=-32768;         //16bit

           wdata2[WriteAd]=WRes;

           //PrevWSum=WSum;

           inc (WriteAd);
           WriteAd=WriteAd mod BSize;
     }

}

procedure TEnveloper.calibration;
var l,p,i:Integer;
{
     p=(Pos+timeLag+BSize) mod BSize;
     for ( i=0 to BSize-1 ) {
          l=i-p;
          if ( l<-BSize div 2 ) inc(l,BSize);
          if ( l>=BSize div 2 ) dec(l,BSize);
          if ( ((i mod 100)<50) &&
              (abs(l)<calibrationLen)  ) {
                wdata2[i]=20000*(calibrationLen-abs(l)) div calibrationLen  ;

          } else wdata2[i]=0;
     }
}

end.
MZO format
1[c]
       Version    Chs ch0.length   ch0 data
000000 b0 04 00 00|0a|1b 00 00 00{64 78 65 05 6e 00 66
000010 00 6b 00 73 00 00 00 76 00 74 00 67 78 00 24 22
                   ch1.length   ch1 data...
000020 56 ff ff ff}15 00 00 00 64 78 65 05 6e 00 66 00
000030 6b 00 73 00 00 00 76 00 74 00 ff ff ff 15 00 00
000040 00 64 78 65 05 6e 00 66 00 6b 00 73 00 00 00 76
000050 00 74 00 ff ff ff 15 00 00 00 64 78 65 05 6e 00
000060 66 00 6b 00 73 00 00 00 76 00 74 00 ff ff ff 15
000070 00 00 00 64 78 65 05 6e 00 66 00 6b 00 73 00 00
000080 00 76 00 74 00 ff ff ff 15 00 00 00 64 78 65 05
000090 6e 00 66 00 6b 00 73 00 00 00 76 00 74 00 ff ff
0000a0 ff 15 00 00 00 64 78 65 05 6e 00 66 00 6b 00 73
0000b0 00 00 00 76 00 74 00 ff ff ff 15 00 00 00 64 78
0000c0 65 05 6e 00 66 00 6b 00 73 00 00 00 76 00 74 00
0000d0 ff ff ff 15 00 00 00 64 78 65 05 6e 00 66 00 6b
0000e0 00 73 00 00 00 76 00 74 00 ff ff ff 15 00 00 00
0000f0 64 78 65 05 6e 00 66 00 6b 00 73 00 00 00 76 00
000100 74 00 ff ff ff
000105

       1b 00 00 00{64 78 65 05 6e 00 66 00 6b 00 73 00
       00 00 76 00 74 00 67 78 00 24 22 56 ff ff ff}


       15 00 00 00{64 78 65 05 6e 00 66 00 6b 00 73 00
       00 00 76 00 74 00 ff ff ff}

*/
