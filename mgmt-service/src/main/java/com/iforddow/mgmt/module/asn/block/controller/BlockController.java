package com.iforddow.mgmt.module.asn.block.controller;

import com.iforddow.mgmt.module.asn.block.dto.BlockedAsnDTO;
import com.iforddow.mgmt.module.asn.block.request.BlockedAsnRequest;
import com.iforddow.mgmt.module.asn.block.service.AsnBlockService;
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

    private final AsnBlockService asnBlockService;

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
        return ResponseEntity.ok(asnBlockService.getBlockedAsnList(pageable));
    }

    /**
    * An endpoint to add a new blocked ASN.
    *
    * @author IFD
    * @since 2025-12-16
    * */
    @PostMapping("/asn")
    public ResponseEntity<?> addBlockedAsn(@RequestBody BlockedAsnRequest blockedAsnRequest) {
        asnBlockService.addBlockedAsn(blockedAsnRequest);
        return ResponseEntity.ok().body("ASN blocked successfully");
    }
}