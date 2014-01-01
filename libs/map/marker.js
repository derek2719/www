(function(){var j=Openlayers.Label;var m=Openlayers.LonLat;var c=Openlayers.Icon;var l=Openlayers.Marker;var p=Openlayers.Pixel;var i=Openlayers.At;var h=i.LY;var o=i.LW;var e=i.AK;var q=i.Ds;var d=i.Fo;var k=i.EF;var b=i.Ex;var a=i.Co.FL();var f=i.Am;var g={ER:function(s){var r=this;r.Fe=s;if(r.Cu instanceof m){r.DM(false);r.Ku();r.GO();r.Fe.EX.appendChild(r.GI);this.Ai(true)}},DM:function(v){var t=this,s=t.FW;t.Cg=v;var r=h.Br("label");t.GI=r;h.CX(r);var u=r.style;u.position="absolute";u.left=u.top="0px";u.backgroundColor="#fff";u.border="1px solid #f00";u.cursor="pointer";u.color="black";u.padding="1px";u.whiteSpace="nowrap";u.fontSize="12px";u.display="inline";u.zIndex=s.Ae;t.setStyle(s.Dl);t.setSize(s.Ks);t.setContent(t.CM);t.setPrompting(t.FW.Et);return r},Ku:function(){var v=this,x=v.Fe,s=v.GI,r=v.FW,y=r.Ff,w=0,u=0;if(!v.Cg){var t=x.Kt(v.Cu);w=t.x;u=t.y}w+=y.x;u+=y.y;s.style.left=w+"px";s.style.top=u+"px"},GC:function(){this.AX();this.Fe=null;delete this.Cg;if(this.GI){this.GI.parentNode&&this.GI.parentNode.removeChild(this.GI);this.GI=null}},setLonLat:function(r){if(r instanceof m){this.Cu=r;if(this.GI){this.Ku()}}},setOffset:function(r){if(r instanceof p){this.FW.Ff=r;if(this.GI){this.Ku()}}},GO:function(){var z=["click","mouseover","mouseout"];var x=this;var r=x.Fe;var u=r.Kq;var s=r.Cz;for(var v=0,w=z.length;v<w;v++){var t=z[v];y(t)}function y(A){q.Fm(x.GI,A,function(B){B=window.event||B;b.BK(B);if(B.button!=2){if(u.GH==s._NO_OPERATE){u.GH=s._LABEL_OPERATE;x.Dw(new d(A,x));u.GH=s._NO_OPERATE}}})}}};e.GZ(j,g);iconProp={ER:function(){var s=h.Br("div");h.CX(s);this.GI=s;var r=this.FW;var v=s.style;v.position="absolute";v.left=r.Ff.x+"px";v.top=r.Ff.y+"px";v.width=r.EK.width+"px";v.height=r.EK.height+"px";v.overflow="hidden";var u=null;if(k.Fs==6&&imgUrl.toLowerCase().indexOf(".png")>0){u=h.Br("div")}else{u=h.Br("img")}this.Ef=u;var t=u.style;t.position="absolute";t.border="none";t.background="url("+a+")";this.setImageUrl(r.DS);this.setImageOffset(r.HD);this.setFullImageSize(r.DE);s.appendChild(u);return s}};e.GZ(c,iconProp);var n={ER:function(s){this.Bz={AV:false,GQ:null,LM:new p(0,0),Az:300,AI:0,Bt:0,EM:0,CZ:[0,0]};var r=this;r.Fe=s;if(r.Cu instanceof m){r.DM();r.Ku();r.FP();r.GO();r.Fe.FK.appendChild(r.Aa);r.Fe.GN.appendChild(r.GI);if(r.Cw){r.Fe.Bh.appendChild(r.Cw)}this.Ai(true)}},DM:function(){var u=this,x=u.FW;var s=h.Br("div");this.Aa=s;var B=s.style;B.position="absolute";B.left=B.top=0;B.zIndex=x.Ae;var t=h.Br("div");this.GI=t;var r=t.style;r.position="absolute";r.left=r.top=0;r.zIndex=x.Ae;r.background="url("+a+")";r.cursor="pointer";if(x.Et){t.title=x.Et}if(x.Dc){var y=x.Dc.ER();s.appendChild(y);var z=x.Dc.getImageSize();r.width=z.width+"px";r.height=z.height+"px"}if(x.LV){var v=x.LV.ER();var w=h.Br("div");this.Cw=w;var A=w.style;A.position="absolute";A.left=A.top=0;A.zIndex=x.Ae;w.appendChild(v)}if(x.BF){var C=x.BF.DM(true);x.BF.Ku();s.appendChild(C)}},Ku:function(){var x=this,r=x.Fe,A=x.FW,w=A.Ff,z=0,y=0;var s=r.Kt(x.Cu);z=s.x;y=s.y;z+=w.x;y+=w.y;x.Aa.style.left=z+"px";x.Aa.style.top=y+"px";if(x.Cw){x.Cw.style.left=z+"px";x.Cw.style.top=y+"px"}var u=A.Dc.getOffset();var v=z+u.x;var t=y+u.y;x.GI.style.left=v+"px";x.GI.style.top=t+"px"},GC:function(){this.Fe=null;this.AX();var r=this.FW;if(this.GI){this.GI.parentNode&&this.GI.parentNode.removeChild(this.GI);this.GI=null}if(r.Dc){r.Dc.GC();r.Dc=null}if(r.BF){r.BF.GC();r.BF=null}if(r.LV){r.LV.GC();r.LV=null}if(this.Aa){this.Aa.parentNode&&this.Aa.parentNode.removeChild(this.Aa);delete this.Aa}if(this.Cw){this.Cw.parentNode&&this.Cw.parentNode.removeChild(this.Cw);delete this.Cw}},setIcon:function(u){if(u instanceof c){var s=this.FW;var v=s.Dc;s.Dc=u;if(this.Aa&&this.GI){if(v&&v.GI){v.GC();var r=u.getImageSize();if(!v.getImageSize().equals(r)){this.GI.style.width=r.width+"px";this.GI.style.height=r.height+"px"}var w=u.getOffset();if(!v.getOffset().equals(w)){this.Ku()}}var t=s.Dc.ER();this.Aa.appendChild(t)}v=null}},setShadowIcon:function(B){if(B instanceof c){var u=this;var z=u.FW;var D=z.LV;z.LV=B;if(u.Cw){if(D&&D.GI){D.GC()}var A=z.LV.ER();u.Cw.appendChild(A)}else{if(u.Fe){var v=z.LV.ER();var y=h.Br("div");u.Cw=y;var C=y.style;C.position="absolute";C.left=C.top=0;C.zIndex=z.Ae;y.appendChild(v);var r=u.Fe;var t=z.Ff;var s=r.Kt(u.Cu);var x=s.x;var w=s.y;x+=t.x;w+=t.y;u.Cw.style.left=x+"px";u.Cw.style.top=w+"px"}}}},setLabel:function(u){if(u instanceof j){var t=this;var s=t.FW;var v=s.BF;s.BF=u;if(t.Aa){if(v&&v.GI){v.GC()}var r=s.BF.DM(true);s.BF.Ku();t.Aa.appendChild(r)}}},EU:function(r){this.GI.style.zIndex=r;this.Aa.style.zIndex=r},setTop:function(r){if(o.LZ(r)){if(r){this.FW.Ae=this.FW.Cv}else{this.FW.Ae=this.FW.Dx}if(this.GI){this.EU(this.FW.Ae)}}},setLonLat:function(r){if(r instanceof m){this.Cu=r;if(this.GI&&this.Aa){this.Ku()}}},GT:function(s){var t=this.Fe,r=this.FW;var u=t.getInfoWindow();if(u&&u.isOpen()&&u.GB()==r.Eo){u.Kp(s)}},FP:function(){var y=this,r=y.Fe,x=r.Kq,t=r.Cz,A=y.FW,z=y.Bz,C=y.GI,D,u,w,v,s={x:0,y:0};function E(G){var F=G.clientX,H=G.clientY;if(G.changedTouches){F=G.changedTouches[0].clientX;H=G.changedTouches[0].clientY}return new p(F,H)}function B(G,F){F.pixel=G.pixel;F.lonLat=G.lonLat;return F}y.Ah=function(H){H=window.event||H;b.DX(H);if(A.FJ&&x.GH==t._NO_OPERATE){x.GH=t._MARKER_OPERATE;z.AV=true;u=C.style.zIndex;y.EU(z.Az);var G=r.lonLatToPixel(y.Cu);var F=E(H);w=F.x-G.x;v=F.y-G.y;D=f.Cl();q.Fm(document,"mousemove",y.Ft);q.Fm(document,"mouseup",y.Dh);q.Fm(document,"touchmove",y.Ft);q.Fm(document,"touchend",y.Dh)}};y.Ft=function(K){K=window.event||K;if(A.FJ&&z.AV&&x.GH==t._MARKER_OPERATE){var G=E(K);var I=new p((G.x-w),(G.y-v));s=I;z.LM=I;var H=r.pixelToLonLat(I);var F={pixel:I,lonLat:H};z.AI=z.Bt=0;var J=r.Ek();if(I.x<=20||I.x>=J.width-20||I.y<=50||I.y>=J.height-10){if(I.x<=20){z.AI=8}else{if(I.x>=J.width-20){z.AI=-8}}if(I.y<=50){z.Bt=8}else{if(I.y>=J.height-10){z.Bt=-8}}if(!z.GQ){z.GQ=setInterval(function(){r.panBy(z.AI,z.Bt,true,true);var L=r.pixelToLonLat(z.LM);y.setLonLat(L);y.GT(L)},30)}}else{if(z.GQ){clearInterval(z.GQ);z.GQ=null}y.setLonLat(H);y.GT(H)}if(!z.HG){y.Dw(B(F,new d("dragstart")));z.HG=true}y.Dw(B(F,new d("dragging")))}};y.Dh=function(F){F=window.event||F;if(A.FJ&&z.AV&&x.GH==t._MARKER_OPERATE){x.GH=t._NO_OPERATE;z.AV=false;y.EU(u);q.EZ(document,"mousemove",y.Ft);q.EZ(document,"mouseup",y.Dh);q.EZ(document,"touchmove",y.Ft);q.EZ(document,"touchend",y.Dh);w=v=0;if(z.GQ){clearInterval(z.GQ);z.GQ=null}if(f.Cl()-D>=100&&(s.x>2||s.y>2)){z.HG=false;y.Dw(B({pixel:r.lonLatToPixel(y.getLonLat()),lonLat:y.getLonLat()},new d("dragend")));s.x=s.y=0}}};q.Fm(C,"mousedown",y.Ah);q.Fm(C,"touchstart",y.Ah)},GO:function(){var z=["click","mouseover","mouseout"];var w=this;var r=w.Fe;var u=r.Kq;var s=r.Cz;for(var v=0,x=z.length;v<x;v++){var t=z[v];y(t)}function y(A){q.Fm(w.GI,A,function(B){B=window.event||B;b.BK(B);if(B.button!=2){if(u.GH==s._NO_OPERATE){u.GH=s._MARKER_OPERATE;w.Dw(new d(A,w));u.GH=s._NO_OPERATE}}})}q.Fm(w.GI,"touchend",function(A){A=window.event||A;if(u.GH==s._NO_OPERATE||u.GH==s._MARKER_OPERATE){w.Dw(new d("click",w))}})}};e.GZ(l,n)}());