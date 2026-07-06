"use client";
import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface CartCardProps {
  imageSrc: string;
  title: string;
  size?: string | null;
  color?: string | null;
  price: number;
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
}

const CartCard: React.FC<CartCardProps> = ({
  imageSrc,
  title,
  size,
  color,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-b-0">
      <Image
        src={imageSrc}
        alt={title}
        width={80}
        height={80}
        className="w-20 h-20 shrink-0 object-cover rounded-md"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
          {onRemove && (
            <button
              onClick={onRemove}
              aria-label="Remove item"
              className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {size && <p className="text-xs text-gray-500 mt-1">Size: {size}</p>}
        {color && <p className="text-xs text-gray-500">Color: {color}</p>}
        <p className="text-lg font-semibold text-gray-900 mt-2">${price}</p>
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={onDecrement}
            disabled={quantity <= 1}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-5 text-center">
            {quantity}
          </span>
          <button
            onClick={onIncrement}
            className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
