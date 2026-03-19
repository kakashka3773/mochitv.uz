"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_3__]);\n_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// pages/_app.js\n\n\n\n\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_3__.createClient)(\"https://qjpqwhwbdpdymxmtaoui.supabase.co\", \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcHF3aHdiZHBkeW14bXRhb3VpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDc1OTU4NSwiZXhwIjoyMDgwMzM1NTg1fQ.y07XZmhyFYalS_u9LgySm-88CPuH9P9BzWyVwdRwyeM\");\n// last_seen ni yangilash\nasync function updateLastSeen(userId) {\n    await supabase.from(\"users\").update({\n        last_seen: new Date().toISOString()\n    }).eq(\"id\", userId);\n}\nfunction App({ Component, pageProps }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // LocalStorage dan userni olish\n        const raw = localStorage.getItem(\"anime_user\");\n        if (!raw) return;\n        let user;\n        try {\n            user = JSON.parse(raw);\n        } catch  {\n            return;\n        }\n        if (!user?.id) return;\n        // Sahifa ochilganda darhol yangilash\n        updateLastSeen(user.id);\n        // Har 3 daqiqada bir yangilab turish (faol bo'lsa)\n        const interval = setInterval(()=>{\n            updateLastSeen(user.id);\n        }, 3 * 60 * 1000); // 3 daqiqa\n        // Sichqoncha / klaviatura harakatida ham yangilash\n        const handleActivity = ()=>updateLastSeen(user.id);\n        window.addEventListener(\"mousemove\", handleActivity, {\n            passive: true\n        });\n        window.addEventListener(\"keydown\", handleActivity, {\n            passive: true\n        });\n        window.addEventListener(\"touchstart\", handleActivity, {\n            passive: true\n        });\n        // Sahifa yopilganda ham oxirgi marta yozish\n        const handleUnload = ()=>updateLastSeen(user.id);\n        window.addEventListener(\"beforeunload\", handleUnload);\n        return ()=>{\n            clearInterval(interval);\n            window.removeEventListener(\"mousemove\", handleActivity);\n            window.removeEventListener(\"keydown\", handleActivity);\n            window.removeEventListener(\"touchstart\", handleActivity);\n            window.removeEventListener(\"beforeunload\", handleUnload);\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        charSet: \"UTF-8\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\acer\\\\Desktop\\\\mochitv.uz\\\\pages\\\\_app.js\",\n                        lineNumber: 59,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1.0\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\acer\\\\Desktop\\\\mochitv.uz\\\\pages\\\\_app.js\",\n                        lineNumber: 60,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Anime\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\acer\\\\Desktop\\\\mochitv.uz\\\\pages\\\\_app.js\",\n                        lineNumber: 61,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\acer\\\\Desktop\\\\mochitv.uz\\\\pages\\\\_app.js\",\n                lineNumber: 58,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\acer\\\\Desktop\\\\mochitv.uz\\\\pages\\\\_app.js\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWdCOztBQUNrQjtBQUNMO0FBQ3dCO0FBRXJELE1BQU1HLFdBQVdELG1FQUFZQSxDQUMzQkUsMENBQW9DLEVBQ3BDQSw2TkFBeUM7QUFHM0MseUJBQXlCO0FBQ3pCLGVBQWVJLGVBQWVDLE1BQU07SUFDbEMsTUFBTU4sU0FDSE8sSUFBSSxDQUFDLFNBQ0xDLE1BQU0sQ0FBQztRQUFFQyxXQUFXLElBQUlDLE9BQU9DLFdBQVc7SUFBRyxHQUM3Q0MsRUFBRSxDQUFDLE1BQU1OO0FBQ2Q7QUFFZSxTQUFTTyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ2xEbEIsZ0RBQVNBLENBQUM7UUFDUixnQ0FBZ0M7UUFDaEMsTUFBTW1CLE1BQU1DLGFBQWFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUNGLEtBQUs7UUFFVixJQUFJRztRQUNKLElBQUk7WUFBRUEsT0FBT0MsS0FBS0MsS0FBSyxDQUFDTDtRQUFNLEVBQUUsT0FBTTtZQUFFO1FBQVE7UUFDaEQsSUFBSSxDQUFDRyxNQUFNRyxJQUFJO1FBRWYscUNBQXFDO1FBQ3JDakIsZUFBZWMsS0FBS0csRUFBRTtRQUV0QixtREFBbUQ7UUFDbkQsTUFBTUMsV0FBV0MsWUFBWTtZQUMzQm5CLGVBQWVjLEtBQUtHLEVBQUU7UUFDeEIsR0FBRyxJQUFJLEtBQUssT0FBTyxXQUFXO1FBRTlCLG1EQUFtRDtRQUNuRCxNQUFNRyxpQkFBaUIsSUFBTXBCLGVBQWVjLEtBQUtHLEVBQUU7UUFDbkRJLE9BQU9DLGdCQUFnQixDQUFDLGFBQWFGLGdCQUFnQjtZQUFFRyxTQUFTO1FBQUs7UUFDckVGLE9BQU9DLGdCQUFnQixDQUFDLFdBQVdGLGdCQUFnQjtZQUFFRyxTQUFTO1FBQUs7UUFDbkVGLE9BQU9DLGdCQUFnQixDQUFDLGNBQWNGLGdCQUFnQjtZQUFFRyxTQUFTO1FBQUs7UUFFdEUsNENBQTRDO1FBQzVDLE1BQU1DLGVBQWUsSUFBTXhCLGVBQWVjLEtBQUtHLEVBQUU7UUFDakRJLE9BQU9DLGdCQUFnQixDQUFDLGdCQUFnQkU7UUFFeEMsT0FBTztZQUNMQyxjQUFjUDtZQUNkRyxPQUFPSyxtQkFBbUIsQ0FBQyxhQUFhTjtZQUN4Q0MsT0FBT0ssbUJBQW1CLENBQUMsV0FBV047WUFDdENDLE9BQU9LLG1CQUFtQixDQUFDLGNBQWNOO1lBQ3pDQyxPQUFPSyxtQkFBbUIsQ0FBQyxnQkFBZ0JGO1FBQzdDO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQ0U7OzBCQUNFLDhEQUFDL0Isa0RBQUlBOztrQ0FDSCw4REFBQ2tDO3dCQUFLQyxTQUFROzs7Ozs7a0NBQ2QsOERBQUNEO3dCQUFLRSxNQUFLO3dCQUFXQyxTQUFROzs7Ozs7a0NBQzlCLDhEQUFDQztrQ0FBTTs7Ozs7Ozs7Ozs7OzBCQUVULDhEQUFDdEI7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7QUFHOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcml2YXRlLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL19hcHAuanNcclxuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xyXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xyXG5cclxuY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoXHJcbiAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMLFxyXG4gIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZXHJcbik7XHJcblxyXG4vLyBsYXN0X3NlZW4gbmkgeWFuZ2lsYXNoXHJcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxhc3RTZWVuKHVzZXJJZCkge1xyXG4gIGF3YWl0IHN1cGFiYXNlXHJcbiAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgLnVwZGF0ZSh7IGxhc3Rfc2VlbjogbmV3IERhdGUoKS50b0lTT1N0cmluZygpIH0pXHJcbiAgICAuZXEoJ2lkJywgdXNlcklkKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAvLyBMb2NhbFN0b3JhZ2UgZGFuIHVzZXJuaSBvbGlzaFxyXG4gICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FuaW1lX3VzZXInKTtcclxuICAgIGlmICghcmF3KSByZXR1cm47XHJcblxyXG4gICAgbGV0IHVzZXI7XHJcbiAgICB0cnkgeyB1c2VyID0gSlNPTi5wYXJzZShyYXcpOyB9IGNhdGNoIHsgcmV0dXJuOyB9XHJcbiAgICBpZiAoIXVzZXI/LmlkKSByZXR1cm47XHJcblxyXG4gICAgLy8gU2FoaWZhIG9jaGlsZ2FuZGEgZGFyaG9sIHlhbmdpbGFzaFxyXG4gICAgdXBkYXRlTGFzdFNlZW4odXNlci5pZCk7XHJcblxyXG4gICAgLy8gSGFyIDMgZGFxaXFhZGEgYmlyIHlhbmdpbGFiIHR1cmlzaCAoZmFvbCBibydsc2EpXHJcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdXBkYXRlTGFzdFNlZW4odXNlci5pZCk7XHJcbiAgICB9LCAzICogNjAgKiAxMDAwKTsgLy8gMyBkYXFpcWFcclxuXHJcbiAgICAvLyBTaWNocW9uY2hhIC8ga2xhdmlhdHVyYSBoYXJha2F0aWRhIGhhbSB5YW5naWxhc2hcclxuICAgIGNvbnN0IGhhbmRsZUFjdGl2aXR5ID0gKCkgPT4gdXBkYXRlTGFzdFNlZW4odXNlci5pZCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlQWN0aXZpdHksIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlQWN0aXZpdHksIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlQWN0aXZpdHksIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAvLyBTYWhpZmEgeW9waWxnYW5kYSBoYW0gb3hpcmdpIG1hcnRhIHlvemlzaFxyXG4gICAgY29uc3QgaGFuZGxlVW5sb2FkID0gKCkgPT4gdXBkYXRlTGFzdFNlZW4odXNlci5pZCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgaGFuZGxlVW5sb2FkKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZUFjdGl2aXR5KTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVBY3Rpdml0eSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlQWN0aXZpdHkpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgaGFuZGxlVW5sb2FkKTtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPEhlYWQ+XHJcbiAgICAgICAgPG1ldGEgY2hhclNldD1cIlVURi04XCIgLz5cclxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiIC8+XHJcbiAgICAgICAgPHRpdGxlPkFuaW1lPC90aXRsZT5cclxuICAgICAgPC9IZWFkPlxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICA8Lz5cclxuICApO1xyXG59Il0sIm5hbWVzIjpbInVzZUVmZmVjdCIsIkhlYWQiLCJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsInVwZGF0ZUxhc3RTZWVuIiwidXNlcklkIiwiZnJvbSIsInVwZGF0ZSIsImxhc3Rfc2VlbiIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImVxIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicmF3IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInVzZXIiLCJKU09OIiwicGFyc2UiLCJpZCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJoYW5kbGVBY3Rpdml0eSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiaGFuZGxlVW5sb2FkIiwiY2xlYXJJbnRlcnZhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJtZXRhIiwiY2hhclNldCIsIm5hbWUiLCJjb250ZW50IiwidGl0bGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = import("@supabase/supabase-js");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();