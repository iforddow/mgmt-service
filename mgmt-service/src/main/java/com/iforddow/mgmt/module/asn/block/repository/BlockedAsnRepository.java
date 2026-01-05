package com.iforddow.mgmt.repository;

import com.iforddow.mgmt.entity.jpa.BlockedAsn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlockedAsnRepository extends JpaRepository<BlockedAsn, UUID> {

}
