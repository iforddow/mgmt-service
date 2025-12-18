package com.iforddow.mgmt.service;

import com.iforddow.mgmt.common.exception.ResourceNotFoundException;
import com.iforddow.mgmt.dto.BlockedAsnDTO;
import com.iforddow.mgmt.entity.BlockedAsn;
import com.iforddow.mgmt.repository.BlockedAsnRepository;
import com.iforddow.mgmt.repository.BlockedIpRepository;
import com.iforddow.mgmt.request.BlockedAsnRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
* A service class to handle block-related operations.
*
* @author IFD
* @since 2025-12-16
* */
@Service
@RequiredArgsConstructor
public class BlockService {

    private final BlockedIpRepository blockedIpRepository;
    private final BlockedAsnRepository blockedAsnRepository;

    /**
    * A method to get the list of blocked ASNs with pagination.
    *
    * @author IFD
    * @since 2025-12-16
    * */
    public Page<BlockedAsnDTO> getBlockedAsnList(Pageable pageable) {
        return blockedAsnRepository.findAll(pageable)
                .map(BlockedAsnDTO::new);
    }

    /*
    * A method to add a new blocked ASN.
    *
    * @author IFD
    * @since 2025-12-16
    * */
    @Transactional
    public void addBlockedAsn(BlockedAsnRequest blockedAsnRequest) {

        BlockedAsn blockedAsn = BlockedAsn.builder()
                .asn(blockedAsnRequest.getAsn())
                .asnName(blockedAsnRequest.getAsnName())
                .asnOrg(blockedAsnRequest.getAsnOrg())
                .scope(blockedAsnRequest.getScope())
                .serviceName(blockedAsnRequest.getServiceName())
                .accountId(blockedAsnRequest.getAccountId())
                .reason(blockedAsnRequest.getReason())
                .blockType(blockedAsnRequest.getBlockType())
                .severity(blockedAsnRequest.getSeverity().shortValue())
                .blockedAt(Instant.now())
                .expiresAt(blockedAsnRequest.getExpiresAt())
                .createdBy("Test User")
                .isActive(blockedAsnRequest.getIsActive())
                .build();

        blockedAsnRepository.save(blockedAsn);

    }

    /**
    * A method to add multiple blocked ASNs.
    *
    * @author IFD
    * @since 2025-12-16
    * */
    @Transactional
    public void addMultiBlockedAsn(List<BlockedAsnRequest> blockedAsnRequests) {

        List<BlockedAsn> blockedAsnList = new ArrayList<>();

        Instant now = Instant.now();

        for(BlockedAsnRequest request : blockedAsnRequests) {
            BlockedAsn blockedAsn = BlockedAsn.builder()
                    .asn(request.getAsn())
                    .asnName(request.getAsnName())
                    .asnOrg(request.getAsnOrg())
                    .scope(request.getScope())
                    .serviceName(request.getServiceName())
                    .accountId(request.getAccountId())
                    .reason(request.getReason())
                    .blockType(request.getBlockType())
                    .severity(request.getSeverity().shortValue())
                    .blockedAt(now)
                    .expiresAt(request.getExpiresAt())
                    .createdBy("Test User")
                    .isActive(request.getIsActive())
                    .build();

            blockedAsnList.add(blockedAsn);
        }

        blockedAsnRepository.saveAll(blockedAsnList);

    }

    /**
    * A method to update an existing blocked ASN.
    *
    * @author IFD
    * @since 2025-12-16
    * */
    @Transactional
    public void updateBlockedAsn(UUID blockedAsnId, BlockedAsnRequest blockedAsnRequest) {

        BlockedAsn blockedAsn = blockedAsnRepository.findById(blockedAsnId)
                .orElseThrow(() -> new ResourceNotFoundException("Blocked ASN not found"));

        blockedAsn.setAsn(blockedAsnRequest.getAsn());
        blockedAsn.setAsnName(blockedAsnRequest.getAsnName());
        blockedAsn.setAsnOrg(blockedAsnRequest.getAsnOrg());
        blockedAsn.setScope(blockedAsnRequest.getScope());
        blockedAsn.setServiceName(blockedAsnRequest.getServiceName());
        blockedAsn.setAccountId(blockedAsnRequest.getAccountId());
        blockedAsn.setReason(blockedAsnRequest.getReason());
        blockedAsn.setBlockType(blockedAsnRequest.getBlockType());
        blockedAsn.setSeverity(blockedAsnRequest.getSeverity().shortValue());
        blockedAsn.setExpiresAt(blockedAsnRequest.getExpiresAt());
        blockedAsn.setIsActive(blockedAsnRequest.getIsActive());

        blockedAsnRepository.save(blockedAsn);

    }
}
