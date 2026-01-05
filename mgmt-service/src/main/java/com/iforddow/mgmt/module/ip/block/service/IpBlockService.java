package com.iforddow.mgmt.module.ip.block.service;

import com.iforddow.mgmt.common.exception.BadRequestException;
import com.iforddow.mgmt.common.utility.FilterParser;
import com.iforddow.mgmt.module.ip.block.dto.BlockedIpDTO;
import com.iforddow.mgmt.module.ip.block.entity.jpa.BlockedIp;
import com.iforddow.mgmt.module.ip.block.filter.BlockedIpFilter;
import com.iforddow.mgmt.module.ip.block.repository.BlockedIpRepository;
import com.iforddow.mgmt.module.ip.block.request.BlockedIpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;
import java.util.Map;

/**
* A service to manage blocked IPs.
*
* @author IFD
* @since 2025-12-23
* */
@Service
@RequiredArgsConstructor
public class IpBlockService {

    private final BlockedIpRepository blockedIpRepository;

    /**
     * A method to get the list of blocked IPs with pagination.
     *
     * @author IFD
     * @since 2025-12-23
     * */
    public Page<BlockedIpDTO> getBlockedIpList(int page, int size, String filter) {

        Pageable pageable = PageRequest.of(page, size);

        if (filter == null || filter.isBlank()) {
            return blockedIpRepository.findAll(pageable)
                    .map(BlockedIpDTO::new);
        }

        FilterParser filterParser = new FilterParser();

        Map<String, String> params = filterParser.parseFilter(filter);
        Specification<BlockedIp> spec = BlockedIpFilter.build(params);

        return blockedIpRepository.findAll(spec, pageable)
                .map(BlockedIpDTO::new);
    }

    /**
     * A method to add a new blocked IP.
     *
     * @author IFD
     * @since 2025-12-30
     * */
    @Transactional
    public void addBlockedIp(BlockedIpRequest blockedIpRequest) {

        try {
            InetAddress ipAddr = InetAddress.getByName(blockedIpRequest.getIpAddress());

            Instant expiresAt = null;
            if (blockedIpRequest.getExpiresAt() != null && !blockedIpRequest.getExpiresAt().isBlank()) {
                expiresAt = Instant.parse(blockedIpRequest.getExpiresAt());
            }

            BlockedIp blockedIp = BlockedIp.builder()
                    .ipAddress(ipAddr)
                    .cidrRange(blockedIpRequest.getCidrRange())
                    .scope(blockedIpRequest.getScope())
                    .serviceName(blockedIpRequest.getServiceName())
                    .reason(blockedIpRequest.getReason())
                    .reasonNotes(blockedIpRequest.getReasonNotes())
                    .blockType(blockedIpRequest.getBlockType())
                    .severity(blockedIpRequest.getSeverity().shortValue())
                    .blockedAt(Instant.now())
                    .expiresAt(expiresAt)
                    .createdBy("Test User")
                    .build();

            blockedIpRepository.save(blockedIp);
        } catch (UnknownHostException e) {
            throw new BadRequestException("Invalid IP address");
        } catch (Exception e) {
            throw new BadRequestException("Error adding blocked IP");
        }

    }

}
