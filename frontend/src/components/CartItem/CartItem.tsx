import useCart from '../../hooks/UseCart';

interface ICartItemProps {
    product: {
        id: string;
        photo?: string | undefined;
        title: string;
        price: number;
    };
}
const CartItem = (props: ICartItemProps) => {
    const product = props.product;

    const removeItem = () => {
        removeFromCart(props.product.id);
        console.log(`removing:${props.product}`);
    };

    const { removeFromCart } = useCart();
    return (
        <div className="cart-grid my-3 rounded-lg border border-gray-200 p-2 shadow hover:bg-gray-50  sm:items-center">
            <div className="cart-grid__photo w-32  ">
                <img className="rounded-md" src={product.photo} alt={product.title} />
            </div>
            <div className="cart-grid__title font-semibold text-gray-900 ">
                {product.title}
            </div>
            <div className="cart-grid__price mr-2 text-right font-semibold text-gray-900">
                {product.price.toFixed(2)}&nbsp;&euro;
            </div>
            <div className="cart-grid__cancel  mr-2 text-right">
                <button
                    id={product.id}
                    onClick={removeItem}
                    className="font-medium text-red-600 hover:underline"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
export default CartItem;
