import { useQuery } from '@tanstack/react-query'
import React from 'react'
import TagItem from './TagItem'
import { getTags } from './services/getTags'
interface TagStageProps {
  onChangeTag: (tag: string) => void
}
const TagStage: React.FC<TagStageProps> = ({ onChangeTag }) => {
  const { data } = useQuery({ queryKey: ['tags'], queryFn: getTags })
  return (
    <div>
      <div className="w-[180px] max-w-[300px] bg-gray-200 px-2 py-4 xl:w-[280px]">
        <p className="pl-1">Popular Tags</p>
        {data &&
          data?.tags.map((tag: any) => (
            <div
              key={tag}
              className="mt-2 inline-block"
              onClick={() => onChangeTag(tag)}
            >
              <TagItem tag={tag} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default TagStage
