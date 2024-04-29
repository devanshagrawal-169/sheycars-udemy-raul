import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Button, Space, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo-1.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from 'aos';
import { setLocation, setType } from '../redux/actions/carsActions';
// import { setLocation } from '../redux/reducers/locationSlice';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const { cars } = useSelector((state) => state.carsReducer);
  const { location } = useSelector((state) => state.locationReducer);
  const items1 = cars.map((car) => car.city);
  const items2 = cars.map((car) => car.type);
  const citys = [...new Set(items1)]
  const types = [...new Set(items2)]
  // console.log(citys)
  const dispatch = useDispatch();
  // const [location, setLocation] = useState(user.city);

  function refreshCars() {
    let cities = document.getElementById('countries');
    let typiies = document.getElementById('typies');
    // setLocation(cities.value)
    dispatch(setLocation(cities.value));
    dispatch(setType(typiies.value));
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userbookings">Bookings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/admin">My vehicles</a>
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
            <div className="d-flex justify-content-between items-center -translate-x-[65px]">
              <Link to="/" style={{ color: 'orangered' }}>
                <img src={Logo} alt="" width={250} />
              </Link>
              <div className='flex gap-4 items-center'>
                <form class="max-w-sm mx-auto -mt-5">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <div className="flex gap-2 flex-row-reverse">
                    <select
                    id="typies"
                    class="bg-gray-50 border w-[200px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onClick={refreshCars}
                  >
                    <option selected value="all">Choose vehicle type</option>
                    {types.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                    
                  </select>
                    <select
                    id="countries"
                    class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onClick={refreshCars}
                  >
                    <option selected value="all">Choose your city</option>
                    {citys.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                    
                  </select>

                  </div>
                </form>

                <Dropdown overlay={menu} placement="bottomCenter" className='translate-y-1' >
                  <Button>{user.username}</Button>
                </Dropdown>

              </div>
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
