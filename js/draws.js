function straightDraw(ctx, data){
    ctx.beginPath();
    if(data.length > 0){
        ctx.moveTo(data[0][0], data[0][1]);
    }
    for(var i=1; i<data.length; i++){
        ctx.lineTo(data[i][0], data[i][1]);
    }
    ctx.stroke();
}
/*
function getControlPoints(x0,y0,x1,y1,x2,y2,t){
    var d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
    var d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
    var fa=t*d01/(d01+d12);   // scaling factor for triangle Ta
    var fb=t*d12/(d01+d12);   // ditto for Tb, simplifies to fb=t-fa
    var p1x=x1-fa*(x2-x0);    // x2-x0 is the width of triangle T
    var p1y=y1-fa*(y2-y0);    // y2-y0 is the height of T
    var p2x=x1+fb*(x2-x0);
    var p2y=y1+fb*(y2-y0);  
    return [p1x,p1y,p2x,p2y];
}

function splineDraw(ctx, data, t){
    ctx.beginPath();
    if(data.length > 0){
        ctx.moveTo(data[0][0], data[0][1]);
    }
    for(var i=1; i<data.length-1; i++){
        cps = getControlPoints(data[i - 1][0], data[i - 1][1],
                               data[i][0], data[i][1],
                               data[i + 1][0], data[i + 1][1],
                               t);
        ctx.bezierCurveTo(cps[0], cps[1], cps[2], cps[3],
                          data[i][0], data[i][1]);
    }
    ctx.stroke();
}
*/
/*
function quadraticDraw(ctx, data){
    ctx.beginPath();
    if(data.length < 3){
        return;
    }
    ctx.moveTo(data[0][0], data[0][1]);
    for(var i=1; i<data.length-2; i++){
        var xc = (data[i][0] + data[i + 1][0]) / 2;
        var yc = (data[i][1] + data[i + 1][1]) / 2;
        ctx.quadraticCurveTo(data[i][0], data[i][1], xc, yc );
    }
    
    ctx.quadraticCurveTo(data[i][0], data[i][1], data[i+1][0],data[i+1][1]);
    ctx.stroke();
}
*/
