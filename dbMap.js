//dbMap.js

const init = (jsonStr) => new Map((jsonStr) ? JSON.parse(jsonStr) : null);
const clear = () => new Map();

const create = (map, key, value) => new Map([...map, [key, value]]);
const read = (map, key) => new Map([...map].filter(([k]) => k == key));
const update = (map, key, value) => new Map([...map, [key, value]]);
const del = (map, key) => new Map([...map].filter(([k]) => k !== key));

const stringify = (map, key) => {
    if(key == undefined) {
        return JSON.stringify([...map]);
    } else {
        let m = read(map,key);
        return JSON.stringify([...m]);
    }
}

const mapToObj = (map) => {
    let obj = Object.create(null);
    for (let [k,v] of map) {
        obj[k] = v;
    }
    return obj;
}

const objToMap = (obj) => {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

module.exports = {
    create,read,update,del,clear,init,stringify,mapToObj,objToMap
}
