window.onload = function(){
    run();
}

function spline(xs, ys){
    var size = xs.length;
    var h = [0];
    for(var i=1; i<size; i++){
        h = h.concat(xs[i] - xs[i - 1]);
    }
    var dif1 = [null];
    for(var i=1; i<size; i++){
        dif1 = dif1.concat((ys[i] - ys[i - 1]) / h[i]);
    }
    var dif2 = [0];
    for(var i=1; i<size-1; i++){
        dif2 = dif2.concat((dif1[i + 1] - dif1[i]) / (xs[i + 1] - xs[i - 1]));
    }
    dif2 = dif2.concat(0);

    /*for(var i=0; i<dif2.length; i++){
        console.log(dif2[i]);
    }*/

    var xmin = Math.min.apply(null, xs);
    var xmax = Math.max.apply(null, xs);

    var xsort = xs.sort();
    var i = 1;
    var ret = [];
    for(var x=xmin; x<xmax; x+=0.1){
        while(x > xsort[i]){
            i++;
        }

        var yy0 = (dif2[i - 1] / (6 * h[i])) * Math.pow((xs[i] - x), 3);  // 第一項
        var yy1 = (dif2[i] / (6 * h[i])) * Math.pow((x - xs[i - 1]), 3);  // 第２項
        var yy2 = (ys[i - 1] / h[i] - h[i] * dif2[i - 1] / 6) * (xs[i] - x);  // 第３項
        var yy3 = (ys[i] / h[i] - h[i] * dif2[i] / 6) * (x - xs[i - 1]);  // 第４項
        var y = yy0 + yy1 + yy2 + yy3;
        /*if(isNaN(y)){
            console.log('-----------------');
            console.log(yy0);
            console.log(yy1);
            console.log(yy2);
            console.log(yy3);
        }*/
        ret = ret.concat([[x, y]]);
    }
    return ret;
}


function run(){
    var data = [
        [0,100],
        [100,200],
        [200,300],
        [300,350],
        [400,400],
        [500,600],
    ]

    var xs = [];
    for(var i=0; i<data.length; i++){
        xs = xs.concat(data[i][0]);
    }
    var ys = [];
    for(var i=0; i<data.length; i++){
        ys = ys.concat(data[i][1]);
    }
    var ret = spline(xs, ys);
    for(var i=0; i<ret.length; i++){
        console.log(ret[i][0] + ", " + ret[i][1]);
    }
}