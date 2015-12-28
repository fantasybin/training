(function(e) {
    var t = {
        id: "480af44578d235c173a8f1aab814651d",
        filename: "hogan-2.0.0-fixed-1.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        window.Hogan = {}; (function(e, t) {
            function n(e, t, n, r) {
                function i() {}
                function s() {}
                i.prototype = e;
                s.prototype = e.subs;
                var o;
                var u = new i;
                u.subs = new s;
                u.subsText = {};
                u.ib();
                for (o in t) {
                    u.subs[o] = t[o];
                    u.subsText[o] = r
                }
                for (o in n) {
                    u.partials[o] = n[o]
                }
                return u
            }
            function f(e) {
                return String(e === null || e === undefined ? "": e)
            }
            function l(e) {
                e = f(e);
                return a.test(e) ? e.replace(r, "&amp;").replace(i, "&lt;").replace(s, "&gt;").replace(o, "&#39;").replace(u, "&quot;") : e
            }
            e.Template = function(e, t, n, r) {
                e = e || {};
                this.r = typeof e === "function" ? e: e.code || this.r;
                this.c = n;
                this.options = r;
                this.text = t || "";
                this.partials = e.partials || {};
                this.subs = e.subs || {};
                this.ib()
            };
            e.Template.prototype = {
                r: function(e, t, n) {
                    return ""
                },
                v: l,
                t: f,
                render: function(t, n, r) {
                    return this.ri([t], n || {},
                    r)
                },
                ri: function(e, t, n) {
                    return this.r(e, t, n)
                },
                ep: function(e, t) {
                    var r = this.partials[e];
                    var i = t[r.name];
                    if (r.instance && r.base == i) {
                        return r.instance
                    }
                    if (typeof i == "string") {
                        if (!this.c) {
                            throw new Error("No compiler available.")
                        }
                        i = this.c.compile(i, this.options)
                    }
                    if (!i) {
                        return null
                    }
                    this.partials[e].base = i;
                    if (r.subs) {
                        i = n(i, r.subs, r.partials, this.text)
                    }
                    this.partials[e].instance = i;
                    return i
                },
                rp: function(e, t, n, r) {
                    var i = this.ep(e, n);
                    if (!i) {
                        return ""
                    }
                    return i.ri(t, n, r)
                },
                rs: function(e, t, n) {
                    var r = e[e.length - 1];
                    if (!c(r)) {
                        n(e, t, this);
                        return
                    }
                    for (var i = 0; i < r.length; i++) {
                        e.push(r[i]);
                        n(e, t, this);
                        e.pop()
                    }
                },
                s: function(e, t, n, r, i, s, o) {
                    var u;
                    if (c(e) && e.length === 0) {
                        return false
                    }
                    if (typeof e == "function") {
                        e = this.ms(e, t, n, r, i, s, o)
                    }
                    u = !!e;
                    if (!r && u && t) {
                        t.push(typeof e == "object" ? e: t[t.length - 1])
                    }
                    return u
                },
                d: function(e, t, n, r) {
                    var i = e.split("."),
                    s = this.f(i[0], t, n, r),
                    o = null;
                    if (e === "." && c(t[t.length - 2])) {
                        return t[t.length - 1]
                    }
                    for (var u = 1; u < i.length; u++) {
                        if (s && typeof s == "object" && s[i[u]] != null) {
                            o = s;
                            s = s[i[u]]
                        } else {
                            s = ""
                        }
                    }
                    if (r && !s) {
                        return false
                    }
                    if (!r && typeof s == "function") {
                        t.push(o);
                        s = this.mv(s, t, n);
                        t.pop()
                    }
                    return s
                },
                f: function(e, t, n, r) {
                    var i = false,
                    s = null,
                    o = false;
                    for (var u = t.length - 1; u >= 0; u--) {
                        s = t[u];
                        if (s && typeof s == "object" && s[e] != null) {
                            i = s[e];
                            o = true;
                            break
                        }
                    }
                    if (!o) {
                        return r ? false: ""
                    }
                    if (!r && typeof i == "function") {
                        i = this.mv(i, t, n)
                    }
                    return i
                },
                ls: function(e, t, n, r, i) {
                    var s = this.options.delimiters;
                    this.options.delimiters = i;
                    this.b(this.ct(f(e.call(t, r)), t, n));
                    this.options.delimiters = s;
                    return false
                },
                ct: function(e, t, n) {
                    if (this.options.disableLambda) {
                        throw new Error("Lambda features disabled.")
                    }
                    return this.c.compile(e, this.options).render(t, n)
                },
                b: t ?
                function(e) {
                    this.buf.push(e)
                }: function(e) {
                    this.buf += e
                },
                fl: t ?
                function() {
                    var e = this.buf.join("");
                    this.buf = [];
                    return e
                }: function() {
                    var e = this.buf;
                    this.buf = "";
                    return e
                },
                ib: function() {
                    this.buf = t ? [] : ""
                },
                ms: function(e, t, n, r, i, s, o) {
                    var u, a = t[t.length - 1],
                    f = e.call(a);
                    if (typeof f == "function") {
                        if (r) {
                            return true
                        } else {
                            u = this.activeSub && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text;
                            return this.ls(f, a, n, u.substring(i, s), o)
                        }
                    }
                    return f
                },
                mv: function(e, t, n) {
                    var r = t[t.length - 1];
                    var i = e.call(r);
                    if (typeof i == "function") {
                        return this.ct(f(i.call(r)), r, n)
                    }
                    return i
                },
                sub: function(e, t, n, r) {
                    var i = this.subs[e];
                    if (i) {
                        this.activeSub = e;
                        i(t, n, this, r);
                        this.activeSub = false
                    }
                }
            };
            var r = /&/g,
            i = /</g,
            s = />/g,
            o = /\'/g,
            u = /\"/g,
            a = /[&<>\"\']/;
            var c = Array.isArray ||
            function(e) {
                return Object.prototype.toString.call(e) === "[object Array]"
            }
        })(Hogan, true); (function(e) {
            function u(e, t, n) {
                return t.indexOf(e, n)
            }
            function f(t, n, r, i, s) {
                var o = [],
                u = null,
                h,
                p,
                d;
                h = i[i.length - 1];
                while ((p = t[n++]) != null) {
                    if (h && h.tag === "<" && !(p.tag in a)) {
                        throw new Error("Illegal content in < super tag.")
                    }
                    if (e.tags[p.tag] <= e.tags["$"] || l(p, s)) {
                        i.push(p);
                        d = f(t, n, p.tag, i, s);
                        p.nodes = d.instructions;
                        n = d.next
                    } else if (p.tag === "/") {
                        if (i.length === 0) {
                            throw new Error("Closing tag without opener: /" + p.n)
                        }
                        u = i.pop();
                        if (p.n !== u.n && !c(p.n, u.n, s)) {
                            throw new Error("Nesting error: " + u.n + " vs. " + p.n)
                        }
                        u.end = p.i;
                        return {
                            instructions: o,
                            next: n
                        }
                    } else if (p.tag === "\n") {
                        p.last = t.length == 0 || t[0].tag == "\n"
                    }
                    o.push(p)
                }
                if (i.length > 0) {
                    throw new Error("missing closing tag: " + i.pop().n)
                }
                return {
                    instructions: o,
                    next: n
                }
            }
            function l(e, t) {
                for (var n = 0,
                r = t.length; n < r; n++) {
                    if (t[n].o === e.n) {
                        e.tag = "#";
                        return true
                    }
                }
            }
            function c(e, t, n) {
                for (var r = 0,
                i = n.length; r < i; r++) {
                    if (n[r].c === e && n[r].o === t) {
                        return true
                    }
                }
            }
            function h(e) {
                var t = [];
                for (var n in e) {
                    t.push('"' + v(n) + '": function(c,p,t,i) {' + e[n] + "}")
                }
                return "{ " + t.join(",") + " }"
            }
            function p(e) {
                var t = [];
                for (var n in e.partials) {
                    t.push('"' + v(n) + '":{name:"' + v(e.partials[n].name) + '", ' + p(e.partials[n]) + "}")
                }
                return "partials: {" + t.join(",") + "}, subs: " + h(e.subs)
            }
            function v(e) {
                return e.replace(s, "\\\\").replace(n, '\\"').replace(r, "\\n").replace(i, "\\r")
            }
            function m(e) {
                return~e.indexOf(".") ? "d": "f"
            }
            function g(e, t) {
                var n = "<" + (t.prefix || "");
                var r = n + e.n + d++;
                t.partials[r] = {
                    name: e.n,
                    partials: {}
                };
                t.code.push('t.b(t.rp("' + v(r) + '",c,p,"' + (e.indent || "") + '"));');
                return r
            }
            function y(e, t) {
                t.code.push("t.b(t.t(t." + m(e.n) + '("' + v(e.n) + '",c,p,0)));')
            }
            function b(e) {
                return "t.b(" + e + ");"
            }
            var t = /\S/,
            n = /\"/g,
            r = /\n/g,
            i = /\r/g,
            s = /\\/g;
            var o = "".trim ?
            function(e) {
                return e.trim()
            }: function(e) {
                return e.replace(/^\s+/, "").replace(/\s+$/, "")
            };
            e.tags = {
                "#": 1,
                "^": 2,
                "<": 3,
                $: 4,
                "/": 5,
                "!": 6,
                ">": 7,
                "=": 8,
                _v: 9,
                "{": 10,
                "&": 11,
                _t: 12
            };
            e.scan = function(r, i) {
                function v() {
                    if (s.length > 0) {
                        a.push({
                            tag: "_t",
                            text: s
                        });
                        s = ""
                    }
                }
                function m() {
                    var n = true,
                    r = e.tags;
                    for (var i = c; i < a.length; i++) {
                        n = r[a[i].tag] < r["_v"] || a[i].tag == "_t" && a[i].text.match(t) === null;
                        if (!n) {
                            return false
                        }
                    }
                    return n
                }
                function g(e, t) {
                    v();
                    if (e && m()) {
                        for (var n = c,
                        r; n < a.length; n++) {
                            if (a[n].text) {
                                if ((r = a[n + 1]) && r.tag == ">") {
                                    r.indent = a[n].text.toString()
                                }
                                a.splice(n, 1)
                            }
                        }
                    } else if (!t) {
                        a.push({
                            tag: "\n"
                        })
                    }
                    f = false;
                    c = a.length
                }
                function y(e, t) {
                    var n = "=" + p,
                    r = e.indexOf(n, t),
                    i = o(e.substring(e.indexOf("=", t) + 1, r)).split(" ");
                    h = i[0];
                    p = i[1];
                    return r + n.length - 1
                }
                var s = "",
                a = [],
                f = false,
                l = 0,
                c = 0,
                h = "{{",
                p = "}}",
                d = e.tags;
                if (i) {
                    i = i.split(" ");
                    h = i[0];
                    p = i[1]
                }
                var b, w, E, S, x, T, N, C, k;
                while (true) {
                    b = u(h, r, l);
                    if (l !== b) {
                        N = b === -1 ? r.substring(l) : r.substring(l, b);
                        E = -1;
                        while (true) {
                            S = N.indexOf("\n", E + 1);
                            if (S !== -1) {
                                s = N.substring(E + 1, S);
                                g(f);
                                E = S
                            } else {
                                s = N.substring(E + 1);
                                break
                            }
                        }
                        v()
                    }
                    if (b === -1) {
                        g(f, true);
                        break
                    }
                    l = b + h.length;
                    x = r.charAt(l),
                    C = d[x],
                    k = C ? x: "_v";
                    if (k === "=") {
                        l = y(r, l - 1) + 1;
                        f = l - 1
                    } else {
                        if (C) l++;
                        T = k === "{" ? "}" + p: p;
                        w = u(T, r, l);
                        f = l - 1;
                        a.push({
                            tag: k,
                            n: o(r.substring(l, w)),
                            otag: h,
                            ctag: p,
                            i: k === "/" ? f - h.length: w + T.length
                        });
                        l = w + T.length
                    }
                }
                return a
            };
            var a = {
                _t: true,
                "\n": true,
                $: true,
                "/": true
            };
            e.stringify = function(t, n, r) {
                return "{code: function (c,p,i) { " + e.wrapMain(t.code.join("")) + " }," + p(t) + "}"
            };
            var d = 0;
            e.generate = function(t, n, r) {
                d = 0;
                var i = {
                    code: [],
                    subs: {},
                    partials: {}
                };
                e.walk(t, i);
                if (r.asString) {
                    return this.stringify(i, n, r)
                }
                return this.makeTemplate(i, n, r)
            };
            e.wrapMain = function(e) {
                return 'var t=this;t.b(i=i||"");' + e + "return t.fl();"
            };
            e.template = e.Template;
            e.makeTemplate = function(e, t, n) {
                var r = this.makePartials(e);
                r.code = new Function("c", "p", "i", this.wrapMain(e.code.join("")));
                return new this.template(r, t, this, n)
            };
            e.makePartials = function(e) {
                var t, n = {
                    subs: {},
                    partials: e.partials,
                    name: e.name
                };
                for (t in n.partials) {
                    n.partials[t] = this.makePartials(n.partials[t])
                }
                for (t in e.subs) {
                    n.subs[t] = new Function("c", "p", "t", "i", e.subs[t])
                }
                return n
            };
            e.codegen = {
                "#": function(t, n) {
                    n.code.push("if(t.s(t." + m(t.n) + '("' + v(t.n) + '",c,p,1),' + "c,p,0," + t.i + "," + t.end + ',"' + t.otag + " " + t.ctag + '")){' + "t.rs(c,p," + "function(c,p,t){");
                    e.walk(t.nodes, n);
                    n.code.push("});c.pop();}")
                },
                "^": function(t, n) {
                    n.code.push("if(!t.s(t." + m(t.n) + '("' + v(t.n) + '",c,p,1),c,p,1,0,0,"")){');
                    e.walk(t.nodes, n);
                    n.code.push("};")
                },
                ">": g,
                "<": function(t, n) {
                    var r = {
                        partials: {},
                        code: [],
                        subs: {},
                        inPartial: true
                    };
                    e.walk(t.nodes, r);
                    var i = n.partials[g(t, n)];
                    i.subs = r.subs;
                    i.partials = r.partials
                },
                $: function(t, n) {
                    var r = {
                        subs: {},
                        code: [],
                        partials: n.partials,
                        prefix: t.n
                    };
                    e.walk(t.nodes, r);
                    n.subs[t.n] = r.code.join("");
                    if (!n.inPartial) {
                        n.code.push('t.sub("' + v(t.n) + '",c,p,i);')
                    }
                },
                "\n": function(e, t) {
                    t.code.push(b('"\\n"' + (e.last ? "": " + i")))
                },
                _v: function(e, t) {
                    t.code.push("t.b(t.v(t." + m(e.n) + '("' + v(e.n) + '",c,p,0)));')
                },
                _t: function(e, t) {
                    t.code.push(b('"' + v(e.text) + '"'))
                },
                "{": y,
                "&": y
            };
            e.walk = function(t, n) {
                var r;
                for (var i = 0,
                s = t.length; i < s; i++) {
                    r = e.codegen[t[i].tag];
                    r && r(t[i], n)
                }
                return n
            };
            e.parse = function(e, t, n) {
                n = n || {};
                return f(e, 0, "", [], n.sectionTags || []).instructions
            };
            e.cache = {};
            e.cacheKey = function(e, t) {
                return [e, !!t.asString, !!t.disableLambda].join("||")
            };
            e.compile = function(t, n) {
                n = n || {};
                var r = e.cacheKey(t, n);
                var i = this.cache[r];
                if (i) {
                    return i
                }
                i = this.generate(this.parse(this.scan(t, n.delimiters), t, n), t, n);
                return this.cache[r] = i
            }
        })(Hogan)
    } (t.exports, t, e);
    e.____MODULES["480af44578d235c173a8f1aab814651d"] = t.exports
})(this); (function(e) {
    var t = {
        id: "3eab014e76bc87950932879578be9a36",
        filename: "index.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        e.____MODULES["480af44578d235c173a8f1aab814651d"]
    } (t.exports, t, e);
    e.____MODULES["3eab014e76bc87950932879578be9a36"] = t.exports
})(this); (function(e) {
    var t = {
        id: "9faeb6c2469aaa46a7423a5ede6c3856",
        filename: "imageURLFix.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        window.divide = function(e, t) {
            return Math.floor(e / t)
        };
        window.transferImageURL = function(e) {
            var t = e.split("/");
            var n;
            try {
                n = t[1].substring(0, t[1].length - 4)
            } catch(r) {}
            var i = divide(n, 1e9) + "/" + divide(n, 1e6) % 1e3 + "/" + divide(n, 1e3) % 1e3;
            var s;
            if ("small" == t[0]) s = "small";
            else if ("square75" == t[0]) s = "75";
            else if ("square60" == t[0]) s = "60";
            return "http://userimg.qunar.com/imgs/h/" + s + "/" + i + "/" + t[1]
        };
        window.getImageUrl = function(e, t) {
            if (e && e.length > 7 && e.substring(0, "http://".length) == "http://") return e;
            e = e || "";
            t = t || "76";
            return "http://userimg.qunar.com/imgs/" + e + (t + "") + ".jpg"
        }
    } (t.exports, t, e);
    e.____MODULES["9faeb6c2469aaa46a7423a5ede6c3856"] = t.exports
})(this); (function(e) {
    var t = {
        id: "45fc1ca5292cf7c8c585eca45879567e",
        filename: "Parameter.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        window.XMap = function(e) {
            this._map = {};
            var t = 0;
            if (e) {
                var n = this._map;
                for (var r in e) {
                    var i = e[r];
                    n[r] = i == null ? NONE: i;
                    t++
                }
            }
            this._size = t
        };
        $jsex.exec(function() {
            var e = new Object;
            XMap.prototype.get = function(t) {
                var n = this._map[t];
                return n === e ? null: n
            };
            XMap.prototype.put = function(t, n) {
                var r = this._map[t];
                if (typeof r === "undefined") this._size++;
                if (n == null) n = e;
                this._map[t] = n;
                return r
            };
            XMap.prototype.keys = function() {
                var e = [];
                var t = this._map;
                for (var n in t) e.push(n);
                return e
            };
            XMap.prototype.contains = function(e) {
                return this._map[e] != null
            };
            XMap.prototype.remove = function(t) {
                var n = this._map[t];
                if (n != null) this._size--;
                if (n === e) n = null;
                delete this._map[t];
                return n
            };
            XMap.prototype.size = function() {
                return this._size
            };
            XMap.prototype.clear = function() {
                this._map = {};
                this._size = 0
            };
            XMap.prototype.toArray = function() {
                var t = this._map;
                var n = [];
                for (var r in t) {
                    v = t[r];
                    if (v === e) v = null;
                    n.push([r, v])
                }
                return n
            };
            XMap.prototype.toString = function() {
                var e = [];
                var t = this._map;
                for (var n in t) {
                    e.push(n + ": " + t[n])
                }
                return e.join("\n")
            }
        });
        window.Parameter = function() {
            XMap.call(this)
        };
        Parameter.parseURL = function(e, t) {
            if (!t) t = "?";
            if (e == null) return null;
            var n = e.indexOf(t);
            if (n != -1) e = e.substring(n + 1);
            e = e.replace(/\+/g, "%20");
            var r = new Parameter;
            if ($jsex.trim(e) == "") return r;
            var i = e.split("&");
            for (var s = 0; s < i.length; s++) {
                var o = i[s].split("=");
                try {
                    r.addParameter(decodeURIComponent(o[0]), o[1] == null ? "": decodeURIComponent(o[1]))
                } catch(u) {}
            }
            return r
        };
        $jsex._(Parameter, XMap);
        Parameter.prototype.addParameter = function(e, t) {
            var n = this.get(e);
            if (n == null) this.put(e, n = []);
            n.push(t)
        };
        Parameter.prototype.setParameter = function(e, t) {
            this.put(e, [t])
        };
        Parameter.prototype.getParameter = function(e) {
            var t = this.get(e);
            return t == null ? null: t[0]
        };
        Parameter.prototype.getParameterValues = function(e) {
            var t = this.get(e);
            return t == null ? [] : t
        };
        Parameter.prototype.getParameterNames = function() {
            return this.keys()
        };
        Parameter.prototype.toURL = function() {
            var e = [];
            var t = this.toArray();
            for (var n = 0; n < t.length; n++) {
                var r = t[n][1];
                for (var i = 0; i < r.length; i++) {
                    e.push(encodeURIComponent(t[n][0]) + "=" + encodeURIComponent(r[i]))
                }
            }
            return e.join("&")
        }
    } (t.exports, t, e);
    e.____MODULES["45fc1ca5292cf7c8c585eca45879567e"] = t.exports
})(this); (function(e) {
    var t = {
        id: "0c6bd61d67093c4e407e594e5b740458",
        filename: "qhtrace.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) { (function(e) {
            var t = "http://qhs.qunar.com/collect";
            if (!e.QHPTrace) {
                e.QHPTrace = {}
            }
            var n = function(e, t, n) {
                var r = ["" + e],
                i = ("" + e).length;
                if (typeof n == "undefined") {
                    n = "0"
                }
                while (i < t) {
                    r.unshift(n);
                    i += n.length
                }
                return r.join("")
            };
            var r = e.SERVER_TIME || (new Date).getTime();
            if (typeof r == "object" && r.getTime) {
                r = r.getTime()
            }
            if (document.cookie.indexOf("QN70=") < 0) {
                var i = "" + n(Math.floor(Math.random() * 1e10).toString(16), 9) + r.toString(16);
                document.cookie = "QN70=" + i + ";domain=.qunar.com;path=/;"
            }
            var s = Math.floor(r / 100) % 864e3;
            var o = function(e) {
                var t = [],
                n;
                if ((n = e.indexOf("#")) >= 0 && n < e.length - 1) {
                    t.push(e.substring(e.indexOf("#") + 1));
                    e = e.substring(0, e.indexOf("#"))
                }
                if ((n = e.indexOf("?")) >= 0 && n < e.length - 1) {
                    t.push(e.substring(e.indexOf("?") + 1))
                }
                t = t.join("&");
                var r = {},
                i = t.split("&");
                if (i && i.length > 0) {
                    for (var s = 0; s < i.length; s++) {
                        var o = i[s];
                        if (o) {
                            o = o.split("=");
                            if (o.length > 1 && o[1] !== "") {
                                if (typeof r[o[0]] != "undefined") {
                                    if (Object.prototype.toString.call(r[o[0]]) === "[object Array]") {
                                        r[o[0]].push(o[1])
                                    } else {
                                        r[o[0]] = [r[o[0]], o[1]]
                                    }
                                } else {
                                    r[o[0]] = o[1]
                                }
                            }
                        }
                    }
                }
                return r
            };
            var u = !!document.getElementsByClassName;
            var a = function(e, t) {
                t = t || document;
                if (!e) {
                    return []
                }
                if (u) {
                    return t.getElementsByClassName(e)
                } else {
                    var n = [];
                    var r = function(e, t) {
                        var i = t.firstChild;
                        while (i) {
                            if (i.nodeType == 1) {
                                if (i.className.indexOf(e) >= 0) {
                                    n.push(i)
                                }
                                r(e, i)
                            }
                            i = i.nextSibling
                        }
                    };
                    r(e, t);
                    return n
                }
            };
            var f = function(e) {
                var t = new Image;
                t.onload = function() {
                    t.onload = null;
                    t = null
                };
                t.src = e
            };
            var l = function(r, i, u, c, h) {
                var p, d = location.href,
                v, m;
                var g = o(d);
                g["http_referer"] = document.referrer;
                var y = p = g["QHFP"];
                m = g["QHP"];
                var b = r || "ZS";
                var w = i || "I0";
                if (!p) {
                    p = b + w + (e.SERVER_GROUP || "_") + n(s.toString(16), 5, "0").toUpperCase() + n(Math.floor(255 * Math.random()).toString(16), 2, "0").toUpperCase()
                }
                var E = this;
                this.from = p;
                this.urlfrom = y;
                this.channel = r;
                this.generateNewVal = function(t, r, i) {
                    t = t || "ZS";
                    r = r || "I0";
                    s++;
                    return t + r + (i || e.SERVER_GROUP || "_") + n(s.toString(16), 5, "0").toUpperCase() + n(Math.floor(255 * Math.random()).toString(16), 2, "0").toUpperCase()
                };
                if (typeof m == "string" && m.length >= 4) {
                    r = m.substr(0, 2);
                    i = m.substr(2, 2)
                }
                this.initialPageFrom = this.pageFrom = this.generateNewVal(r, i);
                this.navigate = function(e, n, r) {
                    var i = this.generateNewVal(e, n);
                    var s = this;
                    f(t + "?" + "&QHFP=" + s.initialPageFrom + "&QHP=" + i + S(r));
                    E.pageFrom = i
                };
                this.generate = function() {
                    return "&QHFP=" + this.pageFrom
                };
                this.getQHFP = function() {
                    return this.pageFrom
                };
                var S = function(e) {
                    if (e && typeof e === "string") {
                        var t = e.split("&");
                        var n, r = {};
                        for (var i = 0,
                        s = t.length; i < s; i++) {
                            n = t[i].split("=");
                            r[n[0]] = n[1]
                        }
                        for (var o in r) {
                            g[o] = r[o]
                        }
                    }
                    var u = "";
                    for (var a in g) {
                        if (a === "QHFP" || a === "QHP") {
                            continue
                        }
                        u += "&" + a + "=" + encodeURIComponent(g[a])
                    }
                    return u
                };
                e.QHPTrace["QHFP"] = y ? y: "";
                e.QHPTrace["QHP"] = this.pageFrom ? this.pageFrom: "";
                if (!h) {
                    f(t + "?" + "&QHFP=" + (y ? y: "") + "&QHP=" + this.pageFrom + S(u) + (c ? "&" + c: ""))
                }
                var x = a("q_header_hotel");
                var T = null;
                if (x && x.length > 0) {
                    x = x[0];
                    x = a("q_header_sub_nav", x);
                    if (x && x.length > 0) {
                        T = x[0].getElementsByTagName("a")
                    }
                }
                if (T && T.length) {
                    var N = T.length;
                    for (var C = 0; C < N; C++) {
                        var k = T[C];
                        var L = k.getAttribute("href");
                        if (L.indexOf("#") <= 0) {
                            L += "#" + this.generate()
                        }
                        k.setAttribute("href", L)
                    }
                }
                l.instance = this
            };
            l.parseURL = o;
            if (e.QHTrace) {
                e._QHTrace = e.QHTrace
            }
            e.QHTrace = l
        })(window)
    } (t.exports, t, e);
    e.____MODULES["0c6bd61d67093c4e407e594e5b740458"] = t.exports
})(this); (function(e) {
    var t = {
        id: "c14f1ef20d545971d81f869effbeb1e2",
        filename: "jquery.placeholder.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) { (function(e) {
            var t = "0.1.0";
            e.fn.placeholder = function() {
                return e(this).each(function() {
                    var t = e(this);
                    var n = t.css("color");
                    var r = t.attr("data-placeholder");
                    var i = t.attr("data-placeholder-color") || "#999";
                    var s = t.attr("data-placeholder-clsname");
                    if (!r) return;
                    if (this.isPlaceHolderEmpty && this.initPlaceHolder) {
                        this.initPlaceHolder();
                        return
                    }
                    var o = function() {
                        return e.trim(t.val()) == "" || t.val() == r
                    };
                    this.isPlaceHolderEmpty = o;
                    var u = function() {
                        if (s) {
                            t.removeClass(s)
                        } else {
                            t.css("color", n)
                        }
                    };
                    var a = function() {
                        if (s) {
                            t.addClass(s)
                        } else {
                            t.css("color", i)
                        }
                    };
                    t.focus(function() {
                        if (o()) {
                            t.val("");
                            u()
                        }
                    }).blur(function() {
                        if (o()) {
                            t.val(r);
                            a()
                        } else {
                            u()
                        }
                    });
                    this.initPlaceHolder = function() {
                        if (o()) {
                            t.val(r);
                            a()
                        } else {
                            u()
                        }
                    };
                    this.initPlaceHolder()
                })
            }
        })(jQuery)
    } (t.exports, t, e);
    e.____MODULES["c14f1ef20d545971d81f869effbeb1e2"] = t.exports
})(this); (function(e) {
    var t = {
        id: "54fecab6de53e4af1677a16f14fe59c8",
        filename: "QunarHotelHistory.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        window.QunarHotelHistory = {
            _MAX_SIZE: 12,
            _DATA_NAME: "hotelSeqs",
            init: function(e) {
                this._userData = e;
                this._hotelSeqs = this._userData.getItem(this._DATA_NAME) ? this._userData.getItem(this._DATA_NAME).split(",") : []
            },
            addHotel: function(e) {
                this.removeHotel(e);
                var t = this._hotelSeqs,
                n = t.length;
                if (n >= this._MAX_SIZE) {
                    t = t.slice(n - this._MAX_SIZE + 1)
                }
                t.push(e);
                this._hotelSeqs = t;
                this._userData.setItem(this._DATA_NAME, t.join(","))
            },
            getHotels: function() {
                return this._hotelSeqs
            },
            removeHotel: function(e) {
                var t = this._hotelSeqs,
                n = [],
                r = t.length;
                for (var i = 0; i < r; i++) {
                    if (t[i] != e) {
                        n.push(t[i])
                    }
                }
                this._hotelSeqs = n;
                this._userData.setItem(this._DATA_NAME, n.join(","))
            },
            clearAllHotels: function() {
                this._hotelSeqs = [];
                this._userData.removeItem(this._DATA_NAME)
            }
        }
    } (t.exports, t, e);
    e.____MODULES["54fecab6de53e4af1677a16f14fe59c8"] = t.exports
})(this); (function(e) {
    var t = {
        id: "309e5f71d563e64883263e4799629d2f",
        filename: "index.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        e.____MODULES["54fecab6de53e4af1677a16f14fe59c8"]
    } (t.exports, t, e);
    e.____MODULES["309e5f71d563e64883263e4799629d2f"] = t.exports
})(this); (function(e) {
    var t = {
        id: "e418c5b77de7a5d9b152c4199db043d1",
        filename: "HotelHistory.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        window.HotelHistory = new
        function() {
            var e = 6;
            var t = "hhs";
            var n = new Date(2111, 11, 11);
            this.add = function(i) {
                var s = this.get();
                s = r(s, i);
                if (s.length >= e) {
                    s = s.slice(s.length - e + 1)
                }
                s.push(i);
                Cookie.setCookie(t, s.join(","), n, null, "/city/")
            };
            var r = function(e, t) {
                var n = [];
                for (var r = 0; r < e.length; r++) {
                    if (e[r] != t) {
                        n.push(e[r])
                    }
                }
                return n
            };
            var i = function(e) {
                var e = r(r(e, ""), 0);
                var t = [];
                var n = {};
                for (var i = 0; i < e.length; i++) {
                    if (!n[e[i]]) {
                        t.push(e[i]);
                        n[e[i]] = 1
                    }
                }
                return t
            };
            this.get = function() {
                var e = Cookie.values[t];
                if (e == null) {
                    return []
                } else {
                    return i(e.split(","))
                }
            };
            this.del = function() {
                if (arguments.length <= 0) return;
                var e = arguments[0];
                var i = this.get();
                i = r(i, e);
                Cookie.setCookie(t, i.join(","), n, null, "/city/");
                $jsex.event.trigger(this, "delete", arguments)
            }
        }
    } (t.exports, t, e);
    e.____MODULES["e418c5b77de7a5d9b152c4199db043d1"] = t.exports
})(this); (function(e) {
    var t = {
        id: "f59709ddf94cecd46fa4de0179ef838b",
        filename: "ugcTpl.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        var r = ['<div class="m-hotel-ugc" style="width:288px">', '<div class="sleeper-stamp png24">', '<a href="http://hotelzt.qunar.com/shishuiyuan/index.html?from=shouyeuser" class="stamp-icon" target="_blank">&nbsp;</a>', "</div>", "{{#isLogin}}", '<div class="m-hotel-ugc-hd clrfix">', '<div class="user-pic">', '<div class="user-picture js-userpic">', '<a href="http://tips.qunar.com/" target="_blank" data-flag="userinform">', '<img alt="{{nickNameTitle}}" class="user-img" src="http://headshot.user.qunar.com/avatar/{{encodeUserName}}.png?l" />', "</a>", '<a href="http://user.qunar.com/index.jsp#basic" class="modifly-pic js-modify" data-flag="userinform" target="_blank" >&nbsp;</a>', '<a href="http://user.qunar.com/index.jsp#basic" class="upload-pic js-upload" data-flag="userinform" target="_blank">&nbsp;</a>', '<div class="user-circle png24"></div><a href="http://tips.qunar.com/" target="_blank" data-flag="userinform" class="user-pic-link"></a>', "</div>", "{{#isSleep}}", '<div class="agency js-sleeper">', '<a href="http://hotelzt.qunar.com/shishuiyuan/index.html?from=shouyeuser" data-flag="sleep_pic" target="_blank"><span class="ico-trysleep"></span></a>', '<div class="m-introduce-pop">', '<div class="m-introduce-pop-hd">', '<div class="top"></div>', '<div class="bottom"></div>', "</div>", '<div class="m-introduce-bd">', "<h6>试睡员V{{connoisseurLevel}}</h6>", "<p>试睡员是去哪儿网数千万用户中产生的酒店体验专家，他们提供最专业，最客观的酒店点评。</p>", "</div>", "</div>", "</div>", "{{/isSleep}}", "</div>", '<div class="user-baseinfo">', '<div class="user-name">', '<a href="http://tips.qunar.com/" target="_blank" data-flag="userinform" title="{{nickNameTitle}}">{{nickName}}</a>', '<a href="http://review.qunar.com/mall/2013.htm#level" target="_blank" data-flag="userinform"><span class="ico-lv ico-lv{{level}} js-level"></span></a>', '<div class="js-levelhover user-lever" >', '<div class="m-introduce-pop">', '<div class="m-introduce-pop-hd js-trangle">', '<div class="top"></div>', '<div class="bottom"></div>', "</div>", '<div class="m-introduce-bd">', '<h6><span class="ico-lv ico-lv{{level}}"></span>{{{levelmain}}}</h6>', "<p>累积点评酒店即可升等级，同时获得积分兑换免费房等好礼。</p>", "</div>", "</div>", "</div>", "</div>", '<div class="score-show js-score"><span class="score-bg"><span class="now-score" style="width:{{{basenext}}}"><em>{{experienceBase}}/{{experienceNext}}</em></span></span>', '<div class="score-info js-scoretip">', '<div class="m-introduce-pop">', '<div class="m-introduce-pop-hd">', '<div class="top"></div>', '<div class="bottom"></div>', "</div>", '<div class="m-introduce-bd">', '<p class="js_becon" data-flag="userinform">{{titleTip}}</p>', "</div>", "</div>", "</div>", "</div>", '<div class="membership-discount">', "{{{discount}}}", "</div>", "</div>", "</div>", "{{/isLogin}}", "{{^isLogin}}", '<div class="m-hotel-ugc-hd m-no-login clrfix">', '<div class="user-pic">', '<div class="user-picture">', '<a href="#"><img src="http://simg1.qunarzz.com/hotel/homesearch/user_defout.jpg" /></a>', '<div class="user-circle png24"></div>', "</div>", "</div>", '<div class="user-baseinfo">', '<div class="greetings">HI，你好！</div>', '<div class="membership-desc">可以通过点评获得积分~</div>', '<div class="btn-content">', '<span class="btn-login">', '<a href="#" data-flag="login" onclick="return false;"><b>登录</b></a>', "</span>", '<span class="btn-reg">', '<a href="#" onclick="return false;" data-flag="registered"><b>免费注册</b></a>', "</span>", "</div>", "</div>", "</div>", "{{/isLogin}}", '<div class="m-hotel-ugc-bd">', "{{#isLogin}}", '<div class="integral-digit">', '<span class="change-gift"><a href="http://review.qunar.com/mall/" title="兑换礼品" target="_blank" data-flag="moreGift">兑换礼品<i class="icon-jt"></i></a></span>', '<a href="http://review.qunar.com/mall/records/receiveScore.htm" target="_blank" data-flag="integral">点评积分<b>{{points}}</b></a>', "</div>", '<div class="comment-acoount">', '<ul class="comment-type clrfix">', '<li class="no-bd">', '<a href="http://tips.qunar.com/user/profile/{{uid}}.htm?onlycomments" target="_blank" data-flag="comments"><span class="quantity">{{reviewCount}}</span><br />点评</a>', "</li>", '<li class="comt_3">', '<a href="http://tips.qunar.com/feed/receiveCommentList.htm" target="_blank" data-flag="discuss"><span class="quantity">{{receivedReplyCount}}<span class="notice-tips-ct js_newreview" style="display:none"><i class="icon-notice"></i></span></span><br />评论</a>', "</li>", '<li class="comt_4">', '<a href="http://tips.qunar.com/relation/follower/{{uid}}.htm" target="_blank" data-flag="fans"><span class="quantity">{{followerCount}}<span class="notice-tips-ct js_newfriend" style="display:none"><i class="icon-notice"></i></span></span><br />粉丝</a>', '<span class="js_new_point notic_tip hide"><a href="http://tips.qunar.com/relation/follower/{{uid}}.htm" target="_blank" data-flag="fans" class="red_radious">&nbsp;</a></span>', "</li>", "</ul>", "</div>", '<div class="ugc-right-banner js-ugcad"></div>', '<div class="comment-hotel js-hotel">', "{{#iscommentedOrders}}", '<div class="comment-title">', '<span class="wt-border"></span>', '<span class="it-title">点评入住过的酒店</span>', '<span class="more-gift"><a href="http://review.qunar.com/h/find/?from=homeugc_loggedin" target="_blank" data-flag="queryReview">我要点评</a></span>', "</div>", "{{#uncommentedOrdersFormat}}", '<div class="comment-item clrfix js-inhotel">', '<p class="comment-pic"><a href="http://{{#bnb}}bnb{{/bnb}}{{^bnb}}hotel{{/bnb}}.qunar.com/city/{{cityName}}/dt-{{hotelCode}}/?from=homeugc" data-flag="hotelDetail" target="_blank"><img src="http://userimg.qunar.com/imgs/{{hotelImage}}76.jpg" /></a></p>', '<div class="comment-info">', '<h5><a href="http://{{#bnb}}bnb{{/bnb}}{{^bnb}}hotel{{/bnb}}.qunar.com/city/{{cityName}}/dt-{{hotelCode}}/?from=homeugc" title="{{hotelNameTitle}}" data-flag="hotelDetail" target="_blank">{{hotelName}}</a>{{#star}}{{{star}}}{{/star}}{{^star}}<em>{{{grade}}}</em>{{/star}}</h5>', '<div class="review-cont clrfix">', '<div class="now-review"><b><a href="http://review.qunar.com/h/{{hotelSeq}}/step1?order={{orderNo}}&orderFrom=homeHotelOrder&from=homeugc_order" target="_blank" data-flag="nowReview">点评</a></b></div>', '<div class="data">{{checkIn}}</div>', "</div>", "</div>", "</div>", "{{/uncommentedOrdersFormat}}", "{{/iscommentedOrders}}", "{{^iscommentedOrders}}", '<div class="comment-title">', '<span class="wt-border"></span>', '<span class="it-title">点评入住过的酒店</span>', '<span class="more-gift"><a href="http://review.qunar.com/h/find/?from=homeugc_loggedin" target="_blank" data-flag="queryReview">我要点评</a></span>', "</div>", '<div class="no-review js-noreview">没有发现待点评的酒店...<br />', '<a href="http://review.qunar.com/h/find/?from=homeugc_loggedin" data-flag="reviewpresent" target="_blank">点评得好礼</a>', "</div>", "{{/iscommentedOrders}}", "</div>", "{{/isLogin}}", "{{^isLogin}}", '<div class="ugc-right-banner js-ugcad">', "</div>", '<div class="sleeper-review">', '<div class="sleeper-title">', '<span class="wt-border"></span><span class="sl-title">试睡员教你住酒店</span><span class="more-gift"><a data-flag="unlogincom" target="_blank" class="more_info" href="http://review.qunar.com/h/find/?from=homeugc_notlogin">我要点评</a></span>', "</div>", '<div class="sleeper-list clrfix">', '<div class="sleeper-picture">', '<p class="sleeper-pic">', '<a href="http://tips.qunar.com/user/profile/{{uid}}.htm" data-flag="sleep_pic" target="_blank"><img src="http://headshot.user.qunar.com/avatar/{{encodeUserName}}.png?l" /></a>', '<span class="sleeper-default png24"></span>', '<a class="sleeper-default-link" href="http://tips.qunar.com/user/profile/{{uid}}.htm" data-flag="sleep_pic" target="_blank"></a>', "</p>", '<div class="agency js-sleeper">', '<a href="http://hotelzt.qunar.com/shishuiyuan/index.html?from=shouyeuser" data-flag="sleep_pic" target="_blank"><span class="ico-trysleep"></span></a>', '<div class="m-introduce-pop">', '<div class="m-introduce-pop-hd">', '<div class="top"></div>', '<div class="bottom"></div>', "</div>", '<div class="m-introduce-bd">', "<h6>试睡员V{{connoisseurLevel}}</h6>", "<p>试睡员是去哪儿网数千万用户中产生的酒店体验专家，他们提供最专业，最客观的酒店点评。</p>", "</div>", "</div>", "</div>", "</div>", '<div class="sleeper-info">', '<h4><a href="{{titleUrl}}" data-flag="sleepTopic" target="_blank" title="{{titleTitle}}">{{title}}</a></h4>', '<p><a href="{{introUrl}}" data-flag="sleepTopic" target="_blank" title="{{introTitle}}">{{intro}}</a></p>', "</div>", "</div>", "</div>", "{{/isLogin}}", '<div class="integral-mall">', '<div class="integral-title">', '<span class="wt-border"></span>', '<span class="it-title">积分商城热门好礼</span>', '<span class="more-gift"><a href="http://review.qunar.com/mall/?from=shouyeuser00" class="more_info" target="_blank" data-flag="moreGift">更多好礼</a></span>', "</div>", "{{#hotProductsFormat}}", '<div class="intergral-item clrfix js-intergral">', '<p class="intergral-pic"><a href="http://review.qunar.com/mall/products/{{id}}.htm?from=shouyeuser0{{i}}" data-flag="change" target="_blank"><img src="http://userimg.qunar.com/imgs/{{image}}76.jpg" /></a></p>', '<div class="intergral-info">', "<h5>", '<a href="http://review.qunar.com/mall/products/{{id}}.htm?from=shouyeuser0{{i}}" data-flag="change" target="_blank"><span class="intergral-ct"><b>{{creditPrice}}积分</b></span></a>', '<a href="http://review.qunar.com/mall/products/{{id}}.htm?from=shouyeuser0{{i}}" data-flag="change" target="_blank" title="{{nameTitle}}">{{name}}</a>', "</h5>", "<p>", '<a href="http://review.qunar.com/mall/products/{{id}}.htm?from=shouyeuser0{{i}}" data-flag="change" target="_blank" title="{{descriptionTitle}}">{{description}}</a>', "</p>", "</div>", "</div>", "{{/hotProductsFormat}}", "</div>", "</div>", "</div>"].join("");
        var i = ["{{#hasHistory}}", '<div class="comment-title">', '<span class="wt-border"></span>', '<span class="it-title">点评浏览过的酒店</span>', '<span class="more-gift"><a href="http://review.qunar.com/h/find/?from=homeugc_loggedin" target="_blank" data-flag="queryReview">我要点评</a></span>', "</div>", "{{#history}}", '<div class="comment-item clrfix js-inhotel">', '<p class="comment-pic">', '<a href="{{detailDomainPath}}{{detailContextPath}}?from=homeugc" data-flag="hotelDetail" target="_blank"><img src={{imageUrl}} /></a>', "</p>", '<div class="comment-info">', '<h5><a href="{{detailDomainPath}}{{detailContextPath}}?from=homeugc" title="{{hotelNameTitle}}" data-flag="hotelDetail" target="_blank">{{hotelName}}</a>', "{{#star}}{{{star}}}{{/star}}{{^star}}<em>{{{grade}}}</em>{{/star}}</h5>", '<div class="review-cont clrfix">', '<div class="now-review"><b><a href="http://review.qunar.com/h/{{seqs}}/step1?from=homeugc_view" target="_blank"  data-flag="nowhreview">点评</a></b></div>', '<div class="score-info">{{{score}}}</div>', "</div>", "</div>", "</div>", "{{/history}}", "{{/hasHistory}}", "{{^hasHistory}}", '<div class="comment-title">', '<span class="wt-border"></span>', '<span class="it-title">点评入住过的酒店</span>', '<span class="more-gift"><a href="http://review.qunar.com/h/find/?from=homeugc_loggedin" target="_blank" data-flag="queryReview">我要点评</a></span>', "</div>", '<div class="no-review">没有发现待点评的酒店...<br />', '<a href="http://review.qunar.com/h/find/?from=homeugc_loggedin" data-flag="reviewpresent" target="_blank">点评得好礼</a>', "</div>", "{{/hasHistory}}"].join("");
        var s = {
            ugcTpl: function(e) {
                return Hogan.compile(r).render(e)
            },
            historyHotel: function(e) {
                return Hogan.compile(i).render(e)
            }
        };
        t.exports = s
    } (t.exports, t, e);
    e.____MODULES["f59709ddf94cecd46fa4de0179ef838b"] = t.exports
})(this); (function(e) {
    var t = {
        id: "b4dbc1de1386c8f6395c15cae0cc3fa0",
        filename: "ugcFormat.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        var r = {
            getLevelInfo: function(e) {
                var t = "";
                switch (e + "") {
                case "1":
                    t = "点评新手";
                    break;
                case "2":
                    t = "初级点评师 ";
                    break;
                case "3":
                    t = "中级点评师 ";
                    break;
                case "4":
                    t = "高级点评师 ";
                    break;
                case "5":
                    t = "点评达人 ";
                    break;
                case "6":
                    t = "高级点评达人 ";
                    break;
                case "7":
                    t = "点评大师 ";
                    break;
                case "8":
                    t = "首席点评家 ";
                    break;
                default:
                    t = ""
                }
                return t
            },
            getDangciInfo: function(e) {
                var t = "";
                switch (e + "") {
                case "0":
                    t = "";
                    break;
                case "1":
                    t = '<em class="dangci" title="去哪儿网用户评定为经济型酒店">经济型</em>';
                    break;
                case "2":
                    t = '<em class="dangci" title="去哪儿网用户评定为舒适型酒店">舒适型</em>';
                    break;
                case "3":
                    t = '<em class="dangci" title="去哪儿网用户评定为高档型酒店">高档型</em>';
                    break;
                case "4":
                    t = '<em class="dangci" title="去哪儿网用户评定为豪华型酒店">豪华型</em>';
                    break;
                default:
                    t = ""
                }
                return t
            },
            getStarInfo: function(e) {
                var t = "";
                switch (e + "") {
                case "1":
                    t = '<em class="star star10" title="国家旅游局评定为一星级"></em>';
                    break;
                case "2":
                    t = '<em class="star star20" title="国家旅游局评定为二星级"></em>';
                    break;
                case "3":
                    t = '<em class="star star30" title="国家旅游局评定为三星级"></em>';
                    break;
                case "4":
                    e;
                    t = '<em class="star star40" title="国家旅游局评定为四星级"></em>';
                    break;
                case "5":
                    t = '<em class="star star50" title="国家旅游局评定为五星级"></em>';
                    break;
                default:
                    t = ""
                }
                return t
            },
            getDiscount: function(e, t) {
                if (t == 1) {
                    return '<i class="icon-gray-discount"></i><b>达到' + "<cite>" + "LV" + (t + 1) + "</cite>" + "将尊享" + "<cite>" + 9.5 + "</cite>" + "折兑换礼品</b > "
                } else {
                    return '<i class="icon-discount"></i><b>享' + "<cite>" + e / 10 + "</cite>" + "折积分兑换礼品</b>"
                }
            },
            getTitleTip: function(e, t, n) {
                if (e > 6) {
                    return "继续提升" + (n - t) + "经验值，会有惊喜"
                }
                return "再有" + (n - t) + "经验值，您就达到LV" + (e + 1) + ""
            },
            getScore: function(e, t, n, r) {
                if (!e) {
                    return "<em>暂无评论</em>"
                }
                var i = r ? "?from=homeugc#scroll=comment": "/comments.html?from=homeugc";
                return '<a href="' + t + n + i + '" target="_blank" data-flag="hotelDetail"><span class="m-star m-star-mini"><em class="in" style="width:' + e / 5 * 100 + '%;"></em></span><span class="score"><b>' + e + "</b>分</span></a>"
            },
            getHotelDesc: function(e, t) {
                if (e) {
                    return this.getStarInfo(e)
                }
                return this.getDangciInfo(t)
            },
            _Percentage: function(e, t) {
                return e / t * 100 + "%"
            },
            _sliceText: function(e, t) {
                return e.length > t ? e.slice(0, t - 1) + "...": e.slice(0, t)
            },
            getCityname: function(e) {
                var t = e;
                var n = t.lastIndexOf("_");
                t = t.substring(0, n);
                return t
            },
            getCode: function(e) {
                var t = e;
                var n = t.lastIndexOf("_") + 1;
                var r = t.length;
                t = t.substring(n, r);
                return t
            },
            getIndate: function(e) {
                var e = new Date(e);
                var t = e.getMonth() + 1;
                var n = e.getDate();
                t = parseInt(t) < 10 ? "0" + t: t;
                n = parseInt(n) < 10 ? "0" + n: n;
                e = e.getFullYear() + "-" + t + "-" + n;
                return e
            },
            getUncommentedOrdersFormat: function(e) {
                var t = [];
                if (e && e.length) {
                    e.splice(2, e.length - 2);
                    for (var n = 0; n < e.length; n++) {
                        var r = {
                            hotelNameTitle: e[n].hotelName.length > 11 ? e[n].hotelName: "",
                            hotelName: this._sliceText(e[n].hotelName, 11),
                            star: this.getStarInfo(e[n].star),
                            grade: this.getDangciInfo(e[n].grade),
                            checkIn: this.getIndate(e[n].checkIn),
                            cityName: this.getCityname(e[n].hotelSeq),
                            hotelCode: this.getCode(e[n].hotelSeq),
                            hotelImage: e[n].hotelImage,
                            hotelSeq: e[n].hotelSeq,
                            orderNo: e[n].orderNo
                        };
                        t.push(r)
                    }
                }
                return t
            },
            getHotProducts: function(e) {
                var t = [];
                if (e) {
                    e.splice(2, e.length - 2);
                    for (var n = 0; n < e.length; n++) {
                        var r = {
                            i: n + 1,
                            id: e[n].id,
                            creditPrice: e[n].creditPrice,
                            image: e[n].image,
                            nameTitle: e[n].name.length > 10 ? e[n].name: "",
                            name: this._sliceText(e[n].name, 10),
                            descriptionTitle: e[n].description.length > 14 ? e[n].description: "",
                            description: this._sliceText(e[n].description, 15)
                        };
                        t.push(r)
                    }
                }
                return t
            },
            getHistoryHotel: function(e, t, n) {
                var r = [];
                var t = t && t.slice(0, n);
                if (e || !$.isEmptyObject(e)) {
                    for (var i = 0; i < t.length; i++) {
                        var s = e[t[i]];
                        var o = {
                            detailDomainPath: s.isBNB ? "http://bnb.qunar.com": "",
                            detailContextPath: getDetaiContextPath(t[i]),
                            imageUrl: s.imageId ? "http://userimg.qunar.com/imgs/" + s.imageId + "76.jpg": "http://source.qunar.com/hotel/ugc/hotel_default_52_52.png",
                            name: s.name,
                            hotelNameTitle: s.name.length > 9 ? s.name: "",
                            hotelName: this._sliceText(s.name, 9),
                            hotelDesc: this.getHotelDesc(s.st, s.dc),
                            seqs: t[i],
                            star: this.getStarInfo(s.st),
                            grade: this.getDangciInfo(s.dc)
                        };
                        o.score = this.getScore(s.score, o.detailDomainPath, o.detailContextPath, s.isBNB);
                        o.percentageScore = this._Percentage(s.score, 5);
                        r.push(o)
                    }
                }
                var u = {
                    hasHistory: r.length ? true: false,
                    history: r
                };
                return u
            }
        };
        t.exports = r
    } (t.exports, t, e);
    e.____MODULES["b4dbc1de1386c8f6395c15cae0cc3fa0"] = t.exports
})(this); (function(e) {
    var t = {
        id: "4e573d87d059795e64cec18ec86e1bcf",
        filename: "homepageugc.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        var i = e.____MODULES["f59709ddf94cecd46fa4de0179ef838b"];
        var s = e.____MODULES["b4dbc1de1386c8f6395c15cae0cc3fa0"];
        var o = {
            inhtlimg: "&frome=inltlinmg"
        };
        var u = function() {
            var e = this;
            var t = $(".js-hotel");
            this.init = function() {
                this.$ugcContainer = $(".js_ugc");
                this.con = null;
                var e = "http://tips.qunar.com/ugcApi/hotel/homepageRecommend.json";
                n(e, "_callback", r, l);
                y()
            };
            var n = function(e, t, n, r) {
                var i = this;
                $.ajax({
                    url: e,
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: t || "callback",
                    success: function(e) {
                        n && n.call(i, e)
                    },
                    error: function(e) {
                        r && r.call(i, e)
                    }
                })
            };
            var r = function(t) {
                var n = t.data;
                var r = {};
                if (n.logined) {
                    r = o(n);
                    if (n.uncommentedOrders && n.uncommentedOrders.length == 0) {
                        p()
                    }
                    a();
                    f()
                } else {
                    r = u(n)
                }
                g();
                html = i.ugcTpl(r);
                e.$ugcContainer.html(html);
                e.$noreview = $(".js-noreview");
                c()
            };
            var o = function(e) {
                var t = e.userInfo;
                var n = {
                    connoisseurLevel: t.connoisseurLevel,
                    commentcount: e.commentcount,
                    encodeUserName: t.encodeUserName,
                    nickNameTitle: t.nickName.length > 8 ? t.nickName: "",
                    nickName: s._sliceText(t.nickName, 8),
                    basenext: s._Percentage(t.experience, t.levelExperience.next),
                    experienceBase: t.experience,
                    experienceNext: t.levelExperience.next,
                    isSleep: t.identity == 97 || t.identity == 98 ? true: false,
                    isLogin: e.logined,
                    level: t.level,
                    levelmain: s.getLevelInfo(t.level),
                    reviewCount: t.reviewCount,
                    receivedReplyCount: t.receivedReplyCount,
                    followerCount: t.followerCount,
                    discount: s.getDiscount(t.discount, t.level),
                    points: t.points,
                    uid: t.uid,
                    titleTip: s.getTitleTip(t.level, t.experience, t.levelExperience.next),
                    uncommentedOrdersFormat: s.getUncommentedOrdersFormat(e.uncommentedOrders),
                    iscommentedOrders: e.uncommentedOrders && e.uncommentedOrders.length == 0 ? false: true,
                    hotProductsFormat: s.getHotProducts(e.hotProducts)
                };
                return n
            };
            var u = function(e) {
                var t = e.connoisseur;
                var n = {
                    connoisseur: t,
                    connoisseurLevel: t.connoisseurLevel,
                    titleTitle: t.title.length > 17 ? t.title: "",
                    title: s._sliceText(t.title, 17),
                    introTitle: t.intro.length > 67 ? t.intro: "",
                    intro: s._sliceText(t.intro, 67),
                    introUrl: t.introUrl,
                    titleUrl: t.titleUrl,
                    uid: t.uid,
                    encodeUserName: t.encodeUserName,
                    hotProductsFormat: s.getHotProducts(e.defaultProducts),
                    isSleep: !!(t.identity == 97 || t.identity == 98)
                };
                return n
            };
            var a = function() {
                var e = "http://tips.qunar.com/ugcApi/messagePrompt.json?type=CHANNELJOIN&module=CORE&data=FEEDLIST";
                n(e, "callback1", m, l)
            };
            var f = function() {
                var e = "http://tips.qunar.com/ugcApi/getAvatarNotice.json";
                var t = function(e) {
                    if (e && e.data && e.data.isAvatarNotice) {
                        $(".js-modify").remove()
                    } else {
                        $(".js-upload").remove()
                    }
                };
                var r = function(e) {};
                n(e, "callback2", t, r)
            };
            var l = function(e) {
                h()
            };
            var c = function() {
                e.$ugcContainer.size() > 0 && e.$ugcContainer.show()
            };
            var h = function() {
                e.$ugcContainer.size() > 0 && e.$ugcContainer.hide()
            };
            var p = function() {
                QunarStorage.ready(function(e) {
                    var t;
                    if (e) {
                        try {
                            QunarHotelHistory.init(e);
                            t = QunarHotelHistory.getHotels() || []
                        } catch(n) {
                            v();
                            return
                        }
                        t = t.reverse();
                        if (t && t.length != 0) {
                            d(t)
                        } else {
                            v()
                        }
                    } else {
                        v()
                    }
                })
            };
            var d = function(e) {
                var t = "/price/historyView.jsp";
                var n = new ScriptRequest({
                    callbackName: "callback",
                    oncomplete: function(t) {
                        var n = 2;
                        var r = s.getHistoryHotel(t, e, n);
                        $(".js-hotel").html(i.historyHotel(r));
                        $(".js-hotel").show()
                    }
                });
                n.send(t + "?seqs=" + e.join(","))
            };
            var v = function() {
                if (e.$noreview.size() > 0) {
                    t.show()
                }
            };
            var m = function(e) {
                var t = e && e.data || {};
                if (t.commentcount) {
                    $(".js_ugc .js_newreview").show()
                }
                if (t.friendcount) {
                    $(".js_ugc .js_newfriend").show()
                }
            };
            var g = function() {
                var t = "http://hotel.qunar.com/render/ugcAdvertisement.jsp";
                $.ajax({
                    url: t,
                    type: "GET",
                    cache: false,
                    success: function(t) {
                        var n = e.$ugcContainer.find(".js-ugcad");
                        if (!t.ret || !t.data || !t.data.length) {
                            n.hide();
                            return
                        }
                        var r = t.data[0];
                        n.html("<a href=" + r.url + ' data-flag="ugcad" data-beacon="' + r.beacon + '" target="_blank"><img src=' + r.imageUrl + " title=" + r.title + "></a>")
                    },
                    error: function() {
                        return
                    }
                })
            };
            var y = function() {
                var t = e.$ugcContainer;
                t.delegate(".htl_item", "mouseenter",
                function(e) {
                    $(this).addClass("htl_item_hover")
                }).delegate(".htl_item", "mouseleave",
                function(e) {
                    $(this).removeClass("htl_item_hover")
                }).delegate("a", "click",
                function(e) {
                    var t = $(this).attr("data-flag");
                    if (t === "login") {
                        window.GARuner("首页UGC|登录");
                        window.open("http://user.qunar.com/passport/login.jsp?ret=http://hotel.qunar.com/", "_self")
                    } else if (t === "registered") {
                        window.GARuner("首页UGC|注册");
                        window.open("http://user.qunar.com/passport/register.jsp?ret=http://hotel.qunar.com/", "_self")
                    } else if (t === "sleep_pic") {
                        window.GARuner("首页UGC|试睡员")
                    } else if (t === "sleepTopic") {
                        window.GARuner("首页UGC|试睡员专题")
                    } else if (t === "join_sleep") {
                        window.GARuner("首页UGC|加入试睡员")
                    } else if (t === "userinform") {
                        window.GARuner("首页UGC|个人信息")
                    } else if (t === "comments") {
                        window.GARuner("首页UGC|我的点评")
                    } else if (t === "integral") {
                        window.GARuner("首页UGC|我的积分")
                    } else if (t === "discuss") {
                        window.GARuner("首页UGC|我的评论")
                    } else if (t === "fans") {
                        window.GARuner("首页UGC|我的粉丝")
                    } else if (t === "hotelDetail") {
                        window.GARuner("首页UGC|酒店详情")
                    } else if (t === "nowReview") {
                        window.GARuner("首页UGC|订单点评")
                    } else if (t === "nowhreview") {
                        window.GARuner("首页UGC|浏览点评")
                    } else if (t === "queryReview") {
                        window.GARuner("首页UGC|直接点评")
                    } else if (t === "change") {
                        window.GARuner("首页UGC|礼品兑换")
                    } else if (t === "moreGift") {
                        window.GARuner("首页UGC|积分商城")
                    } else if (t === "unlogincom") {
                        window.GARuner("首页UGC|未登录|我要点评")
                    } else if (t === "sleeppepl") {
                        window.GARuner("首页UGC|试睡员")
                    } else if (t === "reviewpresent") {
                        window.GARuner("首页UGC|点评得好礼")
                    } else if (t === "ugcad") {
                        window.GARuner($(this).attr("data-beacon"))
                    }
                }).delegate(".js_becon", "click",
                function(e) {
                    var t = $(this).attr("data-flag");
                    if (t === "userinform") {
                        window.GARuner("首页UGC|个人信息")
                    }
                }).delegate(".js-level", "mouseover",
                function() {
                    var e = $(this).position().left + 20;
                    t.find(".js-levelhover").addClass("user-lever-hover");
                    t.find(".js-trangle").css("left", e)
                }).delegate(".js-level", "mouseout",
                function() {
                    t.find(".js-levelhover").removeClass("user-lever-hover")
                }).delegate(".js-levelhover", "mouseover",
                function() {
                    $(this).addClass("user-lever-hover")
                }).delegate(".js-levelhover", "mouseout",
                function() {
                    $(this).removeClass("user-lever-hover")
                }).delegate(".js-sleeper", "mouseover",
                function() {
                    $(this).addClass("agency-hover")
                }).delegate(".js-sleeper", "mouseout",
                function() {
                    $(this).removeClass("agency-hover")
                }).delegate(".js-score", "mouseover",
                function() {
                    t.find(".js-scoretip").addClass("score-info-hover")
                }).delegate(".js-score", "mouseout",
                function() {
                    t.find(".js-scoretip").removeClass("score-info-hover")
                }).delegate(".js-userpic", "mouseover",
                function() {
                    $(this).addClass("user-picture-hover")
                }).delegate(".js-userpic", "mouseleave",
                function() {
                    $(this).removeClass("user-picture-hover")
                }).delegate(".js-inhotel", "mouseenter",
                function() {
                    $(this).addClass("comment-item-hover")
                }).delegate(".js-inhotel", "mouseleave",
                function() {
                    $(this).removeClass("comment-item-hover")
                }).delegate(".js-intergral", "mouseenter",
                function() {
                    $(this).addClass("intergral-item-hover")
                }).delegate(".js-intergral", "mouseleave",
                function() {
                    $(this).removeClass("intergral-item-hover")
                })
            }
        };
        n.exports = u
    } (t.exports, t, e);
    e.____MODULES["4e573d87d059795e64cec18ec86e1bcf"] = t.exports
})(this); (function(e) {
    var t = {
        id: "bfb1a9af9985526107b16cc5aceea35a",
        filename: "index.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        var i = e.____MODULES["4e573d87d059795e64cec18ec86e1bcf"];
        n.exports = {
            homeUgc: i
        }
    } (t.exports, t, e);
    e.____MODULES["bfb1a9af9985526107b16cc5aceea35a"] = t.exports
})(this); (function(e) {
    var t = {
        id: "e77a69394389b73c5ee4be7e25030e94",
        filename: "homeAd.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        var r = function() {
            var e = $(".js-qunarLinkAd"); (new Image).src = "http://www.qunar.com/twell/cookie/allocateCookie.jsp";
            QNR.AD.createCallback("rightMiddleAd_QAD",
            function(t, n) {
                var r = n && n.key_data && n.key_data.length;
                if (!r) {
                    t.style.display = "none";
                    e.hide();
                    return
                }
                AD_Manage.showHeadFoot();
                AD_Manage.modifyMore("rightMiddleAd_QAD");
                AD_Manage.append_link_css();
                t.innerHTML = AD_Manage._renderHTML(n);
                e.show()
            });
            AD_Manage.ip_query = function(e) {
                QNR.ips(e)
            };
            AD_Manage.load();
            var t = '<div style="position: relative;"><div class="banner-content"><div class="search-rbg"> <div class="search-banner-bg" style="background-image: url(http://source.qunar.com/site/images/wns/1600x336_2015041.jpg);"><a class="banner-bglink" target="_blank" href="http://qde.qunar.com/event.ng/Type=click%26FlightID=148621%26AdID=229082%26TargetID=8141%26Segments=13,28,142,147,152,290,373,530,534,535,536,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,558,559,560,562,563,564,565,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,586,587,610,611,845,999,1131,1143,1183,1590,3780,4589,4613,4648,4649,4650,4855%26Targets=5302,29,1504,8141%26Values=34,46,51,81,100,110,204,206,243,252,255,301,305,321,5594,5598%26RawValues=%26Redirect=huypYLJXdWONjnu1cFpJjIUaUdNveHsVxuuunPdpK_jz0USfF5EnOeHUiwyRY85eapmOmgdLpQilEDuYZ-PjQg=="></a></div></div><div id="center_width" class="banner-allshow"><div id="margin_left" class="search-right-banner"><a href="http://qde.qunar.com/event.ng/Type=click%26FlightID=148621%26AdID=229082%26TargetID=8141%26Segments=13,28,142,147,152,290,373,530,534,535,536,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,558,559,560,562,563,564,565,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,586,587,610,611,845,999,1131,1143,1183,1590,3780,4589,4613,4648,4649,4650,4855%26Targets=5302,29,1504,8141%26Values=34,46,51,81,100,110,204,206,243,252,255,301,305,321,5594,5598%26RawValues=%26Redirect=huypYLJXdWONjnu1cFpJjIUaUdNveHsVxuuunPdpK_jz0USfF5EnOeHUiwyRY85eapmOmgdLpQilEDuYZ-PjQg==" target="_blank"><img style="display: block;" height="320" width="464" src="http://source.qunar.com/site/images/wns/464x320_2015041.jpg"></a></div></div></div></div>';
            setTimeout(function() {
                var e = $("#topAD");
                if (e.prev().hasClass("banner-default-bg")) {
                    e.before(t);
                    topad.remove()
                }
            },
            1e4);
            QNR.AD.createQdeCallback("leftTopAd",
            function(e, t) {
                if (!e) {
                    var n = '<abbr id="leftTopAdBackAd" style="display:none;" data-type="qad" data-query="adposition=QNR_OGQ%3D_CN&tag=99&rows=4&cur_page_num=0&rep=1&f=s" data-style="width:100%;"></abbr>';
                    var r = document.getElementById("leftTopAd");
                    $(n).insertBefore(r);
                    QNR.AD.loadOneAD("leftTopAdBackAd")
                }
            });
            QNR.AD.createCallback("leftTopAdBackAd",
            function(e, t) {
                var n = t && t.key_data && t.key_data.length;
                var r = n && n >= 4 ? true: false;
                if (!r) {
                    e.style.display = "none";
                    return
                }
                $("#leftTopAdBackAd").parent(".index-main-banner").addClass("index-main-adback");
                e.innerHTML = AD_Manage._renderBackAdHTML(t)
            });
            QNR.AD.createQdeCallback("leftMiddleAd",
            function(e, t) {
                if (!e) {
                    var n = '<abbr id="leftMiddleAdBackAd" style="display:none;" data-type="qad" data-query="adposition=QNR_OWQ%3D_CN&tag=99&rows=4&cur_page_num=0&rep=1&f=s" data-style="width:100%;"></abbr>';
                    var r = document.getElementById("leftMiddleAd");
                    $(n).insertBefore(r);
                    QNR.AD.loadOneAD("leftMiddleAdBackAd")
                }
            });
            QNR.AD.createCallback("leftMiddleAdBackAd",
            function(e, t) {
                var n = t && t.key_data && t.key_data.length;
                var r = n && n >= 4 ? true: false;
                if (!r) {
                    e.style.display = "none";
                    return
                }
                $("#leftMiddleAdBackAd").parent(".index-main-banner").addClass("index-main-adback");
                e.innerHTML = AD_Manage._renderBackAdHTML(t)
            });
            QNR.AD.createQdeCallback("leftMiddleInterAd",
            function(e, t) {
                if (!e) {
                    var n = '<abbr id="leftMiddleInterAdBackAd" style="display:none;" data-type="qad" data-query="adposition=QNR_OWQ%3D_CN&tag=99&rows=4&cur_page_num=0&rep=1&f=s" data-style="width:100%;"></abbr>';
                    var r = document.getElementById("leftMiddleInterAd");
                    $(n).insertBefore(r);
                    QNR.AD.loadOneAD("leftMiddleInterAdBackAd")
                }
            });
            QNR.AD.createCallback("leftMiddleInterAdBackAd",
            function(e, t) {
                var n = t && t.key_data && t.key_data.length;
                var r = n && n >= 4 ? true: false;
                if (!r) {
                    e.style.display = "none";
                    return
                }
                $("#leftMiddleAdBackAd").parent(".index-main-banner").addClass("index-main-adback");
                e.innerHTML = AD_Manage._renderBackAdHTML(t)
            });
            QNR.AD.createQdeCallback("leftBottomAd",
            function(e, t) {
                if (!e) {
                    var n = '<abbr id="leftBottomAdBackAd" style="display:none;" data-type="qad" data-query="adposition=QNR_YWQ%3D_CN&tag=99&rows=4&cur_page_num=0&rep=1&f=s" data-style="width:100%;"></abbr>';
                    var r = document.getElementById("leftBottomAd");
                    $(n).insertBefore(r);
                    QNR.AD.loadOneAD("leftBottomAdBackAd")
                }
            });
            QNR.AD.createCallback("leftBottomAdBackAd",
            function(e, t) {
                var n = t && t.key_data && t.key_data.length;
                var r = n && n >= 4 ? true: false;
                if (!r) {
                    e.style.display = "none";
                    return
                }
                $("#leftBottomAdBackAd").parent(".index-main-banner").addClass("index-main-adback");
                e.innerHTML = AD_Manage._renderBackAdBotHTML(t)
            })
        };
        e.init = r
    } (t.exports, t, e);
    e.____MODULES["e77a69394389b73c5ee4be7e25030e94"] = t.exports
})(this); (function(e) {
    var t = {
        id: "c08aa2e5e844ead65be9790348824c07",
        filename: "dynamicIframe.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        function r() {
            var e, t, n = {},
            r = {},
            i;
            this.init = function(s) {
                r = s || {};
                if (!r.id || !r.url) {
                    return
                }
                e = document.getElementById(r.id);
                t = r.url || "";
                n = r.params || {};
                n.search = n.search || {};
                n.hash = n.hash || {};
                i = r.box || document.getElementsByTagName("body")[0];
                if (!e) {
                    e = document.createElement("iframe");
                    e.setAttribute("id", r.id);
                    e.className = r["className"] || "";
                    e.setAttribute("height", r.height || "0");
                    e.setAttribute("style", r.styleContent || "");
                    e.setAttribute("frameBorder", r.frameBorder || "0");
                    e.setAttribute("scrolling", r.scrolling || "no");
                    i.appendChild(e)
                }
                t = t + ($.isEmptyObject(n.search) ? "": "?" + $.param(n.search));
                e.setAttribute("src", t + ($.isEmptyObject(n.hash) ? "": "#" + $.param(n.hash)))
            };
            this.show = function() {
                e && (e.style.display = "block")
            };
            this.hide = function() {
                e && (e.style.display = "none")
            };
            this.refresh = function(t) {
                var i = r.url;
                if (!e) return;
                n = $.extend({},
                n, t);
                i = i + ($.isEmptyObject(n.search) ? "": "?" + $.param(n.search)) + ($.isEmptyObject(n.hash) ? "": "#" + $.param(n.hash));
                e.setAttribute("src", i)
            };
            this.getParams = function() {
                return n
            }
        }
        t.exports = r
    } (t.exports, t, e);
    e.____MODULES["c08aa2e5e844ead65be9790348824c07"] = t.exports
})(this); (function(e) {
    var t = {
        id: "dc5b28febd510d913e0810fac7c5cdfd",
        filename: "marketCode.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        function s(e) {
            var t = new i;
            var n = window.Cookie && window.Cookie.values || {};
            var r = e.fromDate.getValue() || QunarDate.format(new Date(SERVER_TIME.getTime() + 2 * 24 * 60 * 60 * 1e3));
            var s = e.toDate.getValue() || QunarDate.format(new Date(SERVER_TIME.getTime() + 3 * 24 * 60 * 60 * 1e3));
            t.init({
                id: "marketingga",
                url: "/render/ga_new.jsp",
                params: {
                    hash: {
                        v: (new Date).getTime(),
                        pageType: "home",
                        fromDate: r,
                        toDate: s,
                        refresh: 1
                    }
                }
            })
        }
        var i = e.____MODULES["c08aa2e5e844ead65be9790348824c07"];
        t.init = s
    } (t.exports, t, e);
    e.____MODULES["dc5b28febd510d913e0810fac7c5cdfd"] = t.exports
})(this); (function(e) {
    var t = {
        id: "f234d30274eabbd29bd421d11db75098",
        filename: "PicsRotate.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        window.PicsRotate = function(e) {
            if (!e.box && !e.boxId) return;
            this.config = e;
            this.box = e.box || $("#" + e.boxId);
            if (this.box.length == 0) return;
            this.speed,
            this.effect,
            this.isLazy,
            this.isLoop,
            this.isPaging,
            this.gap,
            this.showBox,
            this.screens,
            this.num,
            this.width,
            this.nextButton,
            this.prevButton,
            this.dots,
            this.lazyCount,
            this.current,
            this.isLoaded,
            this.isMoving,
            this.plusFunc;
            this.init()
        };
        PicsRotate.prototype = {
            constructor: PicsRotate,
            init: function() {
                this.speed = "undefined" == typeof this.config.speed ? 600 : this.config.speed;
                this.effect = "undefined" == typeof this.config.effect ? "default": this.config.effect;
                this.isLazy = "undefined" == typeof this.config.isLazy ? false: this.config.isLazy;
                this.isLoop = "undefined" == typeof this.config.isLoop ? true: this.config.isLoop;
                this.isPaging = "undefined" == typeof this.config.isPaging ? true: this.config.isPaging;
                this.plusFunc = "undefined" == typeof this.config.plusFunc ? false: this.config.plusFunc;
                this.gap = "undefined" == typeof this.config.gap ? 3e3: this.config.gap;
                this.current = 1;
                this.isLoaded = false,
                this.isMoving = false;
                this.showBox = this.box.find(this.config.showBox || ".js_showBox");
                this.showBox.length == 0 && (this.showBox = this.box.find("ul:first"));
                this.screens = this.showBox.find(this.config.control || "li");
                this.num = this.screens.length;
                var e = $(this.screens[0]);
                this.width = e.width();
                this.height = e.height();
                this.lazyWidth = this.config.lazyWidth || this.width;
                this.lazyHeight = this.config.lazyHeight || this.height;
                this.nextButton = this.box.find(".next");
                this.prevButton = this.box.find(".prev");
                this.dots = null;
                this.isLoaded = false;
                this.lazyCount = this.box.find("[data-lazy]").length;
                this.isMoving = false;
                return this
            },
            start: function() {
                if (0 == this.box.length || "undefined" == typeof this.screens || this.screens.length == 0) return;
                var e = this;
                if (e.isPaging) {
                    e.createDots()
                }
                if ( !! e.plusFunc) {
                    e.plusFunc()
                }
                e.bindEvent();
                e.showButton();
                if (e.isLoop) {
                    e.loops()
                }
                if (e.isLazy) {
                    var t = $(e.screens[0]).find("img");
                    e.loadSingleImage(t);
                    e.lazyLoad()
                }
                return e
            },
            bindEvent: function() {
                var e = this,
                t = this.effect;
                if ("undefined" != typeof e.nextAnimations[t]) {
                    e._nextFunc = e.nextAnimations[t]
                } else {
                    e._nextFunc = e.nextAnimations["default"]
                }
                if ("undefined" != typeof e.prevAnimations[t]) {
                    e._prevFunc = e.prevAnimations[t]
                } else {
                    e._prevFunc = e.prevAnimations["default"]
                }
                if (e.isPaging) {
                    if ("undefined" != typeof e.pagingAnimations[t]) {
                        e._pagingFunc = e.pagingAnimations[t]
                    } else {
                        e._pagingFunc = e.pagingAnimations["default"]
                    }
                }
                e.nextButton.click(function(t) {
                    $(e).trigger("nextClick", e.current);
                    if (e.isMoving) return;
                    e.cancelAnimation(t);
                    e.next()
                });
                e.prevButton.click(function(t) {
                    $(e).trigger("preClick", e.current);
                    if (e.isMoving) return;
                    e.cancelAnimation(t);
                    e.prev()
                });
                if (e.isPaging) {
                    e.box.delegate(".js_paging li", "click",
                    function(t) {
                        $(e).trigger("pagingClick", [t, $.inArray($(t.target).closest("li").get(0), $(".js_paging li")), e.current]);
                        if (e.isMoving) return;
                        e.cancelAnimation(t);
                        e.paging(this)
                    })
                }
            },
            createDots: function() {
                var e = [];
                for (var t = 0,
                n = this.screens.length; t < n; t++) {
                    if (t == 0) {
                        e.push("<li class='active'><span>" + (t + 1) + "</span></li>")
                    } else {
                        e.push("<li><span>" + (t + 1) + "</span></li>")
                    }
                }
                this.box.find(".js_paging").append(e.join(""));
                this.dots = this.box.find(".js_paging li")
            },
            nextAnimations: {
                slide: function(e) {
                    var t = this;
                    t.showBox.stop().animate({
                        "margin-left": "-" + t.width + "px"
                    },
                    t.speed,
                    function() {
                        $(t.screens.get(t.current - 1)).appendTo(t.showBox);
                        t.showBox.css("margin-left", "0px");
                        t.current = e;
                        t.lazyLoad();
                        t.isMoving = false;
                        $(t).triggerHandler("frameDisplay", t.current)
                    })
                },
                fadeIn: function(e) {
                    var t = this;
                    var n = $(t.screens.hide().get(t.num == t.current ? 0 : t.current)).show();
                    var r = n.find("img");
                    r.hide().stop().fadeIn(t.speed,
                    function() {
                        t.current = e;
                        t.lazyLoad();
                        r.css("opacity", 1);
                        t.isMoving = false;
                        $(t).triggerHandler("frameDisplay", t.current)
                    })
                },
                "default": function() {}
            },
            prevAnimations: {
                slide: function(e) {
                    var t = this;
                    t.showBox.css("margin-left", "-" + t.width + "px");
                    $(t.screens[e - 1]).prependTo(t.showBox);
                    t.showBox.stop().animate({
                        "margin-left": "0px"
                    },
                    t.speed,
                    function() {
                        t.current = e;
                        t.isMoving = false;
                        $(t).triggerHandler("frameDisplay", t.current)
                    })
                },
                fadeIn: function(e) {
                    var t = this;
                    var n = $(t.screens.hide().get(e - 1)).show();
                    var r = n.find("img");
                    r.hide().stop().fadeIn(t.speed,
                    function() {
                        t.current = e;
                        r.css("opacity", 1);
                        t.isMoving = false;
                        $(t).triggerHandler("frameDisplay", t.current)
                    })
                },
                "default": function(e) {}
            },
            pagingAnimations: {
                slide: function(e) {
                    var t = this;
                    if (0 == t.screens.length || 1 == t.screens.length) return;
                    var n = (e - t.current) * t.width;
                    if (n > 0) {
                        t.showBox.stop().animate({
                            "margin-left": "-" + n + "px"
                        },
                        t.speed,
                        function() {
                            t.screens.slice(0, e - 1).appendTo(t.showBox);
                            t.showBox.css("margin-left", "0px");
                            t.current = e;
                            t.lazyLoad();
                            t.isMoving = false;
                            $(t).triggerHandler("frameDisplay", t.current)
                        })
                    } else {
                        t.screens.slice(e - 1, t.current - 1).prependTo(t.showBox);
                        t.showBox.css("margin-left", n + "px");
                        t.showBox.stop().animate({
                            "margin-left": "0px"
                        },
                        t.speed,
                        function() {
                            t.current = e;
                            t.lazyLoad();
                            t.isMoving = false;
                            $(t).triggerHandler("frameDisplay", t.current)
                        })
                    }
                },
                fadeIn: function(e) {
                    var t = this;
                    var n = $(t.screens.hide().get(e - 1)).show();
                    var r = n.find("img");
                    r.hide().stop().fadeIn(t.speed,
                    function() {
                        t.current = e;
                        t.lazyLoad();
                        r.css("opacity", 1);
                        t.isMoving = false;
                        $(t).triggerHandler("frameDisplay", t.current)
                    })
                },
                "default": function(e) {}
            },
            addAnimation: function(e, t, n, r) {
                if ("undefined" == typeof e || "" == e) return;
                if ("undefined" != typeof t && "function" == typeof t) {
                    this.nextAnimations[e] = t
                }
                if ("undefined" != typeof n && "function" == typeof n) {
                    this.prevAnimations[e] = n
                }
                if ("undefined" != typeof r && "function" == typeof r) {
                    this.pagingAnimations[e] = r
                }
            },
            cancelAnimation: function(e) {
                if (!this.isMoving) {
                    this.isMoving = true
                }
                this.tryFixIe6();
                e.stopImmediatePropagation();
                return this.isMoving
            },
            next: function() {
                var e = this.num == this.current ? 1 : this.current + 1;
                if (this.isPaging) {
                    $(this.dots.removeClass("active").get(e - 1)).addClass("active")
                }
                this._nextFunc.call(this, e)
            },
            prev: function() {
                var e = this.current == 1 ? this.num: this.current - 1;
                if (this.isPaging) {
                    $(this.dots.removeClass("active").get(e - 1)).addClass("active")
                }
                this.lazyLoad(e);
                this._prevFunc.call(this, e)
            },
            paging: function(e) {
                if (!this.isPaging) return;
                var t = $(e);
                var n = parseInt(t.text(), 10);
                if (n == this.current) {
                    this.isMoving = false;
                    return
                }
                this.lazyLoad(n);
                $(this.dots.removeClass("active").get(n - 1)).addClass("active");
                this._pagingFunc.call(this, n)
            },
            loops: function() {
                var e = this;
                if (e.screens.length <= 1) return;
                var t;
                e.box.mouseover(function(n) {
                    clearInterval(t);
                    e.isMoving = false
                }).mouseout(function(n) {
                    clearInterval(t);
                    t = setInterval(function() {
                        e.next()
                    },
                    e.gap)
                });
                e.box.trigger("mouseout")
            },
            lazyLoad: function(e) {
                if (!this.isLazy || this.isLoaded) return;
                if ("undefined" == typeof arguments[0]) {
                    var e = this.num == this.current ? 1 : this.current + 1
                }
                var t = $(this.screens[e - 1]).find("img");
                if ("undefined" == typeof t.attr("data-lazy")) return;
                this.loadSingleImage(t);
                if (0 == this.lazyCount) this.isLoaded = true
            },
            loadSingleImage: function(e) {
                var t = document.createElement("img");
                var n = e.attr("data-lazy");
                if (!n) return;
                var r = this;
                $(t).bind("load",
                function() {
                    e.attr("src", n);
                    e.css({
                        width: r.lazyWidth + "px",
                        height: r.lazyHeight + "px"
                    });
                    e.parent().css("background-image", "none");
                    t = null;
                    this.lazyCount--;
                    e.removeAttr("data-lazy")
                });
                t.src = n
            },
            showButton: function() {
                if (this.screens.length < 2) {
                    this.nextButton.hide();
                    this.prevButton.hide();
                    return
                }
                this.nextButton.show();
                this.prevButton.show()
            },
            tryFixIe6: function() {
                if ("undefind" != typeof window["tryFixIe6"]) {
                    try {
                        if (window.event) {
                            event.returnValue = false
                        }
                    } catch(e) {}
                } else {
                    return window["tryFixIe6"]
                }
            }
        }
    } (t.exports, t, e);
    e.____MODULES["f234d30274eabbd29bd421d11db75098"] = t.exports
})(this); (function(e) {
    var t = {
        id: "835c41ff9d9ee4a108cc645fb4afbf5d",
        filename: "index.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        e.____MODULES["f234d30274eabbd29bd421d11db75098"]
    } (t.exports, t, e);
    e.____MODULES["835c41ff9d9ee4a108cc645fb4afbf5d"] = t.exports
})(this); (function(e) {
    var t = {
        id: "8b9ce441dba1835a0522fc91e6b86a13",
        filename: "textlinkTpl.string",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        if (typeof window.QTMPL === "undefined") window.QTMPL = {};
        window.QTMPL["textlinkTpl"] = '<div class="banner-txt-llinks">\n    <div class="topic-btn">\n        <span class="prev-btn"><a class="prev" hidefocus="on" href="#" onclick="return false;"></a></span>\n        <span class="next-btn"> <a class="next" hidefocus="on" href="#" onclick="return false;"></a></span>\n    </div>\n    <ul class="js_showbox">\n    {{#activities}}\n        {{#isTextlink}}\n        <li class="{{activeClass}}" data-beacon="{{beacon}}"><a href="{{url}}" target="_blank">{{name}}</a></li>\n        {{/isTextlink}}\n        {{^isTextlink}}\n         <li class="{{activeClass}}" data-beacon="{{beacon}}"><a href="{{url}}" target="_blank"><img src="{{imageUrl}}"/></a></li>\n        {{/isTextlink}}\n    {{/activities}}\n    </ul>\n</div>';
        if (typeof t !== "undefined") t.exports = window.QTMPL["textlinkTpl"]
    } (t.exports, t, e);
    e.____MODULES["8b9ce441dba1835a0522fc91e6b86a13"] = t.exports
})(this); (function(e) {
    var t = {
        id: "1a67673692c2fa6246100873ab154b6b",
        filename: "textlink.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        function f(e) {
            var t = e.isInter ? 3 : 2;
            if (a[t]) {
                return
            }
            $.ajax({
                url: "http://hotel.qunar.com/render/searchAdvertisement.jsp",
                data: {
                    cityUrl: e.cityUrl,
                    cityTag: t
                },
                catche: false,
                success: function(n) {
                    if (!n.ret || !n) {
                        return
                    }
                    if (!n.data || n.data.length == 0) {
                        return
                    }
                    a[t] = 1;
                    n.__isInter = e.isInter;
                    l(n);
                    c()
                }
            })
        }
        function l(e) {
            var t = {};
            var n;
            var r = e.__isInter ? s: i;
            $.extend(t, {
                activities: []
            });
            $.each(e.data,
            function(e, n) {
                if (parseInt(n.type, 10) == 0) {
                    t.activities.push({
                        activeClass: e == 0 ? "on": "",
                        url: n.url,
                        name: n.title,
                        imageUrl: n.imageUrl,
                        isTextlink: parseInt(n.type, 10) ? false: true,
                        beacon: n.beacon
                    })
                }
            });
            n = $(u.render(t));
            r.append(n);
            var o = new PicsRotate({
                box: n,
                showBox: $(".js_showbox"),
                speed: 600,
                effect: "fadeIn",
                isLazy: false,
                isLoop: true,
                gap: 3e3,
                isPaging: false
            });
            if (o.screens.length < 2) {
                o.nextButton.hide();
                o.prevButton.hide()
            }
            o.addAnimation("fadeIn",
            function(e) {
                var t = this;
                $(t.screens.removeClass("on").get(t.num == t.current ? 0 : t.current)).addClass("on");
                t.isMoving = false;
                t.current = e
            },
            function(e) {
                var t = this;
                $(t.screens.removeClass("on").get(e - 1)).addClass("on");
                t.isMoving = false;
                t.current = e
            });
            o.start()
        }
        function c() {
            i.delegate("li", "click",
            function() {
                var e = $(this).attr("data-beacon");
                window.GARuner(e)
            });
            s.delegate("li", "click",
            function() {
                var e = $(this).attr("data-beacon");
                window.GARuner(e)
            })
        }
        e.____MODULES["835c41ff9d9ee4a108cc645fb4afbf5d"];
        var i = $(".js_mailand_textlinks");
        var s = $(".js_inter_textlinks");
        var o = e.____MODULES["8b9ce441dba1835a0522fc91e6b86a13"];
        var u = Hogan.compile(o);
        var a = {};
        t.loadInfo = f
    } (t.exports, t, e);
    e.____MODULES["1a67673692c2fa6246100873ab154b6b"] = t.exports
})(this); (function(e) {
    var t = {
        id: "ca3a302c53268ec8090a5885a668c841",
        filename: "twoCodeTpl.string",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        if (typeof window.QTMPL === "undefined") window.QTMPL = {};
        window.QTMPL["twoCodeTpl"] = '<div class="phone-code">\n    发送客户端下载地址到手机<input type="text" maxlength="11" data-placeholder="请输入11位手机号码" class="phone-num js_phone" value=""><a href="#" class="send-btn js_send">免费获取</a>\n    <div class="phone-code-tips js_result">\n        <div class="m-introduce-pop">\n            <div class="m-introduce-bd">\n                <p class="js_tiptxt"></p>\n            </div>\n            <div class="m-introduce-pop-fd">\n                <div class="bottom"></div>\n                <div class="top"></div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="two-code js_bigtwocode">\n    <i class="icon-code js_twocode_down"></i><b class="js_twocode_down">扫一扫，手机预订更优惠</b><i class="up-icon js_twocode_down"></i>\n    <div class="two-code-bd">\n        <div class="two-code-pop js_towcode_hover">\n            <div class="code-content">\n                <p><i class="icon-code js_towcode_up"></i><b  class="js_towcode_up">扫一扫，手机预订更优惠</b><i class="down-icon js_towcode_up"></i></p>\n                <p class="two-img"><img src="http://simg1.qunarzz.com/hotel/homesearch/client_download.png"></p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
        if (typeof t !== "undefined") t.exports = window.QTMPL["twoCodeTpl"]
    } (t.exports, t, e);
    e.____MODULES["ca3a302c53268ec8090a5885a668c841"] = t.exports
})(this); (function(e) {
    var t = {
        id: "459897b8c05aee5ded4e8dc109fbeaf2",
        filename: "twoCode.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        function g() {
            if (!s.size()) {
                return
            }
            s.html(i);
            y();
            E()
        }
        function y() {
            s.delegate(".js_twocode_down", "mouseenter",
            function(e) {
                if (!o) {
                    o = s.find(".js_bigtwocode")
                }
                if (v >= 0) {
                    clearTimeout(v)
                }
                v = setTimeout(function() {
                    o.addClass("two-code-hover")
                },
                m)
            }).delegate(".js_twocode_down", "mouseleave",
            function(e) {
                if (!o) {
                    o = s.find(".js_bigtwocode")
                }
                if (v >= 0) {
                    clearTimeout(v)
                }
                o.removeClass("two-code-hover")
            });
            s.delegate(".js_towcode_hover", "mouseenter",
            function(e) {
                if (!o) {
                    o = s.find(".js_bigtwocode")
                }
                o.addClass("two-code-hover")
            }).delegate(".js_towcode_hover", "mouseleave",
            function(e) {
                if (!o) {
                    o = s.find(".js_bigtwocode")
                }
                o.removeClass("two-code-hover")
            })
        }
        function E() {
            u = s.find(".js_phone");
            a = s.find(".js_send");
            f = s.find(".js_result");
            l = s.find(".js_tiptxt");
            u.placeholder();
            u.bind("change focus keyup",
            function() {
                var e = u.val();
                if (e == u.attr("data-placeholder")) {
                    e = ""
                }
                e = $.trim(e);
                if (!/^1[0-9]{10}$/.test(e)) {
                    h = "请填写正确手机号";
                    c = false
                } else {
                    h = "";
                    c = true
                }
                w();
                u.addClass("focus-num")
            }).bind("blur",
            function() {
                u.removeClass("focus-num");
                f.removeClass("phone-code-tips-hover")
            });
            a.bind("blur",
            function() {
                if ($(this).hasClass("send-finish-btn")) {
                    return
                }
                f.removeClass("phone-code-tips-hover")
            });
            a.click(function(e) {
                e.preventDefault();
                if (p > 0) {
                    return
                }
                if (!c) {
                    h = "请填写正确手机号";
                    w();
                    return
                }
                p = 60;
                u.blur();
                $.ajax({
                    url: "http://phone.qunar.com/smsSend4Hotel.jsp",
                    cache: false,
                    data: {
                        phone: u.val(),
                        csrfToken: Cookie.values.csrfToken
                    },
                    dataType: "jsonp",
                    success: function(e) {
                        switch (e.status) {
                        case 0:
                            h = "短信发送成功";
                            break;
                        case 1:
                            h = "发送短信已超上限，请更换手机号";
                            break;
                        case 2:
                            h = "本日发送短信已超上限，请明日再获取";
                            break;
                        case 3:
                            h = "手机号不正确";
                            break;
                        case 4:
                            h = "手机号格式不正确";
                            break;
                        case 5:
                            h = "短信发送失败，请稍后重试";
                            break
                        }
                        if (e.status !== 0) {
                            p = 0
                        } else {
                            b()
                        }
                        w()
                    },
                    error: function(e, t) {
                        h = "短信发送失败，请稍后重试";
                        p = 0;
                        w()
                    }
                })
            })
        }
        var i = e.____MODULES["ca3a302c53268ec8090a5885a668c841"];
        var s = $(".js_twocode"),
        o;
        var u, a, f, l;
        var c = false;
        var h = "",
        p = 0;
        var d = -1;
        var v = -1;
        var m = 500;
        var b = function() {
            if (d >= 0) {
                clearInterval(d)
            }
            if (p > 0) {
                d = setInterval(function() {
                    p--;
                    if (p <= 0) {
                        clearInterval(d);
                        d = -1
                    }
                    w()
                },
                1e3)
            }
        };
        var w = function() {
            var e = "";
            if (h) {
                e = h
            }
            if (p > 0) {
                if (h) {
                    e += "，"
                }
                e += "<span>" + p + "</span>s后可再次发送"
            }
            if (!e) {
                l.empty();
                l.html();
                f.removeClass("phone-code-tips-hover")
            } else {
                l.html(e);
                f.addClass("phone-code-tips-hover")
            }
            if (c) {
                if (p <= 0) {
                    a.removeClass("send-finish-btn");
                    u.removeClass("disble-num");
                    u.removeAttr("disabled");
                    a.addClass("send-focus-btn")
                } else {
                    a.addClass("send-finish-btn");
                    u.addClass("disble-num");
                    u.attr("disabled", "disabled");
                    a.removeClass("send-focus-btn")
                }
                u.removeClass("error-num")
            } else {
                u.addClass("error-num");
                a.removeClass("send-finish-btn");
                u.removeClass("disble-num");
                u.removeAttr("disabled");
                a.removeClass("send-focus-btn")
            }
        };
        t.init = g
    } (t.exports, t, e);
    e.____MODULES["459897b8c05aee5ded4e8dc109fbeaf2"] = t.exports
})(this); (function(e) {
    var t = {
        id: "3a977c344ea16b84424baaf7f65fbb39",
        filename: "xiaobiantj.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        function s() {
            var e = new i;
            e.init({
                id: "xiaobianifr",
                box: $(".js_xiaobiantj").get(0),
                url: "http://tuan.qunar.com/ext/sact/YfiMFn",
                className: "autowidth-width mt30",
                height: "196",
                params: {
                    search: {
                        v: (new Date).getTime()
                    },
                    hash: {
                        isWider: 1
                    }
                }
            });
            return e
        }
        var i = e.____MODULES["c08aa2e5e844ead65be9790348824c07"];
        n.exports = s()
    } (t.exports, t, e);
    e.____MODULES["3a977c344ea16b84424baaf7f65fbb39"] = t.exports
})(this); (function(e) {
    var t = {
        id: "5a7a89f280aadb1bc3dffbdb85f0fab2",
        filename: "index.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        var i = e.____MODULES["e77a69394389b73c5ee4be7e25030e94"];
        var s = e.____MODULES["dc5b28febd510d913e0810fac7c5cdfd"];
        var o = e.____MODULES["1a67673692c2fa6246100873ab154b6b"];
        var u = e.____MODULES["459897b8c05aee5ded4e8dc109fbeaf2"];
        var a = e.____MODULES["3a977c344ea16b84424baaf7f65fbb39"];
        n.exports = {
            homeAd: i.init,
            marketCode: s.init,
            textlink: o,
            twoCode: u,
            xiaobiantj: a
        }
    } (t.exports, t, e);
    e.____MODULES["5a7a89f280aadb1bc3dffbdb85f0fab2"] = t.exports
})(this); (function(e) {
    var t = {
        id: "cccc35c30f2c93816ed8f6ba4fb2cee4",
        filename: "HotelNewSearch.jquery.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        var r = function() {
            var e = 1;
            return function() {
                return e++
            }
        } ();
        var i = {
            0 : "domestic",
            1 : "intercity"
        };
        var s = {
            domestic: 430,
            intercity: 530
        };
        t.exports = function(e, t, n) {
            function D() {
                _.reset(function() {
                    u.trigger("dateFinish")
                })
            }
            var o = this;
            var n = n || {};
            var u = $(this);
            var a = n.hotCityType;
            var f = n.isJudgeCity;
            var l = n.queryTip || "酒店名、地标、商圈，可组合搜索";
            var c = n.fromRule || 2;
            var h = n.toRule || 3;
            var p = h - c;
            var d = $(e);
            var v = d.find("input[name=cityurl]");
            if (v.length == 0) {
                v = $('<input type="hidden" name="cityurl"/>');
                d.append(v)
            }
            o.toCityUrl = v;
            var m = function(e) {
                v.val(e);
                $(o).trigger("cityUrlChange", e)
            };
            var g, y, b, w;
            var E = new ScriptRequest({
                oncomplete: function(e) {
                    $(o).trigger("sugEnter", e);
                    if (!e.userInput && e.city) e.userInput = e.city;
                    g.suggLoaded(e)
                },
                callbackName: "callback"
            });
            var S = new ScriptRequest({
                oncomplete: function(e) {
                    o.HotelLang = e["hotCityConfig"];
                    o.hotCityData = o.HotelLang["data"];
                    g.render(a);
                    g.cache["CITYNAME"] = g.getValue()
                },
                callbackName: "__jscallback"
            });
            var x = null,
            T;
            if (typeof HotelSuggestItemListLayer !== "undefined") {
                x = HotelSuggestItemListLayer;
                T = function(e) {
                    var t = a == "domestic" ? "isMainland=true": "isMainland=false";
                    return "http://hs.qunar.com/api/hs/citysug?" + t + "&city=" + encodeURIComponent(e.replace(/[!"#$%&'()*+\-.\/:;<=>?@[\]^_`{|}~]/g, ""))
                }
            } else {
                x = ItemListLayer;
                T = function(e) {
                    return "http://hotel.qunar.com/suggest/livesearch.jsp?lang=zh&q=" + encodeURIComponent(e) + "&sa=false"
                }
            }
            var N = function(e, t) { (new Image).src = "http://www.qunar.com/track.htm?_=" + (new Date).getTime() + "&hotel=citybox&q=" + encodeURIComponent(e) + "&c=" + t;
                $(document).trigger("cityChanged", {
                    city: e
                })
            };
            g = this.toCity = new XCombox(e.toCity, {
                button: {
                    mousedown: function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                        this.openMainMenu()
                    }
                },
                input: {
                    label: n.cityLabel || "",
                    click: function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                        var t = this.popups.get("suggest");
                        if (t && t.isOpend()) {} else {
                            this.openMainMenu()
                        }
                    },
                    change: function(e, t, n) {
                        var e = $.trim(e.replace(/["\\]*/g, ""));
                        if (!n) {
                            this.vidx = -1;
                            this.inputold = e;
                            if (e) {
                                var r = this.popups.get("suggest");
                                r && r.layer && (r.layer.cursor = -1);
                                E.cancel();
                                m("");
                                if (this.cache[e]) {
                                    this.suggLoaded(this.cache[e]);
                                    $(o).trigger("sugEnter", this.cache[e])
                                } else {
                                    E.send(T(e))
                                }
                            } else this.popups.close()
                        } else {
                            u.trigger("cityfinished", this.getValue())
                        }
                        u.trigger("citychanged", this.getValue())
                    },
                    keypress: function(e) {
                        this.keypress(e, e.keyCode)
                    }
                },
                focus: function() {
                    this.inputEl.select()
                },
                blur: function() {
                    if (this.vidx == -1) {
                        var e = this.popups.get("suggest");
                        if (e && e.layer) {
                            if (e.layer.cursor > -1) {
                                var t = e.layer.nodes[e.layer.cursor].item.key,
                                n = e.layer.nodes[e.layer.cursor].item.url;
                                this.setValue(t);
                                m(n);
                                N(e.layer.nodes[e.layer.cursor].item.key, "1");
                                u.trigger("reloadList", t)
                            }
                        }
                    }
                },
                popups: {
                    main: {
                        initialize: function() {
                            var e = this.own;
                            e.setPanel(this.panel);
                            if (!o.HotelLang) {
                                S.send("http://hotel.qunar.com/render/hoteldiv.jsp?")
                            } else {
                                g.render(a);
                                e.cache["CITYNAME"] = e.getValue()
                            }
                        },
                        open: function() {
                            var e = this.own;
                            if (!self.HotelLang) {
                                return
                            }
                            if (f) {
                                var t = e.getValue();
                                if (e.cache["CITYNAME"] && e.cache["CITYNAME"] !== t) {
                                    P(t,
                                    function(t) {
                                        e.panel.innerHTML = "";
                                        e.render(i[t])
                                    });
                                    e.cache["CITYNAME"] = e.getValue()
                                }
                            }
                        }
                    },
                    suggest: {
                        initialize: function() {
                            this.layer = new x(this, {
                                select: function(e, t, n) {
                                    if (!n) {
                                        $(o).trigger("sugClick", e)
                                    }
                                    if (e > -1) {
                                        if (t) {
                                            this.popup.own.setValue(this.nodes[e].item.key);
                                            m(this.nodes[e].item.url)
                                        } else {
                                            this.popup.own.volateValue(this.nodes[e].item.key)
                                        }
                                    } else {
                                        if (t) {
                                            this.popup.own.initValue(this.popup.own.inputold);
                                            m(this.nodes[e].item.url)
                                        } else {
                                            this.popup.own.volateValue(this.popup.own.inputold)
                                        }
                                    }
                                    this.popup.own.vidx = e;
                                    if (t) this.popup.close();
                                    if (t && e > -1) {
                                        var r = g.getValue();
                                        N(r, "1");
                                        u.trigger("reloadList", r)
                                    }
                                }
                            })
                        }
                    }
                },
                attrs: {
                    suggRequest: new ScriptRequest({
                        oncomplete: function(e) {
                            g.dataLoaded(e)
                        },
                        callbackName: "callback"
                    }),
                    invalid: function() {
                        return $(this.infoPanel).hasClass("errtext")
                    },
                    cache: {},
                    suggLoaded: function(e) {
                        if (e) this.cache[e.userInput] = e;
                        if (!e || !e.ret || !e.data || e.data.length == 0) {
                            var t = this.popups.open("suggest");
                            if (t.layer.error) {
                                t.layer.error()
                            } else {
                                this.setInfo("暂未收录", "errtext");
                                this.popups.close()
                            }
                            N(e.userInput, "0");
                            return
                        }
                        this.setInfo("");
                        e.q = e.userInput;
                        var t = this.popups.open("suggest");
                        t.layer.refresh(e);
                        t.layer.enter(0)
                    },
                    render: function(e) {
                        var t = s[e];
                        var n = o.HotelLang[e];
                        var i = o.hotCityData[e];
                        if (!n || !i) return false;
                        var u = this;
                        var a = u.getOwnPanel();
                        var f = [];
                        var l = new UIObject;
                        var c = "__hotel_citybox_" + r();
                        l.text('<div class="hotelhint" style="width:' + t + 'px">').append("<img", "close", ' class="closeImg" src="http://source.qunar.com/site/images/new_main/Hot_close.png"/>').append('<div class="b_hct_tit">直接输入可搜索71360个城市</div>').append('<div class="b_hct_nav">');
                        for (var h = 0; h < n.length; h++) {
                            var p = "_hotel_search_tab_" + h + r();
                            f.push({
                                tabID: p,
                                tabname: n[h],
                                render: B({
                                    tabName: n[h],
                                    contents: i,
                                    own: u,
                                    boxId: c
                                })
                            });
                            l.text('<span id="', p, '" key="', n[h], '"');
                            if (h == 0) {
                                l.text(' class="active" ')
                            }
                            l.text(">", n[h], "</span>")
                        }
                        l.text("</div>", '<div id="', c, '"></div>', '<div class="b_hct_tip">更多城市可直接输入搜索</div></div>');
                        l.write(a);
                        new TabGroup({
                            panelContainerID: c,
                            items: f
                        });
                        u.cache[e] = u.panel.innerHTML;
                        $(l.getDomNode("close")).bind("click",
                        function() {
                            u.popups.close()
                        })
                    },
                    setPanel: function(e) {
                        this.panel = e
                    },
                    getOwnPanel: function() {
                        return this.panel
                    },
                    keypress: function(e, t) {
                        var n = this.popups.get("suggest");
                        if (!n || !n.isOpend()) {
                            if (t === 13) {
                                u.trigger("enterClick")
                            }
                            return
                        }
                        var r = true;
                        switch (t) {
                        case 40:
                            n.layer.moveCursor(1, true, r);
                            break;
                        case 38:
                            n.layer.moveCursor( - 1, true, r);
                            break;
                        case 13:
                            e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                            n.layer.select(n.layer.cursor, true);
                            n.close();
                            y.focusin();
                            break;
                        default:
                        }
                    }
                }
            });
            var C = new ScriptRequest({
                oncomplete: function(e, t) {
                    y.listLoaded(e, t)
                }
            });
            var k = new ScriptRequest({
                oncomplete: function(e) {
                    $(o).trigger("sugQueryEnter", e);
                    y.suggLoaded(e)
                },
                callbackName: "callback"
            });
            var L = [];
            var A = function() {
                try {
                    var e = L,
                    t = e.length;
                    if (t < 4) return;
                    var n = e[t - 4]["k"] + e[t - 3]["k"] + e[t - 2]["k"] + e[t - 1]["k"];
                    if (n == "kcse" && e[t - 2]["f"]) { (new Image).src = "/opertrack.htm?v=1&t=" + (new Date).getTime() + "&oper=keyboard&n=" + encodeURIComponent(e[t - 3]["v"]) + "&o=" + encodeURIComponent(e[t - 3]["o"]) + "&idx=" + e[t - 2]["v"] + "&c=" + encodeURIComponent(g.getValue())
                    } else if (n == "skse" && t >= 5 && e[t - 2]["f"]) { (new Image).src = "/opertrack.htm?v=1&t=" + (new Date).getTime() + "&oper=keyboard&n=" + encodeURIComponent(e[t - 5]["v"]) + "&o=" + encodeURIComponent(e[t - 5]["v"]) + "&idx=" + e[t - 2]["v"] + "&c=" + encodeURIComponent(g.getValue())
                    } else if ((n == "ckcs" || n == "kccs" || n == "cccs") && e[t - 1]["f"]) { (new Image).src = "/opertrack.htm?v=1&t=" + (new Date).getTime() + "&oper=mouse&n=" + encodeURIComponent(e[t - 2]["v"]) + "&o=" + encodeURIComponent(e[t - 2]["o"]) + "&idx=" + e[t - 1]["v"] + "&c=" + encodeURIComponent(g.getValue())
                    } else if (n == "kkcs" && e[t - 1]["f"]) { (new Image).src = "/opertrack.htm?v=1&t=" + (new Date).getTime() + "&oper=mouse&n=" + encodeURIComponent(e[t - 2]["v"]) + "&o=" + encodeURIComponent(e[t - 2]["v"]) + "&idx=" + e[t - 1]["v"] + "&c=" + encodeURIComponent(g.getValue())
                    }
                } catch(r) {}
            };
            y = this.q = new XCombox(e.q, {
                button: {
                    mousedown: function(e) {
                        var t;
                        if (e && (t = e.target || e.srcElement)) {
                            this.openMainMenu();
                            e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false)
                        }
                    }
                },
                input: {
                    label: n.qLabel || '<div class="poi-add js-address"></div><div class="poi-hotel js-hotelname"></div>',
                    click: function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                        var t = this.popups.get("suggest");
                        if (t && t.isOpend()) {} else {
                            this.openMainMenu()
                        }
                    },
                    change: function(e, t, n) {
                        if (e !== t) {
                            $(this.labelEl).hide();
                            $(this.elem).removeClass("sugtype");
                            d.find('input[name="poiinname"]').remove();
                            $(this).trigger("poiinname")
                        }
                        if (!n) {
                            this.inputold = e;
                            k.cancel();
                            if (e) {
                                k.send("http://hs.qunar.com/api/hs/typeahead?city=" + encodeURI(g.getValue()) + "&q=" + encodeURIComponent(e));
                                this.popups.close("main")
                            } else {
                                this.popups.close("suggest")
                            }
                        } else {
                            $(o).trigger("sugQueryClick", e)
                        }
                        L.push({
                            k: "c",
                            v: e,
                            o: t
                        })
                    },
                    keypress: function(e) {
                        this.keypress(e, e.keyCode);
                        L.push({
                            k: "k",
                            v: e.keyCode
                        })
                    }
                },
                focus: function() {
                    this.city = g.getValue();
                    this.setInfo("");
                    this.inputEl.select()
                },
                popups: {
                    main: {
                        open: function() {
                            this.panel.innerHTML = "";
                            if (!g.invalid()) {
                                var e = g.getValue();
                                if (this.own.cache[e]) {
                                    this.own.listLoaded(this.own.cache[e], encodeURI(g.getValue()))
                                } else C.send("http://hotel.qunar.com/sugg.jsp?v=1&city=" + encodeURI(g.getValue()))
                            } else this.close()
                        }
                    },
                    suggest: {
                        initialize: function() {
                            this.layer = new ItemListLayer(this, {
                                select: function(e, t) {
                                    var n = this.popup.own;
                                    var r = true;
                                    if (e > -1) {
                                        var i = this.nodes[e].item;
                                        if (i.type) {
                                            var s = $(n.labelEl);
                                            s.children("div").hide();
                                            s.show().find(".js-" + i.type).show();
                                            var o = d.find('input[name="poiinname"]');
                                            if (o.length) {
                                                if (o.val() === i.type) {
                                                    r = false
                                                } else {
                                                    o.val(i.type)
                                                }
                                            } else {
                                                d.append('<input type="hidden" name="poiinname" value="' + i.type + '">')
                                            }
                                            if (r && window["GARuner"]) {
                                                if (window["GARuner"].length == 1) {
                                                    window["GARuner"](i.type === "address" ? "搜索框sug|地标附近酒店": "搜索框sug|名称包含query词")
                                                } else if (window["GARuner"].length == 4) {
                                                    window["GARuner"]("sugtype", i.type)
                                                }
                                            }
                                            $(n.elem).addClass("sugtype");
                                            $(n).trigger("poiinname", [i.type])
                                        } else {
                                            $(n.labelEl).hide();
                                            $(n.elem).removeClass("sugtype");
                                            d.find('input[name="poiinname"]').remove();
                                            $(n).trigger("poiinname")
                                        }
                                        t ? n.setValue(i.ahead) : n.volateValue(i.ahead)
                                    } else t ? n.initValue(n.inputold) : n.volateValue(n.inputold);
                                    n.vidx = e;
                                    if (t) {
                                        this.popup.close();
                                        u.trigger("qsug")
                                    }
                                    L.push({
                                        k: "s",
                                        v: e,
                                        f: t
                                    });
                                    A()
                                }
                            })
                        }
                    }
                },
                blur: function() {
                    this.setTip()
                },
                attrs: {
                    setValue: function() {
                        XCombox.prototype.setValue.apply(this, arguments);
                        this.setTip()
                    },
                    setTip: function() {
                        if (this.getValue() == "") this.setInfo(l, "infotext");
                        else this.setInfo("")
                    },
                    keypress: function(e, t) {
                        var n = this.popups.get("suggest");
                        if (!n || !n.isOpend()) {
                            if (t === 13) {
                                u.trigger("enterClick")
                            }
                            return
                        }
                        switch (t) {
                        case 40:
                            n.layer.moveCursor(1, true);
                            break;
                        case 38:
                            n.layer.moveCursor( - 1, true);
                            break;
                        case 13:
                            n.layer.select(n.layer.cursor, true);
                            u.trigger("qsug");
                            u.trigger("enterClick");
                            n.close();
                            L.push({
                                k: "e"
                            });
                            A();
                            break;
                        default:
                        }
                    },
                    cache: {},
                    listLoaded: function(e, t) {
                        this.cache[decodeURI(t)] = e;
                        if (g.getValue() == decodeURI(t)) {
                            var n = this;
                            var r = this.popups.get("main");
                            r.panel.innerHTML = e.replace(/onmousedown="return searchword\(.*\)"/ig, "");
                            var i = r.panel.getElementsByTagName("a");
                            for (var s = 0,
                            o = i.length; s < o; s++) {
                                i[s].onclick = function() {
                                    n.setValue($.trim(this.innerHTML));
                                    n.popups.close();
                                    u.trigger("qdiv")
                                }
                            }
                        } else this.popups.close("main")
                    },
                    suggLoaded: function(e) {
                        if (!e || !e.ret || !e.data || e.data.length == 0) {
                            this.popups.close("suggest")
                        } else {
                            var t = this.popups.open("suggest");
                            t.layer.refresh(e)
                        }
                    }
                }
            });
            var O = location.href.match(/poiinname=(address|hotelname)/);
            if (O && O.length > 1) {
                $(y.elem).addClass("sugtype");
                $(y.labelEl).show().find(".js-" + O[1]).show();
                $(e).append('<input type="hidden" name="poiinname" value="' + O[1] + '">')
            }
            var M = new ActionDelay(100);
            this.getDateChecker = function() {
                return t
            };
            this.setDateChecker = function(e) {
                t = e
            };
            b = this.fromDate = new XCombox(e.fromDate, {
                button: {
                    mousedown: function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                        this.openMainMenu()
                    }
                },
                input: {
                    label: n.fromDateLabel || "入住",
                    click: function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                        this.openMainMenu()
                    },
                    change: function(e, n, r) {
                        var i = t.checkDate1(this.getValue());
                        if (!i.error) {
                            t.setDate1(i.recommend);
                            M.reset(function() {
                                u.trigger("fromDateChanged")
                            })
                        }
                        this.setTip(i)
                    },
                    keypress: function(e) {
                        this.keypress(e, e.keyCode)
                    }
                },
                blur: function() {
                    var e = t.checkDate1(this.getValue());
                    t.setDate1(e.recommend);
                    this.setValue(e.recommend)
                },
                popups: {
                    main: {
                        initialize: function() {
                            this.dateLayer = new DateLayer(this.panel, t);
                            var e = this.own;
                            var n = this;
                            $(this.dateLayer).bind("selected",
                            function(t, r) {
                                e.setValue(QunarDate.format(r));
                                n.close()
                            })
                        },
                        open: function() {
                            var e = t.checkDate1(this.own.getValue());
                            var n = true;
                            this.dateLayer.render(e.recommendDate, t.getMin(), null, n)
                        }
                    }
                },
                attrs: {
                    keypress: function(e, t) {
                        switch (t) {
                        case 13:
                            if (this.popups.isOpend()) {
                                this.popups.close()
                            }
                            u.trigger("enterClick");
                            break;
                        case 27:
                            e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                            this.popups.close();
                            break;
                        default:
                        }
                    },
                    setTip: function(e) {
                        var e = e || t.checkDate1(this.getValue());
                        if (e.error) this.setInfo(e.value, "errtext", e.tip);
                        else this.setInfo(QunarDate.getDateTip(e.recommend), "", "")
                    },
                    invalid: function() {
                        return $(this.infoPanel).hasClass("errtext")
                    }
                }
            });
            w = this.toDate = new XCombox(e.toDate, {
                button: {
                    mousedown: function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                        this.openMainMenu()
                    }
                },
                input: {
                    label: n.toDateLabel || "离店",
                    click: function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                        this.openMainMenu()
                    },
                    change: function(e, n, r) {
                        var i = Math.min(new Date(QunarDate.parse(b.getValue()).getTime() + 28 * 24 * 3600 * 1e3), QunarDate.plus(t.getMax(), 1));
                        i = new Date(i);
                        var s = t.checkDate2(this.getValue(), b.getValue(), QunarDate.format(i));
                        if (!s.error) {
                            t.setDate2(s.recommend, QunarDate.format(QunarDate.plus(t.getMax(), 1)));
                            M.reset(function() {
                                u.trigger("toDateChanged")
                            })
                        }
                        this.setTip(s)
                    },
                    keypress: function(e) {
                        this.keypress(e, e.keyCode)
                    }
                },
                blur: function() {
                    var e = t.checkDate2(this.getValue(), b.getValue(), QunarDate.format(QunarDate.plus(t.getMax(), 1)));
                    t.setDate2(e.recommend, QunarDate.format(QunarDate.plus(t.getMax(), 1)));
                    this.setValue(t.getDate2())
                },
                popups: {
                    main: {
                        initialize: function() {
                            this.dateLayer = new DateLayer(this.panel, t);
                            var e = this.own;
                            var n = this;
                            $(this.dateLayer).bind("selected",
                            function(t, r) {
                                e.setValue(QunarDate.format(r));
                                n.close()
                            })
                        },
                        open: function() {
                            var e = t.checkDate2(this.own.getValue(), b.getValue(), QunarDate.format(QunarDate.plus(t.getMax(), 1)));
                            var n = new Date(QunarDate.parse(b.getValue()).getTime() + 24 * 3600 * 1e3);
                            var r = new Date(Math.min(new Date(QunarDate.parse(b.getValue()).getTime() + 28 * 24 * 3600 * 1e3), new Date(QunarDate.plus(t.getMax(), 1))));
                            var i = false;
                            this.dateLayer.render(e.recommendDate, n, r, i)
                        }
                    }
                },
                attrs: {
                    keypress: function(e, t) {
                        switch (t) {
                        case 13:
                            if (this.popups.isOpend()) {
                                this.popups.close()
                            }
                            u.trigger("enterClick");
                            break;
                        case 27:
                            e.preventDefault ? e.preventDefault() : e.returnValue && (e.returnValue = false);
                            this.popups.close();
                            break;
                        default:
                        }
                    },
                    setTip: function(e) {
                        var e = e || t.checkDate2(this.getValue(), b.getValue(), QunarDate.format(QunarDate.plus(t.getMax(), 1)));
                        if (e.error) this.setInfo(e.value, "errtext", e.tip);
                        else this.setInfo(QunarDate.getDateTip(e.recommend), "", "")
                    },
                    invalid: function() {
                        return $(this.infoPanel).hasClass("errtext")
                    }
                }
            });
            b.initValue(t.getDate1());
            b.setTip();
            w.initValue(t.getDate2());
            w.setTip();
            if (n.q) {
                y.initValue(q);
                y.city = g.getValue()
            } else {
                y.setTip()
            }
            u.bind("fromDateChanged",
            function() {
                var e = t.checkDate1(b.getValue()).recommend;
                var n = Math.min(QunarDate.plus(QunarDate.parse(e), 28).getTime(), QunarDate.plus(t.getMax(), 1).getTime());
                var r = t.checkDate2(w.getValue(), e, QunarDate.format(new Date(n))).recommend;
                t.setDate2(r, QunarDate.format(new Date(n)));
                w.setValue(r);
                $(document).trigger("fromDateChanged")
            });
            u.bind("toDateChanged",
            function() {
                $(document).trigger("toDateChanged")
            });
            var _ = new ActionDelay(200);
            u.bind("fromDateChanged", D);
            u.bind("toDateChanged", D);
            u.bind("citychanged",
            function(e, t) {
                P(t, H)
            });
            var P = o.judgeCity = function(e, t) {
                $.ajax({
                    type: "GET",
                    url: "http://hotel.qunar.com/render/mainland.jsp?cityname=" + encodeURIComponent(e),
                    cache: false,
                    dataType: "jsonp",
                    success: function(e) {
                        if (e) {
                            if (e.errcode) {} else {
                                t && t(e.ret ? 0 : 1)
                            }
                            u.trigger("judgeCityEvent", e)
                        }
                    }
                })
            };
            var H = function(e) {
                var t = null;
                var n = o.fromDate.getValue();
                var r = o.toDate.getValue();
                var i = QunarDate.today();
                if (o.isOverseasOld !== e) {
                    if (e) {
                        t = new DateChecker(364, 2, 1);
                        t.setDate1(n);
                        t.setDate2(r, QunarDate.format(QunarDate.plus(t.getMax(), 1)));
                        o.fromDate.setValue(n);
                        o.toDate.setValue(r);
                        o.setDateChecker(t)
                    } else {
                        t = new DateChecker(89, 2, 1);
                        var s, u;
                        if (!n) {
                            s = new Date(i.getTime() + 1e3 * 3600 * 24 * c)
                        } else {
                            s = QunarDate.parse(n);
                            if (s < i || s > t.getMax()) {
                                s = new Date(i.getTime() + 1e3 * 3600 * 24 * c)
                            }
                        }
                        if (!r) {
                            u = new Date(s.getTime() + 1e3 * 3600 * 24 * p)
                        } else {
                            u = QunarDate.parse(r);
                            if (u <= s || u > QunarDate.plus(t.getMax(), 1)) u = new Date(s.getTime() + 1e3 * 3600 * 24 * p)
                        }
                        t.setDate1(QunarDate.format(s));
                        t.setDate2(QunarDate.format(u));
                        o.fromDate.setValue(QunarDate.format(s));
                        o.toDate.setValue(QunarDate.format(u));
                        o.setDateChecker(t)
                    }
                    o.fromDate.popups.get("main").inited = false;
                    o.toDate.popups.get("main").inited = false;
                    o.isOverseasOld = e
                }
            };
            var B = function(e) {
                var t = e.tabName,
                n = e.contents,
                r = e.own,
                i = e.boxId;
                return function(e) {
                    var s = [];
                    if (!n[t]) return false;
                    var o = n[t].cityList;
                    if (!o) return false;
                    var f = n[t].charSort;
                    for (var l = 0; l < o.length; l++) {
                        if (!f) {
                            var c = o[l];
                            var h = c.list;
                            s.push("<ul>");
                            for (var p = 0; p < h.length; p++) {
                                var d = h[p];
                                s.push('<li key="' + d.name + '">' + '<a href="#" key="' + t + '" class="js_hotcity_intercity" data-city="' + (d.cityurl || "") + '">' + d.name + "</a></li>")
                            }
                            s.push("</ul>")
                        } else {
                            var c = o[l];
                            var h = c.list;
                            var v = c["char"] ? c["char"] : "";
                            s.push('<dl class="e_hct_lst"><dt class="citychar">' + c["char"] + ' </dt><dd class="cityname"><ul>');
                            for (var p = 0; p < h.length; p++) {
                                var d = h[p];
                                s.push('<li key="' + d.name + '">' + '<a href="#" key="' + t + '" class="js_hotcity_maincity" data-city="' + (d.cityurl || "") + '">' + d.name + "</a></li>")
                            }
                            s.push("</ul></dd></dl>")
                        }
                    }
                    e.innerHTML = s.join("");
                    var g = e.getElementsByTagName("a");
                    for (var l = 0,
                    y = g.length; l < y; l++) {
                        g[l].onclick = function() {
                            var e = $.trim(this.innerHTML);
                            var t = this.getAttribute("key");
                            var n = this.getAttribute("data-city");
                            r.setValue(e);
                            m(n);
                            r.popups.close();
                            N(r.getValue(), "1&hot=1");
                            r.setInfo("");
                            u.trigger("selectHotCity", e);
                            u.trigger("select", e);
                            u.trigger("gaHotcity", [e, a, t]);
                            self._invalid = false;
                            u.trigger("reloadList", e);
                            return false
                        }
                    }
                    if (n[t].cls) {
                        $("#" + i).get(0).className = n[t].cls
                    } else {
                        $("#" + i).get(0).className = ""
                    }
                }
            }
        }
    } (t.exports, t, e);
    e.____MODULES["cccc35c30f2c93816ed8f6ba4fb2cee4"] = t.exports
})(this); (function(e) {
    var t = {
        id: "4708a3d74cd7a9dda47e967466e4adfa",
        filename: "suggestStatistics.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        var r = "";
        var i = "";
        var s = [];
        var o = function(e) {
            if (!e) {
                return
            }
            $(e).bind("sugEnter",
            function(e, t) {
                var n = t.data,
                i = t.city,
                s = "";
                $(n).each(function(e, t) {
                    s = s + t.p + (e + 1 == n.length ? "": "|")
                });
                r = "enterCity=" + encodeURIComponent(i) + "&suggestCity=" + encodeURIComponent(s)
            }).bind("sugClick",
            function(e, t) {
                var n = "&cityIndex=" + (t + 1);
                u(r, n)
            });
            $(e).bind("sugQueryEnter",
            function(e, t) {
                s = t.data;
                var n = t.q,
                r = "";
                $(s).each(function(e, t) {
                    r = r + t.ahead + (e + 1 == s.length ? "": "|")
                });
                i = "enterQuery=" + encodeURIComponent(n) + "&suggestQuery=" + encodeURIComponent(r)
            }).bind("sugQueryClick",
            function(e, t) {
                var n = 1,
                r;
                $(s).each(function(e, i) {
                    if (t == i.ahead) {
                        r = "&queryIndex=" + (e + n);
                        return
                    }
                });
                u(i, r)
            })
        };
        var u = function(e, t) {
            var n = "http://m.ued.qunar.com/log/param?";
            var r = document.createElement("img");
            var i = (new Date).getTime().toString();
            r.onload = function() {
                r.onload = null;
                r = null
            };
            r.src = n + e + t + "&timestamp=" + i;
            e = ""
        };
        e.init = o
    } (t.exports, t, e);
    e.____MODULES["4708a3d74cd7a9dda47e967466e4adfa"] = t.exports
})(this); (function(e) {
    var t = {
        id: "e0bd7c1857a2ca1f8ba5601f1162367a",
        filename: "searchForm.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        function o(e) {
            var t = e.$form;
            var n = e.context;
            var r;
            var o = e.searchtype;
            var a = t.find("input[name=fromDate]");
            var f = t.find("input[name=toDate]");
            var l = e.fromRule || 2;
            var c = e.toRule || 3;
            var h = e.span | 89;
            var p = a.val() || QunarDate.format(new Date(SERVER_TIME.getTime() + l * 24 * 60 * 60 * 1e3));
            var d = f.val() || QunarDate.format(new Date(SERVER_TIME.getTime() + c * 24 * 60 * 60 * 1e3));
            var v = new DateChecker(h, l, 1);
            v.setDate1(p);
            v.setDate2(d, QunarDate.format(QunarDate.plus(v.getMax(), 1)));
            r = new i(t.get(0), v, {
                hotCityType: o,
                isJudgeCity: false,
                cityLabel: "目的地",
                qLabel: "",
                fromDateLabel: "入住日期",
                toDateLabel: "离店日期",
                queryTip: "(选填)酒店名、地标、商圈，可组合搜索",
                fromRule: l,
                toRule: c
            });
            t.append('<input type="hidden" name="QHFP" value="' + n.qhfp.getQHFPValue() + '"/>');
            u(r, t);
            s.init(r);
            return r
        }
        function u(e, t) {
            var n = t.find(".js_btnsearch");
            t.bind("submit",
            function(t) {
                var n = !e.toCity.invalid() && !e.fromDate.invalid() && !e.toDate.invalid();
                if (n) {} else {
                    t.preventDefault()
                }
            });
            $(e).bind("qsug",
            function() {
                a("sug")
            }).bind("qdiv",
            function() {
                a("div")
            }).bind("gaHotcity",
            function(e, t, n, r) {
                n = n === "intercity" ? "国际": "国内";
                GARuner("酒店首页|" + n + "|" + r + "|" + t)
            }).bind("enterClick",
            function() {
                t.submit()
            });
            t.find("input").one("focus",
            function() {
                $(".livetexbox").removeClass("livetexbox")
            });
            n.bind("focus",
            function() {
                n.addClass("search-button-focus")
            }).bind("blur",
            function() {
                n.removeClass("search-button-focus")
            }).bind("click",
            function() {
                t.submit()
            })
        }
        function a(e) {
            var t = $("#fromParam");
            var n = t.attr("value");
            var r = n.indexOf("|");
            if (r != -1) {
                n = n.substring(0, r)
            }
            t.attr("value", n + "|" + e)
        }
        var i = e.____MODULES["cccc35c30f2c93816ed8f6ba4fb2cee4"];
        var s = e.____MODULES["4708a3d74cd7a9dda47e967466e4adfa"];
        t.initSearchBox = o
    } (t.exports, t, e);
    e.____MODULES["e0bd7c1857a2ca1f8ba5601f1162367a"] = t.exports
})(this); (function(e) {
    var t = {
        id: "593f274b1b794c87eae7de0dfafbede9",
        filename: "mapEnter.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        function l(e) {
            r = e;
            s = i.find("a");
            u = o.find("a");
            p.bind();
            d.bind()
        }
        function c(e) {
            var t = [];
            t.push("cityurl=" + e);
            t.push("query=" + a.q.getValue());
            t.push("fromDate=" + a.fromDate.getValue());
            t.push("toDate=" + a.toDate.getValue());
            t.push(r.qhfp.getQHFPParam());
            return "/render/map?" + t.join("&")
        }
        function h(e, t) {
            a = e;
            var n = a.toCity.getValue();
            if (n === "香港" || n == "澳门") {
                p.show();
                d.show()
            } else {
                if (t) {
                    p.show();
                    d.show()
                } else {
                    p.hide();
                    d.hide()
                }
            }
        }
        var r, i = $("#mainlandMapBtn"),
        s,
        o = $("#interMapBtn"),
        u,
        a = null,
        f = "left=0,top=0,width=" + (screen.availWidth - 10) + ",height=" + (screen.availHeight - 50) + ",toolbar=yes,location=yes,directories=yes,menubar=yes,scrollbars=yes,resizable=yes,status=yes";
        var p = {
            show: function() {
                i.css({
                    display: "inline-block"
                });
                s.attr("tabindex", 5)
            },
            hide: function() {
                i.hide();
                s.removeAttr("tabindex")
            },
            bind: function() {
                var e;
                i.bind("click",
                function() {
                    e = a.toCityUrl.val();
                    window.GARuner && window.GARuner("map_portal1");
                    window.open(c(e), "大地图找酒店" + (new Date).valueOf(), f)
                });
                s.bind("focus",
                function() {
                    s.parent().addClass("map-button-focus")
                }).bind("blur",
                function() {
                    s.parent().removeClass("map-button-focus")
                })
            }
        };
        var d = {
            show: function() {
                o.css({
                    display: "inline-block"
                });
                u.attr("tabindex", 5)
            },
            hide: function() {
                o.hide();
                u.removeAttr("tabindex")
            },
            bind: function() {
                var e;
                o.bind("click",
                function() {
                    e = a.toCityUrl.val();
                    window.GARuner && window.GARuner("map_portal1");
                    window.open(c(e), "大地图找酒店" + (new Date).valueOf(), f)
                });
                u.bind("focus",
                function() {
                    u.parent().addClass("map-button-focus")
                }).bind("blur",
                function() {
                    u.parent().removeClass("map-button-focus")
                })
            }
        };
        t.exports = {
            judge: h,
            init: l
        }
    } (t.exports, t, e);
    e.____MODULES["593f274b1b794c87eae7de0dfafbede9"] = t.exports
})(this); (function(e) {
    var t = {
        id: "698f0b8d25ae60dcfea52761e944083c",
        filename: "searchBoxTab.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        var r = function(e) {
            var t = this,
            n = $("#js_searchtype_inter"),
            r = $("#js_searchtype_mainland");
            this.init = function() {
                var e = n.attr("checked");
                var r = e ? true: false;
                $(t).trigger("firstShowTab", r);
                $(t).trigger("clickTab", r);
                t.bind()
            };
            this.bind = function() {
                n.bind("click",
                function() {
                    $(t).trigger("clickTab", true);
                    GARuner("酒店搜索|国际酒店")
                });
                r.bind("click",
                function() {
                    $(t).trigger("clickTab", false);
                    GARuner("酒店搜索|国内酒店")
                })
            }
        };
        e.searchBoxTab = r
    } (t.exports, t, e);
    e.____MODULES["698f0b8d25ae60dcfea52761e944083c"] = t.exports
})(this); (function(e) {
    var t = {
        id: "fd31afdc2298ce09cb87493e907e5937",
        filename: "index.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        var i = e.____MODULES["e0bd7c1857a2ca1f8ba5601f1162367a"];
        var s = e.____MODULES["593f274b1b794c87eae7de0dfafbede9"];
        var o = e.____MODULES["698f0b8d25ae60dcfea52761e944083c"];
        n.exports = {
            initSearchBox: i.initSearchBox,
            mapEnter: s,
            searchBoxTab: o.searchBoxTab
        }
    } (t.exports, t, e);
    e.____MODULES["fd31afdc2298ce09cb87493e907e5937"] = t.exports
})(this); (function(e) {
    var t = {
        id: "6bd0ba2c8633368e00206c2930e54b51",
        filename: "tabSwitch.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        function s(e) {
            e = e || "";
            if (!e) return;
            return e.indexOf(".") === 0 ? e: "." + e
        }
        e.____MODULES["3eab014e76bc87950932879578be9a36"];
        var i = {
            maxTab: 10,
            maxContent: 3,
            lineNum: 1,
            tabTemplate: "",
            contentTemplate: "",
            activeClass: "active",
            tabItemClass: ".js_tab_item",
            contentItemClass: ".js_content_item",
            tabContainerClass: ".js_tab",
            contentContainerClass: ".js_content"
        };
        var o = function(e) {
            var t = this;
            var n = "";
            this.options = e = $.extend({},
            i, e);
            this.tabData = {};
            this.contentData = {};
            this.initialized = false;
            this.getMaxTab = function() {
                return e.maxTab
            };
            this.getMaxContent = function() {
                return e.maxContent
            };
            this.getLineNum = function() {
                return e.lineNum
            };
            this.getTabTemplate = function() {
                return e.tabTemplate
            };
            this.getContentTemplate = function() {
                return e.contentTemplate
            };
            this.getActiveClass = function() {
                return e.activeClass
            };
            this.getTabItemClass = function() {
                return e.tabItemClass
            };
            this.getContentItemClass = function() {
                return e.contentItemClass
            };
            this.getTabContainerClass = function() {
                return e.tabContainerClass
            };
            this.getContentContainerClass = function() {
                return e.contentContainerClass
            };
            this.setTabData = function(e) {
                this.tabData = e
            };
            this.getTabData = function() {
                return this.tabData
            };
            this.setContentData = function(e) {
                this.contentData = e
            };
            this.getContentData = function() {
                return this.contentData
            };
            this.setActiveTabName = function(e) {
                n = e
            };
            this.getActiveTabName = function() {
                return n
            };
            this.update$TabEl = function() {
                this.$tabEl = e.container.find(e.tabContainerClass)
            };
            this.update$ContentEl = function() {
                this.$contentEl = e.container.find(e.contentContainerClass)
            };
            this.infoLoad = function(e) {
                e = e || {};
                $.ajax({
                    type: e.ajaxType || "GET",
                    url: e.url,
                    dataType: e.ajaxDataType || "jsonp",
                    data: $.extend({},
                    e.params, {
                        _t: (new Date).getTime()
                    }),
                    success: function(n) {
                        e.success.call(t, n)
                    },
                    error: function() {
                        e.fail.call(t)
                    }
                })
            };
            this.init = function() {
                if (!e.container || e.container.length <= 0) {
                    return
                }
                this.$container = e.container;
                this.$tabEl = e.container.find(e.tabContainerClass);
                this.$contentEl = e.container.find(e.contentContainerClass);
                this.initialized = true;
                r()
            };
            var r = function() {
                e.container.delegate(e.tabItemClass, "click",
                function() {
                    var e = $(this);
                    var r = $.trim(e.text());
                    $(t).trigger("tabClick", e);
                    if (n === r) {
                        return
                    }
                    n = r;
                    $(t).trigger("tabChange", e)
                })
            };
            this.changeTab = function(e) {
                if (!e.size()) return;
                e.addClass(this.options.activeClass).siblings().removeClass(this.options.activeClass);
                t.renderContent()
            };
            this.renderTabs = function() {
                if (!this.tabData) return;
                if (!this.tabTpl) {
                    this.tabTpl = Hogan.compile(e.tabTemplate)
                }
                if (!this.$tabEl || !this.$tabEl.size()) {
                    e.container.append(this.tabTpl.render(this.tabData))
                } else {
                    this.$tabEl.replaceWith(this.tabTpl.render(this.tabData))
                }
                this.$tabEl = e.container.find(e.tabContainerClass)
            };
            this.renderContent = function() {
                if (!this.contentData) return;
                if (!this.contentTpl) {
                    this.contentTpl = Hogan.compile(e.contentTemplate)
                }
                if (!this.$contentEl || !this.$contentEl.size()) {
                    e.container.append(this.contentTpl.render(this.contentData[n]))
                } else {
                    this.$contentEl.replaceWith(this.contentTpl.render(this.contentData[n]))
                }
                this.$contentEl = e.container.find(e.contentContainerClass)
            };
            this.hide = function() {
                e.container && e.container.hide()
            };
            this.show = function() {
                e.container && e.container.show()
            }
        };
        t.TabSwitch = o
    } (t.exports, t, e);
    e.____MODULES["6bd0ba2c8633368e00206c2930e54b51"] = t.exports
})(this); (function(e) {
    var t = {
        id: "34941cf673e4284167cd6bdabb693ad2",
        filename: "linkagehotel.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        var i = {};
        var s = e.____MODULES["6bd0ba2c8633368e00206c2930e54b51"];
        var o = function(e) {
            var t = e.$box;
            var n = e.context;
            var r = this;
            var o, u;
            this.targetCity = "";
            this.directoryTabData = {};
            this.superTabData = {};
            this.tabData = {};
            this.setActiveTabName = function(e, t) {
                var n = o.options.activeClass,
                i = u.options.activeClass;
                this.targetCity = e;
                if ($.isEmptyObject(this.directoryTabData.cityName)) {
                    r.updateTabData()
                }
                if (this.isExist(e, this.directoryTabData.cityName)) {
                    o.setActiveTabName(e);
                    o.$tabEl.find("li").removeClass(n);
                    o.$tabEl.find('a[data-cityurl="' + t + '"]').parent().addClass(n)
                }
                if ($.isEmptyObject(this.superTabData.cityName)) {
                    r.updateTabData()
                }
                if (this.isExist(e, this.superTabData.cityName)) {
                    u.setActiveTabName(e);
                    u.$tabEl.find("li").removeClass(i);
                    u.$tabEl.find('a[data-cityurl="' + t + '"]').parent().addClass(i)
                }
            };
            this.getTargetCity = function() {
                return this.targetCity
            };
            this.isExist = function(e, t) {
                var n = false;
                if (t[e]) n = true;
                return n
            };
            this.init = function() {
                if (!t || !t.size()) {
                    return
                }
                c();
                this.bindEvent()
            };
            this.updateTabData = function() {
                r.directoryTabData = l(o.$tabEl);
                r.superTabData = l(u.$tabEl);
                r.tabData = {
                    cityUrl: $.extend({},
                    r.directoryTabData.cityUrl, r.superTabData.cityUrl),
                    cityName: $.extend({},
                    r.directoryTabData.cityName, r.superTabData.cityName)
                }
            };
            this.loadHtml = function(e, t, n) {
                if (!this.isExist(t, this.tabData.cityUrl)) {
                    return
                }
                this.setActiveTabName(n, t);
                a(e)
            };
            var a = function(e) {
                $.ajax({
                    type: "GET",
                    url: e + "/tab.txt?v=" + Math.random(),
                    cache: false,
                    success: function(e) {
                        e = $.trim(e);
                        var t = $("<div></div>").html(e);
                        i[r.targetCity] = {};
                        i[r.targetCity]["directoryHotel"] = t.find(".js_directory");
                        i[r.targetCity]["superHotel"] = t.find(".js_supter");
                        f();
                        t = null
                    },
                    error: function() {}
                })
            };
            var f = function() {
                var e = null,
                t = null;
                if (i[r.targetCity]["directoryHotel"]) {
                    e = o.$container.find(".js_directory .js_content");
                    if (e.size()) {
                        e.html(i[r.targetCity]["directoryHotel"].find(".js_content").html())
                    } else {
                        o.$container.prepend('<div class="m-hotel-directory js_directory">' + i[r.targetCity]["directoryHotel"].html() + "</div>");
                        o.update$TabEl();
                        o.update$ContentEl()
                    }
                }
                if (i[r.targetCity]["superHotel"]) {
                    t = u.$container.find(".js_supter .js_content");
                    if (t.size()) {
                        t.html(i[r.targetCity]["superHotel"].find(".js_content").html())
                    } else {
                        u.$container.prepend('<div class="m-hotel-super js_supter">' + i[r.targetCity]["superHotel"].html() + "</div>");
                        u.update$TabEl();
                        u.update$ContentEl()
                    }
                }
            };
            var l = function(e) {
                var t = {
                    cityUrl: {},
                    cityName: {}
                };
                if (!e || !e.length) return t;
                var n = e.find("a");
                var r = null;
                $.each(n,
                function(e, n) {
                    r = $(n);
                    t.cityUrl[r.attr("data-cityurl")] = 1;
                    t.cityName[r.text()] = 1
                });
                return t
            };
            var c = function() {
                o = new s.TabSwitch({
                    container: t,
                    tabItemClass: ".js_directory .js_tab a",
                    tabContainerClass: ".js_directory .js_tab",
                    contentContainerClass: ".js_directory .js_content",
                    activeClass: "on"
                });
                u = new s.TabSwitch({
                    container: t,
                    tabItemClass: ".js_supter .js_tab a",
                    tabContainerClass: ".js_supter .js_tab",
                    contentContainerClass: ".js_supter .js_content",
                    activeClass: "on"
                });
                o.init();
                u.init();
                r.updateTabData();
                $(o).bind("tabChange", h);
                $(u).bind("tabChange", h)
            };
            var h = function(e, t) {
                var n = $(t);
                var s = n.attr("data-cityurl");
                r.setActiveTabName(this.getActiveTabName(), s);
                var o = i[this.getActiveTabName()];
                if (o) {
                    f()
                } else {
                    a("/tuijian/" + s)
                }
                $(r).trigger("tabChange", t)
            };
            this.bindEvent = function() {
                t.delegate(".js_content_item", "mouseenter",
                function() {
                    $(this).addClass("m-area-hover")
                }).delegate(".js_content_item", "mouseleave",
                function() {
                    $(this).removeClass("m-area-hover")
                });
                t.delegate(".js_content a", "click",
                function() {
                    var e = $(this);
                    e.attr("href", n.qhfp.addQHFPForHref(e.attr("href")))
                })
            }
        };
        n.exports = o
    } (t.exports, t, e);
    e.____MODULES["34941cf673e4284167cd6bdabb693ad2"] = t.exports
})(this); (function(e) {
    var t = {
        id: "6441ee87cd75f91e97661f050dd8e11b",
        filename: "index.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        var i = e.____MODULES["34941cf673e4284167cd6bdabb693ad2"];
        n.exports = {
            linkageHotel: i
        }
    } (t.exports, t, e);
    e.____MODULES["6441ee87cd75f91e97661f050dd8e11b"] = t.exports
})(this); (function(e) {
    var t = {
        id: "36082b95cc67cb307bdf97500191f71e",
        filename: "hometrace.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        function i() {
            return r.getQHFP()
        }
        function s() {
            return r.generate()
        }
        var r = new window.QHTrace;
        var o = function(e, t) {
            if (!e || !e.indexOf) {
                return e
            }
            var n = e.indexOf(t);
            if (n >= 0) {
                var r = e.substring(0, n);
                var i = e.substring(n);
                n = i.indexOf("&");
                if (n >= 0) {
                    i = i.substring(n)
                } else {
                    i = ""
                }
                if (r.charAt(r.length - 1) == "&") {
                    r = r.substring(0, r.length - 1)
                }
                e = r + i
            }
            return e
        };
        var u = function(e) {
            var t = new RegExp("^/city/[^/]+/q-.*$"),
            n = new RegExp("^http://hotel.qunar.com/city/[^/]+/q-.*$"),
            i = new RegExp("^/city/[^/]+/dt-.*$"),
            s = new RegExp("^http://hotel.qunar.com/city/[^/]+/dt-.*$");
            if (e.indexOf("#") < 0) {
                e += "#"
            }
            e = o(e, "QHFP");
            e = o(e, "QHPR");
            if (t.test(e) || n.test(e) || i.test(e) || s.test(e)) {
                return e + r.generate()
            }
        };
        var a = function() {
            var e = "";
            var t = (new Date).getTime();
            if (r) {
                e += "QHFP=" + (r.urlfrom || "");
                e += "&QHP=" + r.pageFrom;
                e += "&refer=" + encodeURIComponent(document.referrer || "");
                e += "&time=" + t
            }
            var n = "/trans_i?" + e;
            var i = new Image;
            i.onload = function() {
                i.onload = null;
                i = null
            };
            i.src = n
        };
        t.exports = {
            getQHFPValue: i,
            getQHFPParam: s,
            addQHFPForHref: u,
            addTransi: a
        }
    } (t.exports, t, e);
    e.____MODULES["36082b95cc67cb307bdf97500191f71e"] = t.exports
})(this); (function(e) {
    var t = {
        id: "6e2a26b9517ec13dbf00b343b391f431",
        filename: "utils.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        window.GARuner = function(e) {
            try {
                var t = window.__GA__;
                if (t) {
                    t.clk({
                        _ba_utm_ex: {
                            a: e
                        }
                    })
                }
            } catch(n) {}
        }
    } (t.exports, t, e);
    e.____MODULES["6e2a26b9517ec13dbf00b343b391f431"] = t.exports
})(this); (function(e) {
    var t = {
        id: "33d69798834c2a664f0cfb3e6697eb3b",
        filename: "index.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        var i = e.____MODULES["36082b95cc67cb307bdf97500191f71e"];
        e.____MODULES["6e2a26b9517ec13dbf00b343b391f431"];
        n.exports = {
            qhfp: i
        }
    } (t.exports, t, e);
    e.____MODULES["33d69798834c2a664f0cfb3e6697eb3b"] = t.exports
})(this); (function(e) {
    var t = {
        id: "3e015c21cde1b86759dc929ffe2c1d70",
        filename: "city.string",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        if (typeof window.QTMPL === "undefined") window.QTMPL = {};
        window.QTMPL["city"] = '<div class="m-hotel-deals-hd js_tab">\n    <ul class="deals-city-list">\n    {{#citys}}\n        <li class="{{active}} js_tab_item" data-tabchange="{{tabChange}}" data-name="{{cityName}}" data-value="{{cityUrl}}"><a href="#" onclick="return false;">{{cityName}}</a></li>\n    {{/citys}}\n    </ul>\n    <h3>{{title}}</h3>\n</div>';
        if (typeof t !== "undefined") t.exports = window.QTMPL["city"]
    } (t.exports, t, e);
    e.____MODULES["3e015c21cde1b86759dc929ffe2c1d70"] = t.exports
})(this); (function(e) {
    var t = {
        id: "9337bc32ea88b2aea34be56a07fc1526",
        filename: "hotel.string",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        if (typeof window.QTMPL === "undefined") window.QTMPL = {};
        window.QTMPL["hotel"] = '<div class="m-hotel-deals-bd clrfix js_content">\n{{#hotels}}\n    <div class="hotel-deals-items {{onlyImgCss}} js_content_item {{autoWidthClass}} {{lastClass}}" data-topic="{{isTopic}}">\n        <div class="hotel-picture">\n            <p class="hotel-pic"><a href="{{imghotelurl}}" target="_blank" class="js_img"><img src="{{imgurl}}"></a></p>\n            <a href="{{iconhotelurl}}" target="_blank" class="js_sale"><span class="icon-save {{iconClass}} png24">&nbsp;</span></a>\n            <div class="hotel-name"><h4><a href="{{namehotelurl}}" target="_blank" title="{{nametitle}}" class="js_name">{{name}}</a></h4></div>\n        </div>\n        <p class="hotel-baseinfo"><a href="{{deschotelurl}}" target="_blank" title="{{desctitle}}" class="js_desc">{{desc}}</a></p>\n        <p class="hotel-price"><a href="{{pricehotelurl}}" target="_blank" class="js_price"><cite>&yen;</cite>{{price}}</a></p>\n    </div>\n{{/hotels}}\n</div>';
        if (typeof t !== "undefined") t.exports = window.QTMPL["hotel"]
    } (t.exports, t, e);
    e.____MODULES["9337bc32ea88b2aea34be56a07fc1526"] = t.exports
})(this); (function(e) {
    var t = {
        id: "98afc6047f5fa29e7800d946bb8a25ea",
        filename: "tehui.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        function h() {
            var e = window.GARuner,
            t = this,
            n = "全国",
            r;
            var h = function() {
                r = t.tehuiTab = new i.TabSwitch({
                    container: $(".js_tehui"),
                    maxTab: 10,
                    maxContent: 4,
                    tabTemplate: s,
                    contentTemplate: o,
                    activeClass: "on"
                });
                r.init();
                d()
            };
            var p = function(e) {
                return e == n ? false: true
            };
            var d = function() {
                if (r.initialized) {
                    $(r).bind("tabChange",
                    function(n, i) {
                        if ($(i).attr("data-tabchange") === "true") {
                            $(t).trigger("tabChange", i)
                        }
                        r.changeTab($(i));
                        e("首页特价|城市切换")
                    });
                    r.options.container.delegate(".js_name", "click",
                    function() {
                        e("首页特价|标题")
                    }).delegate(".js_img", "click",
                    function() {
                        e("首页特价|图片")
                    }).delegate(".js_desc", "click",
                    function() {
                        e("首页特价|简介")
                    }).delegate(".js_price", "click",
                    function() {
                        e("首页特价|价格")
                    }).delegate(".js_sale", "click",
                    function() {
                        e("首页特价|优惠标签")
                    }).delegate(".js_content_item", "mouseenter",
                    function() {
                        $(this).addClass("hotel-deals-items-hover")
                    }).delegate(".js_content_item", "mouseleave",
                    function() {
                        $(this).removeClass("hotel-deals-items-hover")
                    }).delegate(".js_content_item", "click",
                    function() {
                        var e = $(this).attr("data-topic");
                        if (e === "true") {
                            return
                        }
                        var t = $(this).find("a").get(0).href;
                        window.open(t, "_blank");
                        return false
                    })
                }
            };
            h();
            this.loadInfo = function(e) {
                e = e || {};
                f = e.areaType;
                l = e.cityName;
                if (!r && !r.initialized) {
                    return
                }
                if (u[f]) {
                    v.call(r, u[f]);
                    return
                }
                r.infoLoad({
                    url: "/render/tehuiAdvertisement.jsp",
                    params: {
                        areaType: f
                    },
                    success: v,
                    fail: function() {
                        this.hide()
                    }
                })
            };
            var v = function(e) {
                e = e || {};
                u[f] = e;
                var t = e.cities,
                r = this,
                i = {},
                s = [],
                o = [],
                h = [],
                d = [],
                v = "",
                m = {};
                if (!e.ret || !t || !t.length) {
                    this.hide();
                    return
                }
                $.each(t,
                function(e, t) {
                    if (t && t.tuanList && t.tuanList.length >= a) {
                        i = {
                            cityName: t.cityName,
                            cityUrl: t.cityCode,
                            active: "",
                            tabChange: p(t.cityName)
                        };
                        if (t.cityName == n) {
                            o.push(i)
                        } else if (t.cityName == l) {
                            h.push(i)
                        } else {
                            d.push(i)
                        }
                        m[t.cityName] = {};
                        m[t.cityName]["hotels"] = [];
                        $.each(t.tuanList,
                        function(e, n) {
                            if (e < r.getMaxContent() / r.getLineNum()) {
                                m[t.cityName]["hotels"].push({
                                    onlyImgCss: !parseInt(n.type, 10) ? "topic-delivery": "",
                                    lastClass: e == a - 1 ? "last-deals-items": "",
                                    autoWidthClass: e == a - 2 ? "autowidth-deals-items": "",
                                    imghotelurl: n.url,
                                    imgurl: n.img,
                                    iconhotelurl: n.url,
                                    iconClass: c[n.type],
                                    namehotelurl: n.url,
                                    nametitle: n.title,
                                    name: window.subByte(n.title, 20, "..."),
                                    deschotelurl: n.url,
                                    desctitle: n.desc,
                                    desc: window.subByte(n.desc, 49, "..."),
                                    pricehotelurl: n.url,
                                    price: n.price,
                                    isTopic: !parseInt(n.type, 10)
                                })
                            }
                        })
                    }
                });
                if (d.length) {
                    s = d.concat(s);
                    if (!o.length) {
                        v = d[0]["cityName"]
                    }
                }
                if (h.length) {
                    s = h.concat(s);
                    v = h[0]["cityName"]
                }
                if (o.length) {
                    s = o.concat(s);
                    v = v ? v: o[0]["cityName"]
                }
                if (!s.length) {
                    this.hide();
                    return
                }
                this.setTabData({
                    title: "每日酒店特惠",
                    citys: s.slice(0, r.getMaxTab())
                });
                this.setActiveTabName(v);
                this.setContentData(m);
                this.renderTabs();
                this.renderContent();
                $(this.$tabEl.find('li[data-name="' + v + '"]')).addClass(this.getActiveClass());
                this.show()
            }
        }
        var i = e.____MODULES["6bd0ba2c8633368e00206c2930e54b51"];
        var s = e.____MODULES["3e015c21cde1b86759dc929ffe2c1d70"];
        var o = e.____MODULES["9337bc32ea88b2aea34be56a07fc1526"];
        var u = {};
        var a = 4;
        var f;
        var l = "";
        var c = {
            0 : "",
            1 : "tuan-tehui",
            2 : "direct-selling"
        };
        n.exports = {
            TeHui: h
        }
    } (t.exports, t, e);
    e.____MODULES["98afc6047f5fa29e7800d946bb8a25ea"] = t.exports
})(this); (function(e) {
    var t = {
        id: "57a599408fd355ebe13842b33cacfc11",
        filename: "index.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        var i = e.____MODULES["98afc6047f5fa29e7800d946bb8a25ea"];
        n.exports = {
            TeHui: i.TeHui
        }
    } (t.exports, t, e);
    e.____MODULES["57a599408fd355ebe13842b33cacfc11"] = t.exports
})(this); (function(e) {
    var t = {
        id: "c2170bb69a35c04e3098031d6623b130",
        filename: "ResponsiveLayoutAdapter.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) {
        function o() {
            function o(o) {
                if (t >= 0) {
                    clearTimeout(t)
                }
                t = setTimeout(function() {
                    t = -1;
                    var n = $("." + s);
                    var o = document.documentElement.clientWidth;
                    var u = "";
                    if (o < r) {
                        u = i.className
                    }
                    u = u || i.defaultClass;
                    n.removeClass(i.className + " " + i.defaultClass).addClass(u);
                    $(e).trigger("adjustWidth", o)
                },
                o ? 0 : n)
            }
            var e = this,
            t = -1,
            n = 300;
            o(true);
            $(window).resize(function() {
                o()
            });
            this.getWindowWidth = function() {
                return document.documentElement.clientWidth
            };
            this.getConfigure = function() {
                return i
            };
            this.isWider = function() {
                return this.getWindowWidth() > r
            };
            this.getDefaultWidth = function() {
                return r
            };
            this.adjust = function(e) {
                o(e)
            };
            this.setConfigure = function(e) {
                if (e) {
                    i = e;
                    o(true)
                }
                return i
            }
        }
        var r = 1200;
        var i = {
            className: "master-980",
            defaultClass: "master-1200"
        };
        var s = "js_adjustwidth";
        t.exports = new o
    } (t.exports, t, e);
    e.____MODULES["c2170bb69a35c04e3098031d6623b130"] = t.exports
})(this); (function(e) {
    var t = {
        id: "95d30b773a20cbf1529ad1bb46e11686",
        filename: "homepage.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        var i = e.____MODULES["bfb1a9af9985526107b16cc5aceea35a"];
        var s = e.____MODULES["5a7a89f280aadb1bc3dffbdb85f0fab2"];
        var o = e.____MODULES["fd31afdc2298ce09cb87493e907e5937"];
        var u = e.____MODULES["6441ee87cd75f91e97661f050dd8e11b"];
        var a = e.____MODULES["33d69798834c2a664f0cfb3e6697eb3b"];
        var f = e.____MODULES["57a599408fd355ebe13842b33cacfc11"];
        var l = e.____MODULES["c2170bb69a35c04e3098031d6623b130"];
        a.isWider = function() {
            return l.isWider()
        };
        l.setConfigure({
            className: "master-980",
            defaultClass: "master-1200"
        });
        $.extend(window, {
            system_onload: function() {
                femonitor.init("index");
                var e, t;
                var n = $("#mainlandForm"),
                r = $("#interForm");
                var l = null,
                h = null;
                c.onLoaded();
                c.adjustWidth();
                o.mapEnter.init(a);
                l = o.initSearchBox({
                    $form: r,
                    searchtype: "intercity",
                    context: a,
                    fromRule: parseInt(window.internationalFromDateRule || 2, 10),
                    toRule: parseInt(window.internationalToDateRule || 3, 10),
                    span: 364
                });
                $(l).bind("judgeCityEvent",
                function(e, t) {
                    o.mapEnter.judge(this, t && t.ret ? true: false)
                }).bind("cityUrlChange",
                function(t, n) {
                    var r = e.toCity.getValue();
                    var i = v.tehuiTab.$tabEl.find('li[data-name="' + r + '"]');
                    g.loadHtml("/tuijian/" + n, n, r);
                    if (i.size()) {
                        v.tehuiTab.setActiveTabName(r);
                        v.tehuiTab.changeTab(i)
                    }
                });
                h = o.initSearchBox({
                    $form: n,
                    searchtype: "domestic",
                    context: a,
                    fromRule: parseInt(window.fromDateRule || 1, 10),
                    toRule: parseInt(window.toDateRule || 2, 10),
                    span: 89
                });
                $(h).bind("judgeCityEvent",
                function(e, t) {
                    o.mapEnter.judge(this, t && t.ret ? true: false)
                }).bind("cityUrlChange",
                function(t, n) {
                    var r = e.toCity.getValue();
                    var i = v.tehuiTab.$tabEl.find('li[data-name="' + r + '"]');
                    m.loadHtml("/tuijian/" + n, n, r);
                    if (i.size()) {
                        v.tehuiTab.setActiveTabName(r);
                        v.tehuiTab.changeTab(i)
                    } else {
                        i = v.tehuiTab.$tabEl.find('li[data-name="全国"]');
                        v.tehuiTab.setActiveTabName("全国");
                        v.tehuiTab.changeTab(i)
                    }
                });
                c.trackSearch();
                var p = new o.searchBoxTab({
                    $mainlandForm: n,
                    $interForm: r
                });
                var d = new i.homeUgc;
                var v = new f.TeHui;
                $(v).bind("tabChange",
                function(n, r) {
                    var i = $(r);
                    var s = i.attr("data-name");
                    var o = i.attr("data-value");
                    e.toCity.setValue(s);
                    e.toCity.setInfo("");
                    e.toCityUrl.val(o);
                    if (t) {
                        g.loadHtml("/tuijian/" + o, o, s)
                    } else {
                        m.loadHtml("/tuijian/" + o, o, s)
                    }
                });
                $(p).bind("firstShowTab",
                function(t, n) {
                    e = n ? l: h;
                    d.init(e);
                    var r = window.setInterval(function() {
                        if (c.loaded) {
                            s.marketCode(e);
                            window.clearInterval(r)
                        }
                    },
                    500)
                }).bind("clickTab",
                function(n, r) {
                    e = r ? l: h;
                    e.judgeCity(e.toCity.getValue());
                    t = r;
                    c.adjustInterMainland(r);
                    v.loadInfo({
                        areaType: r ? 1 : 0,
                        cityName: e.toCity.getValue()
                    });
                    s.textlink.loadInfo({
                        isInter: r,
                        cityUrl: e.toCityUrl.val()
                    })
                });
                p.init();
                s.twoCode.init();
                var m = new u.linkageHotel({
                    $box: $(".js_mainland_mulu"),
                    context: a
                });
                var g = new u.linkageHotel({
                    $box: $(".js_inter_mulu"),
                    context: a
                });
                m.init();
                g.init();
                $(m).bind("tabChange",
                function(t, n) {
                    var r = $(n);
                    var i = $.trim(r.text());
                    var s = r.attr("data-cityurl");
                    var o = v.tehuiTab.$tabEl.find('li[data-name="' + i + '"]');
                    e.toCity.setValue(i);
                    e.toCity.setInfo("");
                    e.toCityUrl.val(s);
                    c.trackTab(i);
                    if (o.size()) {
                        v.tehuiTab.setActiveTabName(i);
                        v.tehuiTab.changeTab(o)
                    } else {
                        o = v.tehuiTab.$tabEl.find('li[data-name="全国"]');
                        v.tehuiTab.setActiveTabName("全国");
                        v.tehuiTab.changeTab(o)
                    }
                });
                $(g).bind("tabChange",
                function(t, n) {
                    var r = $(n);
                    var i = $.trim(r.text());
                    var s = r.attr("data-cityurl");
                    var o = v.tehuiTab.$tabEl.find('li[data-name="' + i + '"]');
                    e.toCity.setValue(i);
                    e.toCity.setInfo("");
                    e.toCityUrl.val(s);
                    c.trackTab(i);
                    if (o.size()) {
                        v.tehuiTab.setActiveTabName(i);
                        v.tehuiTab.changeTab(o)
                    }
                });
                a.qhfp.addTransi();
                c.suggBugfix();
                femonitor.end("script_end")
            },
            init_ad: function() {
                s.homeAd()
            }
        });
        var c = {
            $body: $("body"),
            loaded: false,
            onLoaded: function() {
                var e = this;
                $(window).bind("load",
                function() {
                    e.loaded = true;
                    e.trackLoad()
                })
            },
            trackLoad: function() {
                trackAction("HH|load|" + ((new Date).getTime() - CLIENT_TIME.getTime()) / 1e3, null, true)
            },
            trackSearch: function() {
                trackAction("HH|search|" + ((new Date).getTime() - CLIENT_TIME.getTime()) / 1e3, null, true)
            },
            trackTab: function(e) {
                trackAction("HH|tab|" + encodeURIComponent(e))
            },
            adjustWidth: function() {
                $(l).bind("adjustWidth",
                function(e, t) {
                    var n = t >= this.getDefaultWidth();
                    s.xiaobiantj.refresh({
                        hash: {
                            isWider: n ? 1 : 0
                        }
                    })
                })
            },
            adjustInterMainland: function(e) {
                if (!this.$body) {
                    this.$body = $("body")
                }
                this.$body.removeClass("master-inter master-mainland").addClass(e ? "master-inter": "master-mainland")
            },
            suggBugfix: function() {
                QunarStorage.setTimeout(1e3);
                QunarStorage.ready(function(e) {
                    var t = e.getItem("selectSugItem");
                    var n = e.getItem("selectSugItem_pageId");
                    if (t && n) {
                        if (window.GARunerById) {
                            window.GARunerById(n, t)
                        }
                        e.removeItem("selectSugItem");
                        e.removeItem("selectSugItem_pageId")
                    }
                })
            }
        }
    } (t.exports, t, e);
    e.____MODULES["95d30b773a20cbf1529ad1bb46e11686"] = t.exports
})(this); (function(e) {
    var t = {
        id: "14a2a7194abaec2e0acd2d73d6bea4a2",
        filename: "consoleLog.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(e, t, n) { (function() {
            if (window.console) {
                var e = "margin:30px; padding:27px 46px;line-height:68px;background:url('http://source.qunar.com/site/images/hotel/luotuo.gif') no-repeat;";
                var t = "去哪儿网前端诚邀您的加入!\n加入我们，成为全球最大的中文旅行网站的前端开发者 ^_^\n加入我们，百万年薪，赢娶白富美，走上人生巅峰不再是梦，\n赶快发送简历至hao.lin@qunar.com或kylin.zhao@qunar.com";
                var n = "请在邮件中注明：来自console";
                var r = "line-height:30px; font-size:1.5em; color:red;";
                var i = "line-height:30px; font-size:1.5em; text-shadow:0 1px 3px #f0f0f0;";
                console.log("%c", e);
                console.log("%c" + t, i);
                console.log("%c" + n, r)
            }
        })()
    } (t.exports, t, e);
    e.____MODULES["14a2a7194abaec2e0acd2d73d6bea4a2"] = t.exports
})(this); (function(e) {
    var t = {
        id: "300c663da9b16046c6c84ecd8c8d0578",
        filename: "home.js",
        exports: {}
    };
    if (!e.____MODULES) {
        e.____MODULES = {}
    }
    var n = function(t, n, r) {
        e.____MODULES["3eab014e76bc87950932879578be9a36"];
        e.____MODULES["9faeb6c2469aaa46a7423a5ede6c3856"];
        e.____MODULES["45fc1ca5292cf7c8c585eca45879567e"];
        e.____MODULES["0c6bd61d67093c4e407e594e5b740458"];
        e.____MODULES["c14f1ef20d545971d81f869effbeb1e2"];
        e.____MODULES["ddc67d51bd0ebd7a25b551f0c6b70adb"];
        e.____MODULES["309e5f71d563e64883263e4799629d2f"];
        e.____MODULES["e418c5b77de7a5d9b152c4199db043d1"];
        e.____MODULES["95d30b773a20cbf1529ad1bb46e11686"];
        e.____MODULES["14a2a7194abaec2e0acd2d73d6bea4a2"]
    } (t.exports, t, e);
    e.____MODULES["300c663da9b16046c6c84ecd8c8d0578"] = t.exports
})(this)