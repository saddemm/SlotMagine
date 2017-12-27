!function () {
    "use strict";
    angular.module("app", ["app.core", "app.home", "app.mobile", "app.layout"])
}(), function () {
    "use strict";
    angular.module("blocks.socket", [])
}(), function () {
    "use strict";
    function a(a) {
        return a()
    }

    angular.module("blocks.socket").factory("socket", a), a.$inject = ["socketFactory"]
}(), function () {
    "use strict";
    angular.module("app.core", ["ngResource", "blocks.socket", "ui.router", "btford.socket-io", "ui.bootstrap", "timer", "monospaced.qrcode"])
}(), function () {
    "use strict";
    function a(a, b) {
        a.activeGame = "macdo"
    }

    angular.module("app.core").controller("CoreController", a), a.$inject = ["$scope", "socket"]
}(), function () {
    "use strict";
    function a(a, b) {
        a.otherwise("/")
    }

    var b = angular.module("app.core");
    b.config(a), a.$inject = ["$urlRouterProvider", "$stateProvider"]
}(), function () {
    "use strict";
    function a(a, b, c) {
        a.$on("$viewContentLoaded", function () {
            jQuery("html, body").animate({scrollTop: 0}, 200)
        })
    }

    var b = angular.module("app.core");
    b.run(a), a.$inject = ["$rootScope", "$location", "$window"]
}(), function () {
    "use strict";
    angular.module("app.layout", [])
}(), function () {
    "use strict";
    angular.module("app.home", [])
}(), function () {
    "use strict";
    function a(a) {
        a.state("home", {
            url: "/",
            templateUrl: "app/home/home.946dbcc7cc.html",
            controllerAs: "vm",
            title: "Home",
            controller: "HomeController"
        }).state("game", {
            url: "/game",
            templateUrl: "app/home/game.15bfb54cd6.html",
            controllerAs: "vm",
            title: "Home",
            controller: "GameController"
        })
    }

    angular.module("app.home").config(a), a.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function a(a, c, d, e, f) {
        c.socketID = b(), a.socketID = c.socketID, f.emit("subscribe", a.socketID), f.forward("join", a), a.$on("socket:join", function (a, b) {
            console.log("Mobile Join"), e.path("/game")
        })
    }

    function b() {
        return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
    }

    function c(a, b, c, d, e, f) {
        a.socketID = b.socketID, a["try"] = 3, a.timer = 59, f.forward("shuffle", a), a.$on("socket:shuffle", function (b, c) {
            a["try"] > 0 && (a["try"]--, a.machineResult = [], a.count = 0, a.machine1.shuffle(5, a.onComplete), a.machine2.shuffle(5, a.onComplete), a.machine3.shuffle(5, a.onComplete))
        }), a.machine1 = $("#machine1").slotMachine({
            active: 0,
            delay: 500
        }), a.machine2 = $("#machine2").slotMachine({
            active: 1,
            delay: 500
        }), a.machine3 = $("#machine3").slotMachine({active: 2, delay: 500}), a.onComplete = function () {
            switch (this.element[0].id) {
                case"machine1":
                    a.machineResult[0] = this.active;
                    break;
                case"machine2":
                    a.machineResult[1] = this.active;
                    break;
                case"machine3":
                    a.machineResult[2] = this.active
            }
            a.count++, a.count >= 3 && a.checkResult()
        }, a.checkResult = function () {
            a.machineResult[0] === a.machineResult[1] && a.machineResult[1] === a.machineResult[2] ? (f.emit("result", {
                room: a.socketID,
                message: !0,
                "try": a["try"]
            }), e(a.finishTimer, 5e3)) : f.emit("result", {
                room: a.socketID,
                message: !1,
                "try": a["try"]
            }), a["try"] <= 0 && e(a.finishTimer, 5e3)
        }, a.finishTimer = function () {
            f.emit("unsubscribe", a.socketID), d.location.href = "/macdo/"
        }
    }

    angular.module("app.home").controller("HomeController", a).controller("GameController", c), a.$inject = ["$scope", "$rootScope", "$state", "$location", "socket"], c.$inject = ["$scope", "$rootScope", "$state", "$window", "$timeout", "socket"]
}(), function () {
    "use strict";
    angular.module("app.mobile", [])
}(), function () {
    "use strict";
    function a(a) {
        a.state("unknown", {
            url: "/m/unknown",
            templateUrl: "app/mobile/unknown.fec99bc203.html",
            controllerAs: "vm",
            title: "Mobile unknown",
            controller: "UnknownController"
        }).state("loose", {
            url: "/m/loose",
            templateUrl: "app/mobile/loose.9feda5ac9b.html",
            controllerAs: "vm",
            title: "Mobile loose"
        }).state("win", {
            url: "/m/win",
            templateUrl: "app/mobile/win.fdaa0374ee.html",
            controllerAs: "vm",
            title: "Mobile win"
        }).state("full", {
            url: "/m/full",
            templateUrl: "app/mobile/full.a5c38eac67.html",
            controllerAs: "vm",
            title: "Mobile full"
        }).state("mobile", {
            url: "/m/:socketID",
            templateUrl: "app/mobile/mobile.73bedc1664.html",
            controllerAs: "vm",
            title: "Home Mobile",
            controller: "MobileController"
        })
    }

    angular.module("app.mobile").config(a), a.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function a(a, b, c, d, e) {
        a.socketID = c.socketID, a.shuffling = !1, a["try"] = 3, navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate, e.emit("subscribe", a.socketID), e.forward("full", a), a.$on("socket:full", function (a, b) {
            d.path("/m/full")
        }), e.forward("unknown", a), a.$on("socket:unknown", function (b, c) {
            e.emit("unsubscribe", a.socketID), d.path("/m/unknown")
        }), a.shuffle = function () {
            a.shuffling = !0, $("#shuffle").button("loading"), e.emit("shuffle", {room: a.socketID}), navigator.vibrate && navigator.vibrate(5e3)
        }, gyro.getFeatures().length <= 0 && console.log("NO GYRO"), gyro.startTracking(function (b) {
            a.beta && !a.shuffling && Math.abs(a.beta - b.beta) > 45 && a.shuffle(), a.beta = b.beta
        }), e.forward("result", a), a.$on("socket:result", function (b, c) {
            console.log(c), navigator.vibrate && navigator.vibrate(0), a["try"]--, c.success ? (e.emit("unsubscribe", a.socketID), d.path("/m/win")) : (a.shuffling = !1, $("#shuffle").button("reset"), a["try"] = c["try"], 0 === a["try"] && (e.emit("unsubscribe", a.socketID), d.path("/m/loose")))
        })
    }

    function b(a, b) {
        a.goToGame = function () {
            b.path("/m/" + $("#game-id").val())
        }
    }

    angular.module("app.mobile").controller("MobileController", a).controller("UnknownController", b), a.$inject = ["$scope", "$state", "$stateParams", "$location", "socket"], b.$inject = ["$scope", "$location"]
}();