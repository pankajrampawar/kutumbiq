
export default function SimpleHousingCard({ src, alt, specification, price }) {
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
            <div>
                <p>{specification}</p>
                <p>{price} Rs.</p>
            </div>
        </div>
    )
}