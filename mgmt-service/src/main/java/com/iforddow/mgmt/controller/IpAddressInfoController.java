package com.iforddow.mgmt.controller;

import com.iforddow.mgmt.common.records.AsnInfo;
import com.iforddow.mgmt.service.IpAddressInfoService;
import jakarta.servlet.http.HttpServletRequest;
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
@RequestMapping("/asn")
public class AsnController {

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
    public ResponseEntity<AsnInfo> getAsnInfo(@RequestParam String ipAddress, HttpServletRequest request) {

        AsnInfo asnInfo = ipAddressInfoService.getAsnInfo(ipAddress);

        return ResponseEntity.ok(asnInfo);

    }

}
