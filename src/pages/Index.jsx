import React, { useState } from "react";
import { Box, Heading, Text, Image, Grid, GridItem, Button, Flex, Input, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaShoppingCart, FaStar, FaSearch } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MHx8fHwxNzExMDYzNDM2fDA&ixlib=rb-4.0.3&q=80&w=1080",
    category: "Electronics",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Casual T-Shirt",
    description: "Comfortable and stylish t-shirt for everyday wear.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1525171254930-643fc658b64e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjB0LXNoaXJ0fGVufDB8fHx8MTcxMTE4MjA2OHww&ixlib=rb-4.0.3&q=80&w=1080",
    category: "Clothing",
    rating: 4.2,
  },
  // Add more products here
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Box>
      <Flex justify="space-between" align="center" p={4} bg="gray.100">
        <Heading size="xl">My E-commerce Site</Heading>
        <Flex align="center">
          <Input placeholder="Search products" mr={2} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <IconButton icon={<FaSearch />} aria-label="Search" variant="outline" />
          <Button leftIcon={<FaShoppingCart />} ml={4} onClick={onOpen}>
            Cart ({cart.length})
          </Button>
        </Flex>
      </Flex>

      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6} p={4}>
        {filteredProducts.map((product) => (
          <GridItem key={product.id}>
            <Box borderWidth={1} borderRadius="lg" overflow="hidden" cursor="pointer" onClick={() => openProductModal(product)}>
              <Image src={product.image} alt={product.name} />
              <Box p={4}>
                <Heading size="md">{product.name}</Heading>
                <Text mt={2}>{product.description}</Text>
                <Flex justify="space-between" align="center" mt={4}>
                  <Text fontWeight="bold">${product.price.toFixed(2)}</Text>
                  <Flex align="center">
                    <FaStar color="gold" />
                    <Text ml={1}>{product.rating}</Text>
                  </Flex>
                </Flex>
                <Button
                  mt={4}
                  colorScheme="blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProduct ? "Product Details" : "Shopping Cart"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProduct ? (
              <Box>
                <Image src={selectedProduct.image} alt={selectedProduct.name} mb={4} />
                <Heading size="lg">{selectedProduct.name}</Heading>
                <Text mt={2}>{selectedProduct.description}</Text>
                <Text mt={2} fontWeight="bold">
                  ${selectedProduct.price.toFixed(2)}
                </Text>
                <Button mt={4} colorScheme="blue" onClick={() => addToCart(selectedProduct)}>
                  Add to Cart
                </Button>
              </Box>
            ) : (
              <Box>
                {cart.length === 0 ? (
                  <Text>Your cart is empty.</Text>
                ) : (
                  <>
                    {cart.map((item) => (
                      <Flex key={item.id} justify="space-between" align="center" mb={2}>
                        <Text>{item.name}</Text>
                        <Text fontWeight="bold">${item.price.toFixed(2)}</Text>
                        <Button size="sm" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </Button>
                      </Flex>
                    ))}
                    <Button mt={4} colorScheme="green">
                      Checkout
                    </Button>
                  </>
                )}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
