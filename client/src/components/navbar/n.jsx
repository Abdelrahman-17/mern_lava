<div className="logo">
                                <img src={Logo} alt="" />
                            </div>
                            <button className="btn-h" onClick={showsidenav}>=</button>
                            <div className={`${sidenav ? "nav-menu active" : "nav-menu"}`}>
                                <nav>
                                    <Adminlink>
                                        <NavLink className={activelink} to='/admin/home' >Admin</NavLink>
                                    </Adminlink>
                                    <NavLink className={activelink} to="/">home</NavLink>
                                    <NavLink className={activelink} to="/booking">online booking</NavLink>
                                    <NavLink className={activelink} to="/store">store</NavLink>
                                    <NavLink className={activelink} to='/cart'>cart</NavLink>

                                    {/* <div className='cart'>
                                        <FaShoppingCart onClick={() => setSidecart(!sidecart)} className="cursor-pointer" size={25} />
                                        <p>{totquantity}</p>
                                    </div> */}
                                    {
                                        items && items.length > 0 &&
                                        < div className={`${sidecart ? "sidecart active" : "sidecart"}`}>
                                            <button onClick={() => setSidecart(false)}>X</button>
                                            {
                                                items.map((ele, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <p>{ele.title}</p>
                                                            <p >{ele.itemquantity}</p>
                                                            <button onClick={() => dispatch(addtocart(ele))}>+</button>
                                                            <button onClick={() => dispatch(decrease(ele))}>-</button>

                                                        </div>
                                                    )
                                                })
                                            }
                                            <Link to='/cart' onClick={() => setSidecart(false)}>View All Cart</Link>
                                        </div>
                                    }
                                    <div className="dropdown">
                                        <button className='dropdown-btn'>pages
                                            <ion-icon name="chevron-down-outline"></ion-icon>
                                        </button>
                                        <div className="dropdown-menu">
                                            <NavLink className={activelink} to="/About">about</NavLink>
                                            <NavLink className={activelink} to="/Services">services</NavLink>
                                            <NavLink className={activelink} to="/News">news</NavLink>
                                            <NavLink className={activelink} to="/Team">team</NavLink>
                                            <NavLink className={activelink} to="/Faq">FAQ</NavLink>
                                            <NavLink className={activelink} to="/404">404</NavLink>
                                            <NavLink className={activelink} to="/Contact">contact</NavLink>
                                        </div>
                                    </div>
                                </nav>
                                <div className="account">
                                    {
                                        currentUser &&
                                        <>
                                            <Link to="/profile">
                                                <span>{currentUser?.username}</span>
                                                {
                                                    currentUser?.photoimage &&
                                                    <img src={currentUser?.photoimage} className='ml-2 w-8 h-8 rounded-full' alt="" />
                                                }
                                            </Link>
                                            <button onClick={logouthandler}>Logout</button>
                                        </>

                                    }

                                </div>
                            </div >