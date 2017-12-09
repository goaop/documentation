/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-applicationcache-audio-backgroundsize-borderimage-borderradius-boxshadow-canvas-canvastext-cssanimations-csscolumns-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-flexbox-fontface-generatedcontent-geolocation-hashchange-history-hsla-indexeddb-input-inputtypes-multiplebgs-opacity-postmessage-rgba-svg-textshadow-video-webgl !*/
!function(e, t, n) {
    function r(e, t) {
        return typeof e === t;
    }
    function o() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : P ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments);
    }
    function a(e, t) {
        return !!~("" + e).indexOf(t);
    }
    function i() {
        var e = t.body;
        return e || (e = o(P ? "svg" : "body"), e.fake = !0), e;
    }
    function s(e, n, r, a) {
        var s, l, d, c, u = "modernizr", f = o("div"), p = i();
        if (parseInt(r, 10)) for (;r--; ) d = o("div"), d.id = a ? a[r] : u + (r + 1), f.appendChild(d);
        return s = o("style"), s.type = "text/css", s.id = "s" + u, (p.fake ? p : f).appendChild(s), 
        p.appendChild(f), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(t.createTextNode(e)), 
        f.id = u, p.fake && (p.style.background = "", p.style.overflow = "hidden", c = S.style.overflow, 
        S.style.overflow = "hidden", S.appendChild(p)), l = n(f, e), p.fake ? (p.parentNode.removeChild(p), 
        S.style.overflow = c, S.offsetHeight) : f.parentNode.removeChild(f), !!l;
    }
    function l(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase();
        }).replace(/^ms-/, "-ms-");
    }
    function d(t, n, r) {
        var o;
        if ("getComputedStyle" in e) {
            o = getComputedStyle.call(e, t, n);
            var a = e.console;
            if (null !== o) r && (o = o.getPropertyValue(r)); else if (a) {
                var i = a.error ? "error" : "log";
                a[i].call(a, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
            }
        } else o = !n && t.currentStyle && t.currentStyle[r];
        return o;
    }
    function c(t, r) {
        var o = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (;o--; ) if (e.CSS.supports(l(t[o]), r)) return !0;
            return !1;
        }
        if ("CSSSupportsRule" in e) {
            for (var a = []; o--; ) a.push("(" + l(t[o]) + ":" + r + ")");
            return a = a.join(" or "), s("@supports (" + a + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == d(e, null, "position");
            });
        }
        return n;
    }
    function u(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
            return t + n.toUpperCase();
        }).replace(/^-/, "");
    }
    function f(e, t, i, s) {
        function l() {
            f && (delete z.style, delete z.modElem);
        }
        if (s = !r(s, "undefined") && s, !r(i, "undefined")) {
            var d = c(e, i);
            if (!r(d, "undefined")) return d;
        }
        for (var f, p, g, v, h, m = [ "modernizr", "tspan", "samp" ]; !z.style && m.length; ) f = !0, 
        z.modElem = o(m.shift()), z.style = z.modElem.style;
        for (g = e.length, p = 0; g > p; p++) if (v = e[p], h = z.style[v], a(v, "-") && (v = u(v)), 
        z.style[v] !== n) {
            if (s || r(i, "undefined")) return l(), "pfx" != t || v;
            try {
                z.style[v] = i;
            } catch (e) {}
            if (z.style[v] != h) return l(), "pfx" != t || v;
        }
        return l(), !1;
    }
    function p(e, t) {
        return function() {
            return e.apply(t, arguments);
        };
    }
    function g(e, t, n) {
        var o;
        for (var a in e) if (e[a] in t) return !1 === n ? e[a] : (o = t[e[a]], r(o, "function") ? p(o, n || t) : o);
        return !1;
    }
    function v(e, t, n, o, a) {
        var i = e.charAt(0).toUpperCase() + e.slice(1), s = (e + " " + E.join(i + " ") + i).split(" ");
        return r(t, "string") || r(t, "undefined") ? f(s, t, o, a) : (s = (e + " " + R.join(i + " ") + i).split(" "), 
        g(s, t, n));
    }
    function h(e) {
        var t = S.className, n = w._config.classPrefix || "";
        if (P && (t = t.baseVal), w._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(r, "$1" + n + "js$2");
        }
        w._config.enableClasses && (t += " " + n + e.join(" " + n), P ? S.className.baseVal = t : S.className = t);
    }
    function m(e, t) {
        if ("object" == typeof e) for (var n in e) O(e, n) && m(n, e[n]); else {
            e = e.toLowerCase();
            var r = e.split("."), o = w[r[0]];
            if (2 == r.length && (o = o[r[1]]), void 0 !== o) return w;
            t = "function" == typeof t ? t() : t, 1 == r.length ? w[r[0]] = t : (!w[r[0]] || w[r[0]] instanceof Boolean || (w[r[0]] = new Boolean(w[r[0]])), 
            w[r[0]][r[1]] = t), h([ (t && 0 != t ? "" : "no-") + r.join("-") ]), w._trigger(e, t);
        }
        return w;
    }
    function y(e, t) {
        var n = e.deleteDatabase(t);
        n.onsuccess = function() {
            m("indexeddb.deletedatabase", !0);
        }, n.onerror = function() {
            m("indexeddb.deletedatabase", !1);
        };
    }
    function b(e, t, r) {
        return v(e, n, n, t, r);
    }
    var x = [], T = {
        _version: "3.5.0",
        _config: {
            classPrefix: "",
            enableClasses: !0,
            enableJSClass: !0,
            usePrefixes: !0
        },
        _q: [],
        on: function(e, t) {
            var n = this;
            setTimeout(function() {
                t(n[e]);
            }, 0);
        },
        addTest: function(e, t, n) {
            x.push({
                name: e,
                fn: t,
                options: n
            });
        },
        addAsyncTest: function(e) {
            x.push({
                name: null,
                fn: e
            });
        }
    }, w = function() {};
    w.prototype = T, w = new w();
    var C = [];
    w.addTest("applicationcache", "applicationCache" in e);
    var S = t.documentElement, P = "svg" === S.nodeName.toLowerCase();
    w.addTest("audio", function() {
        var e = o("audio"), t = !1;
        try {
            (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), 
            t.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), 
            t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""));
        } catch (e) {}
        return t;
    }), w.addTest("canvas", function() {
        var e = o("canvas");
        return !(!e.getContext || !e.getContext("2d"));
    }), w.addTest("canvastext", function() {
        return !1 !== w.canvas && "function" == typeof o("canvas").getContext("2d").fillText;
    }), w.addTest("geolocation", "geolocation" in navigator);
    var k = function() {
        function e(e, t) {
            var a;
            return !!e && (t && "string" != typeof t || (t = o(t || "div")), e = "on" + e, a = e in t, 
            !a && r && (t.setAttribute || (t = o("div")), t.setAttribute(e, ""), a = "function" == typeof t[e], 
            t[e] !== n && (t[e] = n), t.removeAttribute(e)), a);
        }
        var r = !("onblur" in t.documentElement);
        return e;
    }();
    T.hasEvent = k, w.addTest("hashchange", function() {
        return !1 !== k("hashchange", e) && (t.documentMode === n || t.documentMode > 7);
    }), w.addTest("history", function() {
        var t = navigator.userAgent;
        return (-1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone") || "file:" === location.protocol) && (e.history && "pushState" in e.history);
    });
    var _ = "Moz O ms Webkit", E = T._config.usePrefixes ? _.split(" ") : [];
    T._cssomPrefixes = E;
    var A = {
        elem: o("modernizr")
    };
    w._q.push(function() {
        delete A.elem;
    });
    var z = {
        style: A.elem.style
    };
    w._q.unshift(function() {
        delete z.style;
    });
    var R = T._config.usePrefixes ? _.toLowerCase().split(" ") : [];
    T._domPrefixes = R, T.testAllProps = v;
    var $ = function(t) {
        var r, o = V.length, a = e.CSSRule;
        if (void 0 === a) return n;
        if (!t) return !1;
        if (t = t.replace(/^@/, ""), (r = t.replace(/-/g, "_").toUpperCase() + "_RULE") in a) return "@" + t;
        for (var i = 0; o > i; i++) {
            var s = V[i];
            if (s.toUpperCase() + "_" + r in a) return "@-" + s.toLowerCase() + "-" + t;
        }
        return !1;
    };
    T.atRule = $;
    var O, B = T.prefixed = function(e, t, n) {
        return 0 === e.indexOf("@") ? $(e) : (-1 != e.indexOf("-") && (e = u(e)), t ? v(e, t, n) : v(e, "pfx"));
    };
    !function() {
        var e = {}.hasOwnProperty;
        O = r(e, "undefined") || r(e.call, "undefined") ? function(e, t) {
            return t in e && r(e.constructor.prototype[t], "undefined");
        } : function(t, n) {
            return e.call(t, n);
        };
    }(), T._l = {}, T.on = function(e, t) {
        this._l[e] || (this._l[e] = []), this._l[e].push(t), w.hasOwnProperty(e) && setTimeout(function() {
            w._trigger(e, w[e]);
        }, 0);
    }, T._trigger = function(e, t) {
        if (this._l[e]) {
            var n = this._l[e];
            setTimeout(function() {
                var e;
                for (e = 0; e < n.length; e++) (0, n[e])(t);
            }, 0), delete this._l[e];
        }
    }, w._q.push(function() {
        T.addTest = m;
    }), w.addAsyncTest(function() {
        var t;
        try {
            t = B("indexedDB", e);
        } catch (e) {}
        if (t) {
            var n = "modernizr-" + Math.random(), r = t.open(n);
            r.onerror = function() {
                r.error && "InvalidStateError" === r.error.name ? m("indexeddb", !1) : (m("indexeddb", !0), 
                y(t, n));
            }, r.onsuccess = function() {
                m("indexeddb", !0), y(t, n);
            };
        } else m("indexeddb", !1);
    });
    var L = o("input"), N = "autocomplete autofocus list placeholder max min multiple pattern required step".split(" "), j = {};
    w.input = function(t) {
        for (var n = 0, r = t.length; r > n; n++) j[t[n]] = !!(t[n] in L);
        return j.list && (j.list = !(!o("datalist") || !e.HTMLDataListElement)), j;
    }(N);
    var M = "search tel url email datetime date month week time datetime-local number range color".split(" "), W = {};
    w.inputtypes = function(e) {
        for (var r, o, a, i = e.length, s = 0; i > s; s++) L.setAttribute("type", r = e[s]), 
        a = "text" !== L.type && "style" in L, a && (L.value = "1)", L.style.cssText = "position:absolute;visibility:hidden;", 
        /^range$/.test(r) && L.style.WebkitAppearance !== n ? (S.appendChild(L), o = t.defaultView, 
        a = o.getComputedStyle && "textfield" !== o.getComputedStyle(L, null).WebkitAppearance && 0 !== L.offsetHeight, 
        S.removeChild(L)) : /^(search|tel)$/.test(r) || (a = /^(url|email)$/.test(r) ? L.checkValidity && !1 === L.checkValidity() : "1)" != L.value)), 
        W[e[s]] = !!a;
        return W;
    }(M), w.addTest("postmessage", "postMessage" in e), w.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect), 
    w.addTest("video", function() {
        var e = o("video"), t = !1;
        try {
            (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), 
            t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), 
            t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""));
        } catch (e) {}
        return t;
    }), w.addTest("webgl", function() {
        var t = o("canvas"), n = "probablySupportsContext" in t ? "probablySupportsContext" : "supportsContext";
        return n in t ? t[n]("webgl") || t[n]("experimental-webgl") : "WebGLRenderingContext" in e;
    }), T.testAllProps = b, w.addTest("cssanimations", b("animationName", "a", !0)), 
    w.addTest("backgroundsize", b("backgroundSize", "100%", !0)), w.addTest("borderimage", b("borderImage", "url() 1", !0)), 
    w.addTest("borderradius", b("borderRadius", "0px", !0)), w.addTest("boxshadow", b("boxShadow", "1px 1px", !0)), 
    function() {
        w.addTest("csscolumns", function() {
            var e = !1, t = b("columnCount");
            try {
                (e = !!t) && (e = new Boolean(e));
            } catch (e) {}
            return e;
        });
        for (var e, t, n = [ "Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside" ], r = 0; r < n.length; r++) e = n[r].toLowerCase(), 
        t = b("column" + n[r]), ("breakbefore" === e || "breakafter" === e || "breakinside" == e) && (t = t || b(n[r])), 
        w.addTest("csscolumns." + e, t);
    }(), w.addTest("flexbox", b("flexBasis", "1px", !0));
    var q = T.testStyles = s;
    !function() {
        var e = navigator.userAgent, t = e.match(/w(eb)?osbrowser/gi), n = e.match(/windows phone/gi) && e.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9;
        return t || n;
    }() ? q('@font-face {font-family:"font";src:url("https://")}', function(e, n) {
        var r = t.getElementById("smodernizr"), o = r.sheet || r.styleSheet, a = o ? o.cssRules && o.cssRules[0] ? o.cssRules[0].cssText : o.cssText || "" : "", i = /src/i.test(a) && 0 === a.indexOf(n.split(" ")[0]);
        w.addTest("fontface", i);
    }) : w.addTest("fontface", !1), q('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function(e) {
        w.addTest("generatedcontent", e.offsetHeight >= 6);
    });
    var V = T._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [ "", "" ];
    T._prefixes = V, w.addTest("cssgradients", function() {
        for (var e, t = "background-image:", n = "", r = 0, a = V.length - 1; a > r; r++) e = 0 === r ? "to " : "", 
        n += t + V[r] + "linear-gradient(" + e + "left top, #9f9, white);";
        w._config.usePrefixes && (n += t + "-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));");
        var i = o("a"), s = i.style;
        return s.cssText = n, ("" + s.backgroundImage).indexOf("gradient") > -1;
    }), w.addTest("hsla", function() {
        var e = o("a").style;
        return e.cssText = "background-color:hsla(120,40%,100%,.5)", a(e.backgroundColor, "rgba") || a(e.backgroundColor, "hsla");
    }), w.addTest("multiplebgs", function() {
        var e = o("a").style;
        return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background);
    }), w.addTest("opacity", function() {
        var e = o("a").style;
        return e.cssText = V.join("opacity:.55;"), /^0.55$/.test(e.opacity);
    }), w.addTest("cssreflections", b("boxReflect", "above", !0)), w.addTest("rgba", function() {
        var e = o("a").style;
        return e.cssText = "background-color:rgba(150,255,150,.5)", ("" + e.backgroundColor).indexOf("rgba") > -1;
    });
    var I = T.testProp = function(e, t, r) {
        return f([ e ], n, t, r);
    };
    w.addTest("textshadow", I("textShadow", "1px 1px")), w.addTest("csstransforms", function() {
        return -1 === navigator.userAgent.indexOf("Android 2.") && b("transform", "scale(1)", !0);
    });
    var U = "CSS" in e && "supports" in e.CSS, H = "supportsCSS" in e;
    w.addTest("supports", U || H), w.addTest("csstransforms3d", function() {
        var e = !!b("perspective", "1px", !0), t = w._config.usePrefixes;
        if (e && (!t || "webkitPerspective" in S.style)) {
            var n;
            w.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", 
            t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", 
            q("#modernizr{width:0;height:0}" + n, function(t) {
                e = 7 === t.offsetWidth && 18 === t.offsetHeight;
            });
        }
        return e;
    }), w.addTest("csstransitions", b("transition", "all", !0)), function() {
        var e, t, n, o, a, i, s;
        for (var l in x) if (x.hasOwnProperty(l)) {
            if (e = [], t = x[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
            for (o = r(t.fn, "function") ? t.fn() : t.fn, a = 0; a < e.length; a++) i = e[a], 
            s = i.split("."), 1 === s.length ? w[s[0]] = o : (!w[s[0]] || w[s[0]] instanceof Boolean || (w[s[0]] = new Boolean(w[s[0]])), 
            w[s[0]][s[1]] = o), C.push((o ? "" : "no-") + s.join("-"));
        }
    }(), delete T.addTest, delete T.addAsyncTest;
    for (var D = 0; D < w._q.length; D++) w._q[D]();
    e.Modernizr = w;
}(window, document);