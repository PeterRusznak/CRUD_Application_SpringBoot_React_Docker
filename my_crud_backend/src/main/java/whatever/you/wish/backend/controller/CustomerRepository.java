package whatever.you.wish.backend.controller;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import whatever.you.wish.backend.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
}
