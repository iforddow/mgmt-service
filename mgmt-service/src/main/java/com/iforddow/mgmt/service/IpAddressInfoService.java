package com.iforddow.mgmt.service;

import com.iforddow.mgmt.common.exception.AsnNotFoundException;
import com.iforddow.mgmt.common.service.GeoAsnService;
import com.iforddow.mgmt.common.service.GeoLocationService;
import com.iforddow.mgmt.dto.IpAddressInfoDTO;
import com.maxmind.geoip2.exception.AddressNotFoundException;
import com.maxmind.geoip2.model.AsnResponse;
import com.maxmind.geoip2.model.CityResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IpAddressInfoService {

    private final GeoAsnService geoAsnService;
    private final GeoLocationService geoLocationService;

    public IpAddressInfoDTO getIpAddressInfo(String ipAddress) {

        // If no IP addresses are provided, return "Unknown"
        if(ipAddress == null) {
            throw new AsnNotFoundException("IP address is null");
        }

        try {
            AsnResponse asnResponse = geoAsnService.getAsnInfo(ipAddress);
            CityResponse cityResponse = geoLocationService.getLocationInfo(ipAddress);

            return new IpAddressInfoDTO(asnResponse, cityResponse);
        } catch (AddressNotFoundException e) {
            throw new AsnNotFoundException("ASN information not available for IP: " + ipAddress);
        } catch (Exception e) {
            throw new RuntimeException("Error looking up ASN info: " + e.getMessage(), e);
        }

    }

}
