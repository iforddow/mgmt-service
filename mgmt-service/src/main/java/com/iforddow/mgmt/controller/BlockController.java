package com.iforddow.mgmt.controller;

import com.iforddow.mgmt.dto.BlockedAsnDTO;
import com.iforddow.mgmt.dto.BlockedIpDTO;
import com.iforddow.mgmt.request.BlockedAsnRequest;
import com.iforddow.mgmt.service.BlockService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
* A controller class to handle block-related endpoints.
*
* @author IFD
* @since 2025-12-16
* */
@RestController
@RequestMapping("/block")
@RequiredArgsConstructor
public class BlockController {

    private final BlockService blockService;

    /**
    * An endpoint to get the list of blocked ASNs with pagination.
    *
    * @author IFD
    * @since 2025-12-16
    * */
    @GetMapping("/asn")
    public ResponseEntity<Page<BlockedAsnDTO>> getBlockedAsnList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(blockService.getBlockedAsnList(pageable));
    }

    /**
    * An endpoint to get a list of blocked IPs with pagination.
    *
    * @author IFD
    * @since 2025-12-23
    * */
    @GetMapping("/ip")
    public ResponseEntity<Page<BlockedIpDTO>> getBlockedIpList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(blockService.getBlockedIpList(pageable));
    }

    /**
    * An endpoint to add a new blocked ASN.
    *
    * @author IFD
    * @since 2025-12-16
    * */
    @PostMapping("/asn")
    public ResponseEntity<?> addBlockedAsn(BlockedAsnRequest blockedAsnRequest) {
        blockService.addBlockedAsn(blockedAsnRequest);
        return ResponseEntity.ok().body("ASN blocked successfully");
    }
}