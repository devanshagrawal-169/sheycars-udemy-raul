import React, { useState } from 'react';
import { Menu, Dropdown, Button, Space, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo-1.jpeg';
import { useSelector } from 'react-redux';
import { refresh } from 'aos';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const { cars } = useSelector((state) => state.carsReducer);
  // const {location} = useSelector(state=>state.location)
  const items = cars.map(car=>car.city)
  const [location, setLocation] = useState(user.city);
  

  function refreshCars() {
    let cities= document.getElementById("countries")
    setLocation(cities.value)
    
    
  }
  localStorage.setItem('location', location)
  


  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userbookings">Bookings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/admin">Admin</a>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
      >
        <li style={{ color: 'blue' }}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between -translate-x-[65px]">
              
                
                  <Link to="/" style={{ color: 'orangered' }} >
                    <img src={Logo} alt="" width={250} />
                  </Link>


                
                <form class="max-w-sm mx-auto">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                  <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={refreshCars}>
                  {
                    items.map(item=>(<option>{item}</option>))
                  }
                    {/* <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option> */}
                  </select>
                </form>

              

              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>

      <div className="footer text-center">
        <hr />
      </div>
    </div>
  );
}

export default DefaultLayout;
