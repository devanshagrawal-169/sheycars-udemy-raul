import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { deleteCar, getMyCars } from '../redux/actions/carsActions'; // Import getMyCars action
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';

const { RangePicker } = DatePicker;

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const { location } = useSelector((state) => state.locationReducer);
  console.log(location);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const addnewCarLink = `/addcar/${user._id}`;

  useEffect(() => {
    dispatch(getMyCars()); 
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);
  
  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-center mt-2">My List</h1>
            <button className="btn1">
              <a href={addnewCarLink}>ADD VEHICLE</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          if (location === "all") {
            return (
              <Col lg={5} sm={24} xs={24} key={car._id}>
                <div className="car p-2 bs1">
                  <img src={car.image} className="carimg" />

                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div className="text-left pl-2">
                      <p>{car.name}</p>
                      <p> Rent Per Day {car.rentPerHour} /-</p>
                    </div>

                    <div className="mr-4">
                      <Link to={`/editcar/${car._id}`}>
                        <EditOutlined
                          className="mr-3"
                          style={{ color: 'green', cursor: 'pointer' }}
                        />
                      </Link>

                      <Popconfirm
                        title="Are you sure to delete this car?"
                        onConfirm={() => {
                          dispatch(deleteCar({ carid: car._id }));
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined
                          style={{ color: 'red', cursor: 'pointer' }}
                        />
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </Col>
            );
          } else if (location === car.city) {
            return (
              <Col lg={5} sm={24} xs={24} key={car._id}>
                <div className="car p-2 bs1">
                  <img src={car.image} className="carimg" />

                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div className="text-left pl-2">
                      <p>{car.name}</p>
                      <p> Rent Per Hour {car.rentPerHour} /-</p>
                    </div>

                    <div className="mr-4">
                      <Link to={`/editcar/${car._id}`}>
                        <EditOutlined
                          className="mr-3"
                          style={{ color: 'green', cursor: 'pointer' }}
                        />
                      </Link>

                      <Popconfirm
                        title="Are you sure to delete this car?"
                        onConfirm={() => {
                          dispatch(deleteCar({ carid: car._id }));
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined
                          style={{ color: 'red', cursor: 'pointer' }}
                        />
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </Col>
            );
          } else {
            return null;
          }
        })}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
