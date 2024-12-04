import React, { useState, useEffect } from 'react';
import './category.css';
import axios from 'axios';

function Category({ filteredAlumniData, setFilteredAlumniData, alumniData, setAlumniData }) {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    function handleChange(category) {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter((cat) => cat !== category);
            } else {
                return [...prevSelectedCategories, category];
            }
        });
    }

    function handleLocationChange(location) {
        setSelectedLocations((prevSelectedLocations) => {
            if (prevSelectedLocations.includes(location)) {
                return prevSelectedLocations.filter((loc) => loc !== location);
            } else {
                return [...prevSelectedLocations, location];
            }
        });
    }

    useEffect(() => {
        const fetchListOfRoles = async () => {
            try {
                const response = await axios.get('http://localhost:8081/alumini/roles');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching alumni roles:', error);
            }
        };

        const fetchListOfLocations = async () => {
            try {
                const response = await axios.get('http://localhost:8081/alumini/locations');
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching alumni locations:', error);
            }
        };

        const fetchList = async () => {
            try {
                const response = await axios.get('http://localhost:8081/alumini/list');
                setAlumniData(response.data.rows);
                setFilteredAlumniData(response.data.rows);
            } catch (error) {
                console.error('Error fetching alumni list:', error);
            }
        };

        fetchList();
        fetchListOfRoles();
        fetchListOfLocations();
    }, []);

    // Filter alumniData based on selectedCategories and selectedLocations
    useEffect(() => {
        if (selectedCategories.length === 0 && selectedLocations.length === 0) {
            setFilteredAlumniData(alumniData);
        } else {
            setFilteredAlumniData(
                alumniData.filter((alumni) => {
                    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(alumni.role_title);
                    const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(alumni.location);
                    return categoryMatch && locationMatch;
                })
            );
        }
    }, [selectedCategories, selectedLocations, alumniData]);

    return (
        <>
            <div className='category-container'>
                <h2>Filter</h2>
                <div className='category'>
                    <h3>Category</h3>
                    {categories.length > 0 &&
                        categories.map((category, index) => (
                            <label key={index}>
                                <input
                                    type='checkbox'
                                    className='checkbox-group'
                                    checked={selectedCategories.includes(category.title)}
                                    onChange={() => handleChange(category.title)}
                                />
                                <span></span>
                                {" "}{category.title}
                            </label>
                        ))}
                </div>
                <div className='category'>
                    <h3>Locations</h3>
                    {locations.length > 0 &&
                        locations.map((location, index) => (
                            <label key={index}>
                                <input
                                    type='checkbox'
                                    className='checkbox-group'
                                    checked={selectedLocations.includes(location.place)}
                                    onChange={() => handleLocationChange(location.place)}
                                />
                                <span></span>
                                {" "}{location.place}
                            </label>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Category;
