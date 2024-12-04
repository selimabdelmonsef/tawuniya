import { atom } from "jotai";
import { Product } from "../hooks/useProducts";

export const wishlistAtom = atom<Product[]>([]);
