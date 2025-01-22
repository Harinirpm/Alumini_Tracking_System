import React, { useState, useEffect } from 'react';
import './category.css';
import axios from 'axios';

const departments = [
    { short: 'CSE', full: 'Computer Science and Engineering' },
    { short: 'ECE', full: 'Electronics and Communication Engineering' },
    { short: 'EEE', full: 'Electrical and Electronics Engineering' },
    { short: 'ME', full: 'Mechanical Engineering' },
    { short: 'IT', full: 'Information Technology' },
    { short: 'CIV', full: 'Civil Engineering' },
    { short: 'CHE', full: 'Chemical Engineering' },
    { short: 'AE', full: 'Aeronautical Engineering' }
];

const departmentFullForms = {
    'CSE': 'Computer Science and Engineering',
    'ECE': 'Electronics and Communication Engineering',
    'EEE': 'Electrical and Electronics Engineering',
    'ME': 'Mechanical Engineering',
    'IT': 'Information Technology',
    'CIV': 'Civil Engineering',
    'CHE': 'Chemical Engineering',
    'AE': 'Aeronautical Engineering',
};

function Category({ filteredAlumniData, setFilteredAlumniData, alumniData, setAlumniData }) {
    const [categories, setCategories] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1994 }, (_, index) => 1994 + index);
console.log(years);


    function handleChange(category) {
        setSelectedYears((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter((cat) => cat !== category);
            } else {
                return [...prevSelectedCategories, category];
            }
        });
    }

    const handleDepartmentChange = (short) => {
        setSelectedDepartments((prevSelected) =>
            prevSelected.includes(short)
                ? prevSelected.filter((dept) => dept !== short)
                : [...prevSelected, short]
        );
    };

    useEffect(() => {
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
    }, []);

    // Filter alumniData based on selectedCategories and selectedLocations
    useEffect(() => {
        if (selectedYears.length === 0 && selectedDepartments.length === 0) {
            setFilteredAlumniData(alumniData);
        } else {
            setFilteredAlumniData(
                alumniData.filter((alumni) => {
                    const categoryMatch = selectedYears.length === 0 || selectedYears.includes(alumni.passed_out_year);
                    const locationMatch = selectedDepartments.length === 0 || selectedDepartments.some((short) => departmentFullForms[short] === alumni.department);
                    return categoryMatch && locationMatch;
                })
            );
        }
    }, [selectedYears, selectedDepartments, alumniData]);

    return (
        <>
            <div className='category-container'>
                <h2>Filter</h2>
                <div className="year-filter">
                    <h3>Passed Out Year</h3>
                    {years.length > 0 && (
                        <div className="scrollable-years">
                            {years.map((year, index) => (
                                <label key={index} className="year-label">
                                    <input
                                        type="checkbox"
                                        className="checkbox-group"
                                        checked={selectedYears.includes(year)}
                                        onChange={() => handleChange(year)}
                                    />
                                    <span></span>
                                    {" "}{year}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="category">
            <h3>Departments</h3>
            <div  className="scrollable-years">
            {departments.length > 0 &&
                departments.map((department, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            className="checkbox-group"
                            checked={selectedDepartments.includes(department.short)}
                            onChange={() => handleDepartmentChange(department.short)}
                        />
                        <span></span>
                        {" "}{department.short}                           
                    </label>
                ))}
                </div>
        </div>
            </div>
        </>
    );
}

export default Category;
