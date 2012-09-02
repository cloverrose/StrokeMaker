// myscript.js

var data = [[]];
var now = 0;
var cW = 800;  //キャンバス横サイズ
var cH = 800;  //キャンバス縦サイズ
var mouseX;
var mouseY;
var drawctx;

window.onload = function(){
    setupImageMessage();
    setupFileSelect();
    setupdrawcanvas();
    setupButton();
    setupTemplates();
}

function setupdrawcanvas(){
    //キャンバスの初期処理
    var canvas = document.getElementById('mycanvas');
    if (!canvas || !canvas.getContext) return false;
    //2Dコンテキスト
    drawctx = canvas.getContext('2d');
    drawctx.lineWidth = 5;
    drawctx.lineJoin = "round";

    //イベント：マウスダウン
    canvas.onmousedown = function mouseDownListner(e) {
        //表示クリア
        drawctx.clearRect(0, 0, cW, cH);
        //座標調整
        adjustXY(e);

        currentdata = data[now];
        currentdata = currentdata.concat([[mouseX, mouseY]]);
        data[now] = currentdata;
        draw();
    }
    function adjustXY(e) {
        var rect = e.target.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }
}

function setupImageMessage(){
    // 画像を選択してくださいというメッセージを表示
    var canvas = document.getElementById('background');
    if(!canvas || !canvas.getContext) return false;
    var ctx = canvas.getContext('2d');

    ctx.font = 'bold 32px "Times New Roman"';
    ctx.textAlign = 'left'; // right, center, start, end
    ctx.fillStyle = 'blue';
    ctx.fillText('Select Image', 20, 120, 200);
}

function setupFileSelect(){
    // ファイル選択後の動作を設定
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        document.getElementById('files').
            addEventListener('change', fileSelect, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}

function fileSelect(evt){
    // 選択された画像を右側に描画
    var files = evt.target.files; // FileList object
    if(files.length != 1){
        return;
    }
    var file = files[0];
    if(!file.type.match('image.*')){
        return;
    }

    var reader = new FileReader();
    
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            var canvas = document.getElementById('background');
            if(!canvas || !canvas.getContext) return false;
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, cW, cH);
            var img = new Image();
            img.src = e.target.result;
            img.onload = function(){
                ctx.globalAlpha = 0.2;
                ctx.drawImage(img, 0, 0);
            }
        };
    })(file);

    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
}


function draw(){
    for(var i=0; i<data.length; i++){
        if(i == now){
            drawctx.strokeStyle = "red";
        }else{
            drawctx.strokeStyle = "black";
        }
        straightDraw(drawctx, data[i]);
    }
}

function replaceXY(str, x, y){
    str = str.replace('$x', x);
    str = str.replace('$y', y);
    str = str.replace('$X', x);
    str = str.replace('$Y', y);
    return str;
}

function replaceN(str){
    str = str.replace('\n', '<br/>');
    return str;
}

function myescape(str){
    str = str.replace('<', '%3C');
    str = str.replace('>', '%3E');
    return str;
}

function setupButton(){
    $("#prevbtn").click(function (e) {
        e.preventDefault();
        if(now > 0){
            now--;
        }
        draw();
    });
    
    $("#nextbtn").click(function (e) {
        e.preventDefault();
        now++;
        if(now >= data.length){
            data = data.concat([[]]);
        }
        draw();
    });


    $("#finbtn").click(function (e) {
        e.preventDefault();
        var init = replaceN(myescape($("#init").val()));
        var moveto = replaceN(myescape($("#moveto").val()));
        var lineto = replaceN(myescape($("#lineto").val()));
        var fin = replaceN(myescape($("#fin").val()));
        var RET = "<br/>";
        
        var str = "";
        for(var i=0; i<data.length; i++){
            var currentdata = data[i];
            if(currentdata.length >= 2){
                str += init;
                str += RET;
                str += replaceXY(moveto, currentdata[0][0], currentdata[0][1]);
                str += RET;
                for(var j=1; j<currentdata.length; j++){
                    str += replaceXY(lineto, currentdata[j][0], currentdata[j][1]);
                    str += RET;
                }
                str += fin;
                str += RET;
            }
        }
        $("#output").html(str);
    });
}


function selectChange(){
    // テンプレートを選択した時の動作
    var selected = $("#selecter").val();
    for(var i=0; i<templates.length; i++){
        if(templates[i]["key"] == selected){
            var template = templates[i];
            $("#init").val(template["init"]);
            $("#moveto").val(template["moveto"]);
            $("#lineto").val(template["lineto"]);
            $("#fin").val(template["fin"]);
        }
    }
}

function setupTemplates(){
    var selecter = document.getElementById('selecter');
    console.log('here');
    console.dir(templates);
    for(var i=0; i<templates.length; i++){
        selecter.options[i] =
            new Option(templates[i]["key"], templates[i]["key"]);
    }
}