package com.iforddow.mgmt.repository;

import com.iforddow.mgmt.entity.jpa.BlockedIp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlockedIpRepository extends JpaRepository<BlockedIp, UUID> {
}
