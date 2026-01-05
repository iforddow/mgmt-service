package com.iforddow.mgmt.module.ip.lookup.controller;

import com.iforddow.mgmt.module.ip.lookup.dto.IpAddressInfoDTO;
import com.iforddow.mgmt.module.ip.lookup.service.IpAddressInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
* A controller class to handle ASN-related endpoints.
*
* @author IFD
* @since 2025-12-17
* */
@RestController
@RequiredArgsConstructor
@RequestMapping("/ip")
public class IpAddressInfoController {

    private final IpAddressInfoService ipAddressInfoService;

    /**
    * A method to get ASN information for a single IP address.
    *
    * @param ipAddress The IP address to look up.
    * @return A ResponseEntity containing the AsnInfo object.
    *
    * @author IFD
    * @since 2025-12-17
    * */
    @GetMapping("/")
    public ResponseEntity<IpAddressInfoDTO> getAsnInfo(@RequestParam String ipAddress) {

        IpAddressInfoDTO asnInfo = ipAddressInfoService.getIpAddressInfo(ipAddress);

        return ResponseEntity.ok(asnInfo);

    }

}
