 (function(window) { //闭包
    function UserInfoManager() {
        this.info = null;
    };
    UserInfoManager.prototype = {
        setInfo : function(data) {
            this.info = data;
        }
    };

     function CommentsInfoManager() {  
    };
    CommentsInfoManager.prototype = {//方法挂载在原型链
        
        creatCommentsHtml : function(data) {
            var me = this;
            var htmls = ["<div class='l-r'><a class='g'>共享</a></div>"];
            htmls.push("<div class='l-img'><img src = '" + data.avatar + "' alt='' width='40' height='40' /></div>");
            htmls.push("<div class='l-text'>");
            htmls.push("<h3>" + data.followers_name + "</h3>");
            htmls.push("<h4>" + data.comment_time + "</h4>");
            htmls.push("<span>" + data.comment_content + "</span>");
            htmls.push("</div>");
            return htmls.join("");
        },

        getCommentsHtml : function(comments) {
            var data = comments;
            var htmls = [];
            for (var i = 0, len = data.length; i < len; i++) {
                htmls.push(this.creatCommentsHtml(data[i]));
            }
            return htmls.join("");
        }
    };

    function PraiseAvatorManager() { 
    };
    PraiseAvatorManager.prototype = {//方法挂载在原型链
        
         creatPraiseAvatorHtml : function(data) {
            var me = this;
            var htmls = [];
            htmls.push("<img src = '" + data.avatar + "' width='20' height='20' />");
            return htmls.join("");
        },

        getPraiseAvatorHtml : function(praiseavator) {
            var data = praiseavator;
            var htmls = [];
            for (var i = 0, len = data.length; i < len; i++) {
                htmls.push(this.creatPraiseAvatorHtml(data[i]));
            }
            return htmls.join("");
        }
    };

    function PageManager() {
        //ID元素对象集合
        this.elems = {
            "media_id" : null,
            "praise_count_btn" : null,
            "sharebtn" : null,
            "user_avater_id" : null,
            "usernameid" : null,
            "timeid" : null,
            "contentid" : null,
            "praiseavatarlistid" : null,
            "inputtext" : null,
            "inputbtn" : null,
            "title" : null,
            "commentslistid" : null
        };
        //当点击请求提示框的关闭按钮，意味着中断请求，在关闭提示框后，如果请求得到响应，也不进行下一步业务处理。
        this.isStopReq = false;
        //页面对象是否初始化完成
        this.inited = false;
    };
    PageManager.prototype = {
        /**
         * 初始化页面对象
         */
        init : function() {
            var me = this;
            me.userInfoManager = new UserInfoManager();
            me.PraiseAvatorManager = new PraiseAvatorManager();
            me.CommentsInfoManager = new CommentsInfoManager();
            me.initElems();
            me.initEvents();
            me.inited = true;
        },
        /**
         * 初始化页面元素对象
         */
        initElems : function() {
            var me = this,
                elems = me.elems;
            me.elems = Juaizuo.queryElemsByIds(elems);
        },
        /**
         * 初始化页面元素事件
         */
        initEvents : function() {
            var me = this,
                praisecountbtnElem = me.elems["praise_count_btn"],
                sharebtnElem = me.elems["sharebtn"],
                sumbitbtnElem = me.elems["inputbtn"];
            //分享按钮
            sharebtnElem.onbind("touchend",me.sharebtnUp,me);
            //赞按钮
            praisecountbtnElem.onbind("touchstart",me.btnDown,praisecountbtnElem);
            praisecountbtnElem.onbind("touchend",me.praisebtnUp,me);
            //回复评论提交按钮
            sumbitbtnElem.onbind("touchstart",me.sumbitbtnUp,me);
        },
        /**
         * 按钮按下事件处理器
         * @param  {Event} evt
         */
        btnDown : function(evt) {
            this.addClass("curr");
        },
        sharebtnUp : function(evt) {
            var me = this,
                elem = evt.currentTarget;
            $(elem).removeClass("curr");
        },
        /**
         * 点击回复评论处理函数
         */
        sumbitbtnUp : function(evt) {
            var me = this;
            var textContent = me.elems["inputtext"].attr("value");
            var sumbitBtnUp_url = BASE_PRAISE_URL + "comments/create";
            var sumbitBtnUp_data = {"uid" : 10924,"publish_uid" : 22390,"publish_id" : 337,"publish_type" : "event","comment_type" : 1,"pid" : 353617052835307,"comment_content":textContent};
            me.reqSumbitbut(sumbitBtnUp_url, sumbitBtnUp_data);

        },
        /**
         * 回复评论请求函数
         */
        reqSumbitbut : function(url, data) {
            var me = this,
                commentslistidElem = me.elems["commentslistid"];
            var reqParams = Trafficeye.httpData2Str(data);
            if (url) {
                Trafficeye.httpTip.opened(function() {
                                     me.isStopReq = true;
                                }, me);
                                me.isStopReq = false;
                var reqUrl = url + reqParams;
                $.ajaxJSONP({
                    url : reqUrl,
                    success: function(data){
                        Trafficeye.httpTip.closed();
                        if (data && !me.isStopReq) {
                            var state = data.state.code;
                            if (state == 0) {
                                var commenthtml = me.CommentsInfoManager.getCommentsHtml(data.comments); 
                                    commentslistidElem.html(commenthtml);
                            } else {
                                me.reqPraiseFail();
                            }
                        } else {
                            me.reqPraiseFail();
                        }
                    }
                })
            } else {
                me.reqPraiseFail();
            }
        },
        /**
         * 点击攒按钮处理函数
         */
        praisebtnUp : function(evt) {
            var me = this;
            var praiseBtnUp_url = BASE_PRAISE_URL + "praise";
            var praiseBtnUp_data = {"uid" : 10924,"friend_id" : 22390,"publish_id" : 337,"type" : "event","pid" : 353617052835307,"requestType" : "info"};
            me.reqPraise(praiseBtnUp_url, praiseBtnUp_data);

        },
        /**
         * 点击攒按钮请求函数
         */
        reqPraise : function(url, data) {
            var me = this,
             praiseavatarlistidElem = me.elems["praiseavatarlistid"];
            var reqParams = Trafficeye.httpData2Str(data);
            if (url) {
                var reqUrl = url + reqParams;
                $.ajaxJSONP({
                    url : reqUrl,
                    success: function(data){
                        Trafficeye.httpTip.closed();
                        if (data && !me.isStopReq) {
                            var state = data.state.code;
                            if (state == 0) {    //点击赞成功
                                me.setPraiseCount(data.state.extras);
                                var praiseavatorhtml = me.PraiseAvatorManager.getPraiseAvatorHtml(data.praiseList);
                                    praiseavatarlistidElem.html(praiseavatorhtml);

                            } else {
                                me.reqPraiseFail();
                            }
                        } else {
                            me.reqPraiseFail();
                        }
                    }
                })
            } else {
                me.reqPraiseFail();
            }
        },
        /**
         * 请求用户信息
         * @param  {String} url 服务URL
         * @param  {JSON Object} data 请求协议参数对象
         */
        reqUserInfo : function(url, data) {
            var me = this;
            var reqParams = Trafficeye.httpData2Str(data);
            if (url) {
                Trafficeye.httpTip.opened(function() {
                    me.isStopReq = true;
                }, me);
                me.isStopReq = false;
                var reqUrl = url + reqParams;
                $.ajaxJSONP({
                    url : reqUrl,
                    success: function(data){
                        if (data && !me.isStopReq) {
                            me.reqUserInfoSuccess(data);
                        } else {
                            me.reqUserInfoFail();
                        }
                    }
                })
            }
        },
        /**
         * 请求用户信息成功后的处理函数
         * @param  {JSON Object} data
         */
        reqUserInfoSuccess : function(data) {
            var me = this,     
                praiseavatarlistidElem = me.elems["praiseavatarlistid"],
                commentslistidElem = me.elems["commentslistid"];

                Trafficeye.httpTip.closed();

            if (data) {
                me.userInfoManager.setInfo(data);               
                me.setMedia(data.media);
                me.setPraiseCount(data.praise_count);
                me.setUserAvater(data.avater);
               // console.log(data.avatar);
                me.setUserName(data.username);
                me.setTimeFromNow(data.time);
                me.setContent(data.content);

                var commenthtml = me.CommentsInfoManager.getCommentsHtml(data.comments); 
                commentslistidElem.html(commenthtml);
                var praiseavatorhtml = me.PraiseAvatorManager.getPraiseAvatorHtml(data.praiseList); 
                praiseavatarlistidElem.html(praiseavatorhtml);
                
            }
        },

        setUserName : function(username){
            var me = this;
            var usernameElem = me.elems["usernameid"];
            usernameElem.html(username);
        },

        setMedia : function(media){
            var me = this;
            var medidElem = me.elems["media_id"];
            medidElem.html(media);
        },

        setPraiseCount : function(praise_count){
            var me = this;
            var praise_countElem = me.elems["praise_count_btn"];
            praise_countElem.html(praise_count);
        },

        setUserAvater : function(user_avater){

            var me = this;
            var htmls = [];
            //<img id="user_avater_id" src="images/ha.jpg" alt="" width="40" height="40" />
            htmls.push("<img src = '" + user_avater + "' width='40' height='40' />");
            var user_avaterElem = me.elems["user_avater_id"];
            user_avaterElem.html(htmls.join(""));
        },

        setTimeFromNow : function(timeid){
            var me = this;
            var timeidElem = me.elems["timeid"];
            timeidElem.html(timeid);
        },

        setContent : function(content){
            var me = this;
            var contentidElem = me.elems["contentid"];
            contentidElem.html(content);
        },
        /**
         * 请求用户信息失败后的处理函数
         */
        reqUserInfoFail : function() {

        },
        /**
         * 请求赞按钮失败后的处理函数
         */
        reqPraiseFail : function() {

        }
    };

    //基础URL
    var BASE_URL = "http://mobile.trafficeye.com.cn:8008/TrafficeyeCommunityServiceProject/sns/v1/user/timeLine/";
    var BASE_PRAISE_URL = "http://mobile.trafficeye.com.cn:8008/TrafficeyeCommunityServiceProject/sns/v1/";
    $(function(){
        //请求用户信息协议
        var userInfo_url = BASE_URL + "info";
        var userInfo_data = {"publishId" : 357,"publishType" : "event"};
        
        var pm = new PageManager();
        //初始化用户界面
        pm.init();
        //请求用户数据，填充用户界面元素
        pm.reqUserInfo(userInfo_url, userInfo_data);
    }); 
    
 }(window));