(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{jUrg:function(e,t,a){"use strict";var r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.userUpdate=c;var u=r(a("d6i3")),n=r(a("1l/V")),s=r(a("t3Un"));function c(e){return d.apply(this,arguments)}function d(){return d=(0,n.default)(u.default.mark(function e(t){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.default)("/api/user/update",{method:"POST",data:t}));case 1:case"end":return e.stop()}},e)})),d.apply(this,arguments)}},vqX0:function(e,t,a){"use strict";var r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(a("d6i3"));a("/xke");var n=r(a("TeRw")),s=a("jUrg"),c=s.userUpdate,d={namespace:"accountSettings",state:{},reducers:{},effects:{submit:u.default.mark(function e(t,a){var r,s;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.call,a.put,e.next=3,r(c,t.payload);case 3:s=e.sent,200===s.status&&n.default.success({message:"\u4fee\u6539\u6210\u529f"});case 5:case"end":return e.stop()}},e)})}},i=d;t.default=i}}]);