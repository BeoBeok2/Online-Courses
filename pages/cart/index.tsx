import Head from 'next/head';
import Styles from '@/styles/cart.module.css';
import Header from '../components/footerheader/header';
import Footer from '../components/footerheader/footer';
import Banner from '../components/footerheader/banner';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Cart () {
    const [dataCart, setDataCart] = useState({
        id: '',
        cart: {
            id: '',
            courses: [],
            totalPrice: '',
        },
        totalCourse: '',
    })

    useEffect(() => {
        getData()
    }, [])

    const handleDeleteCourseInCart = (e:any, courseId: any) => {
        console.log(courseId)

        axios.delete('http://localhost:3000/cart', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {
                "cartId":`${dataCart.cart.id}`, 
                "courseId": courseId
            }
        }).then(result => {
            getData()
        }).catch(err => console.log(err))
    }

    const getData = () => {
        axios.get('http://localhost:3000/cart', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            console.log(result)
            setDataCart(result.data)
        })
    }

    const handlePayment = (e:any) => {
        e.preventDefault()
        axios.post('http://localhost:3000/payment', { "cartId":`${dataCart.cart.id}` }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            const data = result.data
            localStorage.setItem('tokenPayment', data.orderToken.token)

            window.location.href = data.links.href
        })
    }


    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <Header/>
            <Banner title='Cart' />
            <div className={Styles.main}>
            <div className={Styles.container}>
                <div className={Styles.content}>
                    <div className={Styles.woocomerce}>
                        <div className={Styles.woocommerce_cart_form}>
                            <div className={Styles.shop_table}>
                                <div className={Styles.shop_table_head}>
                                    <ul className={Styles.product_list}>
                                        <li className={Styles.product_item} id={Styles.product_thumnail}>PRODUCT</li>
                                        <li className={Styles.product_item} id={Styles.product_name}></li>
                                        <li className={Styles.product_item} id={Styles.product_price}>PRICE</li>
                                        {/* <li className={Styles.product_item} id={Styles.product_quality}>QUALITY</li> */}
                                        {/* <li className={Styles.product_item} id={Styles.product_subtotal}>TOTAL</li>     */}
                                        <li className={Styles.product_item} id={Styles.product_remove}></li>
                                    </ul>
                                </div>
                                <div className={Styles.shop_table_body}>
                                        {
                                            dataCart?.cart.courses && dataCart?.cart.courses.map((course : any, index : Number) => (
                                                <>
                                                <ul className={Styles.product_list}>
                                                    <li className={Styles.product_item_body} id={Styles.product_thumnail} key={`cart-${course.id}`}>
                                                        <a href="#">
                                                            <img src={`${course?.thumbnail?.url}`} className={Styles.size_woocommerce_thumbnail} alt="" decoding="async" loading="lazy"/>
                                                        </a>
                                                    </li>
                                                    <li className={Styles.product_item_body} id={Styles.product_name}>
                                                        <a href="#">
                                                            <span>{course.title}</span>
                                                        </a>
                                                    </li>
                                                    <li className={Styles.product_item_body} id={Styles.product_price}>
                                                        <span>{course.price}</span>
                                                    </li>
                                                    {/* <li className={Styles.product_item_body} id={Styles.product_quality}>
                                                        <span>1</span>
                                                    </li> */}
                                                    {/* <li className={Styles.product_item_body} id={Styles.product_subtotal}>
                                                        <span>10$</span>
                                                    </li>  */}
                                                    <li className={Styles.product_item_body} id={Styles.product_remove}>
                                                        <div className={Styles.product_remove_icon}>
                                                            <a href="#" onClick={() => handleDeleteCourseInCart(Event, course.id)} data-index-course-cart={index}>
                                                                <i className="fa-solid fa-x"></i>
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </>
                                            ))
                                        }
                                </div>
                            </div>
                        </div>
                        {/* <div className={Styles.woocommerce_btn}>
                            <button id={Styles.button} role="button">UPDATE CART</button>
                        </div>
                        <div className={Styles.woocommerce_cart_coupon}>
                            <div className={Styles.woocommerce_box_coupon}>

                                <span className={Styles.coupon_layber}>
                                    COUPON : 
                                </span>
                                <input type="text" name="coupon_code" className={Styles.input_text} id={Styles.coupon_code} value="" placeholder=""/>
                                <div className={Styles.woocommerce_cart_coupon_btn}>
                                    <button className={Styles.woocommerce_btn} id={Styles.button}  role="button">UPDATE CART</button>
                                </div>
                            </div>
                        </div>    */}
                    </div>
                    <div className={Styles.cart_collaterals}>
                        <div className={Styles.cart_totals}>
                            <h2>Cart Total</h2>
                            <div className={Styles.cart_subtitle}>
                                <ul className={Styles.cart_subtitle_list}>
                                    
                                    <li className={Styles.car_sub_text}>
                                        <span>Subtotal</span>
                                    </li>
                                    <li className={Styles.car_sub_text}>
                                        {
                                            dataCart?.cart?.courses && dataCart?.cart?.courses.map((course:any, index) => (<>
                                                <span>{`${course.price} ${course.currency}`}</span><br/>
                                            </>))
                                        }
                                    </li>
                                    <span></span>
                                </ul>
                                <ul className={Styles.cart_subtitle_list}>
                                    
                                    <li className={Styles.car_sub_text}>
                                        <span>Total</span>
                                    </li>
                                    <li className={Styles.car_sub_text}>
                                        <span>{`${dataCart.cart.totalPrice}`}</span>
                                    </li>
                                    <span></span>
                                </ul>
                            </div>
                        </div>
                        <div className={Styles.btn_cart_checkout} >
                        <a href="" onClick={handlePayment} className={Styles.cart_checkout_btn}  role="button">PROCEED TO CHECKOUT</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <Footer/>
        </>
      );
};
