import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getAllCars } from '../redux/actions/carsActions';
import { Col, Row, Divider, DatePicker, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';
const { RangePicker } = DatePicker;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const {location} = useSelector((state)=>state.locationReducer)
  const {type} = useSelector((state)=>state.typeReducer)
  const dispatch = useDispatch();
  console.log(location)
  console.log(type)

  useEffect(() => {
    dispatch(getAllCars());
  }, []);
 
  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  function setFilter(values) {
    var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm');
    var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm');

    var temp = [];

    for (var car of cars) {
      if (car.city === location) {
        temp.push(car);
      } 
    }
    setTotalcars(temp);
  }

  return (
    <DefaultLayout>
      
      {loading === true && <Spinner />}

      <Row className='justify-evenly' gutter={16}>
        {totalCars.map((car) => {
            if(location==="all"||type==="all")
          return (
            
            <Col lg={5} sm={24} xs={24}>
              <div className="flex w-[300px] flex-col items-center justify-between hover:scale-101 transition duration-300 ease-in shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[rgba(0,_0,_0,_0.3)_0px_20px_40px] gap-3 p-3 py-4 rounded-xl ml-10 mt-5 ">
                <div>
                  <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">
                    {car.name}
                  </p>
                </div>
                <div className="h-[180px]">
                  <img
                    src={car.image}
                    alt="carimage"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex justify-between gap-12 items-center w-full ">
                  <div className='flex-col'>
                    <p className=" font-semibold text-xs">
                      Rent/day - ₹{car.rentPerHour}
                    </p>
                  <div className='text-xs'>
                    Fuel Type - {car.fuelType}
                  </div>
                  </div>
                  <div>
                    <button className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in">
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
          else
          return (
            (location===car.city)&&(type===car.type)&&
            <Col lg={5} sm={24} xs={24}>
              <div className="flex w-[300px] flex-col items-center justify-between hover:scale-101 transition duration-300 ease-in shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[rgba(0,_0,_0,_0.3)_0px_20px_40px] gap-3 p-3 py-4 rounded-xl ml-10 mt-5 ">
                <div>
                  <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">
                    {car.name}
                  </p>
                </div>
                <div className="h-[180px]">
                  <img
                    src={car.image}
                    alt="carimage"
                    className="h-full w-full" 
                  />
                </div>
                <div className="flex justify-between gap-12 items-center w-full ">
                  <div className='flex-col'>
                    <p className=" font-semibold text-xs">
                      Rent/day - ₹{car.rentPerHour}
                    </p>
                  <div className='text-xs'>
                    Fuel Type - {car.fuelType}
                  </div>
                  </div>
                  <div>
                      <Link className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in" to={`/booking/${car._id}`}>                        
                            Book Now
                      </Link>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
