export default function Lang({ children, className, onClick }){
    return (
        <li
          className={`py-1 hover:bg-gray-200 cursor-pointer ${className}`}
          onClick={onClick}
        >
          {children}
        </li>
      );
}