package com.iforddow.mgmt.module.ip.block.controller;

import com.iforddow.mgmt.module.ip.block.dto.BlockedIpDTO;
import com.iforddow.mgmt.module.ip.block.request.BlockedIpRequest;
import com.iforddow.mgmt.module.ip.block.service.IpBlockService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/block/ip")
@RequiredArgsConstructor
public class IpBlockController {

    private final IpBlockService ipBlockService;

    /**
     * An endpoint to get a list of blocked IPs with pagination.
     *
     * @author IFD
     * @since 2025-12-23
     * */
    @GetMapping
    public ResponseEntity<Page<BlockedIpDTO>> getBlockedIpList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String filter
        ) {

        return ResponseEntity.ok(ipBlockService.getBlockedIpList(page, size, filter));
    }

    /*
    * An endpoint to add a new blocked IP.
    *
    * @author IFD
    * @since 2025-12-30
    * */
    @PostMapping
    public ResponseEntity<?> addBlockedIp(@RequestBody BlockedIpRequest blockedIpRequest) {
        ipBlockService.addBlockedIp(blockedIpRequest);
        return ResponseEntity.ok().body("IP blocked successfully");
    }

}
