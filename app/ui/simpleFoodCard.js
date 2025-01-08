
export default function SimpleFoodCard({ src, alt, tiffinItem, tiffinPrice }) {
    return (
        <div>
            <div>
                <img
                    src={src}
                    alt={alt}
                    width="150"
                    height="150"
                    className="bg-gray-300 rounded-xl"
                />
            </div>
            <div className="flex justify-between">
                <p>{tiffinItem}</p>
                <p>{tiffinPrice} Rs.</p>
            </div>
        </div>
    )
}