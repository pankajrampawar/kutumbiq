export default function BgBlurCard({ children }) {
    return (
        <div className="bg-white/50 backdrop-blur-xl rounded-[20px] p-4 py-6 custom-shadow">
            {children}
        </div>
    )
}