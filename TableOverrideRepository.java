package com.auradining.booking.repository;

import com.auradining.booking.model.TableOverride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableOverrideRepository extends JpaRepository<TableOverride, Integer> {
}
