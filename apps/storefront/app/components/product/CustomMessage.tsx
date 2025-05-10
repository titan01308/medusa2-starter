import { StoreProduct, StoreProductTag } from '@medusajs/types';
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { InputCheckbox } from '../common/remix-hook-form/forms/inputs/InputCheckbox';
import { Textarea } from '@lambdacurry/forms/remix-hook-form';

export interface ProductTagsProps {
  tags: StoreProductTag[];
  className?: string;
  radioOnChange?: (name: string, value: string) => void;
}

const findCustomizableTag = (tags: StoreProductTag[]) => {
  return tags.some((tag: StoreProductTag) => tag.value === 'customizable');
}

export const AddCustomMessage: FC<ProductTagsProps> = ({ tags, className, radioOnChange }) => {
  const tagFound = findCustomizableTag(tags)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isTicked, setIsTicked] = useState(false)
  const handleChange = (value: string) => {
    if (radioOnChange) radioOnChange('customMessageEnabled', value);
  };

  return <div className={className}>
    {
      tagFound && <div className="flex gap-1.5 pb-2"><InputCheckbox ref={inputRef} onClick={(e) => setIsTicked(!!inputRef.current?.checked)} onChange={(changedValue) => handleChange(changedValue.target.value)} />Add Custom Message</div>
    }
    {
      isTicked && <div>
        <Textarea name="customMessage" maxLength={40} required />
      </div>
    }
  </div>;
};
