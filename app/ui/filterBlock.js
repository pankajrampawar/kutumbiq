export default function FilterBlock({ children, onClick }) {
    return (
        <button onClick={onClick} className="flex justify-center items-center p-2 text-sm rounded-xl shadow-sm hover:shadow-md border">
            {children}
        </button>
    )
}