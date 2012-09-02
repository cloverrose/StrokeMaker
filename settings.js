var templates = [
    {
        "key": "Android",
        "init": "path = new Path();\\nthis.paths.add(path);",
        "moveto": "path.moveTo($Xf, $Yf);",
        "lineto": "path.lineTo($Xf, $Yf);",
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
