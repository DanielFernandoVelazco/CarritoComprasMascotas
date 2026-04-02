package com.dfvc.backend_petstore.config;

import com.dfvc.backend_petstore.model.Product;
import com.dfvc.backend_petstore.model.User;
import com.dfvc.backend_petstore.repository.ProductRepository;
import com.dfvc.backend_petstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Crear usuario admin si no existe
        if (!userRepository.existsByEmail("admin@sanctuary.com")) {
            User admin = new User();
            admin.setEmail("admin@sanctuary.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("Admin");
            admin.setLastName("Sanctuary");
            admin.setRole(User.UserRole.ADMIN);
            userRepository.save(admin);
            System.out.println("Admin user created: admin@sanctuary.com / admin123");
        }

        // Crear usuario de prueba si no existe
        if (!userRepository.existsByEmail("test@sanctuary.com")) {
            User testUser = new User();
            testUser.setEmail("test@sanctuary.com");
            testUser.setPassword(passwordEncoder.encode("test123"));
            testUser.setFirstName("Test");
            testUser.setLastName("User");
            testUser.setRole(User.UserRole.USER);
            userRepository.save(testUser);
            System.out.println("Test user created: test@sanctuary.com / test123");
        }

        // Crear productos de ejemplo si no existen
        if (productRepository.count() == 0) {
            // Producto 1: Organic Salmon Dog Food
            Product product1 = new Product();
            product1.setName("Organic Salmon Dog Food");
            product1.setDescription("Premium organic salmon dog food made with wild-caught salmon, rich in omega-3 fatty acids for healthy skin and coat.");
            product1.setPrice(new BigDecimal("34.99"));
            product1.setCategory("Dogs");
            product1.setImageUrl("https://images.unsplash.com/photo-1567375698348-8d6fb0b2ab1b?w=500");
            product1.setStockQuantity(100);
            product1.setBrand("The Digital Sanctuary");
            product1.setWeightLb(5.0);
            product1.setOrganic(true);
            product1.setActive(true);
            productRepository.save(product1);

            // Producto 2: Free-Range Chicken & Sweet Potato
            Product product2 = new Product();
            product2.setName("Free-Range Chicken & Sweet Potato");
            product2.setDescription("Grain-free formula with free-range chicken and nutrient-rich sweet potatoes for active dogs.");
            product2.setPrice(new BigDecimal("32.99"));
            product2.setCategory("Dogs");
            product2.setImageUrl("https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500");
            product2.setStockQuantity(85);
            product2.setBrand("The Digital Sanctuary");
            product2.setWeightLb(5.0);
            product2.setOrganic(false);
            product2.setActive(true);
            productRepository.save(product2);

            // Producto 3: Grass-Fed Lamb & Garden Greens
            Product product3 = new Product();
            product3.setName("Grass-Fed Lamb & Garden Greens");
            product3.setDescription("Premium lamb recipe with garden vegetables for optimal nutrition and digestion.");
            product3.setPrice(new BigDecimal("38.99"));
            product3.setCategory("Dogs");
            product3.setImageUrl("https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500");
            product3.setStockQuantity(60);
            product3.setBrand("The Digital Sanctuary");
            product3.setWeightLb(5.0);
            product3.setOrganic(true);
            product3.setActive(true);
            productRepository.save(product3);

            // Producto 4: Interactive Cat Wand
            Product product4 = new Product();
            product4.setName("Interactive Cat Wand");
            product4.setDescription("Colorful interactive cat wand toy with natural feathers and bells to keep your cat active and entertained.");
            product4.setPrice(new BigDecimal("14.99"));
            product4.setCategory("Cats");
            product4.setImageUrl("https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500");
            product4.setStockQuantity(200);
            product4.setBrand("The Digital Sanctuary");
            product4.setWeightLb(0.5);
            product4.setOrganic(false);
            product4.setActive(true);
            productRepository.save(product4);

            // Producto 5: Memory Foam Pet Bed
            Product product5 = new Product();
            product5.setName("Memory Foam Pet Bed");
            product5.setDescription("High-end memory foam pet bed with removable, washable cover for ultimate comfort.");
            product5.setPrice(new BigDecimal("89.00"));
            product5.setCategory("Dogs");
            product5.setImageUrl("https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=500");
            product5.setStockQuantity(30);
            product5.setBrand("The Digital Sanctuary");
            product5.setWeightLb(8.0);
            product5.setOrganic(false);
            product5.setActive(true);
            productRepository.save(product5);

            // Producto 6: Venison & Wild Berry Feast
            Product product6 = new Product();
            product6.setName("Venison & Wild Berry Feast");
            product6.setDescription("Novel protein recipe with venison and antioxidant-rich wild berries for sensitive dogs.");
            product6.setPrice(new BigDecimal("44.99"));
            product6.setCategory("Dogs");
            product6.setImageUrl("https://images.unsplash.com/photo-1567375698348-8d6fb0b2ab1b?w=500");
            product6.setStockQuantity(45);
            product6.setBrand("The Digital Sanctuary");
            product6.setWeightLb(5.0);
            product6.setOrganic(true);
            product6.setActive(true);
            productRepository.save(product6);

            System.out.println("6 products created successfully!");
        }
    }
}