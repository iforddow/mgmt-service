package com.iforddow.mgmt.dto;

import com.iforddow.mgmt.entity.jpa.BlockedIp;

import java.net.InetAddress;
import java.time.Instant;
import java.util.UUID;

/*
* A DTO class to represent blocked IP information.
*
* @author IFD
* @since 2025-12-23
* */
public record BlockedIpDTO(UUID id, InetAddress ipAddress, Integer cidrRange, String scope, String serviceName, UUID accountId,
                           String reason, String reasonNotes, String blockType, Integer severity, Instant blockedAt, Instant expiresAt, String createdBy,
                           Instant lastHitAt, Long hitCount) {

    public BlockedIpDTO(BlockedIp blockedIp) {
        this(
                blockedIp.getId(),
                blockedIp.getIpAddress(),
                blockedIp.getCidrRange(),
                blockedIp.getScope(),
                blockedIp.getServiceName(),
                blockedIp.getAccountId(),
                blockedIp.getReason(),
                blockedIp.getReasonNotes(),
                blockedIp.getBlockType(),
                Integer.valueOf(blockedIp.getSeverity()),
                blockedIp.getBlockedAt(),
                blockedIp.getExpiresAt(),
                blockedIp.getCreatedBy(),
                blockedIp.getLastHitAt(),
                blockedIp.getHitCount()
        );
    }

}
