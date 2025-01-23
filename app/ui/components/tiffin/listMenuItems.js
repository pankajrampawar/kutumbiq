import TiffinCard from "./tiffinCard"

export default function ListMenuItems({ menuItems, parameter, filter }) {
    return (
        <div>
            {menuItems && menuItems.map((item) => {
                <TiffinCard title={item.title} id={item._id} deliveryBy={item.deliveryBy} />
            })}
        </div>
    )
}