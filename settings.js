var templates = [
    {
        "key": "Android",
        "init": "path = new Path();\\nthis.paths.add(path);",
        // "moveto": "path.moveTo($Xf, $Yf);",
        "moveto": "path.moveTo(x + $Xf * rate, y + $Yf * rate);",
        // "lineto": "path.lineTo($Xf, $Yf);",
        "lineto": "path.lineTo(x + $Xf * rate, y + $Yf * rate);",
        "fin": "",
    },
    {
        "key": "Canvas",
        "init": "ctx.beginPath();",
        "moveto": "ctx.moveTo($X,$Y);",
        "lineto": "ctx.lineTo($X,$Y);",
        "fin": "ctx.stroke();",
    }
]
