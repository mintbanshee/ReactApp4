// src/models/CartItem.ts

import type { Flower } from './Flower';

export type CartItem = Flower & {
  quantity: number;
};
