package com.iforddow.mgmt.module.asn.block.repository;

import com.iforddow.mgmt.module.asn.block.entity.jpa.BlockedAsn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlockedAsnRepository extends JpaRepository<BlockedAsn, UUID> {

}
