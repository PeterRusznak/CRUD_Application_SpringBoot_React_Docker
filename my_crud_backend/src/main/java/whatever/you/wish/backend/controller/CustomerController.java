package whatever.you.wish.backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import whatever.you.wish.backend.model.Customer;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/version_1/")
public class CustomerController {

    @Autowired
    private CustomerRepository repository;

    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }    
    
	@PostMapping("/customers")
	public Customer createCustomer(@RequestBody Customer customer) {
		return repository.save(customer);
	}

	@GetMapping("/customers/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
		Customer ret = repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Problem with getCustomerByI id = "+ id ));
		return ResponseEntity.ok(ret);
	}
	
	@PutMapping("/customers/{id}")
	public ResponseEntity<Customer> update(@PathVariable Long id, @RequestBody Customer customer) {
		Customer ret = repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Problem with update id = "+ id + customer.toString()));

		ret.setAddress(customer.getAddress());
		ret.setName(customer.getName());
		ret.setEmail(customer.getEmail());

		repository.save(ret);

		return ResponseEntity.ok(ret);
	}
	
	@DeleteMapping("/customers/{id}")
	public ResponseEntity<Boolean> delete(@PathVariable Long id) {
		Customer ret = repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Problem with delete id = "+ id ));
		repository.delete(ret);
		return ResponseEntity.ok(Boolean.TRUE);
	}

    
    
}
