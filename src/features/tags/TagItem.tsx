import React from 'react'

interface TagItemProps {
  tag: string
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  return (
    <div aria-hidden className="">
      <p className="my-[1px] ml-[2px] mr-[10px] rounded-xl bg-gray-500 px-2 py-1 text-center text-sm text-white hover:cursor-pointer">
        {tag}
      </p>
    </div>
  )
}

export default TagItem
