import React from 'react';
import EachCartItem from './EachCartItem.jsx';


export default class CartList extends React.Component {
  render() {
    var cart_collection = this.props.cart_collection
    var price_array = cart_collection.map(function(obj){
      return (Math.round(obj.price * obj.quantityBuying *100)/100)
    })
    var total_sum = cart_collection.length > 0 ? price_array.reduce(function(total, num) {
      return total += num;
    }) : 0;
    var item_or_items = cart_collection.length > 1 ? 'items' : 'item'
    var renderCart = cart_collection.length == 0 ? [] : cart_collection.map( (item, i) => <EachCartItem
      key={i}
      {...item}
      delete_from_cart={this.props.delete_from_cart.bind(this)}
      add_one={this.props.add_one.bind(this)}
      sub_one={this.props.sub_one.bind(this)}
    />);

    return (
      <div className='cart_list'>
        <h3 className='cart_title'>shopping cart</h3>
        <span>{cart_collection.length} {item_or_items}</span>
        <div className="cart_items">
          {renderCart}
        </div>

        <hr></hr>
        <span className='line_spacing'></span>
        <div className='sum_all_items'>
          <span>Total: ${Math.round(total_sum *100)/100}</span>
          <a onClick={this.props.empty_cart.bind(this)}>Empty Cart</a>
          <button className='confirm_btu' onClick={this.onConfirmPurchase.bind(this)}>Confirm Purchase</button>
        </div>
      </div>
    )
  }
  onConfirmPurchase() {
    if (this.props.cart_collection.length == 0) {
      alert("Cart is empty")
    } else {
      this.props.finalize()
    }
  }
}
