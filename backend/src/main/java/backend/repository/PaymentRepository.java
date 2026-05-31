package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
