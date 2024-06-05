import React, { useState, ReactNode } from 'react';

interface ReadMoreProps {
    children: ReactNode;
}

const ReadMore = ({ children }: ReadMoreProps) => {
    const maxCharacterCount = 250;
    const text = children as string;
    const [isTruncated, setIsTruncated] = useState(true);
    if (text?.length < maxCharacterCount) {
        return <p>{text}</p>
      }
      const truncatedText = text?.slice(0, maxCharacterCount);
    return (
        <p className='leading-5 text-slate-600'>
        {isTruncated ? truncatedText : text}
    
        <button onClick={() => setIsTruncated(!isTruncated)}>
          {isTruncated ? (<h1 className='font-medium text-[#634532]'>&nbsp;Readmore</h1>) : 'Show Less'}  
        </button>
      </p>
    )
};

export default ReadMore;
