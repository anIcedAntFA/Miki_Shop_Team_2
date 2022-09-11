import { isNumber } from 'lodash';
import { useState } from 'react';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { FavoriteIcon, MinusIcon, PlusIcon } from 'src/components/Icons';
import axiosInstance from 'src/utils/axios';
import { formatVndCurrency } from 'src/utils/formatNumber';

export function MainInformation({ name, discount, stocks }) {
  const [sizeChecked, setSizeChecked] = useState(0);
  const [{ quantity, fallback }, setQuantity] = useState({
    quantity: 1,
    fallback: 1,
  });

  // const {}

  const handleClickSize = (index) => {
    setSizeChecked(index);
  };

  const generatePrice = (sizeChecked) => {
    return stocks.find((_, index) => index === sizeChecked).price;
  };

  const generateStock = (sizeChecked) => {
    return stocks.find((_, index) => index === sizeChecked).quantity;
  };

  const handleTypingInput = (event) => {
    const value = event.target.value;
    const replaceValue = value.replace(/\D|0/g, '');

    if (event.type === 'change') {
      return setQuantity((prev) => ({
        quantity: replaceValue,
        fallback: +replaceValue || prev.fallback,
      }));
    }

    if (event.key === 'Enter' || event.type === 'blur') {
      setQuantity((prev) =>
        replaceValue
          ? { quantity: +replaceValue, fallback: +replaceValue }
          : { ...prev, quantity: prev.fallback },
      );
    }
  };

  const getProductsCart = async () => {
    const data = await axiosInstance({
      method: 'POST',
      url: '/api/cart',
      // data: {
      //   userId:
      // }
    });
  };

  return (
    <section className="flex flex-col gap-4 max-w-[539px] max-h-[465px]">
      <h2 className="heading-2">{name}</h2>

      <div className="flex gap-8">
        <div className="flex items-center gap-4">
          <div>5.0 *****</div>
          <NormalDivider vertical="border-2 h-3 border-l-[1px] border-neutral-2" />
          <p>10 đã bán</p>
        </div>
        {!generateStock(sizeChecked) ? (
          <span className="ml-8 subtitle-1 text-caption-1">Hết hàng</span>
        ) : generateStock(sizeChecked) < 10 ? (
          <span className="ml-8 subtitle-1 text-caption-1">
            Sắp hết hàng (Còn {generateStock(sizeChecked)} sản phẩm)
          </span>
        ) : (
          <span className="ml-8 subtitle-1 text-caption-2">Còn hàng</span>
        )}
      </div>
      {discount ? (
        <>
          <div className="flex items-center gap-4 mt-5">
            <span className="heading-3 text-neutral-2 line-through">
              {formatVndCurrency(generatePrice(sizeChecked))}
            </span>
            <NormalDivider vertical="border-2 h-5 border-l-[1px] border-neutral-2" />
            <span className="py-1 px-2 rounded-tag bg-discount text-neutral-5">- {discount}%</span>
            <Button leftIcon={<FavoriteIcon />} wrapper="ml-4">
              Yêu thích
            </Button>
          </div>
          <span className="heading-1 text-primary-2">
            {formatVndCurrency(generatePrice(sizeChecked), discount)}
          </span>
        </>
      ) : (
        <span className="mt-8 mb-4 heading-1 text-primary-2">
          {formatVndCurrency(generatePrice(sizeChecked))}
        </span>
      )}
      <div className="flex flex-col gap-6 mt-4">
        <div className="flex items-center gap-24">
          <span className="flex min-w-[100px]">Kích thước:</span>
          <ul className="flex gap-8 flex-wrap">
            {stocks.map((stock, index) => (
              <li key={stock._id}>
                <Button
                  wrapper={
                    stock.quantity
                      ? index === sizeChecked
                        ? 'flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary bg-primary text-neutral-5'
                        : 'flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary cursor-pointer'
                      : 'flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary bg-neutral-3 text-neutral-5'
                  }
                  onClick={() => handleClickSize(index)}
                  disabled={stock.quantity === 0}
                >
                  {stock.size}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-24">
          <div className="flex min-w-[100px]">Số lượng:</div>
          <div className="flex items-center gap-6">
            <Button icon wrapper="p-1 active:bg-primary active:rounded-full">
              <MinusIcon className="active:text-white h-6 w-6" />
            </Button>
            <span className="heading-5">
              <input
                type="text"
                value={quantity}
                onChange={handleTypingInput}
                onBlur={handleTypingInput}
                onKeyUp={handleTypingInput}
                className="w-10"
              />
            </span>
            <Button icon wrapper="active:bg-primary active:rounded-full">
              <PlusIcon className="active:text-white w-8 h-8" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-10 mt-4">
        <Button outline wrapper="w-254-px">
          Thêm vào giỏ hàng
        </Button>
        <Button primary>Mua ngay</Button>
      </div>
    </section>
  );
}