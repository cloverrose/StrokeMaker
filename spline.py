# -*- coding:utf-8 -*-


def drange(start, stop, step):
    r = start
    while r < stop:
        yield r
        r += step


def spline(xs, ys):
    size = len(xs)
    h = [0] + [xs[i] - xs[i - 1] for i in range(1, size)]
    dif1 = [None] + [(ys[i] - ys[i - 1]) / h[i] for i in range(1, size)]
    dif2 = ([0] +
            [(dif1[i + 1] - dif1[i]) / (xs[i + 1] - xs[i - 1])
             for i in range(1, size - 1)] +
            [0])

    xmin = min(xs)
    xmax = max(xs)

    xsort = sorted(xs)
    i = 1
    ret = []
    for x in drange(xmin, xmax, 0.01):
        while x > xsort[i]:
            i += 1

        yy0 = (dif2[i - 1] / (6 * h[i])) * ((xs[i] - x) ** 3)  # 第一項
        yy1 = (dif2[i] / (6 * h[i])) * ((x - xs[i - 1]) ** 3)  # 第２項
        yy2 = (ys[i - 1] / h[i] - h[i] * dif2[i - 1] / 6) * (xs[i] - x)  # 第３項
        yy3 = (ys[i] / h[i] - h[i] * dif2[i] / 6) * (x - xs[i - 1])  # 第４項
        y = yy0 + yy1 + yy2 + yy3
        ret.append((x, y))
    return ret


data = [
    (236.5, 186.68884),
    (237.7678, 212.64558),
    (238.76683, 224.62561),
    (239.76585, 232.6123),
    (241.7639, 239.60066),
    (242.76292, 243.59401),
    (245.76, 252.57903),
    (247.75806, 258.56903),
    (251.75415, 263.56073),
    (255.75024, 267.55408),
    (258.7522, 265.5574),
    ]

xs = [d[0] for d in data]
ys = [d[1] for d in data]


def run():
    ret = spline(xs, ys)
    for i in ret:
        print i
