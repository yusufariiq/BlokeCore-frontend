const EmptyCart = () => {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-xl text-gray-600">You have no items in your shopping cart.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-4 px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-hover-primary rounded-md"
        >
          Continue Shopping
        </button>
      </div>
    );
  };
  
export default EmptyCart;