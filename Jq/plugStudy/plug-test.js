
$(function(){
var FirstPlug = function (options){
    var settings = {
        el:'#todo',
        add:'#add',
        target:{
            obj:'#obj',
            params:{
            }
        },
        callback:{
            onLoad:[],
            alertTxt:[],
            addTxt:[]
        }
    };
    options = $.extend(true,settings,options);
    //return this.init(options);
    this.alertTxt(options);
    this.addTxt(options);
};

$.extend(FirstPlug.prototype,{
    init:function(options){

    },
    alertTxt:function(options){
        var $willAlert = $(options.el);
        var that = this;
        $willAlert.on('click',function(){
            alert('这个是alertTxt显示出来的！')
        })
    },
    //在某个标签上添加字符串
    addTxt:function(options){
        var $willAdd = $(options.add);
        var $willAddTar = $(options.target.obj)
        $willAdd.on('click',function(){
            $willAddTar.append('<p>这个是addTxt动态添加的字符串</p>')
        });
    }
});

new FirstPlug({
    target:{
        obj:'#append'
    }
});

var test = function (){
    $('#test').on('click',function(){
    alert('这个不是插件，只是test');
    });
}
new test();
}); 


