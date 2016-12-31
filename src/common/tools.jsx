import {system, target, DEBUG} from './config';

//开发环境下输出信息
const Log = {
    log: function (...params) {
        if (DEBUG) {
            return console.log(...params);
        }
    },
    info: function (...params) {
        if (DEBUG) {
            return console.info(...params);
        }
    },
    error: function (...params) {
        if (DEBUG) {
            return console.error(...params);
        }
    }
}

const Common = {
    //随机字符串生成
    RandomStr: function (num) {
        num = num
            ? (isNaN(num)
                ? 16
                : Number(num))
            : 16;
        var str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var tmp="";
        for(let i=0;i<num;i++){
            tmp+=str[Math.floor(Math.random()*str.length)];
        }
        return tmp;
    }
}

export {Log,Common}