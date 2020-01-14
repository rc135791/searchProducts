import React, {Component} from 'react';

const Shoppingcart = ({ allItems }) => {
    	

	console.log('******************allItems1********');	
	console.log(allItems);
    	console.log('******************allItems2********');
   
let shopData = allItems.map((item, index) => 	(
		<div key={index} className="col-md-12">	
		    <div className="rd_cart_img text-center"><img src={"/assets/images/products/"+item.ITEM_NUMBER+".jpg"} alt={item.ITEM_NUMBER} className="rd_cart_proimg"  /></div>
	        <div className="rd_cart_desc text-center" title={item.DESCRIPTION}>{item.DESCRIPTION}</div>
	        <div className="rd_cart_attr text-center">{item.BRAND} {item.SKU_ATTRIBUTE_VALUE1} {item.SKU_ATTRIBUTE_VALUE2}</div>
	        <div className="rd_cart_price text-center">{item.finalPrice} <span className={item.discClass}>{item.totalAfterDiscount === 0 ? '':item.totalAfterDiscount}</span></div>
	     </div>    
  ));

	return (<div>
	          {shopData}
	        </div>
	        )

}
export default Shoppingcart