/*
jQWidgets v3.1.0 (2013-Dec-23)
Copyright (c) 2011-2014 jQWidgets.
License: http://jqwidgets.com/license/
*/

try{(function(h,b){b.jqwidgets=b.jqwidgets||{};b.jqwidgets.knockout=function(A){var B=this;var C={},z=A.name;C.init=function(H,I,E,G){var D=b.utils.unwrapObservable(I());var K=b.toJS(D);if(A.reset){A.reset()}if(h.data(H)[z]==undefined){var F=[];h(H)[z]();widget=h.data(H)[z].instance;h.each(A,function(M,N){if(widget.hasOwnProperty(M)&&K.hasOwnProperty(M)){if(!widget.koupdating){widget.koupdatingFromObservable=true;try{var O=false;if(A.serialize){if(A.serialize(widget,M)){if(b.toJSON(K[M])!=b.toJSON(A.serialize(widget,M))){A.setProperty(widget,M,widget[M],K[M])}O=true}}if(!O){if(b.toJSON(K[M])!=b.toJSON(widget[M])){A.setProperty(widget,M,widget[M],K[M])}}}catch(L){A.setProperty(widget,M,widget[M],K[M])}F[M]=M;widget.koupdatingFromObservable=false}}});var J={};h.each(K,function(L,M){if(F[L]==undefined){J[L]=K[L]}});widget.host[z](J)}widget=h.data(H)[z].instance;widget.koupdatingFromObservable=false;widget.koupdating=false;if(A.events){h.each(A.events,function(){var L=this;h(H).on(L+"."+H.id,function(N){widget=h.data(H)[z].instance;if(!widget.koupdatingFromObservable){var M=widget;M.koupdating=true;var P=I();var O=A.getProperty(widget,N,L,D);if(O!=undefined){if(P.hasOwnProperty(O.name)&&h.isFunction(P[O.name])){if(b.isObservable(P[O.name])&&P[O.name].push){I(O.value)}else{P[O.name](O.value)}}else{if(P[O.name]){I(O.value)}}}M.koupdating=false}})})}};C.update=function(H,I,F,G,E){var D=b.utils.unwrapObservable(I());var J=b.toJS(D);widget=h.data(H)[z].instance;if(widget.koupdating){return}h.each(A,function(K,L){if(widget.hasOwnProperty(K)&&J.hasOwnProperty(K)){if(!widget.koupdating){widget.koupdatingFromObservable=true;var M=false;if(A.serialize){if(A.serialize(widget,K)){if(b.toJSON(J[K])!=b.toJSON(A.serialize(widget,K))){A.setProperty(widget,K,widget[K],J[K])}M=true}}if(!M){if(b.toJSON(J[K])!=b.toJSON(widget[K])){A.setProperty(widget,K,widget[K],J[K])}}widget.koupdatingFromObservable=false}}})};b.bindingHandlers[A.name]=C};var v=new b.jqwidgets.knockout({name:"jqxGauge",disabled:false,min:0,max:220,value:0,reset:function(){this.value=0;this.max=220;this.min=0;this.disabled=false},getProperty:function(A,B,z){},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxGauge({disabled:C})}if(A=="min"){z.host.jqxGauge({min:C})}if(A=="max"){z.host.jqxGauge({max:C})}if(A=="value"){z.host.jqxGauge({value:C})}}});var d=new b.jqwidgets.knockout({name:"jqxLinearGauge",disabled:false,min:0,max:220,value:0,reset:function(){this.value=0;this.max=220;this.min=0;this.disabled=false},getProperty:function(A,B,z){},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxLinearGauge({disabled:C})}if(A=="min"){z.host.jqxLinearGauge({min:C})}if(A=="max"){z.host.jqxLinearGauge({max:C})}if(A=="value"){z.host.jqxLinearGauge({value:C})}}});var u=new b.jqwidgets.knockout({name:"jqxSlider",disabled:false,min:0,max:10,value:0,reset:function(){this.value=0;this.max=10;this.min=0;this.disabled=false},events:["change"],getProperty:function(A,B,z){if(z=="change"){return{name:"value",value:B.args.value}}},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxSlider({disabled:C})}if(A=="min"){z.host.jqxSlider({min:parseFloat(C)})}if(A=="max"){z.host.jqxSlider({max:parseFloat(C)})}if(A=="value"){z.host.jqxSlider({value:parseFloat(C)})}}});var n=new b.jqwidgets.knockout({name:"jqxScrollBar",disabled:false,min:0,max:10,value:0,reset:function(){this.value=0;this.max=10;this.min=0;this.disabled=false},events:["valuechanged"],getProperty:function(A,B,z){if(z=="valuechanged"){return{name:"value",value:parseInt(B.currentValue)}}},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxScrollBar({disabled:C})}if(A=="min"){z.host.jqxScrollBar({min:parseFloat(C)})}if(A=="max"){z.host.jqxScrollBar({max:parseFloat(C)})}if(A=="value"){z.host.jqxScrollBar({value:parseFloat(C)})}}});var a=new b.jqwidgets.knockout({name:"jqxProgressBar",disabled:false,value:0,reset:function(){this.value=0;this.disabled=false},events:["valuechanged"],getProperty:function(A,B,z){if(z=="valuechanged"){return{name:"value",value:parseInt(B.currentValue)}}},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxProgressBar({disabled:C})}if(A=="value"){z.host.jqxProgressBar({value:parseFloat(C)})}}});var e=new b.jqwidgets.knockout({name:"jqxButton",disabled:false,reset:function(){this.disabled=false},getProperty:function(A,B,z){},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxButton({disabled:C})}}});var g=new b.jqwidgets.knockout({name:"jqxCheckBox",checked:false,disabled:false,reset:function(){this.checked=false;this.disabled=false},events:["change"],getProperty:function(A,B,z){if(z=="change"){return{name:"checked",value:B.args.checked}}},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxCheckBox({disabled:C})}if(A=="checked"){if(B!=C){z.host.jqxCheckBox({checked:C})}}}});var w=new b.jqwidgets.knockout({name:"jqxRadioButton",checked:false,disabled:false,reset:function(){this.checked=false;this.disabled=false},events:["change"],getProperty:function(A,B,z){if(z=="change"){return{name:"checked",value:B.args.checked}}},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxRadioButton({disabled:C})}if(A=="checked"){if(B!=C){z.host.jqxRadioButton({checked:C})}}}});var m=new b.jqwidgets.knockout({name:"jqxDateTimeInput",value:null,disabled:false,reset:function(){this.value=null;this.disabled=false},events:["valuechanged"],getProperty:function(A,B,z){if(z=="valuechanged"){return{name:"value",value:B.args.date}}},setProperty:function(z,A,B,C){if(A=="value"){z.setDate(C)}if(A=="disabled"){z.host.jqxDateTimeInput({disabled:C})}}});var y=new b.jqwidgets.knockout({name:"jqxCalendar",value:null,disabled:false,reset:function(){this.value=null;this.disabled=false},events:["valuechanged"],getProperty:function(A,B,z){if(z=="valuechanged"){return{name:"value",value:B.args.date}}},setProperty:function(z,A,B,C){if(A=="value"){z.setDate(C)}if(A=="disabled"){z.host.jqxCalendar({disabled:C})}}});var p=new b.jqwidgets.knockout({name:"jqxNumberInput",value:null,events:["valuechanged"],disabled:false,reset:function(){this.value=null;this.disabled=false},getProperty:function(A,B,z){if(z=="valuechanged"){return{name:"value",value:A.val()}}},setProperty:function(z,A,B,C){if(A=="value"){z.host.jqxNumberInput("val",C)}if(A=="disabled"){z.host.jqxNumberInput({disabled:C})}}});var j=new b.jqwidgets.knockout({name:"jqxMaskedInput",value:null,events:["valuechanged"],disabled:false,reset:function(){this.value=null;this.disabled=false},getProperty:function(A,B,z){if(z=="valuechanged"){return{name:"value",value:A.val()}}},setProperty:function(z,A,B,C){if(A=="value"){z.host.jqxMaskedInput("val",C)}if(A=="disabled"){z.host.jqxMaskedInput({disabled:C})}}});var c=new b.jqwidgets.knockout({name:"jqxListBox",source:null,disabled:false,selectedIndex:-1,reset:function(){this.disabled=false;this.selectedIndex=-1;this.source=null},events:["change"],getProperty:function(A,B,z){if(z=="change"){this.selectedIndex=A.selectedIndex;return{name:"selectedIndex",value:A.selectedIndex}}},setProperty:function(z,A,C,D){if(A=="source"){z.source=D;z.refresh()}if(A=="disabled"){z.disabled=D;z._renderItems()}if(A=="selectedIndex"){var B=z.disabled;z.disabled=false;z.selectIndex(D);z.disabled=B;if(B){z._renderItems()}}}});var q=new b.jqwidgets.knockout({name:"jqxDropDownList",source:null,disabled:false,selectedIndex:-1,reset:function(){this.disabled=false;this.selectedIndex=-1;this.source=null},events:["change"],getProperty:function(A,B,z){if(z=="change"){return{name:"selectedIndex",value:A.selectedIndex}}},setProperty:function(z,A,B,C){if(A=="source"){z.host.jqxDropDownList({source:C})}if(A=="disabled"){z.host.jqxDropDownList({disabled:C})}if(A=="selectedIndex"){z.host.jqxDropDownList({selectedIndex:C})}}});var i=new b.jqwidgets.knockout({name:"jqxComboBox",source:null,disabled:false,selectedIndex:-1,reset:function(){this.disabled=false;this.selectedIndex=-1;this.source=null},events:["change"],getProperty:function(A,B,z){if(z=="change"){return{name:"selectedIndex",value:A.selectedIndex}}},setProperty:function(z,A,B,C){if(A=="source"){z.host.jqxComboBox({source:C})}if(A=="disabled"){z.host.jqxComboBox({disabled:C})}if(A=="selectedIndex"){z.host.jqxComboBox({selectedIndex:C})}}});var s=new b.jqwidgets.knockout({name:"jqxInput",source:null,disabled:false,value:"",reset:function(){this.disabled=false;this.source=null},events:["change"],getProperty:function(A,B,z){if(z=="change"){return{name:"value",value:A.host.val()}}},setProperty:function(z,A,B,C){if(A=="source"){z.host.jqxInput({source:C})}if(A=="disabled"){z.host.jqxInput({disabled:C})}if(A=="value"){z.host.jqxInput({value:C})}}});var x=new b.jqwidgets.knockout({name:"jqxTree",source:null,disabled:false,reset:function(){this.disabled=false;this.source=null},getProperty:function(A,B,z){},setProperty:function(z,A,B,C){if(A=="source"){z.host.jqxTree({source:C})}if(A=="disabled"){z.host.jqxTree({disabled:C})}}});var f=new b.jqwidgets.knockout({name:"jqxTabs",disabled:false,reset:function(){this.disabled=false},getProperty:function(A,B,z){},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxTabs({disabled:C})}}});var o=new b.jqwidgets.knockout({name:"jqxWindow",disabled:false,content:"",title:"",reset:function(){this.disabled=false;this.title="";this.content=""},getProperty:function(A,B,z){},setProperty:function(z,A,B,C){if(A=="disabled"){z.host.jqxWindow({disabled:C})}else{if(A=="content"){z.host.jqxWindow("setContent",C)}else{if(A=="title"){z.host.jqxWindow({title:C})}}}}});var r=new b.jqwidgets.knockout({name:"jqxNavigationBar",disabled:false,reset:function(){this.disabled=false},getProperty:function(A,B,z){},setProperty:function(z,A,B,C){if(A=="disabled"){if(C!=this.disabled){this.disabled=C;z.host.jqxNavigationBar({disabled:C})}}}});var l=new b.jqwidgets.knockout({name:"jqxMenu",source:null,disabled:false,reset:function(){this.disabled=false;this.source=null},getProperty:function(A,B,z){},setProperty:function(z,A,B,C){if(A=="source"){z.host.jqxMenu({source:C})}if(A=="disabled"){z.host.jqxMenu({disabled:C})}}});var t=new b.jqwidgets.knockout({name:"jqxChart",source:null,disabled:false,reset:function(){this.disabled=false;this.source=null},getProperty:function(A,B,z){},setProperty:function(z,A,B,C){if(A=="source"){this.source=C;z.host.jqxChart({source:C})}if(A=="disabled"){this.disabled=C;z.host.jqxChart({disabled:C})}}});var k=new b.jqwidgets.knockout({name:"jqxGrid",source:null,disabled:false,selectedRowIndex:-1,reset:function(){this.disabled=false;this.source=null;this.selectedRowIndex=-1},serialize:function(A,z){if(z=="source"){if(A.source&&A.source._source){return A.source.records}}return false},events:["cellvaluechanged","cellselect","rowselect"],getProperty:function(D,B,F,E){if(F=="cellvaluechanged"){var C=D.host.jqxGrid("getrowid",B.args.rowindex);var J=D.host.jqxGrid("getrowdata",C);var A=E.source;if(A!=undefined){var I={};var z={};var H=false;var G=false;h.each(A()[C],function(K,L){I[K]=L;z[K]="";if(b.isObservable(L)&&!b.isComputed(L)){H=true;L(J[K])}if(b.isObservable(L)&&b.isComputed(L)){G=true}});if(!H){I=J;A.replace(A()[C],z);A.replace(A()[C],I)}else{A.replace(A()[C],I)}if(G){D.host.jqxGrid("updaterow",C,b.toJS(A)[C])}return{name:"source",value:A}}}},setProperty:function(C,J,I,A){if(J=="selectedRowIndex"){C.host.jqxGrid("selectrow",A)}if(J=="source"){if(this.source==null||A==null){if(this.source!=A){this.source=A;var z={localdata:A,datatype:"local"};var H=new h.jqx.dataAdapter(z);C.host.jqxGrid({source:H})}}else{var z={localdata:A,datatype:"local"};var H=new h.jqx.dataAdapter(z);H.dataBind();if(!I.records||!H.records){return}var L=Math.max(I.records.length,H.records.length);var G=Math.abs(I.records.length-H.records.length);if(G==0){if(L>10){C.host.jqxGrid({source:H});return}}if(G>1){C.host.jqxGrid("beginupdate")}var K=new Array();for(var E=0;E<L;E++){var F=H.records[E];if(F==undefined){var B=C.host.jqxGrid("getrowid",E);K.push(B)}else{var D=I.records[E]!=undefined;if(D){if(b.toJSON(F)!=b.toJSON(I.records[E])){if(I.records[E].uid!=undefined){F.uid=I.records[E].uid;if(b.toJSON(F)==b.toJSON(I.records[E])){continue}}var B=C.host.jqxGrid("getrowid",E);C.host.jqxGrid("updaterow",B,F)}}else{C.host.jqxGrid("addrow",null,F)}}}if(K.length>0){C.host.jqxGrid("deleterow",K)}if(G>1){C.host.jqxGrid("endupdate")}}}if(J=="disabled"){C.host.jqxGrid({disabled:A})}}})}(jQuery,ko))}catch(error){var er=error};