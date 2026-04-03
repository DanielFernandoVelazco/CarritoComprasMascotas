package com.dfvc.backend_petstore.service;

import com.dfvc.backend_petstore.dto.response.ProductResponseDTO;
import com.dfvc.backend_petstore.model.Product;
import com.dfvc.backend_petstore.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> modelMapper.map(product, ProductResponseDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductResponseDTO> getActiveProducts() {
        return productRepository.findByIsActiveTrue().stream()
                .map(product -> modelMapper.map(product, ProductResponseDTO.class))
                .collect(Collectors.toList());
    }

    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return modelMapper.map(product, ProductResponseDTO.class);
    }

    public List<ProductResponseDTO> getProductsByCategory(String category) {
        return productRepository.findByCategory(category).stream()
                .map(product -> modelMapper.map(product, ProductResponseDTO.class))
                .collect(Collectors.toList());
    }

    public List<ProductResponseDTO> getOrganicProducts() {
        return productRepository.findByIsOrganicTrue().stream()
                .map(product -> modelMapper.map(product, ProductResponseDTO.class))
                .collect(Collectors.toList());
    }
}