define(["FS"],function (FS) {
    var DU=FS.DeferredUtil;
    var SFile=FS.SFile;
    DragDrop={};
    DragDrop.readFile=function (file) {
        return DU.promise(function (succ) {
            var reader = new FileReader();
            reader.onload = function(e) {
                //var fileContent = reader.result;
                //console.log("SUCC",reader);
                succ(reader);
            };
            reader.readAsArrayBuffer(file);
        });
    };
    DragDrop.accept=function (dom, fdst,options) {
        options=options||{};
        options.draggingClass=options.draggingClass||"dragging";
        dom.on("dragover",over);
        dom.on("dragenter",enter);
        dom.on("dragleave",leave);
        dom.on("drop",dropAdd);
        if (!options.onCheckFile) {
            options.onCheckFile=function (f) {
                if (options.overwrite) {
                    return f;
                } else {
                    if (f.exists()) return false;
                    return f;
                }
            };
        }
        if (!options.onError) {
            options.onError=function (e) {
                console.error(e);
            };
        }
        function dropAdd(e) {
            var dst=fdst;
            if (typeof dst==="function") dst=dst();
            dom.removeClass(options.draggingClass);
            var status={};
            var eo=e.originalEvent;
            e.stopPropagation();
            e.preventDefault();
            var files = Array.prototype.slice.call(eo.dataTransfer.files);
            var added=[],cnt=files.length;
            DU.each(files,function (file) {
                var itemName=file.name;
                var itemFile=dst.rel(itemName),actFile;
                return DU.resolve(
                    options.onCheckFile(itemFile,file)
                ).then(function (cr) {
                    if (cr===false) {
                        status[itemFile.path()]={
                            file:itemFile,
                            status:"cancelled"
                        };
                        return;
                    }
                    if (SFile.is(cr)) actFile=cr;
                    else actFile=itemFile;
                    return DragDrop.readFile(file).then(function (reader) {
                        var fileContent=reader.result;
                        actFile.setBytes(fileContent);
                        status[itemFile.path()]={
                            file:itemFile,
                            status:"uploaded"
                        };
                        if (actFile.path()!==itemFile.path()) {
                            status[itemFile.path()].redirectedTo=actFile;
                        }
                    });
                });
            }).then(function () {
                if (options.onComplete) options.onComplete(status);
            }).fail(function (e) {
                //console.log(e);
                options.onError(e);
            });
            return false;
        }
        function over(e) {
            //console.log("over",e);
            e.stopPropagation();
            e.preventDefault();
        }
        var entc=0;
        function enter(e) {
            var eo=e.originalEvent;
            //console.log("enter",eo.target.innerHTML,e);
            entc++;
            /*if (dom[0]===eo.relatedTarget) {
                dom.addClass(options.draggingClass);
            }*/
            //if (eo.target===dom[0]) {
            dom.addClass(options.draggingClass);
            //}
                //$(eo.target).addClass(options.draggingClass);
            //e.stopPropagation();
            //e.preventDefault();
        }
        function leave(e) {
            var eo=e.originalEvent;
            //dom.removeClass(options.draggingClass);
            console.log("leave",eo.target.innerHTML,e);
            entc--;
            /*if (dom[0]===eo.relatedTarget) {
                dom.removeClass(options.draggingClass);
            }*/
            //if (eo.target===dom[0]) {
            if (entc<=0) dom.removeClass(options.draggingClass);
            //}
            //$(eo.target).removeClass(options.draggingClass);
            //e.stopPropagation();
            //e.preventDefault();
        }
    };
    return DragDrop;
});
