package com.iforddow.mgmt.module.ip.block.repository;

import com.iforddow.mgmt.module.ip.block.entity.jpa.BlockedIp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BlockedIpRepository extends JpaRepository<BlockedIp, UUID>, JpaSpecificationExecutor<BlockedIp> {

    @Query("SELECT DISTINCT b.serviceName FROM BlockedIp b")
    List<String> findDistinctServiceNames();

}
