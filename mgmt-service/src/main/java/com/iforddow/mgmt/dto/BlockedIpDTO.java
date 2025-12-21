package com.iforddow.mgmt.dto;

import com.iforddow.mgmt.entity.jpa.BlockedIp;

import java.net.InetAddress;
import java.time.Instant;
import java.util.UUID;

public record BlockedIpDTO(UUID id, InetAddress ipAddress, InetAddress cidrRange, String scope, String serviceName, UUID accountId,
                           String reason, String blockType, Integer severity, Instant blockedAt, Instant expiresAt, String createdBy,
                           Instant lastHitAt, Long hitCount, Boolean isActive) {

    public BlockedIpDTO(BlockedIp blockedIp) {
        this(
                blockedIp.getId(),
                blockedIp.getIpAddress(),
                blockedIp.getCidrRange(),
                blockedIp.getScope(),
                blockedIp.getServiceName(),
                blockedIp.getAccountId(),
                blockedIp.getReason(),
                blockedIp.getBlockType(),
                Integer.valueOf(blockedIp.getSeverity()),
                blockedIp.getBlockedAt(),
                blockedIp.getExpiresAt(),
                blockedIp.getCreatedBy(),
                blockedIp.getLastHitAt(),
                blockedIp.getHitCount(),
                blockedIp.getIsActive()
        );
    }

}
