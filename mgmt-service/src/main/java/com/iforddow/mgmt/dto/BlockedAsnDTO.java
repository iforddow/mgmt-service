package com.iforddow.mgmt.dto;

import com.iforddow.mgmt.entity.jpa.BlockedAsn;

import java.time.Instant;
import java.util.UUID;

public record BlockedAsnDTO(UUID id, Integer asn, String asnName, String asnOrg, String scope, String serviceName, UUID accountId,
                            String reason, String blockType, Integer severity, Instant blockedAt, Instant expiresAt, String createdBy,
                            Instant lastHitAt, Long hitCount, Boolean isActive) {

    public BlockedAsnDTO(BlockedAsn blockedAsn) {
        this(
                blockedAsn.getId(),
                blockedAsn.getAsn(),
                blockedAsn.getAsnName(),
                blockedAsn.getAsnOrg(),
                blockedAsn.getScope(),
                blockedAsn.getServiceName(),
                blockedAsn.getAccountId(),
                blockedAsn.getReason(),
                blockedAsn.getBlockType(),
                Integer.valueOf(blockedAsn.getSeverity()),
                blockedAsn.getBlockedAt(),
                blockedAsn.getExpiresAt(),
                blockedAsn.getCreatedBy(),
                blockedAsn.getLastHitAt(),
                blockedAsn.getHitCount(),
                blockedAsn.getIsActive()
        );
    }

}
