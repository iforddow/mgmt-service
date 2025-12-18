package com.iforddow.mgmt.service;

import com.iforddow.mgmt.common.records.AsnInfo;
import com.iforddow.mgmt.common.service.GeoAsnService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AsnService {

    private final GeoAsnService geoAsnService;

    public AsnInfo getAsnInfo(String ipAddress) {

        // If no IP addresses are provided, return "Unknown"
        if(ipAddress == null) {
            return new AsnInfo("Unknown", "Unknown");
        }

        return geoAsnService.lookup(ipAddress);

    }

}
