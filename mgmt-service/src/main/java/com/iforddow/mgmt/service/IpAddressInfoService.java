package com.iforddow.mgmt.service;

import com.iforddow.mgmt.common.exception.AsnNotFoundException;
import com.iforddow.mgmt.common.records.AsnInfo;
import com.iforddow.mgmt.common.service.GeoAsnService;
import com.maxmind.geoip2.exception.AddressNotFoundException;
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

        try {
            return geoAsnService.lookup(ipAddress);
        } catch (AddressNotFoundException e) {
            throw new AsnNotFoundException("ASN information not available for IP: " + ipAddress);
        } catch (Exception e) {
            throw new RuntimeException("Error looking up ASN info: " + e.getMessage(), e);
        }

    }

}
