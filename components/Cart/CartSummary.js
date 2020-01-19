import React, { useState, useEffect } from 'react';
import { Button, Segment, Divider } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';
import StripeCheckout from 'react-stripe-checkout';

function CartSummary({ products, handleCheckout, success }) {
  const [isCartEmpty, setCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0)
  }, [products])

  return (
    <>
      <Divider />
      <Segment clearing size='large'>
        <strong>Sub total:</strong> ${cartAmount}
        <StripeCheckout
          name='React Reserve'
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ''}
          currency='USD'
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent='onClick'
          stripeKey='pk_test_ocgN6Xw8OXdcXhpenc5Kvlj0005iLgpoqp'
        >
          <Button disabled={isCartEmpty || success} icon='cart' color='teal' floated='right' content='Checkout' />
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;
