 (function(window) { //闭包
    

     function ProductList() {  
    };
    ProductList.prototype = {//方法挂载在原型链
        
        creatProductListHtml : function(data) {
            var me = this;
            var htmls = ["<div class='a_cont'>"];
            htmls.push("<div class='a_img' onclick = \"gotoproductdeatils('" + data.publish_id +"');\"><img src = '" + data.media + "' alt='' width='100%'/></div></a>");
            htmls.push("<div class='ah_img' onclick = \"gotoproductdeatils('" + data.publish_id +"');\">");
            htmls.push("<img src = 'images/ha.jpg' alt='' width='40' height='40'/>");
            htmls.push("<h3>" + data.title + "</h3>");
            htmls.push("<p class='a_time'>" + data.fromtime + "</p></div>");
            htmls.push("<div class='a_text' onclick = \"gotoproductdeatils('" + data.publish_id +"');\">" + data.content + "</div>");
            htmls.push("<div class='a_xadp'>");
            htmls.push("<a class='dp'>还有" + data.comment_count +"条点评</a>" );
            htmls.push("<a>喜爱35</a>");
            htmls.push("</div>");
            return htmls.join("");
        },

        getProductListHtml : function(productList) {
            var data = productList;
            var htmls = [];
            for (var i = 0, len = data.length; i < len; i++) {
                htmls.push(this.creatProductListHtml(data[i]));
            }
            return htmls.join("");
        }
    };

    function PageManager() {
        //ID元素对象集合,关注列表、粉丝列表
        this.elems = {
            "productlistid" : null,
            "refreshbtn" : null,
            "loadmorebtn" : null,
            "prompt_mask" : null,
            "headerselect" : null,
            "detailsurl" : null
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
            me.ProductList = new ProductList();
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
                productlistElem = me.elems["productlistid"],
                refreshbtnElem = me.elems["refreshbtn"],
                loadmorebtnElem = me.elems["loadmorebtn"],
                headerselectbtnElem = me.elems["headerselect"],               
                detailbtnElem = me.elems["detailsurl"];
            //显示分类标签 
            headerselectbtnElem.onbind("touchstart",me.headerselectbtnDown,me);
            headerselectbtnElem.onbind("touchend",me.headerselectbtnUp,me);
            //promptmaskbtnElem.show();
            //详情按钮
            detailbtnElem.onbind("touchend",me.detailbtnUp,me);
            //刷新按钮
            refreshbtnElem.onbind("touchstart",me.btnDown,refreshbtnElem);
            refreshbtnElem.onbind("touchend",me.refreshbtnUp,me);
            //加载更多按钮
            loadmorebtnElem.onbind("touchstart",me.loadmorebtnDown,loadmorebtnElem);
            loadmorebtnElem.onbind("touchend",me.loadmorebtnUp,me);
        },       
        /**
         * 按钮按下事件处理器
         * @param  {Event} evt
         */
        btnDown : function(evt) {
            this.addClass("curr");
        }, 
        /**
         * 按钮按下事件处理器
         * @param  {Event} evt
         */
        headerselectbtnDown : function(evt) {
            var me = this,
                elem = evt.currentTarget;
                promptmaskbtnElem = me.elems["prompt_mask"];

                $(elem).addClass("spread");
                promptmaskbtnElem.show();

        }, 
        /**
         * 按钮按下事件处理器
         * @param  {Event} evt
         */
        headerselectbtnUp : function(evt) {
            
        }, 
        /**
         * 刷新按钮
         * @param  {Event} evt
         */
        refreshbtnUp : function(evt) {
            //请求用户信息协议
            var productList_url = BASE_URL + "ProductList";
            var productList_data = {"mobileid" : 1,"startid" : 0,"pagenumber" : 0};
            
            var pm = new PageManager();
            //初始化用户界面
            pm.init();
            //请求产品列表数据，填充用户界面元素
            pm.reqProductList(productList_url, productList_data);
        },
        loadmorebtnDown : function(evt) {
            this.addClass("bblue");
        },
        loadmorebtnUp : function(evt) {
            var me = this,
                elem = evt.currentTarget;
            $(elem).removeClass("bblue");
            var uid = me.userInfoManager.uid;
            if (uid) {
                me.loadmoreHander(uid);
            }
        },
        /**
         * 请求产品列表信息
         * @param  {String} url 服务URL
         * @param  {JSON Object} data 请求协议参数对象
         */
        reqProductList : function(url, data) {
            var me = this;
            var reqParams = Juaizuo.httpData2Str(data);
            if (url) {
                Juaizuo.httpTip.opened(function() {
                    me.isStopReq = true;
                }, me);
                me.isStopReq = false;
                var reqUrl = url + reqParams;
                $.ajaxJSONP({
                    url : reqUrl,
                    success: function(data){
                        if (data && !me.isStopReq) {
                            me.reqProductListSuccess(data);
                        } else {
                            me.reqProductListFail();
                        }
                    }
                })
            }
        },
        /**
         * 请求产品列表信息成功后的处理函数
         * @param  {JSON Object} data
         */
        reqProductListSuccess : function(data) {
            var me = this,     
                productlistElem = me.elems["productlistid"];

                Juaizuo.httpTip.closed();

            if (data) {
                var productlisthtml = me.ProductList.getProductListHtml(data.timeline); 
                productlistElem.html(productlisthtml);                
            }
        },

        productDetailsbtnUp : function(publishId) {
            location.href = "productdetails.html";
        },
        
        /**
         * 请求产品列表信息失败后的处理函数
         */
        reqProductListFail : function() {

        },
    };

    //基础URL
    //var BASE_URL = "http://192.168.1.245:8080/JuaizuoMobileServer/";
    //var BASE_URL = "http://127.0.0.1:8080/JuaizuoMobileServer/";
    var BASE_URL = "http://66.175.208.37:18081/JuaizuoMobileServer/";
    $(function(){
        //请求用户信息协议
        var productList_url = BASE_URL + "ProductList";
        var productList_data = {"mobileid" : 1,"startid" : 0,"pagenumber" : 0};
        
        var pm = new PageManager();
        //初始化用户界面
        pm.init();
        //请求产品列表数据，填充用户界面元素
        pm.reqProductList(productList_url, productList_data);

        window.gotoproductdeatils = function(publishId) {
            if (pm.init) {
                pm.productDetailsbtnUp(publishId);
            }
        };
    });
    
 }(window));