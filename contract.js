var PwnItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.title = obj.title;
        this.description = obj.description;
        this.points = obj.points;
        this.author = obj.author;
        this.writeup = obj.writeup;
        this.url = obj.url;
    }
};

PwnItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var ThePwn = function(){
    LocalContractStorage.defineProperty(this,"size");
    LocalContractStorage.defineMapProperty(this,"key2data");
    LocalContractStorage.defineMapProperty(this,"data",{
        parse: function(text){
            return new PwnItem(text);
        },
        stringify: function(o){
            return o.toString();
        }
    });
};

ThePwn.prototype ={
    init:function(){
        this.size = 0;

    },

    save:function(title,description,points,writeup,url){
        if(!title||!description||!points||!writeup||!url){
            throw new Error("empty something")
        }

        var from = Blockchain.transaction.from;
        var pwnItem = this.data.get(title);
        if(pwnItem){
            throw new Error("title already used,change title");
        }

        pwnItem = new PwnItem();
        pwnItem.author = from;
        pwnItem.title = title;
        pwnItem.description = description;
        pwnItem.points = points;
        pwnItem.writeup = writeup;
        pwnItem.url = url;

        var key = this.size;
        this.key2data.put(key,title);
        this.data.put(title,pwnItem);
        this.size += 1;
    },

    len:function(){
        return this.size;
    },

    forEach:function(left,offset){
        left = parseInt(left);
        offset = parseInt(offset);
        if(left > this.size){
            throw new Error("left is not valid");
        }
        var right = left + offset;
        if(right > this.size){
            right = this.size;
        }
        var result = "";
        for(var i = left;i < right;i++){
            var j = this.key2data.get(i);
            result += i + " " + j + "\n";
        }
        return result;
    },


    get:function(title){
        if(!title){
            throw new Error("emtpy titile");
        }
        return this.data.get(title);
    },


}

module.exports = ThePwn;