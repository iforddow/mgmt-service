package com.iforddow.mgmt.common.utility;

import java.util.HashMap;
import java.util.Map;

public class FilterParser {

    public Map<String, String> parseFilter(String filter) {
        Map<String, String> map = new HashMap<>();

        // Remove leading & if present
        if (filter.startsWith("&")) {
            filter = filter.substring(1);
        }

        String[] pairs = filter.split(";");
        for (String pair : pairs) {
            if (pair == null || pair.isBlank()) continue;
            String[] kv = pair.split("=", 2);
            if (kv.length == 2) {
                String key = kv[0].trim();
                String value = kv[1].trim();
                if (!key.isEmpty() && !value.isEmpty()) {
                    map.put(key, value);
                }
            }
        }
        return map;
    }

}
