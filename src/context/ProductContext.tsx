// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { Product } from "@/app/products/productscontent";

// interface ProductContextProps {
//   products: Product[];
//   setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
// }

// const ProductContext = createContext<ProductContextProps | null>(null);

// export const useProductContext = () => {
//   const context = useContext(ProductContext);
//   if (!context) {
//     throw new Error("useProductContext must be used within a ProductProvider");
//   }
//   return context;
// };

// export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [products, setProducts] = useState<Product[]>([]);

//   return (
//     <ProductContext.Provider value={{ products, setProducts }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };
