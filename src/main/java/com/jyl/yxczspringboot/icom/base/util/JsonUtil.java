package com.jyl.yxczspringboot.icom.base.util;



import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.*;

public class JsonUtil {
    public static Map jsonToMap(String jsonStr){
        Map<String, Object> map = new HashMap<String, Object>();
        JSONObject json = JSONObject.fromObject(jsonStr);
        for(Object k : json.keySet()){
            Object v = json.get(k);
            if(v instanceof JSONArray){
                List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
                Iterator<JSONObject> it = ((JSONArray)v).iterator();
                while(it.hasNext()){
                    JSONObject json2 = it.next();
                    list.add(jsonToMap(json2.toString()));
                }
                map.put(k.toString(), list);
            } else {
                map.put(k.toString(), v);
            }
        }
        return map;
    }
}
