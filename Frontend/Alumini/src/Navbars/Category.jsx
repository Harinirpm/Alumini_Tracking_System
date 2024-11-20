import React from 'react'
import { useState } from 'react';
import './category.css'

function Category() {

    const categories = [
        'DataScience', 
        'Artificial Intelligence', 
        'Machine Learning', 'Mobile App Learning', 
        'UI/UX'
    ];
    const locations = [
        'Chennai',
        'Bangalore',
        'Hyderabad',
        'Coimbatore',
    ]
    const [selectedCategories,setSelectedCategories]=useState([]);
    const[selectedLocations,setSelectedLocations]=useState([]);


    function handleChange(category){
        setSelectedCategories(prevSelectedCategories => {
            if(prevSelectedCategories.includes(category)){
                return prevSelectedCategories.filter(cat => cat != category);
            }
            else{
                return [...prevSelectedCategories,category];
            }
        });
    }

    function handleLocationChange(location){
        setSelectedLocations(prevSelectedLocations => {
            if(prevSelectedLocations.includes(location)){
                return prevSelectedLocations.filter(loc=>loc !=location);
            }else{
                return [...prevSelectedLocations,location];
            }
        });
    }



  return (
    <>
    <div className='category-container'>
        <h2>Filter</h2>
        <div className='category'>
        <h3>Category</h3>
        {categories.map((category,index) => (
            <label key={index}>
                <input
                   type='checkbox'
                   className='checkbox-group'
                   checked={selectedCategories.includes(category)}
                   onChange={() => handleChange(category)}
                /><span></span>
                {" "}{category}
            </label>
        ))}

        </div> 
        <div className='category'>
            <h3>Locations</h3>
        {locations.map((location,index) => (
            <label key={index}>
                <input
                  type='checkbox'
                  className='checkbox-group'
                  checked={selectedLocations.includes(location)}
                  onChange={()=>handleLocationChange(location)}
                /><span></span>
                {" "}{location}

            </label>
        ))}
        </div> 
    </div>
    </>
  );
}

export default Category
