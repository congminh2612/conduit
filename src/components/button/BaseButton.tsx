import clsx from 'clsx'

import Icon, { IconTypes } from 'components/icons/Icon'
import { twMerge } from 'tailwind-merge'

interface BaseButtonProps {
  spacing?: string
  title?: string
  handleClick?: () => void
  className?: string
  icon?: IconTypes
  iconClass?: string
  type?: 'button' | 'submit'
}
const BaseButton = ({
  title,
  handleClick,
  className,
  icon,
  iconClass,
  type,
  spacing
}: BaseButtonProps) => {
  return (
    <div className="relative">
      <button
        type={type}
        onClick={handleClick}
        className={twMerge(
          'rounded-md bg-primary text-white transition-opacity duration-75 hover:bg-opacity-70',
          className
        )}
      >
        {icon && (
          <Icon
            size="24px"
            className={twMerge(
              'absolute top-1/2 -translate-y-1/2 cursor-pointer ',
              iconClass
            )}
            icon={icon}
          />
        )}
        <span className={clsx(spacing ? spacing : '')}>{title}</span>
      </button>
    </div>
  )
}

export default BaseButton
