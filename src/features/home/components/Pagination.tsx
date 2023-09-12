interface PaginationProps {
  totalPages: number
  currentPage: number
  onChangePage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChangePage
}) => {
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }
  return (
    <div>
      <ul className=" flex pt-10">
        {pageNumbers.map((page) => {
          return (
            <li
              className={`${
                page === currentPage ? 'bg-primary text-white' : ''
              } m-[5px] cursor-pointer border-[1px] border-primary px-[10px] py-[3px] text-primary hover:bg-primary hover:text-white`}
              key={page}
              onClick={() => onChangePage(page)}
            >
              {page}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Pagination
